import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { listDocs, readDoc } from "../lib/canon";
import { renderDoc, titleOf } from "../lib/render";

export const dynamicParams = false;

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
  return { title: md ? `${titleOf(md)} · Swarm` : "Swarm docs" };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const md = readDoc(slugPath);
  if (md === null) notFound();
  const dir = path.posix.dirname(slugPath);
  const html = await renderDoc(md, dir === "." ? "" : dir);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
