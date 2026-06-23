import type { Metadata } from "next";
import Link from "next/link";
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
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { GiltBand } from "../components/GiltBand";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Heading } from "../components/Heading";
import { PaperArtifact } from "../components/PaperArtifact";

const stepIcons = [Inbox, FileText, ListChecks, Terminal, ScanEye, GitMerge];

export const metadata: Metadata = {
  title: "The loop — corpus",
  description:
    "Pull → Spec → Task → Run → Review → Close. The six-step workflow for turning agent work into reviewable files.",
  openGraph: {
    title: "The loop — corpus",
    description:
      "Pull → Spec → Task → Run → Review → Close. A plain workflow for scoping agent work and reviewing the result.",
    type: "website",
    url: "/the-loop/",
    siteName: "corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-the-loop.png",
        width: 1200,
        height: 630,
        alt: "The corpus loop — Pull, Spec, Task, Run, Review, Close",
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
    body: "Copy the ticket into an intake file verbatim — unedited, uninterpreted. The spec is where you interpret; the intake just preserves what was actually asked, so it still anchors you after the upstream ticket changes or disappears.",
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
    body: "Write requirements one per ID, each with a verification method. If you cannot check it, keep editing.",
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
    body: "Hand the agent a bounded packet: what to change, what not to change, and how to verify.",
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
    body: "The agent implements and pastes real evidence — command output, screenshots, links — next to each requirement.",
    example: {
      title: "tasks/TASK-shell.md",
      lines: [
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
    body: "Check evidence per requirement. Human attention goes only where the evidence is missing or ambiguous.",
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
    body: "Merge the change, save findings so the next session can use them, and update the board.",
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
];

export default function TheLoopPage() {
  return (
    <div className="flex flex-col gap-20 py-20 sm:gap-24 sm:py-24">
      <Section className="ambient-header">
        <PageHero
          eyebrow="workflow / 6 stages"
          title={
            <>
              The <span className="text-corpus-yellow">loop</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Pull → Spec → Task → Run → Review → Close. Six steps, six files to
            inspect, and a clearer handoff between agent work and review.
          </p>
        </PageHero>
      </Section>

      <GiltBand height="sm" />

      <Section>
        <PaperArtifact
          label="note"
          title="six points / six steps"
          meta="Pull · Spec · Task · Run · Review · Close"
          className="mx-auto max-w-3xl"
        >
          <p>
            The mark follows the process: each point creates or checks the
            record the next point needs. Inventory and Change Plan appear when
            the work is brownfield or structural.
          </p>
        </PaperArtifact>
      </Section>

      <Section className="flex flex-col gap-16">
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <article
              key={step.name}
              className="reveal relative grid gap-8 lg:grid-cols-2 lg:items-start"
            >
              <div className="relative">
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-[1.75rem] top-20 hidden h-[calc(100%+4rem)] w-px bg-gradient-to-b from-brass/60 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-start gap-4">
                  <HexBadge color="yellow">
                    <span className="font-mono text-xs font-bold text-corpus-yellow">
                      {step.number}
                    </span>
                  </HexBadge>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon
                        className="h-5 w-5 text-corpus-yellow"
                        aria-hidden="true"
                      />
                      <Heading>{step.name}</Heading>
                    </div>
                    <p className="mt-4 text-concrete-400">{step.body}</p>
                  </div>
                </div>
              </div>
              <Panel brushed className="p-2">
                <TerminalWindow
                  title={step.example.title}
                  ariaLabel={`${step.name} — ${step.example.title}`}
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

      <Section>
        <Card
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading>Ready to run it?</Heading>
            <p className="mt-2 text-concrete-400">
              Copy the starter kit and write your first spec. The loop is the
              same on day one as on day one hundred. Findings make the next
              pass a little less annoying.
            </p>
          </div>
          <Button asChild className="w-full md:w-auto">
            <Link href="/get-started/">
              Set up your workspace{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Card>
      </Section>

      <GiltBand height="sm" />
    </div>
  );
}
