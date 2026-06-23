import type { MetadataRoute } from "next";
import { listDocs, docDates } from "./docs/lib/canon";

export const dynamic = "force-static";

const BASE_URL = "https://corpusframework.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const marketing = [
    "/",
    "/what-is-corpus/",
    "/the-loop/",
    "/get-started/",
    "/skills/",
    "/skills/writing/",
    "/cli/",
  ];
  const marketingEntries = marketing.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: now,
  }));
  // One <url> per docs page (trailingSlash: true). listDocs() returns [] when the canon is absent,
  // so the sitemap still builds — just without docs entries. lastModified is the doc's real git
  // author date (falls back to build time when history is unavailable) — a genuine freshness signal.
  const docEntries = [
    { url: `${BASE_URL}/docs/`, lastModified: now },
    ...listDocs().map((slug) => ({
      url: `${BASE_URL}/docs/${slug}/`,
      lastModified: docDates(slug)?.modified ?? now,
    })),
  ];
  return [...marketingEntries, ...docEntries];
}
