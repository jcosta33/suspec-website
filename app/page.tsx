import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  FileText,
  LayoutList,
  NotebookPen,
  XCircle,
} from "lucide-react";
import { ActionLink } from "./components/ActionLink";
import { Button } from "./components/Button";
import { Eyebrow } from "./components/Eyebrow";
import { HexBadge } from "./components/HexBadge";
import { HeroHexGrid } from "./components/HeroHexGrid";
import { JsonLd } from "./components/JsonLd";
import { LoopDiagram } from "./components/LoopDiagram";
import { PageHero } from "./components/PageHero";
import { Panel } from "./components/Panel";
import { PaperArtifact } from "./components/PaperArtifact";
import { PilotLamp } from "./components/PilotLamp";
import { Section } from "./components/Section";
import { TerminalWindow } from "./components/TerminalWindow";
import { signalRoles, type SignalRole } from "./components/signalStyles";
import { canonicalAlternates } from "./seo";

const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Suspec",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  softwareVersion: "0.1.0",
  url: "https://suspecframework.dev",
  description:
    "Agent work with a paper trail. Skills implement the method; the optional CLI checks the records.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://suspecframework.dev/#organization" },
};

export const metadata: Metadata = {
  title: "Suspec — agent work with receipts",
  description:
    "Agent work with a paper trail. Skills implement the method; the optional CLI checks the records.",
  openGraph: {
    title: "Suspec — agent work with receipts",
    description:
      "Agent work with a paper trail. Skills implement the method; the optional CLI checks the records.",
    type: "website",
    url: "/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Suspec — agent work with receipts",
      },
    ],
  },
  alternates: canonicalAlternates("/"),
};

const heroInstallCommand = "npx skills add jcosta33/suspec-skills -g";

const heroCheckCommand = "suspec check review.md --spec spec.md";

const overviewParts = [
  {
    label: "spec",
    text: "the work, the bar, and how to verify it",
    icon: FileText,
  },
  {
    label: "task",
    text: "a split packet when one spec becomes parallel work",
    icon: LayoutList,
  },
  {
    label: "review",
    text: "evidence checked against the bar",
    icon: NotebookPen,
  },
] as const;

const overviewBoundaries = [
  { label: "runtime", text: "Your agent still does the typing." },
  { label: "tracker", text: "Tickets stay where they are." },
  { label: "verdict", text: "Facts in. Human decision out." },
] as const;

const heroProofs = [
  {
    label: "Plain markdown",
    text: "Readable anywhere.",
    signal: "reference",
  },
  {
    label: "Any agent",
    text: "Install once. Repos stay clean.",
    signal: "muted",
  },
  {
    label: "Human review",
    text: "Facts, never verdicts.",
    signal: "evidence",
  },
] as const satisfies Array<{
  label: string;
  text: string;
  signal: SignalRole;
}>;

function HeroProofStrip() {
  return (
    <ul className="home-hero-proof-strip mx-auto mt-6 grid max-w-3xl gap-2 text-left sm:grid-cols-3">
      {heroProofs.map((proof) => (
        <li
          key={proof.label}
          aria-label={`${proof.label}: ${proof.text}`}
          className={`home-hero-proof home-hero-proof-${proof.signal} shadow-proof-hairline group flex min-w-0 items-start gap-3 rounded-panel border bg-panel/80 px-3 py-3 transition-colors duration-150`}
        >
          <PilotLamp
            color={proof.signal}
            className="home-hero-proof-lamp mt-0.5 scale-75"
          />
          <div className="min-w-0">
            <p className="home-hero-proof-label font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em]">
              {proof.label}
            </p>
            <p className="home-hero-proof-body mt-1 text-sm leading-snug text-concrete-400">
              {proof.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="home-hero-section relative isolate border-b border-panel-border">
        <HeroHexGrid />
        <Section className="ambient-header relative z-10">
          <PageHero
            eyebrow="methodology / shipped as skills"
            motif="loop"
            titleSize="default"
            title="Show, not tell."
          >
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
              Structure agent work. State intent, verify output, keep what
              survives. No runtime.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full max-w-72 sm:w-auto sm:max-w-none">
                <Link href="/get-started/">
                  Start the loop{" "}
                  <ArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <ActionLink
                href="/docs/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read the docs (opens in a new tab)"
                className="w-auto"
              >
                Read the docs
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </ActionLink>
            </div>
            <p className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 font-mono text-sm text-concrete-100">
              <span className="text-signal-core" aria-hidden="true">
                $
              </span>
              <code>{heroInstallCommand}</code>
            </p>
            <HeroProofStrip />
          </PageHero>

          <Panel brushed screws className="hover-stable-surface home-hero-preview mx-auto mt-10 max-w-6xl p-3">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="home-hero-run-card min-w-0 rounded-panel border border-panel-border bg-panel p-4">
                <TerminalWindow
                  title="suspec check"
                  copyText={heroCheckCommand}
                  copyLabel="Copy command"
                  className="mt-4"
                >
                  <p className="text-concrete-500"># the honesty floor</p>
                  <p>
                    <span className="text-signal-core">$</span> suspec check
                    <wbr /> review.md --spec spec.md
                  </p>
                  <p className="mt-2 text-signal-change">
                    C016 pass-needs-evidence — AC-002 marked Pass, evidence
                    cell empty
                  </p>
                  <p className="hidden text-signal-evidence md:block">
                    C012 coverage — all in-scope requirements have coverage
                    rows
                  </p>
                  <p className="hidden text-concrete-400 md:block">
                    exit 2 — blocking. Facts only; the result stays yours.
                  </p>
                </TerminalWindow>
              </div>

              <PaperArtifact
                label="review"
                title="review.md"
                meta="~/.claude/projects/acme-api/ · review packet"
                className="home-hero-artifact"
              >
                <p>
                  AC-001 <span className="paper-stamp ml-2">pass</span>
                </p>
                <p className="text-pencil">
                  Evidence: `npm test auth-refresh` pasted, exit 0.
                </p>
              </PaperArtifact>
            </div>
          </Panel>
        </Section>
      </section>

      <section
        id="what-is-suspec"
        className="border-y border-panel-border bg-section-band py-16 scroll-mt-24 sm:py-20"
      >
        <Section
          register="01 / overview"
          registerTone="evidence"
          className="section-flow"
        >
          <div className="max-w-3xl">
            <Eyebrow>structured plan mode</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Plan mode, with receipts.
            </h2>
            <p className="mt-4 max-w-2xl text-concrete-400">
              Suspec gives agent work a shape: state the work, set the bar,
              keep the proof. Your planner, tracker, and repo keep their jobs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:items-start">
            <Panel
              variant="inset"
              className="overview-boundary-panel overview-boundary-panel-is p-5 sm:p-6"
            >
              <div className={`section-kicker ${signalRoles.evidence.sectionKicker}`}>
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                <span>what it is</span>
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold text-concrete-100">
                Useful paperwork
              </h3>
              <ul className="overview-is-list mt-6 space-y-4">
                {overviewParts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.label}
                      className="overview-is-item flex items-start gap-4 text-concrete-100"
                    >
                      <HexBadge color="evidence" className="overview-is-icon">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <span className="overview-boundary-copy grid min-w-0 gap-1 pt-3 leading-snug">
                        <span className="overview-boundary-label block">
                          {item.label}:
                        </span>
                        <span>{item.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Panel>

            <Panel
              variant="inset"
              className="overview-boundary-panel overview-boundary-panel-not p-5 sm:p-6"
            >
              <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
                <XCircle className="h-4 w-4" aria-hidden="true" />
                <span>what it is not</span>
              </div>
              <h3 className="mt-3 font-heading text-xl font-semibold text-concrete-100">
                Another platform
              </h3>
              <ul className="overview-not-list mt-5 divide-y divide-panel-border/70">
                {overviewBoundaries.map((item) => (
                  <li
                    key={item.label}
                    className="overview-not-item flex items-start gap-3 py-3 text-concrete-400 first:pt-0 last:pb-0"
                  >
                    <XCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-signal-change"
                      aria-hidden="true"
                    />
                    <span className="overview-boundary-copy grid min-w-0 gap-1 leading-snug">
                      <span className="overview-boundary-label block">
                        {item.label}:
                      </span>
                      <span>{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Section>
      </section>

      <section className="py-16 sm:py-20">
        <Section
          register="02 / loop"
          registerTone="core"
          className="section-flow"
        >
          <div className="max-w-2xl">
            <Eyebrow>workflow / six steps</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              The loop, without the ceremony.
            </h2>
            <p className="mt-4 text-concrete-400">
              Start with intent. Add structure only when the work earns it.
            </p>
          </div>
          <LoopDiagram linkSteps compact />
        </Section>
      </section>

      <section className="border-y border-panel-border bg-section-band py-16 sm:py-20">
        <Section
          id="specs-are-not-src"
          register="03 / evidence"
          registerTone="muted"
          className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <Eyebrow icon={<FileText className="h-4 w-4" aria-hidden="true" />}>
              plan, don&apos;t compile
            </Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Specs are not src.
            </h2>
            <p className="mt-4 text-concrete-400">
              LLMs are not compilers. Compilers don&apos;t cost a fortune to run
              or lie to you. A spec still gives the agent a plan, reviewers a
              target, and findings somewhere to land.
            </p>
            <p className="mt-3 text-sm text-concrete-400">
              Working records stay beside your harness artifacts. Promote the
              few worth keeping. Code stays king.
            </p>
          </div>
          <PaperArtifact
            label="spec"
            title="spec.md"
            meta="~/.claude/projects/acme-api/ · acceptance criterion"
          >
            <p>AC-003 — Expired refresh token redirects to login</p>
            <p className="mt-3 text-pencil">
              The client must clear local session state and route the user to
              `/login`.
            </p>
            <p className="mt-3">
              Verify with:{" "}
              <span className="font-semibold">
                npm test -- auth-refresh-expired
              </span>
            </p>
          </PaperArtifact>
        </Section>
      </section>

      <section className="relative py-16 sm:py-20">
        <Section register="04 / start" registerTone="core" className="text-center">
          <Eyebrow className="mx-auto">start / first pass</Eyebrow>
          <h2 className="mt-6 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
            Try it on one real change.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-concrete-400">
            Install the skills. Set the bar. Keep the receipts.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/get-started/">
                Start the loop{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <ActionLink
              href="https://github.com/jcosta33/suspec-skills"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the skills catalog on GitHub (opens in new tab)"
              className="w-full sm:w-auto"
            >
              View the skills catalog
            </ActionLink>
          </div>
        </Section>
      </section>

      <JsonLd data={softwareApp} />
    </>
  );
}
