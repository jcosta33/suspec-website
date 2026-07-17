// Every custom property a stylesheet reads must be defined somewhere.
//
// CSS fails silently: `var(--nope)` makes the whole declaration invalid, the browser drops
// it, and the element renders with no fill, no colour, no gradient — and reports nothing.
// The rest of the audit suite cannot see this, because the markup, links, copy, contrast
// and axe tree all stay perfectly valid. Only the picture is wrong.
//
// The design tokens are Tailwind @theme-generated and carry a --color- prefix; the
// shorthands (--panel, --brass, --concrete-400) have never existed.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "app");

// Properties supplied by the browser, Next.js, or Tailwind's runtime rather than by a
// declaration in this repo.
const EXTERNAL = [/^--tw-/, /^--radix-/, /^--next-/, /^--font-/];

function walk(dir, test) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, test);
    return test(entry.name) ? [full] : [];
  });
}

const cssFiles = walk(APP, (n) => n.endsWith(".css"));
const srcFiles = walk(APP, (n) => /\.(tsx|ts)$/.test(n));

// Collect every property this repo defines: `--name:` at a declaration position in CSS
// (including inside @theme), plus inline style objects in TS/TSX.
const defined = new Set();
for (const file of cssFiles) {
  const css = fs.readFileSync(file, "utf8");
  for (const m of css.matchAll(/(?:^|[;{\s])(--[a-zA-Z0-9-]+)\s*:/g)) defined.add(m[1]);
}
for (const file of srcFiles) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/["'](--[a-zA-Z0-9-]+)["']\s*:/g)) defined.add(m[1]);
  for (const m of src.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) defined.add(m[1]);
}

const failures = [];
let reads = 0;

for (const file of cssFiles) {
  fs.readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const m of line.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)\s*(,|\))/g)) {
        reads += 1;
        const [, token, next] = m;
        if (next === ",") continue; // a fallback keeps the declaration valid
        if (EXTERNAL.some((rx) => rx.test(token))) continue;
        if (defined.has(token)) continue;
        failures.push({ file: path.relative(ROOT, file), line: index + 1, token, text: line.trim() });
      }
    });
}

for (const f of failures) {
  console.log(
    `FAIL token ${f.file}:${f.line} ${JSON.stringify({ undefinedToken: f.token, declaration: f.text })}`
  );
}

if (failures.length) {
  console.log(
    `[audit-tokens] ${failures.length} undefined reference(s) across ${reads} reads — the browser drops these declarations`
  );
  process.exit(1);
}

console.log(
  `PASS token-resolution ${JSON.stringify({ files: cssFiles.length, reads, defined: defined.size })}`
);
process.exit(0);
