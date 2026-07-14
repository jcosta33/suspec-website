import * as chromeLauncher from "chrome-launcher";

import { openCdp, wait, waitForRouteReady } from "./lib/cdp.mjs";
import {
  assertDistBuilt,
  createStaticDistServer,
  listen,
} from "./lib/static-dist-server.mjs";

const desktop = { width: 1280, height: 900, mobile: false, dpr: 1 };
const mobile = { width: 390, height: 844, mobile: true, dpr: 2 };

const keyCodes = new Map([
  ["Tab", 9],
  ["Enter", 13],
  ["Escape", 27],
]);

async function loadRoute(cdp, baseUrl, route, viewport, delay = 1200) {
  cdp.exceptions = [];
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.dpr,
    mobile: viewport.mobile,
  });
  await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: viewport.mobile });
  await cdp.send("Emulation.setEmulatedMedia", { features: [] });
  await cdp.send("Page.navigate", { url: `${baseUrl}${route}` });
  await waitForRouteReady(cdp, new URL(route, baseUrl).pathname);
  await wait(delay);
}

async function key(cdp, name, { shift = false } = {}) {
  const keyCode = keyCodes.get(name);
  const modifiers = shift ? 8 : 0;
  await cdp.send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: name,
    code: name,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode,
    modifiers,
  });
  await cdp.send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: name,
    code: name,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode,
    modifiers,
  });
  await wait(60);
}

async function tabSequence(cdp, count) {
  const sequence = [];
  for (let index = 0; index < count; index += 1) {
    await key(cdp, "Tab");
    sequence.push(await focusSnapshot(cdp));
  }
  return sequence;
}

async function focusSnapshot(cdp) {
  return cdp.eval(`(() => {
    const el = document.activeElement;
    const text = (node) => (node?.textContent || '').replace(/\\s+/g, ' ').trim();
    const rect = el?.getBoundingClientRect?.() ?? { width: 0, height: 0 };
    const style = el ? getComputedStyle(el) : null;
    const labelledBy = (el?.getAttribute?.('aria-labelledby') || '')
      .split(/\\s+/)
      .map((id) => text(document.getElementById(id)))
      .filter(Boolean)
      .join(' ');
    const name =
      el?.getAttribute?.('aria-label') ||
      labelledBy ||
      text(el) ||
      el?.getAttribute?.('href') ||
      el?.getAttribute?.('placeholder') ||
      '';
    return {
      tag: el?.tagName?.toLowerCase?.() ?? '',
      id: el?.id ?? '',
      className: typeof el?.className === 'string' ? el.className : '',
      name,
      href: el?.getAttribute?.('href') || '',
      visible: rect.width > 0 && rect.height > 0,
      inMobileMenu: Boolean(el?.closest?.('#mobile-menu')),
      focusVisible: Boolean(el?.matches?.(':focus-visible')),
      hasVisibleFocus:
        Boolean(style) &&
        (
          (style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0) ||
          style.boxShadow !== 'none' ||
          style.backgroundColor !== 'rgba(0, 0, 0, 0)'
        ),
    };
  })()`);
}

function containsName(sequence, pattern) {
  return sequence.some((item) => pattern.test(item.name));
}

function summarizeSequence(sequence) {
  return sequence
    .filter((item) => item.visible)
    .map((item) => item.name || item.href || item.tag)
    .slice(0, 16);
}

function pushIf(failures, condition, label) {
  if (condition) failures.push(label);
}

async function auditDesktopNav(cdp, baseUrl) {
  await loadRoute(cdp, baseUrl, "/", desktop);
  const sequence = await tabSequence(cdp, 12);
  const failures = [];
  for (const pattern of [
    /Skip to main content/i,
    /Suspec home/i,
    /^Loop$/i,
    /^Skills$/i,
    /^Docs$/i,
  ]) {
    pushIf(failures, !containsName(sequence, pattern), `missing focus stop ${pattern}`);
  }
  pushIf(failures, sequence.some((item) => item.visible && !item.focusVisible && !item.hasVisibleFocus), "focused element lacks visible focus treatment");
  return { label: "desktop-nav", failures, summary: summarizeSequence(sequence) };
}

async function auditMobileMenu(cdp, baseUrl) {
  await loadRoute(cdp, baseUrl, "/", mobile);
  await cdp.eval(`document.querySelector('.mobile-menu-toggle')?.focus()`);
  await key(cdp, "Enter");
  await wait(200);
  const opened = await cdp.eval(`(() => ({
    expanded: document.querySelector('.mobile-menu-toggle')?.getAttribute('aria-expanded'),
    hidden: document.querySelector('#mobile-menu')?.hidden,
    active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim() || '',
    inMenu: Boolean(document.activeElement?.closest('#mobile-menu')),
  }))()`);
  const sequence = await tabSequence(cdp, 12);
  await key(cdp, "Escape");
  await wait(120);
  const closed = await cdp.eval(`(() => ({
    expanded: document.querySelector('.mobile-menu-toggle')?.getAttribute('aria-expanded'),
    hidden: document.querySelector('#mobile-menu')?.hidden,
    active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.className || '',
  }))()`);

  const failures = [];
  pushIf(failures, opened.expanded !== "true" || opened.hidden !== false, "mobile menu did not open from keyboard");
  pushIf(failures, !opened.inMenu, "mobile menu did not move focus into menu");
  pushIf(failures, sequence.some((item) => !item.inMobileMenu), "Tab escaped open mobile menu");
  pushIf(failures, !containsName(sequence, /^Loop$/i), "mobile menu missing work link in tab order");
  pushIf(failures, !containsName(sequence, /^Docs$/i), "mobile menu missing docs link in tab order");
  pushIf(failures, closed.expanded !== "false" || closed.hidden !== true, "Escape did not close mobile menu");
  pushIf(failures, !/Toggle navigation menu|mobile-menu-toggle/.test(closed.active), "Escape did not restore focus to toggle");
  return { label: "mobile-menu", failures, opened, closed, summary: summarizeSequence(sequence) };
}

async function auditActiveNav(cdp, baseUrl) {
  await loadRoute(cdp, baseUrl, "/the-loop/", desktop);
  const before = await cdp.eval(`(() =>
    [...document.querySelectorAll('.site-nav-link[aria-current="page"]')]
      .map((link) => link.textContent.trim())
  )()`);
  const clicked = await cdp.eval(`(() => {
    const link = [...document.querySelectorAll('.site-nav-link')]
      .find((item) => item.textContent.trim() === 'Skills');
    link?.click();
    return Boolean(link);
  })()`);
  if (clicked) {
    await waitForRouteReady(cdp, "/skills/");
    await wait(300);
  }
  const after = await cdp.eval(`(() =>
    [...document.querySelectorAll('.site-nav-link[aria-current="page"]')]
      .map((link) => link.textContent.trim())
  )()`);
  const failures = [];
  pushIf(failures, before.length !== 1 || before[0] !== "Loop", "Loop route has the wrong active nav item");
  pushIf(failures, !clicked, "Skills nav link missing");
  pushIf(failures, after.length !== 1 || after[0] !== "Skills", "active nav did not follow client navigation");
  return { label: "active-nav", failures, before, after };
}

async function auditDocsSearch(cdp, baseUrl) {
  await loadRoute(cdp, baseUrl, "/docs/", desktop, 4200);
  const sequence = await tabSequence(cdp, 48);
  const input = await cdp.eval(`(() => {
    const el = document.querySelector('.docs-search input');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      label: el.getAttribute('aria-label') || '',
      visible: rect.width > 0 && rect.height > 0,
      tabIndex: el.tabIndex,
    };
  })()`);
  const failures = [];
  pushIf(failures, !input, "docs search input missing");
  pushIf(failures, Boolean(input) && input.label !== "Search the manual", "docs search input not named");
  pushIf(failures, Boolean(input) && !input.visible, "docs search input not visible");
  pushIf(failures, !containsName(sequence, /Search the manual/i), "docs search missing from tab order");
  return { label: "docs-search", failures, input, summary: summarizeSequence(sequence) };
}

async function auditCopyButtons(cdp, baseUrl) {
  await loadRoute(cdp, baseUrl, "/cli/", desktop);
  const cliSequence = await tabSequence(cdp, 90);
  await loadRoute(cdp, baseUrl, "/docs/reference/cli/", desktop, 1800);
  const docsCopy = await cdp.eval(`(() => {
    const el = document.querySelector('[data-docs-code-copy]');
    if (!el) return null;
    el.focus();
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return {
      name: el.getAttribute('aria-label') || el.textContent.trim(),
      tag: el.tagName.toLowerCase(),
      visible: rect.width > 0 && rect.height > 0,
      hasVisibleFocus:
        (style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0) ||
        style.boxShadow !== 'none',
    };
  })()`);

  const failures = [];
  pushIf(failures, !cliSequence.some((item) => item.tag === "button" && /copy/i.test(item.name)), "terminal copy button missing from tab order");
  pushIf(failures, !docsCopy, "docs copy button missing");
  pushIf(failures, Boolean(docsCopy) && docsCopy.tag !== "button", "docs copy control is not a button");
  pushIf(failures, Boolean(docsCopy) && !docsCopy.visible, "docs copy button is not visible");
  pushIf(failures, Boolean(docsCopy) && !docsCopy.hasVisibleFocus, "docs copy button lacks focus treatment");
  return {
    label: "copy-buttons",
    failures,
    cliSummary: summarizeSequence(cliSequence),
    docsCopy,
  };
}

assertDistBuilt("audit-keyboard");
const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
});

let exitCode = 0;
try {
  const { cdp, close } = await openCdp(chrome);
  const audits = [
    await auditDesktopNav(cdp, baseUrl),
    await auditActiveNav(cdp, baseUrl),
    await auditMobileMenu(cdp, baseUrl),
    await auditDocsSearch(cdp, baseUrl),
    await auditCopyButtons(cdp, baseUrl),
  ];

  for (const audit of audits) {
    if (audit.failures.length) {
      exitCode = 1;
      console.log(`FAIL keyboard ${audit.label} ${JSON.stringify(audit)}`);
    } else {
      console.log(`PASS keyboard ${audit.label} ${JSON.stringify(audit)}`);
    }
  }
  console.log(`[audit-keyboard] checks=${audits.length}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
