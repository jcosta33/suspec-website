import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { listDocs, readDoc, humanizeSegment, docSequence } from "../lib/canon";
import { renderDoc, titleOf, descriptionOf } from "../lib/render";
import { JsonLd } from "../../components/JsonLd";

export const dynamicParams = false;

const SITE_URL = "https://swarmframework.dev";

// Build a BreadcrumbList where every `item` URL is guaranteed to resolve: section dirs link to their
// README page when one exists, else fall back to the docs landing — never a dir route that 404s.
function breadcrumbFor(slug: string[], leafTitle: string) {
  const crumbs: { name: string; url: string }[] = [{ name: "Docs", url: `${SITE_URL}/docs/` }];
  let acc = "";
  slug.forEach((seg, i) => {
    acc += (acc ? "/" : "") + seg;
    if (i === slug.length - 1) {
      crumbs.push({ name: leafTitle, url: `${SITE_URL}/docs/${acc}/` });
      return;
    }
    const readme = readDoc(`${acc}/README`);
    crumbs.push(
      readme
        ? { name: titleOf(readme), url: `${SITE_URL}/docs/${acc}/README/` }
        : { name: humanizeSegment(seg), url: `${SITE_URL}/docs/` }
    );
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

// TechArticle for each doc — gives answer engines an article-level entity (headline + description)
// tied back to the WebSite/Organization, so a doc page is citable as a documentation article.
function articleFor(slug: string[], title: string, description: string) {
  const url = `${SITE_URL}/docs/${slug.join("/")}/`;
  // Google recommends headline <=110 chars; a few ADR titles run longer. Keep the full title in
  // `name` and a word-boundary-trimmed form in `headline`.
  const headline =
    title.length <= 110 ? title : `${title.slice(0, 110).replace(/\s+\S*$/, "").trimEnd()}…`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: title,
    headline,
    description,
    inLanguage: "en",
    url,
    mainEntityOfPage: url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function generateStaticParams(): { slug: string[] }[] {
  return listDocs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const md = readDoc(slug.join("/"));
  const canonical = `/docs/${slug.join("/")}/`;
  if (!md) return { title: "Swarm docs", alternates: { canonical } };
  return {
    title: `${titleOf(md)} · Swarm`,
    description: descriptionOf(md),
    alternates: { canonical }, // self-canonical (was inheriting the home page's "/")
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const md = readDoc(slugPath);
  if (md === null) notFound();
  const dir = path.posix.dirname(slugPath);
  const { html, headings } = await renderDoc(md, dir === "." ? "" : dir);

  // Prev/next within the reading order, so a deep-doc / search landing isn't a dead end. Use each
  // doc's real title (not the short nav label) so a section-index page reads as e.g. "Worked
  // examples", never a bare "Overview" that's ambiguous at a section seam.
  const seq = docSequence();
  const i = seq.findIndex((d) => d.slug === slugPath);
  const pagerLabel = (s: string): string => {
    const m = readDoc(s);
    return m ? titleOf(m) : seq.find((d) => d.slug === s)?.label ?? s;
  };
  const prev = i > 0 ? seq[i - 1] : null;
  const next = i >= 0 && i < seq.length - 1 ? seq[i + 1] : null;

  return (
    <>
      <JsonLd data={breadcrumbFor(slug, titleOf(md))} />
      <JsonLd data={articleFor(slug, titleOf(md), descriptionOf(md))} />
      <div className="docs-prose" data-pagefind-body>
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {(prev || next) && (
          <nav className="docs-pager" aria-label="Documentation pages">
            {prev ? (
              <Link className="docs-pager-link docs-pager-prev" href={`/docs/${prev.slug}/`} rel="prev">
                <span className="docs-pager-dir">← Previous</span>
                <span className="docs-pager-title">{pagerLabel(prev.slug)}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="docs-pager-link docs-pager-next" href={`/docs/${next.slug}/`} rel="next">
                <span className="docs-pager-dir">Next →</span>
                <span className="docs-pager-title">{pagerLabel(next.slug)}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        <div className="docs-bridge">
          <p>
            Ready to run the loop on your own repo?{" "}
            <Link href="/get-started/">Get started</Link> — copy the kit and write your first spec.
          </p>
        </div>
      </div>

      {headings.length >= 4 && (
        <nav className="docs-toc" aria-label="On this page">
          <p className="docs-toc-title">On this page</p>
          <ul>
            {headings.map((h) => (
              <li key={h.id} className={h.depth === 3 ? "docs-toc-sub" : undefined}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
