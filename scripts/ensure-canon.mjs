// Ensure the corpus/docs canon is available to the build (prebuild step).
// - local dev: use the sibling checkout ../corpus/docs (no-op).
// - CI / Vercel (no sibling): shallow-clone the canon into .corpus-canon/ (gitignored, ephemeral —
//   never committed, so single-sourcing holds). Pin a ref via CORPUS_REF for reproducible builds.
// Chosen over a git submodule: lower contributor friction (no submodule init/update), works the same
// locally and on Vercel, and CORPUS_REF gives the same pinning a submodule would.
import { existsSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const cwd = process.cwd();
const sibling = path.join(cwd, "..", "corpus", "docs");
const vendor = path.join(cwd, ".corpus-canon");
const vendorDocs = path.join(vendor, "docs");
const ref = process.env.CORPUS_REF || "main";
const repo = process.env.CORPUS_REPO || "https://github.com/jcosta33/corpus";

let repoRoot; // the git repo that contains docs/
if (existsSync(sibling)) {
  console.log("[ensure-canon] using the local sibling ../corpus/docs");
  repoRoot = path.join(cwd, "..", "corpus");
} else if (existsSync(vendorDocs)) {
  console.log("[ensure-canon] using the vendored .corpus-canon/docs");
  repoRoot = vendor;
} else {
  // Full clone (NOT --depth 1): per-file git dates need history (a shallow clone collapses every
  // file's date to the single HEAD commit). The canon is markdown-only, so cheap.
  console.log(
    `[ensure-canon] cloning ${repo}@${ref} -> .corpus-canon (full history for doc dates)`,
  );
  execSync(`git clone --branch ${ref} ${repo} ${vendor}`, { stdio: "inherit" });
  repoRoot = vendor;
}

// Precompute every doc's created/modified git author dates ONCE here (one `git log` pass) into a
// JSON the build reads — instead of spawning a `git log` per doc per worker during the parallel
// static-export phase (~127 subprocesses), which contended for the filesystem and contributed to
// intermittent build failures. Deterministic + fast. Falls back to an empty map if git is absent.
const datesOut = path.join(cwd, ".corpus-canon-dates.json");
try {
  const log = execSync("git log --format=%x01%aI --name-only -- docs", {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const dates = {};
  let cur = null;
  for (const raw of log.split("\n")) {
    if (raw.startsWith("\x01")) {
      cur = raw.slice(1).trim();
      continue;
    }
    const f = raw.trim();
    if (!cur || !f.startsWith("docs/") || !f.endsWith(".md")) continue;
    const slug = f.slice("docs/".length, -".md".length);
    if (!dates[slug]) dates[slug] = { created: cur, modified: cur }; // first seen = newest = modified
    dates[slug].created = cur; // last seen = oldest = created
  }
  writeFileSync(datesOut, JSON.stringify(dates));
  console.log(
    `[ensure-canon] wrote ${Object.keys(dates).length} doc dates -> .corpus-canon-dates.json`,
  );
} catch (e) {
  writeFileSync(datesOut, "{}");
  console.warn(
    `[ensure-canon] could not compute doc dates (${e.message}); dates will fall back to build time`,
  );
}
