import type { Metadata, Viewport } from "next";
import {
  Alegreya,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { Shell } from "./components/Shell";
import { JsonLd } from "./components/JsonLd";

const SITE_URL = "https://suspecframework.dev";

// Site-wide structured data (SEO/GEO). The Organization + WebSite entities give answer engines and
// crawlers a stable, machine-readable statement of what this is; the SearchAction is wired to the
// real docs search (SearchBox reads ?q= on load and triggers Pagefind), so it is not a dead claim.
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Suspec",
      url: SITE_URL,
      description:
        "Suspec is a markdown workflow for coding-agent work.",
      sameAs: [
        "https://github.com/jcosta33/suspec",
        "https://github.com/jcosta33/suspec-starter-kit",
        "https://github.com/jcosta33/suspec-skills",
        "https://github.com/jcosta33/suspec-agents",
        "https://github.com/jcosta33/suspec-cli",
        "https://github.com/jcosta33/suspec-mcp",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Suspec",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/docs/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  // Mono is only used for code/labels, never the LCP heading. Keep it from
  // preload-competing with the display and body faces on the critical path.
  preload: false,
});

// Display face for headings and title moments: literary and a little strange,
// but still sturdy enough for a technical product surface.
const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suspecframework.dev"),
  title: "Suspec — spec and review workflow",
  description:
    "Suspec is a markdown workflow for specs, tasks, reviews, findings, and evidence.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon/icon-192", sizes: "192x192", type: "image/png" },
      { url: "/icon/icon-512", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Suspec — spec and review workflow",
      },
    ],
  },
  twitter: {
    // Card type only — title/description/image cascade per page from each page's metadata + openGraph,
    // so every route gets its own card instead of inheriting the home page's everywhere.
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
    // Surface the llms.txt files to agents/crawlers that look for a text/markdown alternate in the
    // head. The Metadata API renders these as <link rel="alternate" type="text/markdown" href=...>.
    types: {
      "text/markdown": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/llms-full.txt", title: "llms-full.txt" },
      ],
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#110e0c", // --color-night: paints the mobile browser UI to match the dark shell
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${alegreya.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-chassis text-concrete-100">
        <JsonLd data={siteGraph} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
