// Single-sourcing: the docs site DERIVES from the canon at build time — no copy is committed here.
// Locally the canon is the sibling `swarm` repo; on Vercel it must be made available to the build
// (W3: a git submodule or a pre-build sync of swarm/docs — tracked as a deploy concern).
import fs from "node:fs";
import path from "node:path";

export const CANON = path.join(process.cwd(), "..", "swarm", "docs");

export function canonAvailable(): boolean {
  return fs.existsSync(CANON);
}

// Every .md under the canon, as a slug ('01-what-is-swarm', 'reference/checks', 'adrs/0091-...').
export function listDocs(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith(".md")) out.push(path.relative(CANON, full).replace(/\.md$/, ""));
    }
  };
  walk(CANON);
  return out.sort();
}

export function readDoc(slug: string): string | null {
  const file = path.join(CANON, slug + ".md");
  if (!fs.existsSync(file) || !path.resolve(file).startsWith(path.resolve(CANON))) return null;
  return fs.readFileSync(file, "utf8");
}

// Nav model derived from the canon structure.
export type NavSection = { title: string; items: { slug: string; label: string }[]; collapsed?: boolean };

const labelFor = (slug: string): string => {
  const base = slug.split("/").pop() ?? slug;
  return base.replace(/^\d+[-_]?/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export function buildNav(): NavSection[] {
  const docs = listDocs();
  const top = docs.filter((s) => /^\d\d-/.test(s));
  const tutorial = docs.filter((s) => s.startsWith("tutorial/"));
  const examples = docs.filter((s) => s.startsWith("examples/"));
  const reference = docs.filter((s) => s.startsWith("reference/"));
  const adrs = docs.filter((s) => s.startsWith("adrs/"));
  const sec = (title: string, slugs: string[], collapsed = false): NavSection => ({
    title,
    collapsed,
    items: slugs.map((slug) => ({ slug, label: labelFor(slug) })),
  });
  return [
    sec("Start here", top),
    sec("Tutorial", tutorial),
    sec("Examples", examples),
    sec("Reference", reference),
    sec("ADRs", adrs, true),
  ].filter((s) => s.items.length > 0);
}
