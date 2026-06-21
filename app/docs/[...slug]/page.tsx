import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { listDocs, readDoc, humanizeSegment } from "../lib/canon";
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
  const html = await renderDoc(md, dir === "." ? "" : dir);
  return (
    <>
      <JsonLd data={breadcrumbFor(slug, titleOf(md))} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
