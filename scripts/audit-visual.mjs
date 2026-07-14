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

const skillRoutes = [
  "/skills/bulletproof/",
  "/skills/demolition/",
  "/skills/disrespec/",
  "/skills/dissect/",
  "/skills/fork-me/",
  "/skills/promote/",
  "/skills/remember/",
  "/skills/revolver/",
  "/skills/sus-audit/",
  "/skills/sus-change-plan/",
  "/skills/sus-inventory/",
  "/skills/sus-research/",
  "/skills/sus-review/",
  "/skills/sus-spec/",
  "/skills/sus-task/",
  "/skills/triple-check/",
];

const defaultRoutes = [
  "/",
  "/the-loop/",
  "/the-loop/intent/",
  "/the-loop/spec/",
  "/the-loop/implement/",
  "/the-loop/review/",
  "/the-loop/check/",
  "/the-loop/findings/",
  "/get-started/",
  "/skills/",
  "/skills/writing/",
  ...skillRoutes,
  "/cli/",
  "/mcp/",
  "/docs/",
  "/docs/01-what-is-suspec/",
  "/docs/tutorial/01-pull-and-spec/",
  "/docs/reference/cli/",
  "/colophon/",
  "/kitchen-sink/",
];

const requestedRoutes = process.env.AUDIT_ROUTES
  ?.split(",")
  .map((route) => route.trim())
  .filter(Boolean);
const routes = requestedRoutes?.length ? requestedRoutes : defaultRoutes;

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
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await cdp.send("Page.navigate", { url: `${baseUrl}${route}` });
  await waitForRouteReady(cdp, new URL(route, baseUrl).pathname);
  await wait(route.startsWith("/docs") ? 1800 : 1000);
  await cdp.eval("window.scrollTo(0, 0)");
  await wait(120);

  const result = await cdp.send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 76,
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const buffer = Buffer.from(result.data, "base64");
  const file = `${viewport.name}-${slug(route)}.jpg`;
  fs.writeFileSync(path.join(outputDir, file), buffer);

  let fullPage;
  if (viewport.name === "desktop") {
    const { contentSize } = await cdp.send("Page.getLayoutMetrics");
    const fullResult = await cdp.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 72,
      fromSurface: true,
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width: Math.ceil(contentSize.width),
        height: Math.ceil(contentSize.height),
        scale: 1,
      },
    });
    const fullBuffer = Buffer.from(fullResult.data, "base64");
    const fullFile = `desktop-full-${slug(route)}.jpg`;
    fs.writeFileSync(path.join(outputDir, fullFile), fullBuffer);
    fullPage = {
      file: fullFile,
      bytes: fullBuffer.length,
      sha: sha256(fullBuffer),
      height: Math.ceil(contentSize.height),
    };
  }

  return {
    route,
    viewport: viewport.name,
    file,
    bytes: buffer.length,
    sha: sha256(buffer),
    fullPage,
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
      if (item.fullPage && item.fullPage.bytes < minBytes) {
        failures.push(`full-page screenshot too small: ${item.fullPage.bytes}`);
      }
      if (item.exceptions.length) failures.push(`runtime exceptions: ${item.exceptions.length}`);
      if (failures.length) {
        exitCode = 1;
        console.log(`FAIL visual ${item.viewport} ${item.route} ${JSON.stringify({ ...item, failures })}`);
      } else {
        console.log(`PASS visual ${item.viewport} ${item.route} ${JSON.stringify({
          file: item.file,
          bytes: item.bytes,
          sha: item.sha,
          fullPage: item.fullPage,
        })}`);
      }
    }
  }
  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2)}\n`,
  );
  const screenshotCount = manifest.length + manifest.filter((item) => item.fullPage).length;
  console.log(`[audit-visual] screenshots=${screenshotCount} output=${outputDir}`);
  await close();
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

process.exit(exitCode);
