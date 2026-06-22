// The W1-proven design-B markdown pipeline (GFM, not MDX), as a build-time renderer.
// - rewrite .md links -> /docs routes (resolve ../, preserve #anchor)
// - selective raw HTML: keep <a> anchors, drop HTML comments, turn every other bare <token> literal
// - rehype-slug for github-slugger-aligned heading ids (W1: byte-identical to GitHub's anchors)
import fs from "node:fs";
import path from "node:path";
import { unified, type Plugin } from "unified";
import { CANON } from "./canon";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit, SKIP } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import type { Root } from "mdast";
import type { Root as HastRoot, Element as HastElement, ElementContent } from "hast";

export type DocHeading = { depth: 2 | 3; id: string; text: string };

const REPO_ROOT = path.join(CANON, ".."); // the swarm repo root (docs/ lives under it)
const GH_BLOB = "https://github.com/jcosta33/swarm/blob/main/";
const repoHas = (repoRel: string): boolean => fs.existsSync(path.join(REPO_ROOT, repoRel));

// Concatenated text of an mdast node (to unwrap a dead link to plain text).
const mdastText = (n: { type?: string; value?: string; children?: unknown[] }): string =>
  n.type === "text"
    ? (n.value ?? "")
    : (n.children ?? []).map((c) => mdastText(c as typeof n)).join("");

// Rewrite an internal relative link to a site route, resolving relative to the current file's dir.
// - target under docs/ that exists -> /docs/<slug>  (a directory -> its README if present)
// - target that exists in the repo but not on the docs site -> the GitHub source URL
// - a target that exists NOWHERE (canon link-rot — a removed file) -> unwrap to plain text, so a
//   reader never clicks a styled link into a GitHub 404. (Upstream fix is in the canon.)
const rewriteMdLinks: Plugin<[string], Root> = (currentDir) => (tree) => {
  visit(tree, "link", (node, index, parent) => {
    const u = node.url ?? "";
    if (/^(https?:|mailto:|#|\/)/.test(u)) return; // external / pure-anchor / already-absolute
    const hash = u.indexOf("#");
    const pathPart = hash >= 0 ? u.slice(0, hash) : u;
    const anchor = hash >= 0 ? u.slice(hash) : "";
    if (pathPart === "") return;
    const unwrap = () => {
      if (index !== undefined && parent) {
        parent.children[index] = { type: "text", value: mdastText(node) };
      }
    };
    // repo-relative target (docs/<currentDir>/<pathPart>, normalized)
    const repoTarget = path.posix.normalize(path.posix.join("docs", currentDir, pathPart));
    if (repoTarget.startsWith("docs/")) {
      const docsRel = repoTarget.slice("docs/".length);
      if (pathPart.endsWith(".md")) {
        if (repoHas(repoTarget)) node.url = "/docs/" + docsRel.replace(/\.md$/, "") + anchor;
        else unwrap(); // dangling canon link -> plain text (was a GitHub 404)
        return;
      }
      // directory / extensionless -> its README if present, else the source tree (if it exists)
      if (repoHas(repoTarget + "/README.md")) {
        node.url = "/docs/" + docsRel.replace(/\/$/, "") + "/README" + anchor;
      } else if (repoHas(repoTarget)) {
        node.url = GH_BLOB + repoTarget.replace(/\/$/, "") + anchor;
      } else {
        unwrap();
      }
      return;
    }
    // escapes docs/ (e.g. ../../checks/README.md, .agents/...) -> GitHub source if it exists, else text
    if (repoHas(repoTarget)) node.url = GH_BLOB + repoTarget + anchor;
    else unwrap();
  });
};

const selectiveRawHtml: Plugin<[], Root> = () => (tree) => {
  visit(tree, "html", (node, index, parent) => {
    if (index === undefined || parent === undefined) return;
    const v = node.value.trim();
    if (v.startsWith("<!--")) {
      parent.children[index] = { type: "text", value: "" }; // drop HTML comments
      return;
    }
    if (/^<\/?a(\s|>)/i.test(v)) return; // keep <a> anchors (the 94 sources.md ids)
    parent.children[index] = { type: "text", value: node.value }; // bare <token> -> literal text
  });
};

// Make bare academic references in prose clickable: `arXiv:<id>` -> arxiv.org/abs, `DOI <id>` ->
// doi.org. The click target is *derived* from a canonical resolver, never stored — the canon stays
// plain text (a reader of the raw markdown sees the id; a reader of the site gets a verifiable link).
// Runs on mdast `text` nodes only, so it never enters code, existing links, or the raw `<a id>`
// cross-ref anchors (those are `html` nodes). This is what lets a sources entry that names only an
// arXiv id or a DOI still expose a one-click path to the primary source.
type MdNode =
  | { type: "text"; value: string }
  | { type: "link"; url: string; title: null; children: { type: "text"; value: string }[] };
const linkifyCitation = (value: string): MdNode[] => {
  const re = /arXiv:(\d{4}\.\d{4,5}(?:v\d+)?)|\bDOI:?\s+(10\.\d{4,9}\/\S+)/g;
  const out: MdNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    if (m.index > last) out.push({ type: "text", value: value.slice(last, m.index) });
    if (m[1] !== undefined) {
      out.push({
        type: "link",
        url: `https://arxiv.org/abs/${m[1]}`,
        title: null,
        children: [{ type: "text", value: m[0] }],
      });
      last = re.lastIndex;
    } else {
      // DOIs end at whitespace; \S+ over-captures trailing sentence + markdown punctuation —
      // trim it and re-scan from the trimmed boundary so it re-emits as plain text. (Internal dots
      // are kept; only a trailing run of these is stripped.)
      const trimmed = m[2].replace(/[.,;:)\]*_>]+$/, "");
      const label = m[0].slice(0, m[0].length - (m[2].length - trimmed.length));
      out.push({
        type: "link",
        url: `https://doi.org/${trimmed}`,
        title: null,
        children: [{ type: "text", value: label }],
      });
      last = m.index + label.length;
      re.lastIndex = last;
    }
  }
  if (last < value.length) out.push({ type: "text", value: value.slice(last) });
  return out;
};
const remarkLinkifyCitations: Plugin<[], Root> = () => (tree) => {
  // visitParents (not visit) so the guard checks the WHOLE ancestor chain, not just the immediate
  // parent — a citation inside emphasis/strong that itself sits in a link would otherwise nest <a>.
  visitParents(tree, "text", (node, ancestors) => {
    if (ancestors.some((a) => a.type === "link" || a.type === "linkReference")) return;
    if (!/arXiv:\d|DOI:?\s+10\./.test(node.value)) return;
    const parts = linkifyCitation(node.value);
    if (parts.length === 1) return; // no citation matched
    const parent = ancestors[ancestors.length - 1];
    if (!parent || !("children" in parent)) return;
    const index = parent.children.indexOf(node as never);
    if (index === -1) return;
    parent.children.splice(index, 1, ...(parts as unknown as typeof parent.children));
    return [SKIP, index + parts.length];
  });
};

// External links open in a new tab; rel="noopener noreferrer" blocks reverse-tabnabbing and
// referrer leakage. Applies to every http(s) anchor — inline citations and the sources page alike.
const rehypeExternalLinks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "a") return;
    const href = typeof node.properties?.href === "string" ? node.properties.href : "";
    if (!/^https?:\/\//i.test(href)) return;
    node.properties = node.properties ?? {};
    node.properties.target = "_blank";
    node.properties.rel = ["noopener", "noreferrer"];
  });
};

// GFM task-list items (`- [ ]` / `- [x]`) render as disabled <input type=checkbox> with no label,
// which axe flags. Give each an aria-label reflecting its state (a11y; the checkbox is decorative,
// the list text carries the content).
const rehypeLabelTaskCheckboxes: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "input" || node.properties?.type !== "checkbox") return;
    node.properties.ariaLabel = node.properties.checked ? "completed" : "to do";
  });
};

// Wide code blocks and tables scroll horizontally inside their own overflow-x:auto boxes (docs.css).
// A scrollable region that isn't keyboard-focusable can't be scrolled without a mouse (axe
// `scrollable-region-focusable`). Make every <pre>/<table> a tab stop so keyboard users reach it.
const rehypeFocusableScrollables: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "pre" && node.tagName !== "table") return;
    node.properties = node.properties ?? {};
    node.properties.tabIndex = 0;
  });
};

// Plain-text content of a hast element (heading labels for the on-this-page TOC).
const hastText = (nodes: ElementContent[]): string =>
  nodes
    .map((n) => (n.type === "text" ? n.value : "children" in n ? hastText(n.children) : ""))
    .join("");

// Collect h2/h3 with their (rehype-slug-assigned) ids — must run AFTER rehypeSlug so ids exist.
const rehypeCollectHeadings =
  (out: DocHeading[]): Plugin<[], HastRoot> =>
  () =>
  (tree) => {
    visit(tree, "element", (node: HastElement) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = typeof node.properties?.id === "string" ? node.properties.id : "";
      if (!id) return;
      const text = hastText(node.children).trim();
      if (text) out.push({ depth: node.tagName === "h2" ? 2 : 3, id, text });
    });
  };

export async function renderDoc(
  markdown: string,
  currentDir: string
): Promise<{ html: string; headings: DocHeading[] }> {
  const headings: DocHeading[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rewriteMdLinks, currentDir)
    .use(remarkLinkifyCitations)
    .use(selectiveRawHtml)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeExternalLinks)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings(headings))
    .use(rehypeLabelTaskCheckboxes)
    .use(rehypeFocusableScrollables)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return { html: String(file), headings };
}

// First H1 as the page title (the canon's numbered/reference pages carry no frontmatter).
// Strip inline-code ticks AND any heading markers they wrapped (e.g. an H1 containing `## Open
// decisions` must not leak "## Open decisions" into <title>/og/JSON-LD).
export function titleOf(markdown: string): string {
  const m = markdown.match(/^#\s+(.+)$/m);
  if (!m) return "Swarm docs";
  return m[1]
    .replace(/`/g, "")
    .replace(/(^|\s)#{1,6}\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

// First real prose paragraph as the meta description (brand-neutral — the doc's own content).
// Skips the H1, the italic "*Works today…*" subtitle, headings, quotes, tables, lists, code, HTML.
// Canon prose is hard-wrapped at ~95 cols, so a single physical line cuts mid-sentence — accumulate
// the whole first paragraph (until a blank line or a non-prose line), then trim to a word boundary.
// ADRs open with "## Status" + a one-word value ("Accepted") — skip that section so the description
// is the Context body, not the bare status word.
const SKIP_SECTIONS = new Set(["status"]);
export function descriptionOf(markdown: string): string {
  // Strip a leading YAML frontmatter block (--- … ---) so its keys (type/id/status/…) aren't read
  // as prose — the newer ADRs carry frontmatter; without this the description becomes "type: adr …".
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const isHeading = (line: string): boolean => line.startsWith("#");
  const isProse = (line: string): boolean =>
    line !== "" && !isHeading(line) && !/^[>|\-*+`<_]/.test(line);
  const clean = (s: string): string =>
    s
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
      .replace(/[`*_]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // Collect each prose paragraph with the section heading it sits under. Fenced code blocks are
  // skipped wholesale — their content isn't prose and must never become the description.
  const paragraphs: { heading: string; text: string }[] = [];
  let current: string[] = [];
  let lastHeading = "";
  let inCode = false;
  const flush = () => {
    if (current.length) paragraphs.push({ heading: lastHeading, text: clean(current.join(" ")) });
    current = [];
  };
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();
    if (line.startsWith("```") || line.startsWith("~~~")) {
      flush();
      inCode = !inCode;
    } else if (inCode) {
      continue; // inside a fenced code block
    } else if (isHeading(line)) {
      flush();
      lastHeading = line.replace(/^#+\s*/, "").replace(/[`*_]/g, "").trim().toLowerCase();
    } else if (isProse(line)) {
      current.push(line);
    } else {
      flush(); // blank or non-prose (table/list) ends the current paragraph
    }
  }
  flush();

  // Skip skipped-section bodies (ADR "Status"); prefer the first substantial paragraph — not a short
  // colon lead-in like "Three pieces, three homes:" that precedes a table.
  const candidates = paragraphs.filter((p) => p.text && !SKIP_SECTIONS.has(p.heading));
  const chosen =
    candidates.find((p) => p.text.length >= 40 && !p.text.endsWith(":")) ?? candidates[0];
  const text = chosen?.text ?? "";
  if (!text) return "Swarm documentation";
  if (text.length <= 155) return text;
  const slice = text.slice(0, 152);
  const cut = slice.lastIndexOf(" ");
  return `${(cut > 60 ? slice.slice(0, cut) : slice).trimEnd()}…`;
}
