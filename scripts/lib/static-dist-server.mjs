import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
export const distDir = path.join(root, "dist");

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

export function assertDistBuilt(label) {
  if (!fs.existsSync(path.join(distDir, "index.html"))) {
    console.error(`[${label}] dist/ missing. Run \`npm run build\` first.`);
    process.exit(1);
  }
}

export function createStaticDistServer({ gzip = false } = {}) {
  return http.createServer((req, res) => serveFile(req, res, { gzip }));
}

export function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function serveFile(req, res, { gzip }) {
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

  const stat = statFile(file);
  if (!stat?.isFile()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const contentType = mimeTypes.get(path.extname(file)) ?? "application/octet-stream";
  const acceptsGzip = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  const shouldGzip = gzip && acceptsGzip && gzipTypes.has(contentType);
  res.writeHead(200, {
    "content-type": contentType,
    ...(shouldGzip ? { "content-encoding": "gzip" } : {}),
  });
  const stream = fs.createReadStream(file);
  stream.on("error", () => {
    if (res.headersSent) res.destroy();
    else {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  if (shouldGzip) stream.pipe(zlib.createGzip()).pipe(res);
  else stream.pipe(res);
}

function statFile(file) {
  try {
    return fs.statSync(file);
  } catch {
    return null;
  }
}
