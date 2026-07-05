import fs from "node:fs";
import path from "node:path";

import { assertDistBuilt, distDir } from "./lib/static-dist-server.mjs";

const ROOT = process.cwd();

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

const allowedClientFiles = new Set([
  "app/components/ToggleButton.tsx",
  "app/docs/components/DocsCodeCopy.tsx",
  "app/docs/components/DocsNav.tsx",
  "app/docs/components/DocsToc.tsx",
  "app/docs/components/SearchBox.tsx",
]);

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function walkFiles(entry, predicate) {
  const absolute = path.join(ROOT, entry);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return predicate(absolute) ? [absolute] : [];
  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .flatMap((dirent) => walkFiles(path.join(entry, dirent.name), predicate));
}

function routeHtmlPath(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, route, "index.html");
}

function routeTextPath(route) {
  if (route === "/") return path.join(distDir, "index.txt");
  return path.join(distDir, route, "index.txt");
}

function isUseClient(source) {
  return /^["']use client["'];/.test(source.trimStart());
}

function normalizeText(source) {
  return source.replace(/\s+/g, " ").trim();
}

assertDistBuilt("audit-ssr");

const failures = [];
const nextConfig = read("next.config.ts");
if (!/output:\s*["']export["']/.test(nextConfig)) {
  failures.push('next.config.ts must keep output: "export"');
}
if (!/distDir:/.test(nextConfig) || !/dist/.test(nextConfig)) {
  failures.push("next.config.ts must keep production dist output");
}

const tsFiles = walkFiles(
  "app",
  (file) => /\.(tsx|ts)$/.test(file) && !/\.d\.ts$/.test(file),
);
const clientFiles = tsFiles
  .filter((file) => isUseClient(fs.readFileSync(file, "utf8")))
  .map(rel)
  .sort();
const unexpectedClients = clientFiles.filter((file) => !allowedClientFiles.has(file));
const missingClients = [...allowedClientFiles].filter((file) => !clientFiles.includes(file));
if (unexpectedClients.length) failures.push(`unexpected client files: ${unexpectedClients.join(", ")}`);
if (missingClients.length) failures.push(`missing expected client files: ${missingClients.join(", ")}`);

const pageClientFiles = clientFiles.filter((file) => /\/page\.tsx$|\/layout\.tsx$/.test(file));
if (pageClientFiles.length) failures.push(`page/layout files must stay server-side: ${pageClientFiles.join(", ")}`);

const missingHtml = routes.filter((route) => !fs.existsSync(routeHtmlPath(route)));
if (missingHtml.length) failures.push(`missing static html routes: ${missingHtml.join(", ")}`);

const thinText = [];
for (const route of routes) {
  const htmlPath = routeHtmlPath(route);
  const textPath = routeTextPath(route);
  if (!fs.existsSync(htmlPath) || !fs.existsSync(textPath)) continue;
  const html = fs.readFileSync(htmlPath, "utf8");
  const text = normalizeText(fs.readFileSync(textPath, "utf8"));
  if (!/<main\b/.test(html)) thinText.push(`${route} missing main in static html`);
  if (!/<h1\b/.test(html)) thinText.push(`${route} missing h1 in static html`);
  if (text.length < 300) thinText.push(`${route} static text too thin (${text.length})`);
}
if (thinText.length) failures.push(`static content failures: ${thinText.join("; ")}`);

const shellScript = path.join(ROOT, "public/shell-interactions.js");
const shellBytes = fs.statSync(shellScript).size;
if (shellBytes > 24_000) {
  failures.push(`shell-interactions.js too large: ${shellBytes} > 24000`);
}

const payload = {
  routes: routes.length,
  clientFiles,
  shellBytes,
};

if (failures.length) {
  console.log(`FAIL ssr-discipline ${JSON.stringify({ ...payload, failures })}`);
  process.exit(1);
}

console.log(`PASS ssr-discipline ${JSON.stringify(payload)}`);
