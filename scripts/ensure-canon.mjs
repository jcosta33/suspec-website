// Ensure the pinned suspec/docs canon is available to the build (prebuild step).
// Builds use an exact commit, never a moving branch or an ambient sibling checkout.
// Local canon previews are explicit: set SUSPEC_CANON_DIR and, for working-tree changes,
// SUSPEC_ALLOW_DIRTY=1.
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync, execSync } from "node:child_process";
import path from "node:path";

const cwd = process.cwd();
const pinnedRef = "c851c00521d0fd31d2f7ec356a7d39da29210184";
const ref = process.env.SUSPEC_REF || pinnedRef;
const repo = process.env.SUSPEC_REPO || "https://github.com/jcosta33/suspec";
const explicitCanon = process.env.SUSPEC_CANON_DIR
  ? path.resolve(process.env.SUSPEC_CANON_DIR)
  : null;
const vendor = path.join(cwd, ".suspec-canon");
const vendorDocs = path.join(vendor, "docs");
const metaOut = path.join(cwd, ".suspec-canon-meta.json");

if (!/^[0-9a-f]{40}$/i.test(ref)) {
  throw new Error("SUSPEC_REF must be an exact 40-character commit SHA");
}

const git = (args, options = {}) =>
  execFileSync("git", args, { encoding: "utf8", ...options }).trim();

let repoRoot;
let dirtyPreview = false;
if (explicitCanon) {
  if (!existsSync(explicitCanon)) {
    throw new Error(`SUSPEC_CANON_DIR does not exist: ${explicitCanon}`);
  }
  const sourceRoot = path.dirname(explicitCanon);
  const sourceHead = git(["rev-parse", "HEAD"], { cwd: sourceRoot });
  if (sourceHead !== ref) {
    throw new Error(
      `SUSPEC_CANON_DIR is at ${sourceHead}; expected pinned commit ${ref}`,
    );
  }
  const dirtyDocs = git(["status", "--porcelain", "--", "docs"], {
    cwd: sourceRoot,
  });
  if (dirtyDocs && process.env.SUSPEC_ALLOW_DIRTY !== "1") {
    throw new Error(
      "SUSPEC_CANON_DIR has uncommitted docs; set SUSPEC_ALLOW_DIRTY=1 for an explicit local preview",
    );
  }
  dirtyPreview = Boolean(dirtyDocs);

  rmSync(vendor, { recursive: true, force: true });
  cpSync(sourceRoot, vendor, {
    recursive: true,
    filter: (src) =>
      ![".git", "node_modules", "dist", ".next"].includes(path.basename(src)),
  });
  console.log(
    `[ensure-canon] mirrored explicit canon ${sourceHead}${dirtyDocs ? " + local docs" : ""}`,
  );
  repoRoot = sourceRoot;
} else {
  let vendorHead = null;
  if (existsSync(path.join(vendor, ".git")) && existsSync(vendorDocs)) {
    vendorHead = git(["rev-parse", "HEAD"], { cwd: vendor });
  }
  if (vendorHead !== ref) {
    rmSync(vendor, { recursive: true, force: true });
    console.log(`[ensure-canon] cloning ${repo}@${ref} -> .suspec-canon`);
    execFileSync("git", ["clone", repo, vendor], { stdio: "inherit" });
    execFileSync("git", ["checkout", "--detach", ref], {
      cwd: vendor,
      stdio: "inherit",
    });
  } else {
    console.log(`[ensure-canon] using pinned canon ${ref}`);
  }
  repoRoot = vendor;
}

writeFileSync(metaOut, JSON.stringify({ revision: ref, dirtyPreview }));

// Precompute every doc's created/modified git author dates ONCE here (one `git log` pass) into a
// JSON the build reads — instead of spawning a `git log` per doc per worker during the parallel
// static-export phase (~127 subprocesses), which contended for the filesystem and contributed to
// intermittent build failures. Deterministic + fast. Falls back to an empty map if git is absent.
const datesOut = path.join(cwd, ".suspec-canon-dates.json");
try {
  const currentDocs = new Set(
    execSync("git ls-files 'docs/**/*.md' 'docs/*.md'", {
      cwd: repoRoot,
      encoding: "utf8",
    })
      .split("\n")
      .map((file) => file.trim())
      .filter(Boolean),
  );
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
    if (!currentDocs.has(f)) continue;
    const slug = f.slice("docs/".length, -".md".length);
    if (!dates[slug]) dates[slug] = { created: cur, modified: cur }; // first seen = newest = modified
    dates[slug].created = cur; // last seen = oldest = created
  }
  writeFileSync(datesOut, JSON.stringify(dates));
  console.log(
    `[ensure-canon] wrote ${Object.keys(dates).length} doc dates -> .suspec-canon-dates.json`,
  );
} catch (e) {
  writeFileSync(datesOut, "{}");
  console.warn(
    `[ensure-canon] could not compute doc dates (${e.message}); dates will fall back to build time`,
  );
}
