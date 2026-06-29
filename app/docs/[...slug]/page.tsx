import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  listDocs,
  readDoc,
  humanizeSegment,
  docSequence,
  docDates,
} from "../lib/canon";
import { renderDoc, titleOf, descriptionOf } from "../lib/render";
import { JsonLd } from "../../components/JsonLd";
import { DocsCodeCopy } from "../components/DocsCodeCopy";
import { DocsToc } from "../components/DocsToc";

export const dynamicParams = false;

const SITE_URL = "https://suspecframework.dev";

// Build a BreadcrumbList. A section dir links to its README page when one exists; a section with no
// README (e.g. reference/) emits a name-only, NON-navigable intermediate crumb (no `item`) rather
// than duplicating the position-1 "Docs" URL — Google rejects breadcrumbs with duplicate item URLs.
function breadcrumbFor(slug: string[], leafTitle: string) {
  const crumbs: { name: string; url?: string }[] = [
    { name: "Docs", url: `${SITE_URL}/docs/` },
  ];
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
        : { name: humanizeSegment(seg) }, // no own page -> name-only crumb, no duplicate URL
    );
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.url ? { item: c.url } : {}),
    })),
  };
}

// TechArticle for each doc — gives answer engines an article-level entity (headline + description)
// tied back to the WebSite/Organization, so a doc page is citable as a documentation article.
function articleFor(
  slug: string[],
  title: string,
  description: string,
  dates: { created: string; modified: string } | null,
) {
  const url = `${SITE_URL}/docs/${slug.join("/")}/`;
  // Google recommends headline <=110 chars; a few ADR titles run longer. Keep the full title in
  // `name` and a word-boundary-trimmed form in `headline`.
  const headline =
    title.length <= 110
      ? title
      : `${title
          .slice(0, 110)
          .replace(/\s+\S*$/, "")
          .trimEnd()}…`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    name: title,
    headline,
    description,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Suspec",
    },
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og-home.png`,
    // Real git dates when history is available (omitted otherwise, never a fake build-time date).
    ...(dates
      ? { datePublished: dates.created, dateModified: dates.modified }
      : {}),
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
  if (!md) return { title: "Suspec docs", alternates: { canonical } };
  return {
    title: `${titleOf(md)} · Suspec`,
    description: descriptionOf(md),
    alternates: { canonical }, // self-canonical (was inheriting the home page's "/")
    openGraph: {
      // og:type=article (a doc is an article) + og:url=canonical so reshares consolidate; siteName +
      // image come from the layout default but openGraph is replaced wholesale, so restate them.
      type: "article",
      url: canonical,
      siteName: "Suspec",
      locale: "en_US",
      images: [
        { url: "/og-home.png", width: 1200, height: 630, alt: titleOf(md) },
      ],
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const md = readDoc(slugPath);
  if (md === null) notFound();
  const dir = path.posix.dirname(slugPath);
  const articleMarkdown = md
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/^\s*#\s+.+\r?\n+/, "");
  const title = titleOf(md);
  const { html, headings } = await renderDoc(
    articleMarkdown,
    dir === "." ? "" : dir,
    title,
  );
  const dates = docDates(slugPath);
  const docGroup = (() => {
    if (slug.length > 1) {
      return humanizeSegment(slug[0]).replace(/^README$/i, "Manual");
    }
    return /^\d{2}-/.test(slug[0]) ? "Start here" : "Manual";
  })();
  const sourceLabel = `suspec/docs/${slugPath}.md`;
  const titleClassName = [
    "docs-article-title",
    title.length > 56 ? "docs-article-title-long" : "",
    title.length > 108 ? "docs-article-title-xlong" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Prev/next within the reading order, so a deep-doc / search landing isn't a dead end. Use each
  // doc's real title (not the short nav label) so a section-index page reads as e.g. "Worked
  // examples", never a bare "Overview" that's ambiguous at a section seam.
  const seq = docSequence();
  const i = seq.findIndex((d) => d.slug === slugPath);
  const pagerLabel = (s: string): string => {
    const m = readDoc(s);
    return m ? titleOf(m) : (seq.find((d) => d.slug === s)?.label ?? s);
  };
  const prev = i > 0 ? seq[i - 1] : null;
  const next = i >= 0 && i < seq.length - 1 ? seq[i + 1] : null;
  const sequenceLabel =
    i >= 0
      ? `${String(i + 1).padStart(2, "0")} / ${String(seq.length).padStart(2, "0")}`
      : null;

  return (
    <>
      <JsonLd data={breadcrumbFor(slug, title)} />
      <JsonLd
        data={articleFor(
          slug,
          title,
          descriptionOf(md),
          dates,
        )}
      />
      <article className="docs-prose" data-pagefind-body>
        <header className="docs-article-header">
          <div className="docs-article-kicker" data-pagefind-ignore>
            <span>manual page</span>
            <span>/ {docGroup}</span>
          </div>
          <h1 className={titleClassName}>{title}</h1>
          <div className="docs-source-note" data-pagefind-ignore>
            <span className="paper-stamp">source</span>
            <span className="docs-source-path">
              <span className="docs-source-label">Source:</span>{" "}
              <Link
                href={`https://github.com/jcosta33/suspec/blob/main/docs/${slugPath}.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sourceLabel}
              </Link>
            </span>
            {dates && (
              <span className="docs-source-date">
                Modified: {dates.modified.slice(0, 10)}
              </span>
            )}
          </div>
          <dl className="docs-article-ledger" data-pagefind-ignore>
            <div>
              <dt>Sections</dt>
              <dd>{headings.length}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Markdown</dd>
            </div>
            {sequenceLabel && (
              <div>
                <dt>Order</dt>
                <dd>{sequenceLabel}</dd>
              </div>
            )}
          </dl>
        </header>
        <DocsCodeCopy />
        <div className="docs-article-html" dangerouslySetInnerHTML={{ __html: html }} />

        {(prev || next) && (
          <nav className="docs-pager" aria-label="Documentation pages">
            {prev ? (
              <Link
                className="docs-pager-link docs-pager-prev"
                href={`/docs/${prev.slug}/`}
                rel="prev"
              >
                <span className="docs-pager-dir">← Previous</span>
                <span className="docs-pager-title">
                  {pagerLabel(prev.slug)}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                className="docs-pager-link docs-pager-next"
                href={`/docs/${next.slug}/`}
                rel="next"
              >
                <span className="docs-pager-dir">Next →</span>
                <span className="docs-pager-title">
                  {pagerLabel(next.slug)}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        <div className="docs-bridge" data-pagefind-ignore>
          <p>
            <span className="docs-bridge-label">Starter kit: </span>
            <Link href="/get-started/">Set up a workspace</Link>
          </p>
        </div>
      </article>

      {headings.length >= 3 && <DocsToc headings={headings} />}
    </>
  );
}
