import type { Metadata } from "next";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { HeroTrace } from "../components/HeroTrace";
import { Heading } from "../components/Heading";
import { JsonLd } from "../components/JsonLd";
import { TextLink } from "../components/TextLink";
import { signalRoles } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  LayoutList,
  NotebookPen,
  XCircle,
} from "lucide-react";

const SITE_URL = "https://suspecframework.dev";
const overviewDescription =
  "A methodology for structured agent work: lean specs, evidence-backed reviews, and durable findings. It coexists with your existing workflow.";
const overviewTitle = "What is Suspec? — specs, evidence, review";

export const metadata: Metadata = {
  title: overviewTitle,
  description: overviewDescription,
  openGraph: {
    title: overviewTitle,
    description: overviewDescription,
    type: "website",
    url: "/what-is-suspec/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-what-is-suspec.png",
        width: 1200,
        height: 630,
        alt: "What is Suspec? — a spec and review methodology shipped as skills",
      },
    ],
  },
  alternates: canonicalAlternates("/what-is-suspec/"),
};

const isList = [
  {
    label: "spec",
    text: "lean specs, down to one inline line",
    icon: FileText,
  },
  {
    label: "task",
    text: "task packets only when one spec splits",
    icon: LayoutList,
  },
  {
    label: "review",
    text: "evidence reconciled per requirement",
    icon: NotebookPen,
  },
];

const isNotList = [
  { label: "runtime", text: "an agent or agent runtime" },
  { label: "tracker", text: "an issue tracker" },
  {
    label: "verdict",
    text: "a correctness certificate",
  },
];

export default function WhatIsSuspecPage() {
  const overviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/what-is-suspec/#about`,
    name: "What is Suspec?",
    url: `${SITE_URL}/what-is-suspec/`,
    description: overviewDescription,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Suspec",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      url: SITE_URL,
      description: overviewDescription,
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        name: "What Suspec is",
      },
      {
        "@type": "WebPageElement",
        name: "What Suspec is not",
      },
      {
        "@type": "WebPageElement",
        name: "Specs are not src",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="system overview"
          motif="overview"
          tone="core"
          title={
            <>
              What is{" "}
              <span className="text-suspec-yellow">Suspec?</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            {overviewDescription}
          </p>
          <HeroTrace
            ariaLabel="Suspec loop"
            items={[
              { label: "Intent", signal: "reference" },
              { label: "Spec", signal: "core" },
              { label: "Implement", signal: "core" },
              { label: "Review", signal: "evidence" },
              { label: "Check", signal: "evidence" },
              { label: "Findings", signal: "reference" },
            ]}
          />
        </PageHero>
      </Section>

      <Section
        id="boundaries"
        register="01 / boundaries"
        registerTone="muted"
        className="reveal grid gap-12 md:grid-cols-2"
      >
        <Panel
          variant="inset"
          className="overview-boundary-panel overview-boundary-panel-is h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.evidence.sectionKicker}`}>
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is</span>
          </div>
          <Heading className="mt-3">What Suspec is</Heading>
          <ul className="overview-is-list mt-6 space-y-4">
            {isList.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  className="overview-is-item flex items-start gap-4 text-concrete-100"
                >
                  <HexBadge color="evidence" className="overview-is-icon">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <span className="overview-boundary-copy grid min-w-0 gap-1 pt-3 leading-snug">
                    <span className="overview-boundary-label block">
                      {item.label}:{" "}
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
          className="overview-boundary-panel overview-boundary-panel-not h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <XCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is not</span>
          </div>
          <Heading className="mt-3">What Suspec is not</Heading>
          <ul className="overview-not-list mt-5 divide-y divide-panel-border/70">
            {isNotList.map((item) => (
              <li
                key={item.text}
                className="overview-not-item flex items-start gap-3 py-3 text-concrete-400 first:pt-0 last:pb-0"
              >
                <XCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-signal-change"
                  aria-hidden="true"
                />
                <span className="overview-boundary-copy grid min-w-0 gap-1 leading-snug">
                  <span className="overview-boundary-label block">
                    {item.label}:{" "}
                  </span>
                  <span>{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </Section>

      <Section
        id="specs-are-not-src"
        register="02 / straight talk"
        registerTone="muted"
        className="reveal grid gap-12 md:grid-cols-2"
      >
        <Panel
          variant="inset"
          className="h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.core.sectionKicker}`}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>code is king</span>
          </div>
          <Heading className="mt-3">Artifacts are transient</Heading>
          <p className="mt-4 text-concrete-400">
            Working files live beside native harness artifacts, not in the
            repo by default. Decisions become ADRs, behavior tests, lessons
            native memory, and discussion stays on the PR.
          </p>
        </Panel>

        <Panel
          variant="inset"
          className="h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <XCircle className="h-4 w-4" aria-hidden="true" />
            <span>plan, don&apos;t compile</span>
          </div>
          <Heading className="mt-3">Specs are not src</Heading>
          <p className="mt-4 text-concrete-400">
            Specs are not source. LLMs are not compilers. A spec still gives
            the agent a plan, reviewers a target, and findings somewhere to
            land. Promote only what deserves to stay.
          </p>
        </Panel>
      </Section>

      <Section id="next-step" register="03 / next step" registerTone="core">
        <Card
          signal="core"
          screws
          className="overview-next-card"
          contentClassName="overview-next-content grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
        >
          <div className="overview-next-copy">
            <Heading>See how it actually runs</Heading>
            <p className="mt-2 text-concrete-400">
            Six steps. Records appear when earned and travel by explicit path.
            No runtime. No automatic decision.
            </p>
            <p className="overview-next-source mt-4 text-sm text-concrete-400">
              Source:{" "}
              <TextLink
                href="/docs/01-what-is-suspec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read docs/01-what-is-suspec.md (opens in new tab)"
                className="overview-source-link"
              >
                docs/01-what-is-suspec.md
              </TextLink>
            </p>
          </div>
          <nav
            className="overview-next-nav md:min-w-64"
            aria-label="Where to read next"
          >
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-signal-core">
              next records
            </p>
            <ul className="overview-next-links mt-2 grid gap-1">
              <li>
                <TextLink
                  href="/the-loop/"
                  className="gap-2 text-base font-semibold"
                  touchTarget
                >
                  See the loop{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              </li>
              <li>
                <TextLink href="/get-started/" className="gap-2" touchTarget>
                  Install the skills
                </TextLink>
              </li>
              <li>
                <TextLink href="/cli/" className="gap-2" touchTarget>
                  Read the CLI page
                </TextLink>
              </li>
              <li>
                <TextLink href="/mcp/" className="gap-2" touchTarget>
                  Read the MCP page
                </TextLink>
              </li>
            </ul>
          </nav>
        </Card>
      </Section>
      <JsonLd data={overviewJsonLd} />
    </div>
  );
}
