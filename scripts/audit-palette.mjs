import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "app");

const rawHexAllowed = new Set([
  "app/apple-icon.tsx",
  "app/icon.tsx",
  "app/layout.tsx",
  "app/manifest.ts",
  "app/components/HeroHexGrid.tsx",
  "app/components/Logo.tsx",
  "app/components/signalStyles.ts",
  "app/styles/artifact-chassis-crt.css",
  "app/styles/base-runtime.css",
  "app/styles/home-core-hero-preview-field-grid.css",
  "app/styles/home-core-hero-preview-field-seal.css",
  "app/styles/motion-surfaces-pointer-plane-overlays.css",
  "app/styles/paper-artifact-surface.css",
  "app/styles/sections-register-rail.css",
  "app/styles/site-surfaces-actions-primary.css",
  "app/styles/surface-panel-states.css",
  "app/styles/theme-aliases.css",
  "app/styles/theme-palette.css",
]);

const packageAccentAllowed = [
  /^app\/(?:agents|cli|mcp|skills)\/page\.tsx$/,
  /^app\/styles\/base-runtime\.css$/,
  /^app\/styles\/mcp-/,
  /^app\/styles\/mobile-mcp-/,
  /^app\/styles\/repo-product-manifest-packages\.css$/,
  /^app\/styles\/route-heroes-.*\.css$/,
  /^app\/styles\/skills-/,
  /^app\/styles\/theme-palette\.css$/,
  /^app\/styles\/theme-signals\.css$/,
];

const requiredPackageMappings = {
  skills: "var(--signal-evidence)",
  agents: "var(--signal-reference)",
  cli: "var(--color-interface-blue)",
  mcp: "var(--color-neon-bridge)",
};

const requiredPackageRgbMappings = {
  skills: "var(--signal-evidence-rgb)",
  agents: "var(--signal-reference-rgb)",
  cli: "127, 166, 217",
  mcp: "154, 131, 155",
};

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const absolute = path.join(dir, dirent.name);
    if (dirent.isDirectory()) return walk(absolute);
    return /\.(?:css|ts|tsx)$/.test(dirent.name) ? [absolute] : [];
  });
}

function lineFor(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function allowedBy(patterns, file) {
  return patterns.some((pattern) => pattern.test(file));
}

const files = walk(APP_ROOT).map(rel).sort((a, b) => a.localeCompare(b));
const failures = [];
const rawHexHits = [];
const packageAccentHits = [];
const namedHueHits = [];
const complementHits = [];

const rawHexPattern =
  /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])/g;
const namedHueUtilityPattern =
  /\b(?:text|bg|border|from|via|to|ring|outline|decoration)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|zinc|neutral|stone)-\d{2,3}\b/g;
const packageAccentPattern =
  /(?:--package-(?:skills|agents|cli|mcp)(?:-rgb)?|var\(--package-(?:skills|agents|cli|mcp)(?:-rgb)?\)|page-hero-package-(?:skills|agents|cli|mcp)|--color-(?:interface-blue|neon-bridge)|var\(--color-(?:interface-blue|neon-bridge)\))/g;
const complementPattern = /(?:--color-complement|var\(--color-complement\))/g;

for (const file of files) {
  const source = read(file);

  for (const match of source.matchAll(rawHexPattern)) {
    if (!rawHexAllowed.has(file)) {
      rawHexHits.push(`${file}:${lineFor(source, match.index ?? 0)} ${match[0]}`);
    }
  }

  for (const match of source.matchAll(namedHueUtilityPattern)) {
    namedHueHits.push(`${file}:${lineFor(source, match.index ?? 0)} ${match[0]}`);
  }

  for (const match of source.matchAll(packageAccentPattern)) {
    if (!allowedBy(packageAccentAllowed, file)) {
      packageAccentHits.push(`${file}:${lineFor(source, match.index ?? 0)} ${match[0]}`);
    }
  }

  if (file !== "app/styles/theme-palette.css") {
    for (const match of source.matchAll(complementPattern)) {
      complementHits.push(`${file}:${lineFor(source, match.index ?? 0)} ${match[0]}`);
    }
  }
}

if (rawHexHits.length > 0) {
  failures.push(`raw hex outside palette/icon allowlist: ${rawHexHits.slice(0, 12).join(", ")}`);
}
if (namedHueHits.length > 0) {
  failures.push(`Tailwind named hue utilities bypass signal roles: ${namedHueHits.slice(0, 12).join(", ")}`);
}
if (packageAccentHits.length > 0) {
  failures.push(`package accent used outside package identity scope: ${packageAccentHits.slice(0, 12).join(", ")}`);
}
if (complementHits.length > 0) {
  failures.push(`exact complement token is diagnostics-only: ${complementHits.slice(0, 12).join(", ")}`);
}

const themeSignals = read("app/styles/theme-signals.css");
for (const [packageName, value] of Object.entries(requiredPackageMappings)) {
  const pattern = new RegExp(`--package-${packageName}:\\s*${value.replace(/[()]/g, "\\$&")};`);
  if (!pattern.test(themeSignals)) {
    failures.push(`--package-${packageName} must map to ${value}`);
  }
}
for (const [packageName, value] of Object.entries(requiredPackageRgbMappings)) {
  const pattern = new RegExp(`--package-${packageName}-rgb:\\s*${value.replace(/[()]/g, "\\$&")};`);
  if (!pattern.test(themeSignals)) {
    failures.push(`--package-${packageName}-rgb must map to ${value}`);
  }
}

const payload = {
  files: files.length,
  rawHexAllowlist: rawHexAllowed.size,
  packageAccentAllowedScopes: packageAccentAllowed.length,
};

if (failures.length > 0) {
  console.log(`FAIL palette-discipline ${JSON.stringify({ ...payload, failures })}`);
  process.exit(1);
}

console.log(`PASS palette-discipline ${JSON.stringify(payload)}`);
