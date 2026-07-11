// Postbuild: write dist/llms-full.txt — the user-tier canon (numbered 01-10 + tutorial + examples)
// concatenated into one markdown file for single-fetch ingestion by AI assistants. Single-sourced
// from the same canon the site renders (sibling suspec/docs in dev, the vendored clone on CI/Vercel).
import fs from "node:fs";
import path from "node:path";

const SIBLING_CANDIDATES = [
  process.env.SUSPEC_CANON_DIR
    ? path.resolve(process.env.SUSPEC_CANON_DIR)
    : null,
  path.join(process.cwd(), "..", "suspec", "docs"),
  path.join(process.cwd(), "..", "corpus", "docs"), // local checkout of the canon under its working name
].filter(Boolean);
const SIBLING = SIBLING_CANDIDATES.find((candidate) =>
  fs.existsSync(candidate),
);
const VENDOR = path.join(process.cwd(), ".suspec-canon", "docs");
const CANON = SIBLING ?? VENDOR;
const OUT = path.join(process.cwd(), "dist", "llms-full.txt");

if (!fs.existsSync(CANON)) {
  console.warn(
    "[gen-llms-full] canon not found — skipping (docs tree was empty at build)",
  );
  process.exit(0);
}

const dirDocs = (rel) => {
  const dir = path.join(CANON, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => `${rel}/${f}`);
};

const numbered = fs
  .readdirSync(CANON)
  .filter((f) => /^\d\d-.*\.md$/.test(f))
  .sort();
const order = [...numbered, ...dirDocs("tutorial"), ...dirDocs("examples")];

const header =
  `# Suspec - full documentation\n\n` +
  `> Suspec is a lightweight spec-and-review workflow for teams shipping code with AI coding agents. ` +
  `Plain markdown, any agent, no runtime. This file concatenates the user-facing documentation for ` +
  `full-context ingestion by AI assistants.\n\n` +
  `Site: https://suspecframework.dev/ - Canon: https://github.com/jcosta33/suspec\n\n---\n\n`;

const body = order
  .map(
    (rel) =>
      `<!-- ${rel} -->\n\n${fs
        .readFileSync(path.join(CANON, rel), "utf8")
        .trim()}\n`,
  )
  .join("\n\n---\n\n");

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header + body + "\n");
console.log(
  `[gen-llms-full] wrote dist/llms-full.txt — ${order.length} docs, ${header.length + body.length} bytes`,
);
