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
import { signalRoles, type SignalRole } from "../components/signalStyles";

const stepIcons = [Inbox, FileText, ListChecks, Terminal, ScanEye, GitMerge];

export const metadata: Metadata = {
  title: "The loop — Corpus",
  description:
    "Pull, Spec, Task, Run, Review, Close: the Corpus workflow.",
  openGraph: {
    title: "The loop — Corpus",
    description:
      "Pull, Spec, Task, Run, Review, Close: the Corpus workflow.",
    type: "website",
    url: "/the-loop/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-the-loop.png",
        width: 1200,
        height: 630,
        alt: "The Corpus loop — Pull, Spec, Task, Run, Review, Close",
      },
    ],
  },
  alternates: {
    canonical: "/the-loop/",
  },
};

const steps = [
  {
    number: "01",
    name: "Pull",
    signal: "core",
    optional: true,
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
    body: "Merge, save useful findings, and update the board.",
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
  body: string;
  example: {
    title: string;
    lines: Array<{ prompt: boolean; text: string }>;
  };
}>;

export default function TheLoopPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="workflow / six steps"
          motif="loop"
          title={
            <>
              The <span className="text-corpus-yellow">loop</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Six steps for moving agent work from request to review — the spec is
            the unit; Pull, Task, and the formal review are optional.
          </p>
          <HeroTrace
            ariaLabel="Corpus loop trace"
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
        <div className="order-1 grid gap-4 lg:order-none lg:content-start">
          <PaperArtifact
            label="note"
            title="six points / six steps"
            meta="Pull · Spec · Task · Run · Review · Close"
          >
            <p>
              Each point creates or checks the record the next point needs.
              Inventory and Change Plan appear for brownfield or structural
              work.
            </p>
          </PaperArtifact>
          <Panel variant="inset" className="p-5">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-corpus-yellow">
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
                <span className="font-semibold text-concrete-100">
                  Finding
                </span>{" "}
                carries a reusable lesson forward.
              </li>
            </ul>
          </Panel>
        </div>
        <div className="order-2 lg:order-none">
          <LoopDiagram linkSteps />
        </div>
      </Section>

      <GiltBand height="sm" />

      <Section
        register="02 / operating steps"
        registerTone="core"
        className="flex flex-col gap-14"
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
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`h-5 w-5 ${signalRoles[step.signal].text}`}
                        aria-hidden="true"
                      />
                      <Heading>{step.name}</Heading>
                      {step.optional && (
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
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
                        <span className="text-corpus-yellow">$ </span>
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
    </div>
  );
}
