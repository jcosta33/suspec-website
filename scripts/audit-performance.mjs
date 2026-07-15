import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import fs from "node:fs";
import path from "node:path";

import {
  assertDistBuilt,
  createStaticDistServer,
  distDir,
  listen,
} from "./lib/static-dist-server.mjs";

const routes = [
  "/",
  "/the-loop/",
  "/the-loop/intent/",
  "/get-started/",
  "/skills/",
  "/skills/disrespec/",
  "/skills/writing/",
  "/cli/",
  "/mcp/",
  "/docs/",
  "/docs/adrs/README/",
  "/colophon/",
];

const lighthouseTimeoutMs = Number(
  process.env.LIGHTHOUSE_ROUTE_TIMEOUT_MS || 120_000,
);
const chromeLaunchTimeoutMs = Number(
  process.env.CHROME_LAUNCH_TIMEOUT_MS || 45_000,
);

const limits = {
  performance: 85,
  fcpMs: 2500,
  lcpMs: 3500,
  cls: 0.03,
  tbtMs: 100,
  speedIndexMs: 2600,
  totalBytes: 650_000,
  scriptBytes: 260_000,
  cssBytes: 120_000,
  fontBytes: 120_000,
  fontCount: 5,
  requests: 70,
  renderBlocking: 6,
};

function sumTransfer(items, resourceType) {
  return items
    .filter((item) => item.resourceType === resourceType)
    .reduce((sum, item) => sum + (item.transferSize || 0), 0);
}

function pushIf(failures, condition, label) {
  if (condition) failures.push(label);
}

function roundMetric(value) {
  return Math.round(value * 100) / 100;
}

function summarize(lhr, route) {
  const audits = lhr.audits;
  const networkItems = audits["network-requests"].details.items;
  const renderBlocking =
    audits["render-blocking-resources"].details?.items?.length ?? 0;

  return {
    route,
    performance: Math.round(lhr.categories.performance.score * 100),
    fcpMs: roundMetric(audits["first-contentful-paint"].numericValue),
    lcpMs: roundMetric(audits["largest-contentful-paint"].numericValue),
    cls: roundMetric(audits["cumulative-layout-shift"].numericValue),
    tbtMs: roundMetric(audits["total-blocking-time"].numericValue),
    speedIndexMs: roundMetric(audits["speed-index"].numericValue),
    totalBytes: Math.round(audits["total-byte-weight"].numericValue),
    scriptBytes: sumTransfer(networkItems, "Script"),
    cssBytes: sumTransfer(networkItems, "Stylesheet"),
    fontBytes: sumTransfer(networkItems, "Font"),
    fontCount: networkItems.filter((item) => item.resourceType === "Font").length,
    requests: networkItems.length,
    renderBlocking,
    fontDisplayScore: audits["font-display"].score,
    nonCompositedAnimationScore: audits["non-composited-animations"].score,
  };
}

function failuresFor(summary) {
  const failures = [];
  pushIf(
    failures,
    summary.performance < limits.performance,
    `performance ${summary.performance} < ${limits.performance}`,
  );
  pushIf(failures, summary.fcpMs > limits.fcpMs, `FCP ${summary.fcpMs}ms`);
  pushIf(failures, summary.lcpMs > limits.lcpMs, `LCP ${summary.lcpMs}ms`);
  pushIf(failures, summary.cls > limits.cls, `CLS ${summary.cls}`);
  pushIf(failures, summary.tbtMs > limits.tbtMs, `TBT ${summary.tbtMs}ms`);
  pushIf(
    failures,
    summary.speedIndexMs > limits.speedIndexMs,
    `speed index ${summary.speedIndexMs}ms`,
  );
  pushIf(
    failures,
    summary.totalBytes > limits.totalBytes,
    `total bytes ${summary.totalBytes}`,
  );
  pushIf(
    failures,
    summary.scriptBytes > limits.scriptBytes,
    `script bytes ${summary.scriptBytes}`,
  );
  pushIf(failures, summary.cssBytes > limits.cssBytes, `CSS bytes ${summary.cssBytes}`);
  pushIf(
    failures,
    summary.fontBytes > limits.fontBytes,
    `font bytes ${summary.fontBytes}`,
  );
  pushIf(failures, summary.fontCount > limits.fontCount, `font count ${summary.fontCount}`);
  pushIf(failures, summary.requests > limits.requests, `requests ${summary.requests}`);
  pushIf(
    failures,
    summary.renderBlocking > limits.renderBlocking,
    `render-blocking resources ${summary.renderBlocking}`,
  );
  pushIf(
    failures,
    summary.fontDisplayScore !== 1,
    `font-display score ${summary.fontDisplayScore}`,
  );
  pushIf(
    failures,
    summary.nonCompositedAnimationScore !== 1,
    `non-composited animation score ${summary.nonCompositedAnimationScore}`,
  );
  return failures;
}

async function runLighthouse(url, options) {
  let timeout;
  try {
    return await Promise.race([
      lighthouse(url, options),
      new Promise((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error(`Lighthouse timed out after ${lighthouseTimeoutMs}ms`)),
          lighthouseTimeoutMs,
        );
      }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

async function launchChrome() {
  let timeout;
  try {
    return await Promise.race([
      chromeLauncher.launch({
        chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
        connectionPollInterval: 500,
        maxConnectionRetries: 60,
      }),
      new Promise((_, reject) => {
        timeout = setTimeout(() => {
          void chromeLauncher.killAll();
          reject(new Error(`Chrome launch timed out after ${chromeLaunchTimeoutMs}ms`));
        }, chromeLaunchTimeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

assertDistBuilt("audit-performance");
const staticHtml = [];
const collectHtml = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtml(absolute);
    else if (entry.name === "index.html") staticHtml.push(absolute);
  }
};
collectHtml(distDir);
const oversizedHtml = staticHtml
  .map((file) => ({ file: path.relative(distDir, file), bytes: fs.statSync(file).size }))
  .filter((item) => item.bytes > 1_000_000);
if (oversizedHtml.length) {
  console.log(`FAIL perf static-html ${JSON.stringify(oversizedHtml)}`);
  process.exit(1);
}
console.log(`PASS perf static-html ${JSON.stringify({ routes: staticHtml.length, maxBytes: Math.max(...staticHtml.map((file) => fs.statSync(file).size)) })}`);
let server;
let chrome;
let exitCode = 0;
try {
  chrome = await launchChrome();
  server = createStaticDistServer({ gzip: true });
  const port = await listen(server);
  const baseUrl = `http://127.0.0.1:${port}`;

  for (const route of routes) {
    let result;
    try {
      result = await runLighthouse(`${baseUrl}${route}`, {
        port: chrome.port,
        output: "json",
        onlyCategories: ["performance"],
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          disabled: false,
        },
        throttlingMethod: "simulate",
        quiet: true,
      });
    } catch (error) {
      exitCode = 1;
      console.log(`FAIL perf ${route} ${error.message}`);
      break;
    }
    const summary = summarize(result.lhr, route);
    const failures = failuresFor(summary);
    if (failures.length) {
      exitCode = 1;
      console.log(`FAIL perf ${route} ${JSON.stringify(summary)}`);
      for (const failure of failures) console.log(`  - ${failure}`);
    } else {
      console.log(`PASS perf ${route} ${JSON.stringify(summary)}`);
    }
  }
  console.log(`[audit-performance] lighthouseRoutes=${routes.length} staticRoutes=${staticHtml.length}`);
} catch (error) {
  exitCode = 1;
  console.log(`FAIL perf setup ${error.message}`);
} finally {
  if (chrome) await chrome.kill();
  if (server) await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
