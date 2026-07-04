import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const routes = ["/", "/docs/", "/mcp/"];

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

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".woff2", "font/woff2"],
]);

const gzipTypes = new Set([
  "application/json; charset=utf-8",
  "application/manifest+json; charset=utf-8",
  "image/svg+xml",
  "text/css; charset=utf-8",
  "text/html; charset=utf-8",
  "text/javascript; charset=utf-8",
  "text/plain; charset=utf-8",
]);

if (!fs.existsSync(path.join(distDir, "index.html"))) {
  console.error("[audit-performance] dist/ missing. Run `npm run build` first.");
  process.exit(1);
}

function serveFile(req, res) {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";

  const requested = path.normalize(path.join(distDir, pathname));
  if (!requested.startsWith(distDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  const file = fs.existsSync(requested)
    ? requested
    : path.join(distDir, pathname, "index.html");

  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const contentType = mimeTypes.get(path.extname(file)) ?? "application/octet-stream";
  const acceptsGzip = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  const shouldGzip = acceptsGzip && gzipTypes.has(contentType);
  res.writeHead(200, {
    "content-type": contentType,
    ...(shouldGzip ? { "content-encoding": "gzip" } : {}),
  });
  const stream = fs.createReadStream(file);
  if (shouldGzip) stream.pipe(zlib.createGzip()).pipe(res);
  else stream.pipe(res);
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

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

const server = http.createServer(serveFile);
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
});

let exitCode = 0;
try {
  for (const route of routes) {
    const result = await lighthouse(`${baseUrl}${route}`, {
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
  console.log(`[audit-performance] routes=${routes.length}`);
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
