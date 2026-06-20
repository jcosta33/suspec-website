// The W1-proven design-B markdown pipeline (GFM, not MDX), as a build-time renderer.
// - rewrite .md links -> /docs routes (resolve ../, preserve #anchor)
// - selective raw HTML: keep <a> anchors, drop HTML comments, turn every other bare <token> literal
// - rehype-slug for github-slugger-aligned heading ids (W1: byte-identical to GitHub's anchors)
import path from "node:path";
import { unified, type Plugin } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

const rewriteMdLinks: Plugin<[string], Root> = (currentDir) => (tree) => {
  visit(tree, "link", (node) => {
    const u = node.url ?? "";
    if (/^(https?:|mailto:|\/)/.test(u)) return;
    const m = u.match(/^([^#]*?\.md)(#.*)?$/);
    if (!m) return;
    const rel = m[1];
    const anchor = m[2] ?? "";
    const resolved = path.posix
      .normalize(path.posix.join(currentDir, rel))
      .replace(/\.md$/, "");
    node.url = "/docs/" + resolved + anchor;
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

export async function renderDoc(markdown: string, currentDir: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rewriteMdLinks, currentDir)
    .use(selectiveRawHtml)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

// First H1 as the page title (the canon's numbered/reference pages carry no frontmatter).
export function titleOf(markdown: string): string {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/`/g, "").trim() : "Swarm docs";
}
