import type { Metadata } from "next";
import {
  ListChecks,
  Terminal,
  ScanEye,
  Split,
  ArrowRight,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { GiltBand } from "../components/GiltBand";
import { HexBadge } from "../components/HexBadge";
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

const taskExample = {
  title: "~/.claude/projects/acme-site/task-shell.md",
  lines: [
    { prompt: false, text: "## Task — shell slice" },
    { prompt: false, text: "" },
    { prompt: false, text: "Scope: implement Shell component per AC-003." },
    { prompt: false, text: "Do not change: homepage content, analytics." },
    { prompt: false, text: "Verify:" },
    { prompt: false, text: "- npm run build passes" },
    { prompt: false, text: "- grep finds 1 <nav> and 1 <footer> per page" },
  ],
};

const commonPaths = [
  {
    work: "Trivial fix",
    path: "one-line inline spec → implement → verify → done",
  },
  {
    work: "Small feature",
    path: "spec → implement → review → check",
  },
  {
    work: "Bug fix against an existing spec",
    path: "amend the spec → implement → review → check",
  },
  {
    work: "Brownfield change",
    path: "inventory → spec → implement → review → check",
  },
  {
    work: "Migration or rewrite",
    path: "inventory → spec → change plan → wave tasks → reviews",
  },
  {
    work: "PR that already exists",
    path: "write the acceptance bar as a spec → review against it",
  },
] as const;

const dontSkip = [
  "verification output — real, pasted, per requirement",
  "independent review — a non-implementer judges it; the formal packet scales with risk",
  "evidence for every Pass — empty evidence means Unverified, never Pass",
  "a visible record of blocked or unverified work",
] as const;

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
            Most changes need one line, not a file. When the diff earns a
            contract, run intent → spec → implement → review → check → findings.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-concrete-400">
            Intent, review, and findings are the keys. The rest is scaffold the
            work pulls in when useful. No filing cabinet for a typo.
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
            For a trivial fix, state the spec in one line in the conversation.
            Implement, run the Verify with: command, paste the output. Done.
            No file, packet, or check run required.
          </p>
          <p className="mt-3 text-concrete-400">
            Proportional rigor means the scaffold exists for work that earns
            it. A typo does not need a committee.
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
              Implement it, run the command, paste the real output. That is
              the entire ceremony.
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
                <span className="font-semibold text-concrete-100">
                  <a href="#task">Task</a>
                </span>{" "}
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
                Move one useful transient record home. Repair references,
                validate the destination, then choose whether to commit it.
              </p>
              <TextLink href="/skills/promote/" touchTarget={false} className="mt-3">
                Read the promote skill
              </TextLink>
            </div>
          </Panel>
        </div>
        <div className="order-1 lg:order-none">
          <LoopDiagram linkSteps />
        </div>
      </Section>

      <GiltBand height="sm" />

      <Section
        register="03 / operating steps"
        registerTone="core"
        className="section-flow section-flow-spacious"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={step.name}
              id={step.name.toLowerCase()}
              className={`loop-operating-step loop-operating-step-${step.signal} reveal relative grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-start`}
            >
              <div className="loop-operating-copy relative">
                {index < steps.length - 1 && (
                  <div
                    className="loop-operating-rail absolute left-[1.75rem] top-20 hidden h-[calc(100%+4rem)] w-px lg:block"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-start gap-4">
                  <HexBadge color={step.signal}>
                    <span
                      className={`font-mono text-xs font-bold ${signalRoles[step.signal].text}`}
                    >
                      {step.number}
                    </span>
                  </HexBadge>
                  <div>
                    <div className="loop-operating-title-row flex items-center gap-2">
                      <Icon
                        className={`h-5 w-5 ${signalRoles[step.signal].text}`}
                        aria-hidden="true"
                      />
                      <Heading>{step.name}</Heading>
                      {step.descriptor && (
                        <span className="loop-operating-optional font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
                          {step.descriptor}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-concrete-400">{step.body}</p>
                  </div>
                </div>
              </div>
              <Panel
                brushed
                className={`loop-operating-terminal loop-operating-terminal-${step.signal} p-2`}
              >
                <TerminalWindow
                  title={step.example.title}
                  ariaLabel={`${step.name} — ${step.example.title}`}
                  copyText={step.example.lines
                    .map((line) => `${line.prompt ? "$ " : ""}${line.text}`)
                    .join("\n")}
                >
                  {step.example.lines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.prompt ? "text-concrete-100" : "text-concrete-400"
                      }
                    >
                      {line.prompt && (
                        <span className="text-suspec-yellow">$ </span>
                      )}
                      {line.text}
                    </p>
                  ))}
                </TerminalWindow>
              </Panel>
            </article>
          );
        })}
      </Section>

      <Section
        register="04 / the task split"
        registerTone="core"
        className="section-flow"
      >
        <article
          id="task"
          className="loop-operating-step loop-operating-step-core reveal relative grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-start"
        >
          <div className="loop-operating-copy relative">
            <div className="flex items-start gap-4">
              <HexBadge color="core">
                <Split
                  className={`h-4 w-4 ${signalRoles.core.text}`}
                  aria-hidden="true"
                />
              </HexBadge>
              <div>
                <div className="loop-operating-title-row flex items-center gap-2">
                  <Heading>Task</Heading>
                  <span className="loop-operating-optional font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
                    scaffold
                  </span>
                </div>
                <p className="mt-4 text-concrete-400">
                  Cut only when one spec splits into parallel slices — the
                  common 1:1 case has no task packet; the implementer works
                  from the spec. When you do split, hand each agent a bounded
                  packet by explicit path: scope, do-not-change, Verify
                  commands. The review names the task it judged, and the
                  check refuses a review whose task reference doesn&apos;t
                  resolve.
                </p>
              </div>
            </div>
          </div>
          <Panel
            brushed
            className="loop-operating-terminal loop-operating-terminal-core p-2"
          >
            <TerminalWindow
              title={taskExample.title}
              ariaLabel={`Task — ${taskExample.title}`}
              copyText={taskExample.lines
                .map((line) => `${line.prompt ? "$ " : ""}${line.text}`)
                .join("\n")}
            >
              {taskExample.lines.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.prompt ? "text-concrete-100" : "text-concrete-400"
                  }
                >
                  {line.prompt && (
                    <span className="text-suspec-yellow">$ </span>
                  )}
                  {line.text}
                </p>
              ))}
            </TerminalWindow>
          </Panel>
        </article>
      </Section>

      <GiltBand height="sm" />

      <Section
        register="05 / common paths"
        registerTone="reference"
        className="reveal grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
      >
        <Panel variant="inset" className="p-5 sm:p-6">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            <span>common paths</span>
          </div>
          <Heading className="mt-3">Match the ceremony to the risk</Heading>
          <p className="mt-4 text-concrete-400">
            Pick the row that fits the change; heavier forms stay reserved for
            the change that earns them.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-concrete-400">
                  <th scope="col" className="pb-3 pr-4 font-bold">
                    Work
                  </th>
                  <th scope="col" className="pb-3 font-bold">
                    Path
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border/70">
                {commonPaths.map((row) => (
                  <tr key={row.work}>
                    <th
                      scope="row"
                      className="py-3 pr-4 align-top font-semibold text-concrete-100"
                    >
                      {row.work}
                    </th>
                    <td className="py-3 align-top text-concrete-400">
                      {row.path}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel variant="inset" className="p-5 sm:p-6">
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <ScanEye className="h-4 w-4" aria-hidden="true" />
            <span>what not to skip</span>
          </div>
          <Heading className="mt-3">For code-changing work, keep</Heading>
          <ul className="mt-5 divide-y divide-panel-border/70 text-sm text-concrete-400">
            {dontSkip.map((item) => (
              <li key={item} className="py-3 first:pt-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </Section>

      <Section register="06 / start" registerTone="core">
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
