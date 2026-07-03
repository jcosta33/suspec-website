import type { Metadata } from "next";
import {
  Inbox,
  FileText,
  ListChecks,
  Terminal,
  ScanEye,
  GitMerge,
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
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const stepIcons = [Inbox, FileText, ListChecks, Terminal, ScanEye, GitMerge];
const loopDescription =
  "Learn the Suspec loop: write a spec, hand off bounded task work, review evidence, and save findings without letting agents approve themselves.";
const loopTitle = "Suspec loop — spec, run, review, close";

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
        alt: "The Suspec loop — Pull, Spec, Task, Run, Review, Close",
      },
    ],
  },
  alternates: canonicalAlternates("/the-loop/"),
};

const steps = [
  {
    number: "01",
    name: "Pull",
    signal: "core",
    optional: true,
    output: "Intake note or source link",
    handoff: "Spec",
    body: "Point the spec's sources at the origin — a ticket, an issue, or self. When you want the raw request kept verbatim, capture it as an intake file first. Intake is optional; the spec is the unit.",
    example: {
      title: "intake/INTAKE-42.md",
      lines: [
        {
          prompt: false,
          text: "## INTAKE-42 — Add dark mode to marketing site",
        },
        { prompt: false, text: "" },
        { prompt: false, text: "- Requested by: design" },
        { prompt: false, text: "- Scope: homepage and global shell only" },
        { prompt: false, text: "- Deadline: launch week" },
        {
          prompt: false,
          text: "- Links: SPEC-design-system, CHANGE-website-launch",
        },
      ],
    },
  },
  {
    number: "02",
    name: "Spec",
    signal: "core",
    output: "Requirements with checks",
    handoff: "Task or Run",
    body: "Write requirements one per ID. Add the check for each one.",
    example: {
      title: "specs/shell/spec.md",
      lines: [
        {
          prompt: false,
          text: "### AC-003 — Global shell includes nav and footer",
        },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "A Shell component renders on every route via app/layout.tsx.",
        },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "- Nav: logo, links, mobile hamburger below lg.",
        },
        { prompt: false, text: "- Footer: copyright, links, colophon line." },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "Verify with: npm run build passes; every generated page contains",
        },
        { prompt: false, text: "exactly one <nav> and one <footer>." },
      ],
    },
  },
  {
    number: "03",
    name: "Task",
    signal: "core",
    optional: true,
    output: "Bounded task packet",
    handoff: "Run",
    body: "Only when one spec splits into parallel slices — most work is one spec → one implementer, no task file. When you do split, hand each agent a bounded packet: scope, do-not-change, Verify commands.",
    example: {
      title: "tasks/TASK-shell.md",
      lines: [
        { prompt: false, text: "## TASK-shell" },
        { prompt: false, text: "" },
        { prompt: false, text: "Scope: implement Shell component per AC-003." },
        { prompt: false, text: "Do not change: homepage content, analytics." },
        { prompt: false, text: "Verify:" },
        { prompt: false, text: "- npm run build passes" },
        { prompt: false, text: "- grep finds 1 <nav> and 1 <footer> per page" },
      ],
    },
  },
  {
    number: "04",
    name: "Run",
    signal: "core",
    output: "Execution evidence",
    handoff: "Review",
    body: "Implement the spec (or the task, when split); paste real evidence per requirement.",
    example: {
      title: "specs/shell/spec.md",
      lines: [
        { prompt: false, text: "## Execution" },
        { prompt: false, text: "" },
        { prompt: true, text: "npm run build" },
        { prompt: false, text: "✓ Compiled successfully" },
        { prompt: false, text: "Route (app): /, /kitchen-sink" },
        { prompt: false, text: "" },
        { prompt: true, text: "grep -o '<nav>' out/index.html | wc -l" },
        { prompt: false, text: "1" },
      ],
    },
  },
  {
    number: "05",
    name: "Review",
    signal: "core",
    optional: true,
    output: "Review packet or notes",
    handoff: "Close",
    body: "A non-implementer checks evidence per requirement. The formal packet is optional for a small change you verified — the judgment isn't.",
    example: {
      title: "reviews/REVIEW-shell.md",
      lines: [
        {
          prompt: false,
          text: "| AC    | Result      | Evidence                  |",
        },
        {
          prompt: false,
          text: "|-------|-------------|---------------------------|",
        },
        {
          prompt: false,
          text: "| AC-003| Pass        | 1 nav, 1 footer found     |",
        },
        {
          prompt: false,
          text: "| AC-009| Unverified  | manual resize pending     |",
        },
      ],
    },
  },
  {
    number: "06",
    name: "Close",
    signal: "core",
    output: "Findings and board update",
    handoff: "Next Pull",
    body: "Merge, record any decision, save durable findings, and update the board.",
    example: {
      title: "findings/FINDING-tailwind-v4-syntax.md",
      lines: [
        { prompt: false, text: "## FINDING-tailwind-v4-syntax" },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "When adding custom keyframes in Tailwind v4, use plain CSS",
        },
        {
          prompt: false,
          text: "classes rather than escaped utility prefixes to avoid PostCSS",
        },
        { prompt: false, text: "parse errors." },
      ],
    },
  },
] satisfies Array<{
  number: string;
  name: string;
  signal: SignalRole;
  optional?: boolean;
  output: string;
  handoff: string;
  body: string;
  example: {
    title: string;
    lines: Array<{ prompt: boolean; text: string }>;
  };
}>;

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
        url: `${SITE_URL}/the-loop/#${step.name.toLowerCase()}`,
        description: `${step.output}; hands off to ${step.handoff}. ${step.optional ? "Optional step." : "Core step."}`,
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
            Six steps for moving agent work from request to review — the spec is
            the unit; Pull, Task, and the formal review are optional.
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
        register="01 / seal map"
        registerTone="core"
        className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
      >
        <div className="loop-ledger-panel panel-raised lg:col-span-2">
          <div className="loop-ledger-copy">
            <p className="loop-ledger-kicker">loop ledger</p>
            <h2>Six steps, six handoffs</h2>
            <p>
              Each step either creates a record or checks one. The next step
              should be able to continue without reading the chat transcript.
            </p>
          </div>
          <ol className="loop-ledger-list" aria-label="Suspec loop handoffs">
            {steps.map((step) => (
              <li key={step.name} className="loop-ledger-item">
                <a href={`#${step.name.toLowerCase()}`}>
                  <span className="loop-ledger-number">{step.number}</span>
                  <span className="loop-ledger-body">
                    <span className="loop-ledger-title">
                      {step.name}
                      {step.optional ? (
                        <span className="loop-ledger-status">optional</span>
                      ) : null}
                    </span>
                    <span className="loop-ledger-meta">
                      <span>{step.output}</span>
                      <span aria-hidden="true">→</span>
                      <span>{step.handoff}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="contents lg:order-none lg:grid lg:content-start lg:gap-4">
          <div className="order-2 lg:order-none">
            <PaperArtifact
              label="note"
              title="loop points / core steps"
              meta="Pull · Spec · (Task) · Run · Review · Close"
            >
              <p>
                Each point creates or checks the record the next point needs.
                Inventory and Change Plan appear for brownfield or structural
                work.
              </p>
            </PaperArtifact>
          </div>
          <Panel
            variant="inset"
            className="order-3 p-5 lg:order-none"
          >
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-suspec-yellow">
              prep records
            </p>
            <ul className="mt-4 divide-y divide-panel-border/70 text-sm text-concrete-400">
              <li className="py-3 first:pt-0">
                <span className="font-semibold text-concrete-100">
                  Inventory
                </span>{" "}
                maps what already exists.
              </li>
              <li className="py-3">
                <span className="font-semibold text-concrete-100">
                  Change Plan
                </span>{" "}
                records what must survive.
              </li>
              <li className="py-3 last:pb-0">
                <span className="font-semibold text-concrete-100">Finding</span>{" "}
                carries a reusable lesson forward.
              </li>
            </ul>
          </Panel>
        </div>
        <div className="order-1 lg:order-none">
          <LoopDiagram linkSteps />
        </div>
      </Section>

      <GiltBand height="sm" />

      <Section
        register="02 / operating steps"
        registerTone="core"
        className="section-flow section-flow-spacious"
      >
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
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
                      {step.optional && (
                        <span className="loop-operating-optional font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
                          optional
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

      <Section register="03 / start" registerTone="core">
        <Card
          signal="core"
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading>Ready to run it?</Heading>
            <p className="mt-2 text-concrete-400">
              Copy the starter kit and write one spec. The same loop handles
              the next task.
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
            Set up your workspace{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TextLink>
        </Card>
      </Section>

      <GiltBand height="sm" />
      <JsonLd data={loopJsonLd} />
    </div>
  );
}
