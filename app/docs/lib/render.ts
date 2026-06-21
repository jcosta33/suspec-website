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
import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Root as HastRoot } from "hast";

const REPO_ROOT = path.join(CANON, ".."); // the swarm repo root (docs/ lives under it)
const GH_BLOB = "https://github.com/jcosta33/swarm/blob/main/";
const repoHas = (repoRel: string): boolean => fs.existsSync(path.join(REPO_ROOT, repoRel));

// Rewrite an internal relative link to a site route, resolving relative to the current file's dir.
// - target under docs/ that exists -> /docs/<slug>  (a directory -> its README if present)
// - target that escapes docs/, or a dangling/unknown target -> the GitHub source URL (honest:
//   the file lives in the repo, just not in the docs site; a truly-dangling canon link 404s at
//   source too — surfaced, not papered over as a /docs route). [skeptic REVISE]
const rewriteMdLinks: Plugin<[string], Root> = (currentDir) => (tree) => {
  visit(tree, "link", (node) => {
    const u = node.url ?? "";
    if (/^(https?:|mailto:|#|\/)/.test(u)) return; // external / pure-anchor / already-absolute
    const hash = u.indexOf("#");
    const pathPart = hash >= 0 ? u.slice(0, hash) : u;
    const anchor = hash >= 0 ? u.slice(hash) : "";
    if (pathPart === "") return;
    // repo-relative target (docs/<currentDir>/<pathPart>, normalized)
    const repoTarget = path.posix.normalize(path.posix.join("docs", currentDir, pathPart));
    if (repoTarget.startsWith("docs/")) {
      const docsRel = repoTarget.slice("docs/".length);
      if (pathPart.endsWith(".md")) {
        node.url = repoHas(repoTarget)
          ? "/docs/" + docsRel.replace(/\.md$/, "") + anchor
          : GH_BLOB + repoTarget + anchor; // dangling canon link -> source (canon bug, off the site gate)
        return;
      }
      // directory / extensionless -> its README if present, else the source tree
      if (repoHas(repoTarget + "/README.md")) {
        node.url = "/docs/" + docsRel.replace(/\/$/, "") + "/README" + anchor;
      } else {
        node.url = GH_BLOB + repoTarget.replace(/\/$/, "") + anchor;
      }
      return;
    }
    // escapes docs/ (e.g. ../../checks/README.md, .agents/...) -> GitHub source
    node.url = GH_BLOB + repoTarget + anchor;
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

export async function renderDoc(markdown: string, currentDir: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rewriteMdLinks, currentDir)
    .use(selectiveRawHtml)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeLabelTaskCheckboxes)
    .use(rehypeFocusableScrollables)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

// First H1 as the page title (the canon's numbered/reference pages carry no frontmatter).
export function titleOf(markdown: string): string {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/`/g, "").trim() : "Swarm docs";
}

// First real prose paragraph as the meta description (brand-neutral — the doc's own content).
// Skips the H1, the italic "*Works today…*" subtitle, headings, quotes, tables, lists, code, HTML.
// Canon prose is hard-wrapped at ~95 cols, so a single physical line cuts mid-sentence — accumulate
// the whole first paragraph (until a blank line or a non-prose line), then trim to a word boundary.
export function descriptionOf(markdown: string): string {
  const isProse = (line: string): boolean =>
    line !== "" && !line.startsWith("#") && !/^[>|\-*+`<_]/.test(line);
  const parts: string[] = [];
  let started = false;
  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trim();
    if (!started) {
      if (!isProse(line)) continue; // skip the H1 / subtitle / front matter until prose begins
      started = true;
      parts.push(line);
    } else {
      if (!isProse(line)) break; // blank line or non-prose line ends the paragraph
      parts.push(line);
    }
  }
  const text = parts
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "Swarm documentation";
  if (text.length <= 155) return text;
  const slice = text.slice(0, 152);
  const cut = slice.lastIndexOf(" ");
  return `${(cut > 60 ? slice.slice(0, cut) : slice).trimEnd()}…`;
}
