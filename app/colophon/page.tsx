import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { PaperArtifact } from "../components/PaperArtifact";
import { PageHero } from "../components/PageHero";
import type { SignalRole } from "../components/signalStyles";

export const metadata: Metadata = {
  title: "Colophon — Suspec",
  description: "How the Suspec website is built.",
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

const buildTrace = [
  "decision",
  "spec",
  "review",
  "export",
  "deploy",
];

const provenanceFacts = [
  { label: "Source", value: "jcosta33/suspec-website" },
  { label: "Canon", value: "../suspec/docs" },
  { label: "Export", value: "dist/" },
  { label: "Search", value: "Pagefind" },
];

const trace = [
  {
    label: "WORKFLOW",
    title: "Same loop",
    text: "Design decisions, specs, tasks, reviews, and findings live in this repo.",
    href: "/the-loop/",
    cta: "Follow the loop",
    signal: "core",
  },
  {
    label: "OUTPUT",
    title: "Static export",
    text: "The deployed site is generated at build time and served as static files.",
    href: "https://github.com/jcosta33/suspec-website",
    cta: "Open source",
    external: true,
    signal: "reference",
  },
  {
    label: "CONTENT",
    title: "Docs source",
    text: "Canonical framework docs are pulled from the sibling Suspec repository.",
    href: "/docs/",
    cta: "Read the docs",
    newTab: true,
    signal: "reference",
  },
] satisfies Array<{
  label: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  external?: boolean;
  newTab?: boolean;
  signal: SignalRole;
}>;

export default function ColophonPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="site record / build notes"
          motif="manual"
          title="Colophon"
          tone="core"
        >
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-concrete-400 sm:text-xl">
            How this website is built, sourced, and shipped.
          </p>
        </PageHero>
      </Section>

      <Section className="colophon-section grid content-start gap-5 py-0 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel brushed className="colophon-terminal-shell p-1.5 sm:p-2">
          <TerminalWindow
            title="build.manifest"
            contentClassName="colophon-terminal-content max-h-none overflow-visible"
          >
            <div className="space-y-4 sm:space-y-5">
              <div>
                <h2 className="font-heading text-3xl font-bold tracking-[0] text-concrete-100">
                  Build record
                </h2>
                <p className="mt-2 text-concrete-400">
                  Built with Suspec. Drafted, reviewed, and merged through the
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
          meta="built with the same suspec workflow"
          className="colophon-paper"
        >
          <p>
            The website is a Next.js export. Specs, tasks, review notes, and
            findings live with the source.
          </p>
          <p className="mt-4">
            <Link
              href="https://github.com/jcosta33/suspec-website"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-11 items-center rounded-sm px-1 font-semibold text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
            >
              Open the website repo
            </Link>
          </p>
        </PaperArtifact>

        <Panel
          brushed
          screws
          className="colophon-build-trace px-4 py-3 sm:px-5 lg:col-span-2"
        >
          <div className="colophon-build-trace-inner">
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-brass">
              Build trace
            </p>
            <ol aria-label="Website build trace">
              {buildTrace.map((item, index) => (
                <li key={item}>
                  <span className="colophon-build-trace-dot" aria-hidden="true" />
                  <span>{item}</span>
                  <span className="sr-only">
                    {index + 1} of {buildTrace.length}
                  </span>
                </li>
              ))}
            </ol>
            <dl className="colophon-provenance-grid">
              {provenanceFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          {trace.map((item, index) => (
            <Card
              key={item.title}
              signal={item.signal}
              href={item.href}
              target={item.external || item.newTab ? "_blank" : undefined}
              rel={item.external || item.newTab ? "noopener noreferrer" : undefined}
              ariaLabel={`${item.cta}${item.external || item.newTab ? " (opens in new tab)" : ""}`}
              screws
              className="colophon-trace-card h-full border-panel-border"
              contentClassName="flex h-full flex-col space-y-3"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-brass">
                  {item.label}
                </p>
                <span className="font-mono text-xs text-brass/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-heading text-xl font-bold text-concrete-100">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed text-concrete-400">
                {item.text}
              </p>
              <span className="mt-auto inline-flex min-h-9 w-fit items-center gap-2 pt-2 font-mono text-xs font-semibold uppercase tracking-wide text-suspec-yellow">
                {item.cta}
                {item.external ? (
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ArrowRight
                    className="motion-nudge-x h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
