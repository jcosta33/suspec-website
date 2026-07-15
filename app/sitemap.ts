import type { MetadataRoute } from "next";
import { listDocs, docDates } from "./docs/lib/canon";
import { skillDetails } from "./skills/skillData";
import { loopSteps, loopStepHref } from "./the-loop/loopSteps";

export const dynamic = "force-static";

const BASE_URL = "https://suspecframework.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const marketing = [
    "/",
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
  }));
  const skillEntries = skillDetails.map((skill) => ({
    url: `${BASE_URL}/skills/${skill.slug}/`,
  }));
  const loopStepEntries = loopSteps.map((step) => ({
    url: `${BASE_URL}${loopStepHref(step.slug)}`,
  }));
  // One <url> per docs page (trailingSlash: true). listDocs() returns [] when the canon is absent,
  // so the sitemap still builds — just without docs entries. lastModified is the doc's real git
  // author date (falls back to build time when history is unavailable) — a genuine freshness signal.
  const docEntries = [
    { url: `${BASE_URL}/docs/` },
    ...listDocs().map((slug) => {
      const modified = docDates(slug)?.modified;
      return {
        url: `${BASE_URL}/docs/${slug}/`,
        ...(modified ? { lastModified: modified } : {}),
      };
    }),
  ];
  return [...marketingEntries, ...skillEntries, ...loopStepEntries, ...docEntries];
}
