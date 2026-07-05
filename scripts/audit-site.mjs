import * as chromeLauncher from "chrome-launcher";
import WebSocket from "ws";

import {
  assertDistBuilt,
  createStaticDistServer,
  listen,
} from "./lib/static-dist-server.mjs";

const routes = [
  "/",
  "/what-is-suspec/",
  "/the-loop/",
  "/get-started/",
  "/skills/",
  "/skills/writing/",
  "/agents/",
  "/cli/",
  "/mcp/",
  "/docs/",
  "/docs/01-what-is-suspec/",
  "/docs/reference/advanced-lifecycle/",
  "/colophon/",
  "/kitchen-sink/",
];

const sitemapRoutes = routes.filter((route) => route !== "/kitchen-sink/");
const agentResourceRoutes = ["/llms.txt", "/llms-full.txt"];

const viewports = [
  { name: "desktop", width: 1280, height: 900, mobile: false, dpr: 1 },
  { name: "tablet", width: 768, height: 1024, mobile: false, dpr: 1 },
  { name: "mobile", width: 390, height: 844, mobile: true, dpr: 2 },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForRouteReady(cdp, expectedPath, timeoutMs = 5000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const ready = await cdp.eval(`(() => ({
        path: location.pathname,
        state: document.readyState,
        hasMain: Boolean(document.querySelector('main')),
      }))()`);
      if (ready.path === expectedPath && ready.state === "complete" && ready.hasMain) {
        return;
      }
    } catch {
      // Navigation can briefly destroy the execution context; keep polling.
    }
    await wait(100);
  }
}

function visibleControlSelector() {
  return [
    "button",
    "input",
    "summary",
    ".site-nav a",
    ".mobile-menu a",
    ".docs-nav a",
    ".docs-search input",
    ".btn",
    ".button",
    "[role='button']",
  ].join(",");
}

class Cdp {
  constructor(ws, sessionId) {
    this.ws = ws;
    this.sessionId = sessionId;
    this.id = 0;
    this.pending = new Map();
    this.exceptions = [];

    ws.on("message", (raw) => {
      const msg = JSON.parse(raw);
      if (msg.method === "Runtime.exceptionThrown") {
        this.exceptions.push(msg.params.exceptionDetails.text);
      }
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}) {
    const msg = { id: ++this.id, method, params, sessionId: this.sessionId };
    this.ws.send(JSON.stringify(msg));
    return new Promise((resolve, reject) => {
      this.pending.set(msg.id, { resolve, reject });
    });
  }

  async eval(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return result.result.value;
  }
}

async function openCdp(chrome) {
  const version = await fetch(`http://127.0.0.1:${chrome.port}/json/version`).then((r) =>
    r.json(),
  );
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.once("open", resolve));

  let id = 0;
  const pending = new Map();
  ws.on("message", (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  });

  const sendRoot = (method, params = {}) => {
    const msg = { id: ++id, method, params };
    ws.send(JSON.stringify(msg));
    return new Promise((resolve, reject) => pending.set(msg.id, { resolve, reject }));
  };

  const { targetId } = await sendRoot("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await sendRoot("Target.attachToTarget", {
    targetId,
    flatten: true,
  });
  const cdp = new Cdp(ws, sessionId);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  return { cdp, close: () => sendRoot("Target.closeTarget", { targetId }).finally(() => ws.close()) };
}

async function auditRoute(cdp, baseUrl, route, viewport) {
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
  await wait(route.startsWith("/docs") ? 1800 : 1000);

  const report = await cdp.eval(`(() => {
    const controlSelector = ${JSON.stringify(visibleControlSelector())};
    const isVisible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const text = (el) => (el?.textContent || '').replace(/\\s+/g, ' ').trim();
    const head = (selector, attr = 'content') => document.querySelector(selector)?.getAttribute(attr) || '';
    const labelledByText = (el) =>
      (el.getAttribute('aria-labelledby') || '')
        .split(/\\s+/)
        .map((id) => text(document.getElementById(id)))
        .filter(Boolean)
        .join(' ');
    const controlName = (el) => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
        return text(el.labels?.[0]) || el.getAttribute('aria-label') || labelledByText(el) || el.getAttribute('placeholder') || el.getAttribute('title') || '';
      }
      return text(el) || el.getAttribute('aria-label') || labelledByText(el) || el.getAttribute('title') || el.querySelector('img[alt]')?.getAttribute('alt') || '';
    };
    const html = document.documentElement;
    const width = html.clientWidth;
    const h1s = [...document.querySelectorAll('h1')].filter(isVisible).map((el) => {
      const rect = el.getBoundingClientRect();
      return { text: text(el), width: rect.width, top: rect.top };
    });
    const copyButtons = [...document.querySelectorAll('button, [role="button"]')]
      .filter(isVisible)
      .filter((el) => /copy/i.test(text(el) + ' ' + (el.getAttribute('aria-label') || '')))
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          label: text(el) || el.getAttribute('aria-label') || el.className || el.tagName,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          cursor: getComputedStyle(el).cursor,
        };
      });
    const smallControls = [...document.querySelectorAll(controlSelector)]
      .filter(isVisible)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          label: text(el) || el.getAttribute('aria-label') || el.getAttribute('href') || el.tagName,
          tag: el.tagName.toLowerCase(),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
      .filter((item) => item.width < 40 || item.height < 40)
      .slice(0, 8);
    const wideBlocks = [...document.querySelectorAll('pre, code, .terminal-content, .terminal-window')]
      .filter(isVisible)
      .map((el) => ({
        label: el.className || el.tagName,
        clientWidth: Math.round(el.clientWidth),
        scrollWidth: Math.round(el.scrollWidth),
        overflowX: getComputedStyle(el).overflowX,
      }))
      .filter((item) => item.scrollWidth > item.clientWidth + 2 && !/(auto|scroll)/.test(item.overflowX))
      .slice(0, 8);
    const headingsTooWide = h1s.filter((item) => item.width > width + 1);
    const pageOverflow =
      html.scrollWidth > html.clientWidth + 1 ||
      document.body.scrollWidth > html.clientWidth + 1;
    const badCopyButtons = copyButtons.filter((item) => item.cursor !== 'pointer' || item.width < 40 || item.height < 40);
    const anchorsWithoutHref = [...document.querySelectorAll('a')].filter((el) => !el.getAttribute('href')).length;
    const nestedInteractive = [...document.querySelectorAll('a button, button a')].length;
    const unnamedControls = [...document.querySelectorAll(controlSelector)]
      .filter(isVisible)
      .filter((el) => !controlName(el))
      .map((el) => el.outerHTML.slice(0, 120))
      .slice(0, 8);
    const targetBlankMissingRel = [...document.querySelectorAll('a[target="_blank"]')]
      .filter((el) => {
        const rel = (el.getAttribute('rel') || '').toLowerCase();
        return !rel.includes('noopener') || !rel.includes('noreferrer');
      })
      .map((el) => text(el) || el.getAttribute('aria-label') || el.getAttribute('href'))
      .slice(0, 8);
    const seenIds = new Set();
    const duplicateIds = [];
    for (const el of document.querySelectorAll('[id]')) {
      const id = el.id;
      if (!id) continue;
      if (seenIds.has(id) && !duplicateIds.includes(id)) duplicateIds.push(id);
      seenIds.add(id);
    }
    const canonicalPath = head('link[rel="canonical"]', 'href') ? new URL(head('link[rel="canonical"]', 'href'), location.origin).pathname : '';
    return {
      url: location.pathname,
      title: document.title.trim(),
      description: head('meta[name="description"]'),
      canonical: head('link[rel="canonical"]', 'href'),
      ogTitle: head('meta[property="og:title"]'),
      ogDescription: head('meta[property="og:description"]'),
      h1s,
      mainTextLength: text(document.querySelector('main')).length,
      pageOverflow,
      headingsTooWide,
      copyButtons,
      badCopyButtons,
      smallControls,
      wideBlocks,
      anchorsWithoutHref,
      nestedInteractive,
      unnamedControls,
      targetBlankMissingRel,
      duplicateIds: duplicateIds.slice(0, 8),
      canonicalPath,
    };
  })()`);

  const failures = [];
  if (report.h1s.length !== 1) failures.push(`h1 count ${report.h1s.length}`);
  if (report.title.length < 12) failures.push("short/missing title");
  if (report.description.length < 50) failures.push("short/missing description");
  if (!report.canonical) failures.push("missing canonical");
  if (!report.ogTitle || !report.ogDescription) failures.push("missing OG metadata");
  if (report.mainTextLength < 300) failures.push("main content too thin");
  if (report.pageOverflow) failures.push("body horizontal overflow");
  if (report.headingsTooWide.length) failures.push("H1 overflows viewport");
  if (report.badCopyButtons.length) failures.push("bad copy button target/cursor");
  if (viewport.mobile && report.smallControls.length) failures.push("small mobile control target");
  if (report.wideBlocks.length) failures.push("unscrollable code/terminal overflow");
  if (report.anchorsWithoutHref) failures.push(`anchors without href ${report.anchorsWithoutHref}`);
  if (report.nestedInteractive) failures.push(`nested interactive ${report.nestedInteractive}`);
  if (report.unnamedControls.length) failures.push("interactive controls missing accessible name");
  if (report.targetBlankMissingRel.length) failures.push("target blank links missing noopener/noreferrer");
  if (report.duplicateIds.length) failures.push("duplicate ids");
  if (report.canonicalPath !== new URL(route, baseUrl).pathname) failures.push("canonical path does not match route");
  if (cdp.exceptions.length) failures.push(`runtime exceptions ${cdp.exceptions.length}`);

  return { route, viewport: viewport.name, failures, report, exceptions: cdp.exceptions };
}

async function auditReducedMotion(cdp, baseUrl) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: `${baseUrl}/` });
  await wait(1000);
  return cdp.eval(`(() => {
    const identity = (transform) =>
      transform === 'none' ||
      transform === 'matrix(1, 0, 0, 1, 0, 0)' ||
      transform === 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
    const terminal = document.querySelector('.terminal-window');
    const panel = document.querySelector('.panel-raised.group');
    const lamp = document.querySelector('.pilot-lamp-pulse, .pilot-lamp');
    for (const el of [terminal, panel].filter(Boolean)) {
      const rect = el.getBoundingClientRect();
      el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: rect.left + 8, clientY: rect.top + 8 }));
    }
    const terminalTransform = terminal ? getComputedStyle(terminal).transform : 'none';
    const panelTransform = panel ? getComputedStyle(panel).transform : 'none';
    const lampAnimation = lamp ? getComputedStyle(lamp).animationName : 'none';
    return {
      matches: matchMedia('(prefers-reduced-motion: reduce)').matches,
      terminalTransform,
      panelTransform,
      lampAnimation,
      pass: identity(terminalTransform) && identity(panelTransform) && lampAnimation === 'none',
    };
  })()`);
}

async function fetchText(baseUrl, route) {
  const response = await fetch(`${baseUrl}${route}`);
  return {
    route,
    ok: response.ok,
    status: response.status,
    type: response.headers.get("content-type") ?? "",
    text: await response.text(),
  };
}

async function auditSeoArtifacts(baseUrl) {
  const [robots, sitemap, llms, llmsFull] = await Promise.all([
    fetchText(baseUrl, "/robots.txt"),
    fetchText(baseUrl, "/sitemap.xml"),
    fetchText(baseUrl, "/llms.txt"),
    fetchText(baseUrl, "/llms-full.txt"),
  ]);

  const failures = [];
  for (const resource of [robots, sitemap, llms, llmsFull]) {
    if (!resource.ok) failures.push(`${resource.route} returned ${resource.status}`);
  }

  if (!robots.text.includes("Sitemap: https://suspecframework.dev/sitemap.xml")) {
    failures.push("robots.txt missing sitemap directive");
  }

  for (const route of [...sitemapRoutes, ...agentResourceRoutes]) {
    const absoluteUrl = `https://suspecframework.dev${route}`;
    if (!sitemap.text.includes(`<loc>${absoluteUrl}</loc>`)) {
      failures.push(`sitemap missing ${absoluteUrl}`);
    }
  }

  for (const route of [
    "/docs/01-what-is-suspec/",
    "/docs/reference/advanced-lifecycle/",
  ]) {
    const absoluteUrl = `https://suspecframework.dev${route}`;
    if (!sitemap.text.includes(`<loc>${absoluteUrl}</loc>`)) {
      failures.push(`sitemap missing docs route ${absoluteUrl}`);
    }
  }

  const llmsRequired = [
    "# Suspec",
    "any agent, no runtime",
    "https://suspecframework.dev/docs/",
    "https://suspecframework.dev/llms-full.txt",
    "https://suspecframework.dev/mcp/",
  ];
  for (const needle of llmsRequired) {
    if (!llms.text.includes(needle)) failures.push(`llms.txt missing ${needle}`);
  }

  const fullRequired = [
    "# Suspec - full documentation",
    "<!-- 01-what-is-suspec.md -->",
    "<!-- tutorial/README.md -->",
    "<!-- examples/large-pr-review.md -->",
  ];
  for (const needle of fullRequired) {
    if (!llmsFull.text.includes(needle)) {
      failures.push(`llms-full.txt missing ${needle}`);
    }
  }
  if (llmsFull.text.length < 20000) failures.push("llms-full.txt unexpectedly short");

  return {
    failures,
    lengths: {
      robots: robots.text.length,
      sitemap: sitemap.text.length,
      llms: llms.text.length,
      llmsFull: llmsFull.text.length,
    },
  };
}

function auditRouteMetadata(results) {
  const failures = [];
  const byRoute = new Map();
  for (const result of results) {
    const items = byRoute.get(result.route) ?? [];
    items.push(result.report);
    byRoute.set(result.route, items);
  }

  const routeRecords = [];
  for (const [route, reports] of byRoute) {
    const [first] = reports;
    for (const key of ["title", "description", "canonical", "ogTitle", "ogDescription"]) {
      const variants = new Set(reports.map((report) => report[key]).filter(Boolean));
      if (variants.size !== 1) failures.push(`${route} inconsistent ${key} across viewports`);
    }
    routeRecords.push({
      route,
      title: first.title,
      description: first.description,
    });
  }

  for (const key of ["title", "description"]) {
    const seen = new Map();
    for (const record of routeRecords) {
      const value = record[key];
      if (!value) continue;
      const routesWithValue = seen.get(value) ?? [];
      routesWithValue.push(record.route);
      seen.set(value, routesWithValue);
    }
    for (const [value, routesWithValue] of seen) {
      if (routesWithValue.length > 1) {
        failures.push(`duplicate ${key} "${value}" on ${routesWithValue.join(", ")}`);
      }
    }
  }

  return { failures, routes: routeRecords.length };
}

assertDistBuilt("audit-site");
const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
});

let exitCode = 0;
try {
  const { cdp, close } = await openCdp(chrome);
  const results = [];
  for (const route of routes) {
    for (const viewport of viewports) {
      const result = await auditRoute(cdp, baseUrl, route, viewport);
      results.push(result);
      const status = result.failures.length ? "FAIL" : "PASS";
      console.log(`${status} ${result.viewport} ${result.route}`);
      if (result.failures.length) {
        exitCode = 1;
        for (const failure of result.failures) console.log(`  - ${failure}`);
        const details = {
          h1s: result.report.h1s,
          badCopyButtons: result.report.badCopyButtons,
          smallControls: result.report.smallControls,
          wideBlocks: result.report.wideBlocks,
          unnamedControls: result.report.unnamedControls,
          targetBlankMissingRel: result.report.targetBlankMissingRel,
          duplicateIds: result.report.duplicateIds,
          exceptions: result.exceptions,
        };
        console.log(`  details ${JSON.stringify(details)}`);
      }
    }
  }

  const metadata = auditRouteMetadata(results);
  if (metadata.failures.length) {
    exitCode = 1;
    console.log(`FAIL route-metadata ${JSON.stringify(metadata)}`);
  } else {
    console.log(`PASS route-metadata ${JSON.stringify({ routes: metadata.routes })}`);
  }

  const reducedMotion = await auditReducedMotion(cdp, baseUrl);
  if (reducedMotion.pass) {
    console.log(`PASS reduced-motion ${JSON.stringify(reducedMotion)}`);
  } else {
    exitCode = 1;
    console.log(`FAIL reduced-motion ${JSON.stringify(reducedMotion)}`);
  }

  const routeCount = new Set(results.map((result) => result.route)).size;
  const seoArtifacts = await auditSeoArtifacts(baseUrl);
  if (seoArtifacts.failures.length) {
    exitCode = 1;
    console.log(`FAIL seo-artifacts ${JSON.stringify(seoArtifacts)}`);
  } else {
    console.log(`PASS seo-artifacts ${JSON.stringify(seoArtifacts.lengths)}`);
  }

  console.log(`[audit-site] routes=${routeCount} viewport-runs=${results.length}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
