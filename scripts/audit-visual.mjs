import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

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
  "/docs/reference/advanced-lifecycle/",
  "/colophon/",
  "/kitchen-sink/",
];

const viewports = [
  { name: "desktop", width: 1280, height: 900, mobile: false, dpr: 1 },
  { name: "tablet", width: 768, height: 1024, mobile: false, dpr: 1 },
  { name: "mobile", width: 390, height: 844, mobile: true, dpr: 2 },
];

const outputDir = path.join(process.cwd(), ".audit/visual");
const minBytes = 10_000;

function slug(route) {
  if (route === "/") return "home";
  return route.replace(/^\/|\/$/g, "").replaceAll("/", "__");
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16);
}

async function captureRoute(cdp, baseUrl, route, viewport) {
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

  const result = await cdp.send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 76,
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const buffer = Buffer.from(result.data, "base64");
  const file = `${viewport.name}-${slug(route)}.jpg`;
  fs.writeFileSync(path.join(outputDir, file), buffer);
  return {
    route,
    viewport: viewport.name,
    file,
    bytes: buffer.length,
    sha: sha256(buffer),
    exceptions: cdp.exceptions,
  };
}

assertDistBuilt("audit-visual");
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

const server = createStaticDistServer();
const port = await listen(server);
const baseUrl = `http://127.0.0.1:${port}`;
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
});

let exitCode = 0;
try {
  const { cdp, close } = await openCdp(chrome);
  const manifest = [];
  for (const route of routes) {
    for (const viewport of viewports) {
      const item = await captureRoute(cdp, baseUrl, route, viewport);
      manifest.push(item);
      const failures = [];
      if (item.bytes < minBytes) failures.push(`screenshot too small: ${item.bytes}`);
      if (item.exceptions.length) failures.push(`runtime exceptions: ${item.exceptions.length}`);
      if (failures.length) {
        exitCode = 1;
        console.log(`FAIL visual ${item.viewport} ${item.route} ${JSON.stringify({ ...item, failures })}`);
      } else {
        console.log(`PASS visual ${item.viewport} ${item.route} ${JSON.stringify({
          file: item.file,
          bytes: item.bytes,
          sha: item.sha,
        })}`);
      }
    }
  }
  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2)}\n`,
  );
  console.log(`[audit-visual] screenshots=${manifest.length} output=${outputDir}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
