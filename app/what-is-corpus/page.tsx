import type { Metadata } from "next";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { PaperArtifact } from "../components/PaperArtifact";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Heading } from "../components/Heading";
import { PilotLamp } from "../components/PilotLamp";
import { TextLink } from "../components/TextLink";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Layers,
  LayoutList,
  NotebookPen,
  ShieldAlert,
  Workflow,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "What is Corpus? — Corpus",
  description:
    "Corpus is a markdown workflow for specs, tasks, reviews, findings, and evidence.",
  openGraph: {
    title: "What is Corpus? — Corpus",
    description:
      "Corpus is a markdown workflow for specs, tasks, reviews, findings, and evidence.",
    type: "website",
    url: "/what-is-corpus/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-what-is-corpus.png",
        width: 1200,
        height: 630,
        alt: "What is Corpus? — a spec and review workflow",
      },
    ],
  },
  alternates: {
    canonical: "/what-is-corpus/",
  },
};

const isList = [
  { text: "specs humans write and agents work from", icon: FileText },
  { text: "task packets with scope and checks", icon: LayoutList },
  {
    text: "review packets with evidence per requirement",
    icon: NotebookPen,
  },
  {
    text: "findings that carry lessons forward",
    icon: CheckCircle,
  },
  { text: "markdown templates", icon: Layers },
  { text: "workspace conventions", icon: Workflow },
];

const isNotList = [
  "an agent or agent runtime",
  "a Jira/Linear replacement",
  "a code generator",
  "a replacement for PRs and CI",
  "a formal verification system",
  "a guarantee that code is correct",
  "permission to skip review",
];

const adjacent = [
  {
    product: "Coding agents",
    examples: "Claude Code, Cursor, Copilot, …",
    does: "write the code",
    relation: "Corpus gives them scoped tasks and review records.",
  },
  {
    product: "Spec-driven workflows",
    examples: "",
    does: "turn a written spec into an implementation",
    relation: "Corpus keeps requirements tied to checks and evidence.",
  },
  {
    product: "Issue trackers",
    examples: "Jira, Linear, GitHub Issues",
    does: "hold the backlog and the conversation",
    relation: "Tickets stay there. Corpus snapshots the work into files.",
  },
  {
    product: "Docs portals",
    examples: "wikis, Notion, docs sites",
    does: "describe the system after the fact",
    relation: "A Corpus spec drives a change before it ships.",
  },
  {
    product: "Review tooling",
    examples: "PRs, CI, review bots",
    does: "check the merge",
    relation: "The review packet tells reviewers where to look.",
  },
  {
    product: "Refactoring tooling",
    examples: "codemods, OpenRewrite, …",
    does: "execute mechanical change",
    relation: "A change plan states what must survive and how to check it.",
  },
];

const failureModes = [
  {
    mode: "Drift",
    looksLike: "the agent solves a problem, not the problem",
    answer: "write scope and a Do not change list",
  },
  {
    mode: "Ambiguous input",
    looksLike: "the request hides missing requirements",
    answer: "write one requirement per ID, with a check",
  },
  {
    mode: "Lost handoff",
    looksLike: "the plan lives only in chat",
    answer: "handoff through a bounded task packet",
  },
  {
    mode: "Hallucinated completion",
    looksLike: "'done,' but nothing was checked",
    answer: "a Pass needs evidence",
  },
  {
    mode: "No resumable trail",
    looksLike: "the session ends mid-stride; the next one starts from zero",
    answer: "write intake, spec, task, and review files",
  },
  {
    mode: "Repeated mistakes",
    looksLike: "the same class of bug returns every few sessions",
    answer: "save findings at Close",
  },
];

export default function WhatIsCorpusPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="system overview"
          title={
            <>
              What is{" "}
              <span className="text-corpus-yellow">Corpus?</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            A markdown workflow for coding-agent work.
          </p>
        </PageHero>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Panel brushed className="mx-auto h-full max-w-3xl p-2">
          <TerminalWindow title="diagnostics" className="mx-auto h-full max-w-3xl">
            <p className="text-concrete-400">
                <span className="text-corpus-yellow">$</span>{" "}cat
              what-is-corpus.md
            </p>
            <p className="mt-2 text-concrete-100">
              Corpus turns requests into specs, specs into tasks, and task
              output into review evidence.
            </p>
            <p className="mt-2 text-olive">✓ agent does the typing</p>
            <p className="text-olive">✓ human makes the call</p>
            <p className="text-olive">✓ every claim needs evidence</p>
            <p className="text-olive">
              ✓ plain markdown, any agent, no runtime
            </p>
            <p className="mt-2 text-concrete-400">
                <span className="text-corpus-yellow">$</span>{" "}_
            </p>
          </TerminalWindow>
        </Panel>
        <PaperArtifact
          label="example"
          title="artifact chain"
          meta="intake -> spec -> task -> review -> finding"
        >
          <p>Intent becomes a requirement.</p>
          <p className="text-pencil">The task bounds what may change.</p>
          <p>The run pastes evidence.</p>
          <p className="text-pencil">The review routes exceptions.</p>
          <p>The finding preserves what the next task should know.</p>
        </PaperArtifact>
      </Section>

      <Section className="reveal grid gap-12 lg:grid-cols-2">
        <Panel variant="inset" className="h-full p-5 sm:p-6">
          <div className="section-kicker section-kicker-phosphor">
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is</span>
          </div>
          <Heading className="mt-3">What Corpus is</Heading>
          <ul className="mt-6 space-y-4">
            {isList.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  className="flex items-start gap-4 text-concrete-100"
                >
                  <HexBadge color="yellow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <span className="pt-3">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel variant="inset" className="h-full p-5 sm:p-6">
          <div className="section-kicker section-kicker-rubedo">
            <XCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is not</span>
          </div>
          <Heading className="mt-3">What Corpus is not</Heading>
          <ul className="mt-5 divide-y divide-panel-border/70">
            {isNotList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 py-3 text-concrete-400 first:pt-0 last:pb-0"
              >
                <XCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-rubedo/80"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-gold">
            <DroneIcon className="h-4 w-4" />
            <span>nearby tools</span>
          </div>
          <Heading className="mt-3">Where Corpus sits</Heading>
        </div>
        <ul className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adjacent.map((row) => (
            <li key={row.product}>
              <Card className="group h-full border-panel-border hover:border-brass/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-brass">
                      {row.product}
                    </p>
                    {row.examples && (
                      <p className="mt-1 text-xs text-concrete-400">
                        {row.examples}
                      </p>
                    )}
                  </div>
                  <PilotLamp color="amber" className="shrink-0" />
                </div>
                <p className="mt-3 text-sm font-semibold text-concrete-100">
                  Does: {row.does}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {row.relation}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-rubedo">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            <span>common failure modes</span>
          </div>
          <Heading className="mt-3">
            Failure modes you are already seeing
          </Heading>
        </div>
        <ul className="reveal grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {failureModes.map((fm) => (
            <li key={fm.mode}>
              <Card
                screws
                className="group h-full border-panel-border hover:border-rubedo/50"
              >
                <div className="flex items-start gap-3">
                  <HexBadge color="orange">
                    <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <div>
                    <Heading as="h3" size="lg" className="mt-0.5">
                      {fm.mode}
                    </Heading>
                  </div>
                </div>
                <p className="mt-4 text-sm text-concrete-400">{fm.looksLike}</p>
                <p className="mt-3 text-sm text-concrete-100">
                  <span className="text-corpus-yellow">&gt;</span> {fm.answer}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Card
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading>See how it actually runs</Heading>
            <p className="mt-2 text-concrete-400">
              Six steps, each producing a file the next one reads. That is the
              framework: no runtime, no automatic decision.
            </p>
            <p className="mt-4 text-sm text-concrete-400">
              Source:{" "}
              <TextLink
                href="/docs/01-what-is-corpus/"
                target="_blank"
                rel="noopener noreferrer"
              >
                docs/01-what-is-corpus.md
              </TextLink>
            </p>
          </div>
          <TextLink href="/the-loop/" className="shrink-0 gap-2 text-base font-semibold">
            See the loop <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TextLink>
        </Card>
      </Section>
    </div>
  );
}
