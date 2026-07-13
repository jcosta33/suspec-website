import fs from "node:fs";
import path from "node:path";

import { assertDistBuilt, distDir } from "./lib/static-dist-server.mjs";

const SITE_ORIGIN = "https://suspecframework.dev";
const HTML_ATTR_RE = /\b(?:href|src|poster|action)=["']([^"']+)["']/gi;
const SRCSET_RE = /\bsrcset=["']([^"']+)["']/gi;
const SITE_URL_RE = /https:\/\/suspecframework\.dev\/[^\s"'<>\\)]+/g;
const ID_RE = /\b(?:id|name)=["']([^"']+)["']/gi;

const mainDocsLinkRoutes = [
  "/",
  "/what-is-suspec/",
  "/the-loop/",
  "/get-started/",
  "/skills/",
  "/skills/writing/",
  "/cli/",
  "/mcp/",
  "/colophon/",
];

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) => {
      const absolute = path.join(dir, dirent.name);
      if (dirent.isDirectory()) return walk(absolute);
      return [absolute];
    });
}

function slash(value) {
  return value.replaceAll(path.sep, "/");
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function routeForHtml(file) {
  const relative = slash(path.relative(distDir, file));
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function existingTarget(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded.startsWith("/") ? decoded.slice(1) : decoded;
  const exact = path.join(distDir, relative);
  const candidates = [
    exact,
    path.join(exact, "index.html"),
    pathname.endsWith("/") ? path.join(distDir, relative, "index.html") : null,
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

function isHtmlTarget(file) {
  return Boolean(file && (file.endsWith(".html") || path.basename(file) === "index.html"));
}

function refsFrom(html, route, source) {
  const refs = [];
  for (const match of html.matchAll(HTML_ATTR_RE)) {
    refs.push({ source, route, raw: decodeHtml(match[1]) });
  }
  for (const match of html.matchAll(SRCSET_RE)) {
    for (const candidate of decodeHtml(match[1]).split(",")) {
      const raw = candidate.trim().split(/\s+/)[0];
      if (raw) refs.push({ source, route, raw });
    }
  }
  for (const match of html.matchAll(SITE_URL_RE)) {
    refs.push({ source, route, raw: decodeHtml(match[0]) });
  }
  return refs;
}

function mainHtml(html) {
  const mainStart = html.match(/<main\b[^>]*>/i);
  if (mainStart?.index == null) return "";
  const start = mainStart.index + mainStart[0].length;
  const end = html.indexOf("</main>", start);
  return html.slice(start, end === -1 ? undefined : end);
}

function idsFor(html) {
  return new Set([...html.matchAll(ID_RE)].map((match) => decodeHtml(match[1])));
}

function shouldSkip(raw) {
  return (
    !raw ||
    raw.startsWith("data:") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:") ||
    raw.startsWith("javascript:") ||
    raw.startsWith("blob:") ||
    raw === "#"
  );
}

function auditRef(ref, htmlByPath) {
  if (shouldSkip(ref.raw)) return [];
  let url;
  try {
    url = new URL(ref.raw, `${SITE_ORIGIN}${ref.route}`);
  } catch {
    return [`${ref.source} invalid URL ${ref.raw}`];
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return [];
  if (url.origin !== SITE_ORIGIN) return [];

  const target = existingTarget(url.pathname);
  if (!target) return [`${ref.source} missing local target ${url.pathname}`];
  if (!url.hash) return [];
  if (!isHtmlTarget(target)) return [];

  const hash = decodeURIComponent(url.hash.slice(1));
  if (!hash) return [];
  const targetHtml = htmlByPath.get(target) ?? fs.readFileSync(target, "utf8");
  const ids = idsFor(targetHtml);
  return ids.has(hash) ? [] : [`${ref.source} missing anchor ${url.pathname}#${hash}`];
}

assertDistBuilt("audit-links");

const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const htmlByPath = new Map(htmlFiles.map((file) => [file, fs.readFileSync(file, "utf8")]));
const failures = [];
let refCount = 0;
let mainDocsLinkCount = 0;

for (const file of htmlFiles) {
  const html = htmlByPath.get(file);
  const route = routeForHtml(file);
  const relative = slash(path.relative(distDir, file));
  const refs = refsFrom(html, route, relative);
  refCount += refs.length;
  for (const ref of refs) failures.push(...auditRef(ref, htmlByPath));

  if (mainDocsLinkRoutes.includes(route)) {
    const mainRefs = refsFrom(mainHtml(html), route, relative);
    const docsLinks = mainRefs.filter((ref) => {
      if (shouldSkip(ref.raw)) return false;
      const url = new URL(ref.raw, `${SITE_ORIGIN}${route}`);
      return url.origin === SITE_ORIGIN && url.pathname.startsWith("/docs/");
    });
    mainDocsLinkCount += docsLinks.length;
    if (docsLinks.length === 0) failures.push(`${relative} has no main-content docs link`);
  }
}

const uniqueFailures = [...new Set(failures)].sort();
const payload = {
  htmlFiles: htmlFiles.length,
  refs: refCount,
  mainDocsLinkRoutes: mainDocsLinkRoutes.length,
  mainDocsLinks: mainDocsLinkCount,
};

if (uniqueFailures.length) {
  console.log(`FAIL link-integrity ${JSON.stringify({ ...payload, failures: uniqueFailures.slice(0, 40) })}`);
  process.exit(1);
}

console.log(`PASS link-integrity ${JSON.stringify(payload)}`);
