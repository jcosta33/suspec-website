import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Web app manifest — makes the site installable + gives Android/Chrome a themed icon. Brand "Suspec"
// matches the current chrome; the icon paths are the build-generated app/icon + app/apple-icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Suspec — spec and review workflow",
    short_name: "Suspec",
    description:
      "A plain-markdown workflow for specs, tasks, reviews, findings, and evidence when teams use coding agents.",
    start_url: "/",
    display: "standalone",
    theme_color: "#110e0c",
    // Build-generated icons (app/icon.tsx generateImageMetadata). 192 + 512 satisfy Chrome's
    // install criteria.
    icons: [
      {
        src: "/icon/icon-192?manifest=1",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/icon-512?manifest=1",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
