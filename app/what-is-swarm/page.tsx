import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Heading } from "../components/Heading";
import { PilotLamp } from "../components/PilotLamp";
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
import { Button } from "../components/Button";

export const metadata: Metadata = {
  title: "What is Calma — Calma",
  description:
    "AI writes code that looks right. Calma is a lightweight spec-and-review workflow that keeps humans in the driver seat. Plain markdown; no runtime required.",
  openGraph: {
    title: "What is Calma — Calma",
    description:
      "Calma is a lightweight spec and review workflow that keeps humans in the driver seat while coding agents do the work. Plain markdown; no runtime required.",
    type: "website",
    images: ["/og-what-is-swarm.png"],
  },
  alternates: {
    canonical: "/what-is-swarm/",
  },
};

const isList = [
  { text: "a spec format humans write and agents work from", icon: FileText },
  { text: "a task-packet format that bounds agent work", icon: LayoutList },
  { text: "a review-packet format that shows where human attention goes", icon: NotebookPen },
  { text: "a findings convention so lessons survive the session", icon: CheckCircle },
  { text: "a starter kit of markdown templates", icon: Layers },
  { text: "a workspace convention", icon: Workflow },
];

const isNotList = [
  "an agent or agent runtime",
  "a compiler",
  "a programming language",
  "a Jira/Linear replacement",
  "a code generator",
  "a replacement for PRs and CI",
  "a docs portal",
  "a complete SDLC platform",
  "a formal verification system",
  "a guarantee that agent output is correct",
  "a license to vibe-code and hope for the best",
  "a magic fix for AI hallucinations",
  "a way to remove humans from decisions",
];

const adjacent = [
  {
    product: "Coding agents",
    examples: "Claude Code, Cursor, Copilot, …",
    does: "write the code",
    relation:
      "Calma ships no agent. It shapes the inputs any agent works from and the output you review. Bring whichever agent you have.",
  },
  {
    product: "Spec-driven workflows",
    examples: "",
    does: "turn a written spec into an implementation",
    relation:
      "Same family, opposite end. They optimize authoring the spec and generating the code; Calma bets on the review side — every requirement carries a verification method, and the packet shows the evidence per requirement. Honestly? Author with one, gate with the other.",
  },
  {
    product: "Issue trackers",
    examples: "Jira, Linear, GitHub Issues",
    does: "hold the backlog and the conversation",
    relation:
      "The ticket stays where it is. Calma snapshots it into an intake file and interprets it into a spec an agent can act on.",
  },
  {
    product: "Docs portals",
    examples: "wikis, Notion, docs sites",
    does: "describe the system after the fact",
    relation:
      "A Calma spec is a working document — acceptance criteria, verification methods, open questions. It drives the change rather than documenting it later.",
  },
  {
    product: "Review tooling",
    examples: "PRs, CI, review bots",
    does: "gate the merge",
    relation:
      "Calma does not replace the PR. The review packet rides alongside it and tells the reviewer where to look; CI output is the evidence the packet cites.",
  },
  {
    product: "Refactoring tooling",
    examples: "codemods, OpenRewrite, …",
    does: "execute mechanical change",
    relation:
      "Calma's change plan states what must survive the change and how to check it; a codemod is one way a task executes a step of that plan.",
  },
];

const failureModes = [
  {
    mode: "Drift",
    looksLike: "the agent solves a problem, not the problem",
    answer: "the task packet: an explicit scope and a 'Do not change' list",
  },
  {
    mode: "Ambiguous input",
    looksLike: "ambiguity degrades generated code, and models do not reliably flag it",
    answer: "requirements written one per ID, each with its own verification method",
  },
  {
    mode: "Lost handoff",
    looksLike: "the plan-to-implementation handoff is a leading failure surface (on preliminary evidence)",
    answer: "the handoff is a written, bounded task packet — not a chat message",
  },
  {
    mode: "Hallucinated completion",
    looksLike: "'done,' but nothing was checked",
    answer: "a Pass needs pasted output, a CI link, or a named human's recorded observation",
  },
  {
    mode: "No resumable trail",
    looksLike: "the session ends mid-stride; the next one starts from zero",
    answer: "work externalized to files — intake, spec, task, review",
  },
  {
    mode: "Repeated mistakes",
    looksLike: "the same class of bug returns every few sessions",
    answer: "findings saved at Close, kept where the next task will look",
  },
];

export default function WhatIsCalmaPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <PageHero
          eyebrow="system overview"
          title={<>What is <span className="text-swarm-yellow text-glow">Calma</span></>}
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            A lightweight spec-and-review discipline for teams using coding agents. Calma assumes the
            agent will drift, over-engineer, or skip the edge case — and gives you the files to catch
            it before it ships.
          </p>
        </PageHero>
      </Section>

      <Section>
        <Panel brushed className="mx-auto max-w-3xl p-2">
          <TerminalWindow title="diagnostics" className="mx-auto max-w-3xl">
            <p className="text-concrete-400">
              <span className="text-swarm-yellow">$</span> cat what-is-calma.md
            </p>
            <p className="mt-2 text-concrete-100">
              Calma is a spec-and-review workflow for teams using coding agents. Turn tickets into
              clear specs, specs into agent-ready tasks, and agent output into evidence a human can
              review.
            </p>
            <p className="mt-2 text-drone-green">✓ agent does the typing</p>
            <p className="text-drone-green">✓ human owns the gates</p>
            <p className="text-drone-green">✓ every claim needs evidence</p>
            <p className="text-drone-green">✓ plain markdown, any agent, no runtime</p>
            <p className="mt-2 text-concrete-400">
              <span className="text-swarm-yellow">$</span> _
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <CheckCircle className="h-4 w-4" />
            <span>what it is</span>
          </div>
          <Heading className="mt-3">What Calma is</Heading>
          <ul className="mt-6 space-y-4">
            {isList.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.text} className="flex items-start gap-4 text-concrete-100">
                  <HexBadge color="yellow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <span className="pt-3">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-hazard-orange">
            <XCircle className="h-4 w-4" />
            <span>what it is not</span>
          </div>
          <Heading className="mt-3">What Calma is not</Heading>
          <ul className="mt-6 space-y-3">
            {isNotList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-concrete-400">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-panel-edge"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
            <DroneIcon className="h-4 w-4" />
            <span>network.map — adjacent nodes</span>
          </div>
          <Heading className="mt-3">Where Calma sits</Heading>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adjacent.map((row) => (
            <li key={row.product}>
              <Card
                className="group h-full border-panel-border hover:border-brass/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-brass">{row.product}</p>
                    {row.examples && (
                      <p className="mt-1 text-xs text-concrete-400">{row.examples}</p>
                    )}
                  </div>
                  <PilotLamp color="amber" className="shrink-0" />
                </div>
                <p className="mt-3 text-sm font-semibold text-concrete-100">Does: {row.does}</p>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">{row.relation}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-hazard-orange">
            <ShieldAlert className="h-4 w-4" />
            <span>error.log — failure modes detected</span>
          </div>
          <Heading className="mt-3">Failure modes you are already seeing</Heading>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {failureModes.map((fm) => (
            <li key={fm.mode}>
              <Card hardware className="group h-full border-panel-border hover:border-hazard-orange/50">
                <div className="flex items-start gap-3">
                  <HexBadge color="orange">
                    <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <div>
                    <Heading as="h3" size="lg" className="mt-0.5">{fm.mode}</Heading>
                  </div>
                </div>
                <p className="mt-4 text-sm text-concrete-400">{fm.looksLike}</p>
                <p className="mt-3 text-sm text-concrete-100">
                  <span className="text-swarm-yellow">&gt;</span> {fm.answer}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Card hardware className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Heading>See how it actually runs</Heading>
            <p className="mt-2 text-concrete-400">
              Six steps, each producing a file the next one reads. That is the whole framework — no
              runtime, no magic.
            </p>
          </div>
          <Button asChild className="w-full md:w-auto">
            <Link href="/the-loop/">
              See the loop <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Card>
      </Section>

      <Section>
        <p className="text-concrete-400">
          Source:{" "}
          <Link
            href="https://github.com/jcosta33/swarm/blob/main/docs/01-what-is-swarm.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
          >
            docs/01-what-is-swarm.md
          </Link>
        </p>
      </Section>
    </div>
  );
}
