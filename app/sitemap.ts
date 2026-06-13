import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://swarmframework.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/what-is-swarm/`, lastModified: new Date() },
    { url: `${BASE_URL}/the-loop/`, lastModified: new Date() },
    { url: `${BASE_URL}/get-started/`, lastModified: new Date() },
    { url: `${BASE_URL}/skills/`, lastModified: new Date() },
    { url: `${BASE_URL}/skills/writing/`, lastModified: new Date() },
    { url: `${BASE_URL}/cli/`, lastModified: new Date() },
  ];
}
