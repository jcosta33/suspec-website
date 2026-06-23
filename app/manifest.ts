import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Web app manifest — makes the site installable + gives Android/Chrome a themed icon. Brand "Corpus"
// matches the current chrome; the icon paths are the build-generated app/icon + app/apple-icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Corpus — a spec-and-review workflow for coding agents",
    short_name: "Corpus",
    description:
      "A lightweight spec-and-review workflow that keeps humans in charge of code written by AI agents. Plain markdown, any agent, no runtime.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070e",
    theme_color: "#06070e",
    // Build-generated icons (app/icon.tsx generateImageMetadata). 192 + 512 satisfy Chrome's
    // install criteria.
    icons: [
      { src: "/icon/icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
