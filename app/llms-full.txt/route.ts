import { listDocs, readDoc } from "../docs/lib/canon";

export const dynamic = "force-static";

const SITE_URL = "https://suspecframework.dev/";
const CANON_URL = "https://github.com/jcosta33/suspec";

function userFacingDocSlugs() {
  const docs = listDocs();
  const directChildren = (prefix: string) =>
    docs
      .filter((slug) => slug.startsWith(`${prefix}/`) && slug.split("/").length === 2)
      .sort();

  return [
    ...docs.filter((slug) => /^\d\d-/.test(slug)).sort(),
    ...directChildren("tutorial"),
    ...directChildren("examples"),
  ];
}

function buildLlmsFullText() {
  const slugs = userFacingDocSlugs();
  const header =
    `# Suspec - full documentation\n\n` +
    `> Suspec is a methodology for structuring work with coding agents. ` +
    `Plain Markdown, any capable harness, no runtime. This file concatenates the user-facing documentation for ` +
    `full-context ingestion by AI assistants.\n\n` +
    `Site: ${SITE_URL} - Canon: ${CANON_URL}\n\n---\n\n`;

  if (slugs.length === 0) {
    return `${header}Docs canon is not available in this build.\n`;
  }

  const body = slugs
    .map((slug) => {
      const doc = readDoc(slug);
      if (!doc) return null;
      return `<!-- ${slug}.md -->\n\n${doc.trim()}\n`;
    })
    .filter((doc): doc is string => Boolean(doc))
    .join("\n\n---\n\n");

  return `${header}${body}\n`;
}

export function GET() {
  return new Response(buildLlmsFullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
