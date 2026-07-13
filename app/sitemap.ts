import type { MetadataRoute } from "next";
import { listDocs, docDates } from "./docs/lib/canon";
import { skillDetails } from "./skills/skillData";

export const dynamic = "force-static";

const BASE_URL = "https://suspecframework.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const marketing = [
    "/",
    "/what-is-suspec/",
    "/the-loop/",
    "/get-started/",
    "/skills/",
    "/skills/writing/",
    "/cli/",
    "/mcp/",
    "/colophon/",
    "/llms.txt",
    "/llms-full.txt",
  ];
  const marketingEntries = marketing.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: now,
  }));
  const skillEntries = skillDetails.map((skill) => ({
    url: `${BASE_URL}/skills/${skill.slug}/`,
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
  return [...marketingEntries, ...skillEntries, ...docEntries];
}
