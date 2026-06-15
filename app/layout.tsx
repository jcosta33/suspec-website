import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Shell } from "./components/Shell";

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
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swarmframework.dev"),
  title: "Swarm — A spec-and-review workflow for coding agents",
  description:
    "Swarm is a lightweight framework that helps teams ship better code with agents: specs, tasks, reviews, findings, and change plans.",
  openGraph: {
    type: "website",
    siteName: "Swarm",
    images: ["/og-home.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swarm — A spec-and-review workflow for coding agents",
    description:
      "Specs agents can work from, tasks that bound them, and reviews that show the evidence. Plain markdown, any agent, no runtime.",
    images: ["/og-home.png"],
  },
  alternates: {
    canonical: "/",
  },
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
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
