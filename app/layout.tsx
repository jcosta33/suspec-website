import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Shell } from "./components/Shell";
import { JsonLd } from "./components/JsonLd";

const SITE_URL = "https://corpusframework.dev";

// Site-wide structured data (SEO/GEO). The Organization + WebSite entities give answer engines and
// crawlers a stable, machine-readable statement of what this is; the SearchAction is wired to the
// real docs search (SearchBox reads ?q= on load and triggers Pagefind), so it is not a dead claim.
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Calma",
      url: SITE_URL,
      description:
        "Calma is a lightweight spec-and-review workflow for teams shipping code with coding agents.",
      sameAs: [
        "https://github.com/jcosta33/corpus",
        "https://github.com/jcosta33/corpus-starter-kit",
        "https://github.com/jcosta33/corpus-skills",
        "https://github.com/jcosta33/corpus-cli",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Calma",
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
  // Mono is only used for code/labels, never the LCP heading — don't let it preload-compete with
  // Space Grotesk / Inter on the critical path (Lighthouse mobile flagged the extra preload).
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://corpusframework.dev"),
  title: "Calma — A spec-and-review workflow for coding agents",
  description:
    "Calma is a lightweight framework that helps teams ship better code with agents: specs, tasks, reviews, findings, and change plans.",
  openGraph: {
    type: "website",
    siteName: "Calma",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Calma — a spec-and-review workflow for coding agents",
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
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A08", // --color-chassis: paints the mobile browser UI to match the dark shell
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-chassis text-concrete-100">
        <JsonLd data={siteGraph} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
