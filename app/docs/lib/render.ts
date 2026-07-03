// The W1-proven design-B markdown pipeline (GFM, not MDX), as a build-time renderer.
// - rewrite .md links -> /docs routes (resolve ../, preserve #anchor)
// - selective raw HTML: keep <a> anchors, drop HTML comments, turn every other bare <token> literal
// - rehype-slug for github-slugger-aligned heading ids (W1: byte-identical to GitHub's anchors)
import fs from "node:fs";
import path from "node:path";
import { unified, type Plugin } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit, SKIP } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import type { Root } from "mdast";
import type {
  Root as HastRoot,
  Element as HastElement,
  ElementContent,
  RootContent,
} from "hast";

export type DocHeading = { depth: 2 | 3; id: string; text: string };

const REPO_ROOT = path.join(process.cwd(), ".suspec-canon"); // the suspec repo root mirror
const GH_BLOB = "https://github.com/jcosta33/suspec/blob/main/";
const DEAD_EXTERNAL_LINKS = new Set([
  "https://github.com/jcosta33/suspec-works/issues/58",
]);
const repoHas = (repoRel: string): boolean => {
  const root = path.resolve(REPO_ROOT);
  const target = path.resolve(REPO_ROOT, repoRel);
  if (target !== root && !target.startsWith(root + path.sep)) return false;
  return fs.existsSync(target);
};

const canonicalDocsHref = (href: string): string => {
  if (!href.startsWith("/docs")) return href;

  const [withoutHash, hash = ""] = href.split(/(?=#)/, 2);
  const [pathname, query = ""] = withoutHash.split(/(?=\?)/, 2);

  if (pathname === "/docs") return `/docs/${query}${hash}`;
  if (!pathname.startsWith("/docs/") || pathname.endsWith("/")) return href;

  const lastSegment = pathname.split("/").pop() ?? "";
  if (/\.[a-z0-9]{2,8}$/i.test(lastSegment)) return href;

  return `${pathname}/${query}${hash}`;
};

// Concatenated text of an mdast node (to unwrap a dead link to plain text).
const mdastText = (n: {
  type?: string;
  value?: string;
  children?: unknown[];
}): string =>
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
    const unwrap = () => {
      if (index !== undefined && parent) {
        parent.children[index] = { type: "text", value: mdastText(node) };
      }
    };
    if (DEAD_EXTERNAL_LINKS.has(u)) {
      unwrap();
      return;
    }
    if (/^(https?:|mailto:|#|\/)/.test(u)) return; // external / pure-anchor / already-absolute
    const hash = u.indexOf("#");
    const pathPart = hash >= 0 ? u.slice(0, hash) : u;
    const anchor = hash >= 0 ? u.slice(hash) : "";
    if (pathPart === "") return;
    // repo-relative target (docs/<currentDir>/<pathPart>, normalized)
    const repoTarget = path.posix.normalize(
      path.posix.join("docs", currentDir, pathPart),
    );
    if (repoTarget.startsWith("docs/")) {
      const docsRel = repoTarget.slice("docs/".length);
      if (pathPart.endsWith(".md")) {
        if (repoHas(repoTarget))
          node.url = canonicalDocsHref(
            "/docs/" + docsRel.replace(/\.md$/, "") + anchor,
          );
        else unwrap(); // dangling canon link -> plain text (was a GitHub 404)
        return;
      }
      // directory / extensionless -> its README if present, else the source tree (if it exists)
      if (repoHas(repoTarget + "/README.md")) {
        node.url = canonicalDocsHref(
          "/docs/" + docsRel.replace(/\/$/, "") + "/README" + anchor,
        );
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
  | {
      type: "link";
      url: string;
      title: null;
      children: { type: "text"; value: string }[];
    };
const linkifyCitation = (value: string): MdNode[] => {
  const re = /arXiv:(\d{4}\.\d{4,5}(?:v\d+)?)|\bDOI:?\s+(10\.\d{4,9}\/\S+)/g;
  const out: MdNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    if (m.index > last)
      out.push({ type: "text", value: value.slice(last, m.index) });
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
    if (ancestors.some((a) => a.type === "link" || a.type === "linkReference"))
      return;
    if (!/arXiv:\d|DOI:?\s+10\./.test(node.value)) return;
    const parts = linkifyCitation(node.value);
    if (parts.length === 1) return; // no citation matched
    const parent = ancestors[ancestors.length - 1];
    if (!parent || !("children" in parent)) return;
    const index = parent.children.indexOf(node as never);
    if (index === -1) return;
    parent.children.splice(
      index,
      1,
      ...(parts as unknown as typeof parent.children),
    );
    return [SKIP, index + parts.length];
  });
};

const rehypeCanonicalizeDocsLinks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "a") return;
    const href =
      typeof node.properties?.href === "string" ? node.properties.href : "";
    const canonicalHref = canonicalDocsHref(href);
    if (canonicalHref === href) return;
    node.properties = node.properties ?? {};
    node.properties.href = canonicalHref;
  });
};

// External links open in a new tab; rel="noopener noreferrer" blocks reverse-tabnabbing and
// referrer leakage. Applies to every http(s) anchor — inline citations and the sources page alike.
const rehypeExternalLinks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "a") return;
    const href =
      typeof node.properties?.href === "string" ? node.properties.href : "";
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
    if (node.tagName !== "input" || node.properties?.type !== "checkbox")
      return;
    node.properties.ariaLabel = node.properties.checked ? "completed" : "to do";
  });
};

// Put tables inside a scrollable shell. Letting the table itself be the scroll container forces
// narrow mobile columns to wrap into confetti before overflow can help.
const rehypeWrapTables: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "table" || index === undefined || !parent) return;
    if (!("children" in parent)) return;
    if (
      "tagName" in parent &&
      parent.tagName === "div" &&
      hasClass(parent, "docs-table-scroll")
    )
      return SKIP;
    const wrapper: HastElement = {
      type: "element",
      tagName: "div",
      properties: { className: ["docs-table-scroll"] },
      children: [node],
    };
    parent.children[index] = wrapper as ElementContent;
    return SKIP;
  });
};

const elementChildren = (node: HastElement): HastElement[] =>
  node.children.filter(
    (child): child is HastElement => child.type === "element",
  );

const firstDescendant = (
  node: HastElement,
  tagName: string,
): HastElement | null => {
  if (node.tagName === tagName) return node;
  for (const child of elementChildren(node)) {
    const found = firstDescendant(child, tagName);
    if (found) return found;
  }
  return null;
};

// Mobile docs tables render as stacked records. Add each column label to its body cells so CSS can
// show the header near the value without duplicating or editing the source markdown.
const rehypeLabelTableCells: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (table) => {
    if (table.tagName !== "table") return;
    const thead = elementChildren(table).find((child) => child.tagName === "thead");
    const headerRow = thead
      ? firstDescendant(thead, "tr")
      : firstDescendant(table, "tr");
    if (!headerRow) return;

    const headers = elementChildren(headerRow)
      .filter((cell) => cell.tagName === "th")
      .map((cell) => hastText(cell.children).trim())
      .filter(Boolean);
    if (headers.length === 0) return;

    visit(table, "element", (row) => {
      if (row.tagName !== "tr" || row === headerRow) return;
      elementChildren(row)
        .filter((cell) => cell.tagName === "td")
        .forEach((cell, index) => {
          cell.properties = cell.properties ?? {};
          cell.properties.dataLabel = headers[index] ?? "";
        });
    });
  });
};

// Wide code blocks and table shells scroll horizontally inside overflow-x:auto boxes (docs.css).
// A scrollable region that isn't keyboard-focusable can't be scrolled without a mouse (axe
// `scrollable-region-focusable`). Make every <pre>/table shell a tab stop so keyboard users reach it.
const rehypeFocusableScrollables: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node) => {
    const isTableShell =
      node.tagName === "div" && hasClass(node, "docs-table-scroll");
    if (node.tagName !== "pre" && !isTableShell) return;
    node.properties = node.properties ?? {};
    node.properties.tabIndex = 0;
  });
};

const rehypeWrapCodeBlocks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "pre" || index === undefined || !parent) return;
    if (!("children" in parent)) return;
    if (
      "tagName" in parent &&
      parent.tagName === "div" &&
      hasClass(parent, "docs-code-shell")
    )
      return SKIP;

    const wrapper: HastElement = {
      type: "element",
      tagName: "div",
      properties: { className: ["docs-code-shell"] },
      children: [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: ["docs-code-toolbar"],
            dataPagefindIgnore: "true",
          },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["docs-code-label"] },
              children: [{ type: "text", value: "code" }],
            },
            {
              type: "element",
              tagName: "button",
              properties: {
                type: "button",
                className: ["docs-code-copy", "copy-button", "focus-ring"],
                ariaLabel: "Copy code sample",
                dataDocsCodeCopy: "true",
              },
              children: [{ type: "text", value: "COPY" }],
            },
          ],
        },
        node,
      ],
    };

    parent.children[index] = wrapper as ElementContent;
    return SKIP;
  });
};

// Group every h2-led section so the generated manual can carry a consistent ledger surface without
// requiring source-doc wrappers. Content before the first h2 stays as normal opening prose.
const rehypeWrapLedgerSections: Plugin<[], HastRoot> = () => (tree) => {
  const next: RootContent[] = [];
  let section: HastElement | null = null;

  const flush = () => {
    if (!section) return;
    next.push(section as RootContent);
    section = null;
  };

  for (const child of tree.children) {
    if (child.type === "element" && child.tagName === "h2") {
      flush();
      section = {
        type: "element",
        tagName: "section",
        properties: { className: ["docs-ledger-section"] },
        children: [child],
      };
      continue;
    }

    if (section && child.type !== "doctype") {
      section.children.push(child as ElementContent);
      continue;
    }

    next.push(child);
  }

  flush();
  tree.children = next;
};

const normalizeDisplayTitle = (title: string): string =>
  title === "The suspec CLI" ? "The Suspec CLI" : title;

const MIN_META_DESCRIPTION_LENGTH = 70;
const MAX_META_DESCRIPTION_LENGTH = 138;
const DEFAULT_DESCRIPTION_CONTEXT =
  "Part of the Suspec manual for specs, tasks, reviews, findings, and evidence.";

const contextualDescriptionSuffix = (title: string): string => {
  if (/brownfield|change plans/i.test(title)) {
    return "Covers when to add inventory, change plans, and extra review records.";
  }
  if (/running agents/i.test(title)) {
    return "Covers bounded task packets, agent output, and evidence handoff.";
  }
  if (/review/i.test(title)) {
    return "Covers review packets, evidence rows, and human attention items.";
  }
  if (/integrations/i.test(title)) {
    return "Covers how file-based tools, CLIs, and local workflows can read the records.";
  }
  if (/adopting/i.test(title)) {
    return "Covers starter-kit setup, repo policy, and rollout boundaries.";
  }
  if (/examples/i.test(title)) {
    return "Shows complete Pull, Spec, Task, Run, Review, and Close chains.";
  }
  if (/artifact formats/i.test(title)) {
    return "Covers frontmatter, markdown packet structure, and reviewable records.";
  }
  if (/checks/i.test(title)) {
    return "Covers honesty levels, core checks, packet checks, and writing rules.";
  }
  if (/distillation/i.test(title)) {
    return "Covers when to compress working context into a durable artifact.";
  }
  if (/drift/i.test(title)) {
    return "Covers how to spot and record mismatches between intent and evidence.";
  }
  if (/local checks/i.test(title)) {
    return "Covers project-owned checks and how they fit beside Suspec conventions.";
  }
  if (/memory/i.test(title)) {
    return "Covers durable findings, saved lessons, and close-step handoff.";
  }
  if (/principles/i.test(title)) {
    return "Covers the rules that resolve conflicts in Suspec docs and templates.";
  }
  if (/step bars/i.test(title)) {
    return "Covers pass, fail, blocked, and unverified status in loop steps.";
  }
  if (/what is Suspec/i.test(title)) {
    return "Covers the records Suspec keeps and what the workflow does not decide.";
  }
  return DEFAULT_DESCRIPTION_CONTEXT;
};

const finishMetaDescription = (markdown: string, description: string): string => {
  const title = titleOf(markdown);
  let text = description.trim();
  if (text.length < MIN_META_DESCRIPTION_LENGTH) {
    const suffix = contextualDescriptionSuffix(title);
    text = text ? `${text} ${suffix}` : suffix;
  }
  if (text.length <= MAX_META_DESCRIPTION_LENGTH) return text;
  const slice = text.slice(0, MAX_META_DESCRIPTION_LENGTH - 3);
  const cut = slice.lastIndexOf(" ");
  return `${(cut > 60 ? slice.slice(0, cut) : slice).trimEnd()}…`;
};

const rehypeNormalizeDisplayHeadings: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: HastElement) => {
    if (node.tagName !== "h1") return;
    const text = hastText(node.children).trim();
    const normalized = normalizeDisplayTitle(text);
    if (normalized === text) return;
    node.children = [{ type: "text", value: normalized }];
  });
};

// The route shell renders the document title as the only page H1. Some canonical docs include a
// secondary body-level `#` after an update note; remove exact title repeats and demote any other
// body-level H1 so the semantic outline stays valid.
const rehypeHandleBodyH1: Plugin<[string], HastRoot> = (pageTitle) => (tree) => {
  const normalizedPageTitle = normalizeDisplayTitle(pageTitle);
  visit(tree, "element", (node: HastElement, index, parent) => {
    if (node.tagName !== "h1") return;
    const text = normalizeDisplayTitle(hastText(node.children).trim());
    if (
      text === normalizedPageTitle &&
      typeof index === "number" &&
      parent &&
      "children" in parent
    ) {
      parent.children.splice(index, 1);
      return [SKIP, index];
    }
    node.tagName = "h2";
  });
};

function hasClass(node: HastElement, className: string): boolean {
  const value = node.properties?.className;
  const classes = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\s+/)
      : [];
  return classes.includes(className);
}

// Plain-text content of a hast element (heading labels for the on-this-page TOC).
const hastText = (nodes: ElementContent[]): string =>
  nodes
    .map((n) =>
      n.type === "text" ? n.value : "children" in n ? hastText(n.children) : "",
    )
    .join("");

const rehypeLabelFlowCodeBlocks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: HastElement) => {
    if (node.tagName !== "pre") return;
    const code = elementChildren(node).find((child) => child.tagName === "code");
    if (!code) return;
    const text = hastText(code.children).trim();
    const firstLine = text
      .split("\n")
      .find((line) => line.trim().length > 0)
      ?.trimEnd();
    const arrowCount = firstLine?.match(/\s(?:->|→)\s/g)?.length ?? 0;
    if (arrowCount < 2) return;

    node.properties = node.properties ?? {};
    const value = node.properties.className;
    const classes = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? value.split(/\s+/).filter(Boolean)
        : [];
    if (!classes.includes("docs-flow-pre")) classes.push("docs-flow-pre");
    node.properties.className = classes;
  });
};

const rehypeLabelWrappedTextCodeBlocks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: HastElement) => {
    if (node.tagName !== "pre") return;
    if (hasClass(node, "docs-flow-pre")) return;
    const code = elementChildren(node).find((child) => child.tagName === "code");
    if (!code) return;
    const codeClass = code.properties?.className;
    const hasLanguageClass = Array.isArray(codeClass)
      ? codeClass.some(
          (className) =>
            typeof className === "string" && className.startsWith("language-"),
        )
      : typeof codeClass === "string" && /\blanguage-/.test(codeClass);
    const isTextLike =
      hasClass(code, "language-text") ||
      hasClass(code, "language-markdown") ||
      hasClass(code, "language-bash") ||
      hasClass(code, "language-yaml") ||
      hasClass(code, "language-sol") ||
      !hasLanguageClass;
    if (!isTextLike) return;

    const lines = hastText(code.children).trim().split("\n");
    const hasLongProseLine = lines.some(
      (line) => line.length > 30 && /\s/.test(line),
    );
    if (!hasLongProseLine) return;

    node.properties = node.properties ?? {};
    const value = node.properties.className;
    const classes = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? value.split(/\s+/).filter(Boolean)
        : [];
    if (!classes.includes("docs-wrap-pre")) classes.push("docs-wrap-pre");
    node.properties.className = classes;
  });
};

// Collect h2/h3 with their (rehype-slug-assigned) ids — must run AFTER rehypeSlug so ids exist.
const rehypeCollectHeadings =
  (out: DocHeading[]): Plugin<[], HastRoot> =>
  () =>
  (tree) => {
    visit(tree, "element", (node: HastElement) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id =
        typeof node.properties?.id === "string" ? node.properties.id : "";
      if (!id) return;
      const text = hastText(node.children).trim();
      if (text) out.push({ depth: node.tagName === "h2" ? 2 : 3, id, text });
    });
  };

// Source docs often use numbered h2s (`1. Pull`). The site already renders a chapter plate, so
// split the source number into that plate instead of showing `01 1. Pull`.
const rehypeMarkNumberedHeadings: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: HastElement) => {
    if (node.tagName !== "h2") return;
    const text = hastText(node.children).trim();
    const match = text.match(/^(\d+)\.\s+(.+)$/);
    if (!match) return;

    node.properties = node.properties ?? {};
    const value = node.properties.className;
    const classes = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? value.split(/\s+/).filter(Boolean)
        : [];
    if (!classes.includes("docs-numbered-heading")) {
      classes.push("docs-numbered-heading");
    }
    node.properties.className = classes;
    node.children = [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["docs-heading-prefix"], ariaHidden: "true" },
        children: [
          {
            type: "text",
            value: match[1].padStart(2, "0"),
          },
        ],
      },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["docs-heading-title"] },
        children: [{ type: "text", value: match[2] }],
      },
    ];
  });
};

export async function renderDoc(
  markdown: string,
  currentDir: string,
  pageTitle: string,
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
    .use(rehypeCanonicalizeDocsLinks)
    .use(rehypeExternalLinks)
    .use(rehypeSlug)
    .use(rehypeNormalizeDisplayHeadings)
    .use(rehypeHandleBodyH1, pageTitle)
    .use(rehypeCollectHeadings(headings))
    .use(rehypeMarkNumberedHeadings)
    .use(rehypeLabelFlowCodeBlocks)
    .use(rehypeLabelWrappedTextCodeBlocks)
    .use(rehypeLabelTaskCheckboxes)
    .use(rehypeLabelTableCells)
    .use(rehypeWrapTables)
    .use(rehypeWrapCodeBlocks)
    .use(rehypeFocusableScrollables)
    .use(rehypeWrapLedgerSections)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return { html: String(file), headings };
}

// First H1 as the page title (the canon's numbered/reference pages carry no frontmatter).
// Strip inline-code ticks AND any heading markers they wrapped (e.g. an H1 containing `## Open
// decisions` must not leak "## Open decisions" into <title>/og/JSON-LD).
export function titleOf(markdown: string): string {
  const m = markdown.match(/^#\s+(.+)$/m);
  if (!m) return "Suspec docs";
  const title = m[1]
    .replace(/`/g, "")
    .replace(/(^|\s)#{1,6}\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return normalizeDisplayTitle(title);
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
  const joinItems = (items: string[]): string => {
    if (items.length <= 1) return items[0] ?? "";
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
  };
  const stepIndexDescription = (): string | null => {
    const steps = [...body.matchAll(/^##\s+(?:\d+\.\s+)?(.+)$/gm)]
      .map((match) =>
        clean(match[1])
          .replace(/\s*\([^)]*\)/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .filter(
        (heading) =>
          heading &&
          !/^(common paths|what not to skip|related)$/i.test(heading),
      )
      .slice(0, 8);
    if (steps.length < 4) return null;
    return `${titleOf(markdown)} covers ${joinItems(steps)}.`;
  };
  const listLeadDescription = (): string | null => {
    let lead = "";
    let inCodeBlock = false;
    let items: string[] = [];
    const describe = (): string | null => {
      if (!lead.endsWith(":") || items.length === 0) return null;
      const cleanLead = clean(lead).replace(/:$/, "");
      const title = titleOf(markdown);
      const subject = /^this page creates$/i.test(cleanLead)
        ? `${title} creates`
        : cleanLead;
      return `${subject} ${joinItems(items.slice(0, 4))}.`;
    };

    for (const raw of body.split(/\r?\n/)) {
      const line = raw.trim();
      if (line.startsWith("```") || line.startsWith("~~~")) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock || isHeading(line)) continue;
      const bullet = line.match(/^[-*+]\s+(.+)$/);
      if (lead && bullet) {
        items.push(clean(bullet[1]));
        continue;
      }
      const text = describe();
      if (text) return text;
      if (line === "" && lead && items.length === 0) continue;
      lead = isProse(line) && line.endsWith(":") ? line : "";
      items = [];
    }
    return describe();
  };
  const tableDescription = (): string | null => {
    const parseCells = (row: string): string[] =>
      row
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(clean);
    const isSeparator = (row: string): boolean => {
      const cells = parseCells(row);
      return (
        cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell))
      );
    };
    const describe = (rows: string[]): string | null => {
      const separator = rows.findIndex(isSeparator);
      if (separator < 1) return null;
      const terms = rows
        .slice(separator + 1)
        .map((row) => parseCells(row)[0])
        .filter(Boolean)
        .slice(0, 5);
      if (terms.length === 0) return null;
      const title = titleOf(markdown);
      const prefix =
        title.toLowerCase() === "glossary"
          ? "Glossary of Suspec terms"
          : `${title} reference`;
      return `${prefix}: ${terms.join(", ")}.`;
    };

    let tableRows: string[] = [];
    for (const raw of body.split(/\r?\n/)) {
      const line = raw.trim();
      if (line.startsWith("|") && line.includes("|")) {
        tableRows.push(line);
        continue;
      }
      const text = describe(tableRows);
      if (text) return text;
      tableRows = [];
    }
    return describe(tableRows);
  };

  // Collect each prose paragraph with the section heading it sits under. Fenced code blocks are
  // skipped wholesale — their content isn't prose and must never become the description.
  const paragraphs: { heading: string; text: string }[] = [];
  let current: string[] = [];
  let lastHeading = "";
  let inCode = false;
  const flush = () => {
    if (current.length)
      paragraphs.push({ heading: lastHeading, text: clean(current.join(" ")) });
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
      lastHeading = line
        .replace(/^#+\s*/, "")
        .replace(/[`*_]/g, "")
        .trim()
        .toLowerCase();
    } else if (isProse(line)) {
      current.push(line);
    } else {
      flush(); // blank or non-prose (table/list) ends the current paragraph
    }
  }
  flush();

  // Skip skipped-section bodies (ADR "Status"); prefer the first substantial paragraph — not a short
  // colon lead-in like "Three pieces, three homes:" that precedes a table.
  const candidates = paragraphs.filter(
    (p) => p.text && !SKIP_SECTIONS.has(p.heading),
  );
  const chosen =
    candidates.find((p) => p.text.length >= 40 && !p.text.endsWith(":")) ??
    null;
  const titleHeading = titleOf(markdown).toLowerCase();
  const chosenIsShortCrossReference =
    chosen?.heading === titleHeading &&
    chosen.text.length < 120 &&
    /\bsee\b/i.test(chosen.text);
  const text =
    chosenIsShortCrossReference ? (stepIndexDescription() ?? chosen.text) : (chosen?.text ?? "");
  const description =
    text ||
    listLeadDescription() ||
    tableDescription() ||
    candidates[0]?.text ||
    "Suspec documentation";
  return finishMetaDescription(markdown, description);
}
