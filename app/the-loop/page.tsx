import type { Metadata } from "next";
import {
  Terminal,
  ArrowRight,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { GiltBand } from "../components/GiltBand";
import { PageHero } from "../components/PageHero";
import { HeroTrace } from "../components/HeroTrace";
import { Heading } from "../components/Heading";
import { PaperArtifact } from "../components/PaperArtifact";
import { LoopDiagram } from "../components/LoopDiagram";
import { TextLink } from "../components/TextLink";
import { JsonLd } from "../components/JsonLd";
import { signalRoles } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";
import { loopStepHref, loopSteps } from "./loopSteps";

const SITE_URL = "https://suspecframework.dev";
const loopDescription =
  "The Suspec loop: intent, spec, implement, review, check, and findings. Most changes use the three keys — intent, review, findings. Promotion moves a selected record into project-owned permanence when it needs to stay.";
const loopTitle = "The Suspec loop — spec, implement, review, check";

export const metadata: Metadata = {
  title: loopTitle,
  description: loopDescription,
  openGraph: {
    title: loopTitle,
    description: loopDescription,
    type: "website",
    url: "/the-loop/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-the-loop.png",
        width: 1200,
        height: 630,
        alt: "The Suspec loop — Intent, Spec, Implement, Review, Check, Findings",
      },
    ],
  },
  alternates: canonicalAlternates("/the-loop/"),
};

const trivialPathLines = [
  "Fix: expired refresh tokens must redirect to /login, not 500.",
  "Verify with: pnpm test:run auth-refresh-expired-token",
].join("\n");

const steps = loopSteps;

export default function TheLoopPage() {
  const loopJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/the-loop/#webpage`,
    name: "The Suspec loop",
    url: `${SITE_URL}/the-loop/`,
    description: metadata.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      name: "Suspec loop steps",
      itemListElement: steps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.name,
        url: `${SITE_URL}${loopStepHref(step.slug)}`,
        description: `${step.output}; hands off to ${step.handoff}. ${step.descriptor}.`,
      })),
    },
  };

  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="workflow / six steps"
          motif="loop"
          title={
            <>
              The <span className="text-suspec-yellow">loop</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Start with intent. Add spec, review, checks, and findings only when
            the work earns them.
          </p>
          <HeroTrace
            ariaLabel="Suspec loop trace"
            items={steps.map((step) => ({
              label: step.name,
              signal: "core",
            }))}
          />
        </PageHero>
      </Section>

      <Section
        id="trivial"
        register="01 / the trivial path"
        registerTone="evidence"
        className="reveal grid gap-8 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <div className={`section-kicker ${signalRoles.evidence.sectionKicker}`}>
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>the trivial path first</span>
          </div>
          <Heading className="mt-3">Most changes stop here.</Heading>
          <p className="mt-4 text-concrete-400">
            State one line, implement, run the verification command, paste the
            output. No file or packet.
          </p>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="inline spec — the whole thing"
            ariaLabel="A one-line inline spec"
            copyText={trivialPathLines}
          >
            <p className="text-concrete-100">
              Fix: expired refresh tokens must redirect to /login, not 500.
            </p>
            <p className="text-concrete-100">
              Verify with: pnpm test:run auth-refresh-expired-token
            </p>
            <p className="mt-3 text-concrete-400">
              Implement. Run. Paste output.
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        register="02 / seal map"
        registerTone="core"
        className="loop-seal-section grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
      >
        <div className="max-w-3xl space-y-3 lg:col-span-2">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-signal-reference">
            loop ledger
          </p>
          <Heading>Records between steps</Heading>
          <p className="text-concrete-400">
            Records move by explicit path and stay beside your harness&apos;s
            artifacts. Promote only the few that belong in the project.
          </p>
        </div>
        <div className="contents lg:order-none lg:grid lg:content-start lg:gap-4">
          <div className="order-2 lg:order-none">
            <PaperArtifact
              label="note"
              title="the keys"
              meta="Intent · Review · Findings"
            >
              <p>
                Intent states the work. Review reconciles the evidence.
                Findings keep what survives.
              </p>
            </PaperArtifact>
          </div>
          <Panel
            variant="inset"
            className="order-3 p-5 lg:order-none"
          >
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-suspec-yellow">
              the scaffold
            </p>
            <p className="mt-3 text-sm text-concrete-400">
              Use only what the work earns.
            </p>
            <ul className="mt-4 divide-y divide-panel-border/70 text-sm text-concrete-400">
              <li className="py-3 first:pt-0">
                <span className="font-semibold text-concrete-100">Task</span>{" "}
                — only when one spec splits.
              </li>
              <li className="py-3">
                <span className="font-semibold text-concrete-100">
                  Inventory / change plan
                </span>{" "}
                — for brownfield or structural work.
              </li>
              <li className="py-3 last:pb-0">
                <span className="font-semibold text-concrete-100">
                  Checker
                </span>{" "}
                — facts and exit codes, never a verdict.
              </li>
            </ul>
            <div className="mt-5 border-t border-panel-border/70 pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-signal-reference">
                promotion
              </p>
              <p className="mt-3 text-sm text-concrete-400">
                Move a useful record home. Repair references, validate, then
                choose whether to commit.
              </p>
              <TextLink href="/skills/promote/" touchTarget={false} className="mt-3">
                Read the promote skill
              </TextLink>
            </div>
          </Panel>
        </div>
        <div className="order-1 lg:order-none">
          <LoopDiagram linkSteps compact />
        </div>
      </Section>

      <GiltBand height="sm" />

      <Section register="03 / start" registerTone="core">
        <Card
          signal="core"
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading>Ready to run it?</Heading>
            <p className="mt-2 text-concrete-400">
              Install the skills —{" "}
              <code>npx skills add jcosta33/suspec-skills -g</code> — and
              write one spec. The same loop handles the next change.
            </p>
            <p className="mt-4 text-sm text-concrete-400">
              Source:{" "}
              <TextLink
                href="/docs/02-basic-workflow/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read docs/02-basic-workflow.md (opens in new tab)"
              >
                docs/02-basic-workflow.md
              </TextLink>
            </p>
          </div>
          <TextLink
            href="/get-started/"
            className="shrink-0 gap-2 text-base font-semibold"
            touchTarget
          >
            Get started{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TextLink>
        </Card>
      </Section>

      <GiltBand height="sm" />
      <JsonLd data={loopJsonLd} />
    </div>
  );
}
