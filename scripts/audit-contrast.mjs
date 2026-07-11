import * as chromeLauncher from "chrome-launcher";

import { openCdp, wait, waitForRouteReady } from "./lib/cdp.mjs";
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
  "/docs/reference/cli/",
  "/colophon/",
  "/kitchen-sink/",
];

const viewports = [
  { name: "desktop", width: 1280, height: 900, mobile: false, dpr: 1 },
  { name: "tablet", width: 768, height: 1024, mobile: false, dpr: 1 },
  { name: "mobile", width: 390, height: 844, mobile: true, dpr: 2 },
];

const controlSelector = [
  "a[href]",
  "button",
  "input",
  "summary",
  "[role='button']",
].join(",");

async function loadRoute(cdp, baseUrl, route, viewport) {
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
  await cdp.eval(`(() => {
    if (window.__contrastClickGuardInstalled) return;
    window.__contrastClickGuardInstalled = true;
    for (const eventName of ['click', 'auxclick']) {
      document.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
    }
  })()`);
}

async function collectNormalSamples(cdp) {
  return cdp.eval(contrastSampler("normal"));
}

async function collectInteractiveSamples(cdp, viewport) {
  const targetCount = await cdp.eval(`(() => {
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    window.__contrastTargets = [...document.querySelectorAll(${JSON.stringify(controlSelector)})]
      .filter(isVisible)
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.bottom >= 0 && rect.right >= 0 && rect.top <= innerHeight && rect.left <= innerWidth;
      })
      .slice(0, 24);
    return window.__contrastTargets.length;
  })()`);

  const samples = [];
  for (let index = 0; index < targetCount; index += 1) {
    const point = await cdp.eval(`(() => {
      const el = window.__contrastTargets?.[${index}];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        x: Math.max(1, Math.min(${viewport.width - 1}, rect.left + rect.width / 2)),
        y: Math.max(1, Math.min(${viewport.height - 1}, rect.top + rect.height / 2)),
      };
    })()`);
    if (!point) continue;

    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: point.x,
      y: point.y,
      button: "none",
    });
    await wait(40);
    samples.push(...(await cdp.eval(elementContrastSampler(index, "hover"))));

    await cdp.send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      x: point.x,
      y: point.y,
      button: "left",
      clickCount: 1,
    });
    await wait(40);
    samples.push(...(await cdp.eval(elementContrastSampler(index, "active"))));
    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x: 1,
      y: 1,
      button: "left",
      clickCount: 1,
    });
    await wait(20);
  }
  return samples;
}

function contrastSampler(state) {
  return `(() => {
    ${pageContrastFunctions()}
    const roots = [...document.querySelectorAll('header, main, footer')].filter(isVisible);
    const samples = [];
    for (const root of roots) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const text = cleanText(node.textContent);
          if (text.length < 2) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent || parent.closest('[aria-hidden="true"]')) return NodeFilter.FILTER_REJECT;
          if (!isVisible(parent)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let node;
      while ((node = walker.nextNode())) {
        samples.push(sampleElement(node.parentElement, ${JSON.stringify(state)}, cleanText(node.textContent)));
      }
    }
    return samples.filter(Boolean);
  })()`;
}

function elementContrastSampler(index, state) {
  return `(() => {
    ${pageContrastFunctions()}
    const el = window.__contrastTargets?.[${index}];
    if (!el || !isVisible(el)) return [];
    return [sampleElement(el, ${JSON.stringify(state)}, cleanText(el.textContent) || el.getAttribute('aria-label') || el.getAttribute('href') || el.tagName)].filter(Boolean);
  })()`;
}

function pageContrastFunctions() {
  return `
    const cleanText = (value) => (value || '').replace(/\\s+/g, ' ').trim();
    const isVisible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0;
    };
    const parseRgb = (value) => {
      if (!value || value === 'transparent') return null;
      const match = value.match(/rgba?\\(([^)]+)\\)/);
      if (!match) return null;
      const parts = match[1].split(/\\s*,\\s*|\\s+/).filter(Boolean);
      if (parts.length < 3) return null;
      const channel = (part) => {
        if (part.endsWith('%')) return Math.round(Number.parseFloat(part) * 2.55);
        return Number.parseFloat(part);
      };
      return {
        r: channel(parts[0]),
        g: channel(parts[1]),
        b: channel(parts[2]),
        a: parts[3] === undefined || parts[3] === '/' ? 1 : Number.parseFloat(parts[3]),
      };
    };
    const colorsFromImage = (value) => {
      if (!value || value === 'none') return [];
      return [...value.matchAll(/rgba?\\([^)]+\\)/g)]
        .map((match) => parseRgb(match[0]))
        .filter(Boolean);
    };
    const imageBackground = (value) => {
      const opaqueStops = colorsFromImage(value).filter((color) => color.a >= 0.92);
      if (!opaqueStops.length) return null;
      const stops = opaqueStops.slice(-2);
      return {
        r: stops.reduce((sum, color) => sum + color.r, 0) / stops.length,
        g: stops.reduce((sum, color) => sum + color.g, 0) / stops.length,
        b: stops.reduce((sum, color) => sum + color.b, 0) / stops.length,
        a: 1,
      };
    };
    const blend = (top, bottom) => {
      const alpha = Number.isFinite(top.a) ? top.a : 1;
      return {
        r: Math.round(top.r * alpha + bottom.r * (1 - alpha)),
        g: Math.round(top.g * alpha + bottom.g * (1 - alpha)),
        b: Math.round(top.b * alpha + bottom.b * (1 - alpha)),
        a: 1,
      };
    };
    const colorToString = (color) => \`rgb(\${Math.round(color.r)}, \${Math.round(color.g)}, \${Math.round(color.b)})\`;
    const backgroundsFor = (el) => {
      const stack = [];
      let node = el;
      while (node && node.nodeType === Node.ELEMENT_NODE) {
        stack.unshift(node);
        node = node.parentElement;
      }
      return stack;
    };
    const effectiveBackground = (el) => {
      let color = parseRgb(getComputedStyle(document.body).backgroundColor) || { r: 17, g: 14, b: 12, a: 1 };
      for (const node of backgroundsFor(el)) {
        const style = getComputedStyle(node);
        const next = imageBackground(style.backgroundImage) || parseRgb(style.backgroundColor);
        if (next && next.a > 0) color = blend(next, color);
      }
      return color;
    };
    const channel = (value) => {
      const normalized = value / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };
    const luminance = (color) =>
      0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
    const contrastRatio = (fg, bg) => {
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      const light = Math.max(l1, l2);
      const dark = Math.min(l1, l2);
      return (light + 0.05) / (dark + 0.05);
    };
    const selectorFor = (el) => {
      if (el.id) return \`#\${el.id}\`;
      const parts = [];
      let node = el;
      while (node && node.nodeType === Node.ELEMENT_NODE && parts.length < 4) {
        const name = node.tagName.toLowerCase();
        const classes = [...node.classList].slice(0, 2).map((item) => \`.\${item}\`).join('');
        parts.unshift(\`\${name}\${classes}\`);
        node = node.parentElement;
      }
      return parts.join(' > ');
    };
    const sampleElement = (el, state, overrideText) => {
      const style = getComputedStyle(el);
      const foreground = parseRgb(style.color);
      if (!foreground || foreground.a === 0) return null;
      const background = effectiveBackground(el);
      const blendedForeground = blend(foreground, background);
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = Number.parseFloat(style.fontWeight) || 400;
      const largeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const threshold = largeText ? 3 : 4.5;
      const ratio = contrastRatio(blendedForeground, background);
      return {
        state,
        text: cleanText(overrideText).slice(0, 90),
        selector: selectorFor(el),
        foreground: colorToString(blendedForeground),
        background: colorToString(background),
        ratio: Math.round(ratio * 100) / 100,
        threshold,
        fontSize: Math.round(fontSize * 10) / 10,
        fontWeight,
      };
    };
  `;
}

async function auditRoute(cdp, baseUrl, route, viewport) {
  await loadRoute(cdp, baseUrl, route, viewport);
  const samples = [
    ...(await collectNormalSamples(cdp)),
    ...(await collectInteractiveSamples(cdp, viewport)),
  ];
  const failures = samples
    .filter((sample) => sample.ratio < sample.threshold)
    .sort((a, b) => a.ratio - b.ratio)
    .slice(0, 10);
  return {
    route,
    viewport: viewport.name,
    sampleCount: samples.length,
    minRatio: samples.length
      ? Math.min(...samples.map((sample) => sample.ratio))
      : null,
    failures,
    exceptions: cdp.exceptions,
  };
}

assertDistBuilt("audit-contrast");
const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
});

let exitCode = 0;
try {
  const { cdp, close } = await openCdp(chrome);
  for (const route of routes) {
    for (const viewport of viewports) {
      const result = await auditRoute(cdp, baseUrl, route, viewport);
      const failures = [...result.failures];
      if (result.sampleCount === 0) failures.push({ reason: "no contrast samples" });
      if (result.exceptions.length) failures.push({ reason: `runtime exceptions ${result.exceptions.length}` });
      if (failures.length) {
        exitCode = 1;
        console.log(`FAIL contrast ${result.viewport} ${result.route} ${JSON.stringify({
          samples: result.sampleCount,
          minRatio: result.minRatio,
          failures,
        })}`);
      } else {
        console.log(`PASS contrast ${result.viewport} ${result.route} ${JSON.stringify({
          samples: result.sampleCount,
          minRatio: result.minRatio,
        })}`);
      }
    }
  }
  console.log(`[audit-contrast] routes=${routes.length} viewports=${viewports.length}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
