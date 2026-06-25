import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { PaperArtifact } from "../components/PaperArtifact";

export const metadata: Metadata = {
  title: "Colophon — Corpus",
  description: "How the Corpus website is built.",
  robots: "noindex",
  alternates: {
    canonical: "/colophon/",
  },
};

const facts = [
  { label: "Framework", value: "Next.js 16 with App Router" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Fonts", value: "Inter, Space Grotesk, JetBrains Mono" },
  { label: "Icons", value: "Lucide React" },
  { label: "Hosting", value: "Vercel" },
];

const trace = [
  {
    label: "WORKFLOW",
    title: "Same loop",
    text: "Design decisions, specs, tasks, reviews, and findings live in this repo.",
  },
  {
    label: "OUTPUT",
    title: "Static export",
    text: "The deployed site is generated at build time and served as static files.",
  },
  {
    label: "CONTENT",
    title: "Docs source",
    text: "Canonical framework docs are pulled from the sibling Corpus repository.",
  },
];

export default function ColophonPage() {
  return (
    <Section className="colophon-section grid content-start gap-5 py-16 sm:gap-6 sm:py-20 md:min-h-[calc(100svh-22rem)] md:items-start md:pt-28 lg:grid-cols-[1.1fr_0.9fr]">
      <Panel brushed className="colophon-terminal-shell p-1.5 sm:p-2">
        <TerminalWindow
          title="build.manifest"
          contentClassName="colophon-terminal-content max-h-none overflow-visible"
        >
          <div className="space-y-4 sm:space-y-5">
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-[0] text-concrete-100">
                Colophon
              </h1>
              <p className="mt-2 text-concrete-400">
                Built with Corpus. Drafted, reviewed, and merged through the
                same workflow.
              </p>
            </div>
            <dl className="grid gap-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="colophon-fact-row grid grid-cols-[minmax(5.75rem,7rem)_1fr] gap-3 border-t border-concrete-100/10 pt-3 first:border-t-0 first:pt-0"
                >
                  <dt className="font-mono text-xs uppercase tracking-wide text-brass">
                    {fact.label}
                  </dt>
                  <dd className="leading-relaxed text-concrete-100">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </TerminalWindow>
      </Panel>
      <PaperArtifact
        label="source"
        title="site record"
        meta="built with the same corpus workflow"
        className="colophon-paper"
      >
        <p>
          The website is a Next.js export. Specs, tasks, review notes, and
          findings live with the source.
        </p>
        <p className="mt-4">
          <Link
            href="https://github.com/jcosta33/corpus-website"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm px-1 font-semibold text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
          >
            Open the website repo
          </Link>
        </p>
      </PaperArtifact>

      <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
        {trace.map((item) => (
          <Card
            key={item.title}
            screws
            className="h-full border-panel-border"
            contentClassName="space-y-3"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-brass">
              {item.label}
            </p>
            <h2 className="font-heading text-xl font-bold text-concrete-100">
              {item.title}
            </h2>
            <p className="text-sm leading-relaxed text-concrete-400">
              {item.text}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
