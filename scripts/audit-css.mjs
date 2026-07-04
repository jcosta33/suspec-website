import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CSS_ROOTS = ["app/globals.css", "app/styles", "app/docs"];
const LAYOUT_IMPORTS = ["app/layout.tsx", "app/docs/layout.tsx"];
const BUDGETS = {
  totalLines: 22_000,
  fileLines: 1_800,
  important: 500,
};

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function walkCss(entry) {
  const absolute = path.join(ROOT, entry);
  if (!fs.existsSync(absolute)) return [];
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return absolute.endsWith(".css") ? [absolute] : [];
  return fs
    .readdirSync(absolute, { withFileTypes: true })
    .flatMap((dirent) => walkCss(path.join(entry, dirent.name)));
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function cssImports(file) {
  const source = read(path.join(ROOT, file));
  return [...source.matchAll(/import\s+"([^"]+\.css)";/g)].map((match) => {
    const from = path.dirname(file);
    return rel(path.resolve(ROOT, from, match[1]));
  });
}

const files = CSS_ROOTS.flatMap(walkCss).sort((a, b) => rel(a).localeCompare(rel(b)));
const summaries = files.map((file) => {
  const source = read(file);
  const lines = source.split(/\r?\n/).length;
  const important = (source.match(/!important/g) ?? []).length;
  return { file: rel(file), lines, important };
});

const totalLines = summaries.reduce((sum, item) => sum + item.lines, 0);
const important = summaries.reduce((sum, item) => sum + item.important, 0);
const largest = [...summaries].sort((a, b) => b.lines - a.lines).slice(0, 8);
const mostImportant = [...summaries]
  .filter((item) => item.important > 0)
  .sort((a, b) => b.important - a.important)
  .slice(0, 8);

const imported = new Set(LAYOUT_IMPORTS.flatMap(cssImports));
const unimported = summaries
  .map((item) => item.file)
  .filter((file) => !imported.has(file) && file !== "app/docs/docs-responsive.css");

const layoutImports = cssImports("app/layout.tsx");
const failures = [];
if (totalLines > BUDGETS.totalLines) {
  failures.push(`css line budget exceeded: ${totalLines} > ${BUDGETS.totalLines}`);
}
for (const item of summaries) {
  if (item.lines > BUDGETS.fileLines) {
    failures.push(`${item.file} exceeds file line budget: ${item.lines} > ${BUDGETS.fileLines}`);
  }
}
if (important > BUDGETS.important) {
  failures.push(`!important budget exceeded: ${important} > ${BUDGETS.important}`);
}
if (fs.existsSync(path.join(ROOT, "app/art-direction-pass.css"))) {
  failures.push("stale app/art-direction-pass.css exists; art-direction files now live under app/styles/");
}
if (layoutImports.at(-1) !== "app/styles/reduced-motion.css") {
  failures.push("app/styles/reduced-motion.css must remain the final root layout CSS import");
}
if (unimported.length > 0) {
  failures.push(`unimported css files: ${unimported.join(", ")}`);
}

const payload = {
  files: summaries.length,
  totalLines,
  important,
  largest,
  mostImportant,
};

if (failures.length > 0) {
  console.log(`FAIL css-inventory ${JSON.stringify({ ...payload, failures })}`);
  process.exit(1);
}

console.log(`PASS css-inventory ${JSON.stringify(payload)}`);
