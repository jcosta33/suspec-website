import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { TerminalWindow } from "../components/TerminalWindow";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { SignalPulse } from "../components/SignalPulse";
import { TerminalCursor } from "../components/TerminalCursor";
import {
  Bot,
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
  title: "What is Swarm — Swarm",
  description:
    "Swarm is a lightweight spec and review workflow that keeps humans in the driver seat while coding agents do the work. Plain markdown; no runtime required.",
  openGraph: {
    title: "What is Swarm — Swarm",
    description:
      "Swarm is a lightweight spec and review workflow that keeps humans in the driver seat while coding agents do the work. Plain markdown; no runtime required.",
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
  {
    text: "a way to keep humans in the loop without hovering over every keystroke",
    icon: Bot,
  },
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
  "a way to remove humans from decisions",
];

const adjacent = [
  {
    product: "Coding agents",
    examples: "Claude Code, Cursor, Copilot, …",
    does: "write the code",
    relation:
      "Swarm ships no agent. It shapes the inputs any agent works from and the output you review. Bring whichever agent you have.",
  },
  {
    product: "Spec-driven workflows",
    examples: "",
    does: "turn a written spec into an implementation",
    relation:
      "The same family. Swarm's bet is the review side — every requirement carries a verification method, and the review packet shows the evidence per requirement.",
  },
  {
    product: "Issue trackers",
    examples: "Jira, Linear, GitHub Issues",
    does: "hold the backlog and the conversation",
    relation:
      "The ticket stays where it is. Swarm snapshots it into an intake file and interprets it into a spec an agent can act on.",
  },
  {
    product: "Docs portals",
    examples: "wikis, Notion, docs sites",
    does: "describe the system after the fact",
    relation:
      "A Swarm spec is a working document — acceptance criteria, verification methods, open questions. It drives the change rather than documenting it later.",
  },
  {
    product: "Review tooling",
    examples: "PRs, CI, review bots",
    does: "gate the merge",
    relation:
      "Swarm does not replace the PR. The review packet rides alongside it and tells the reviewer where to look; CI output is the evidence the packet cites.",
  },
  {
    product: "Refactoring tooling",
    examples: "codemods, OpenRewrite, …",
    does: "execute mechanical change",
    relation:
      "Swarm's change plan states what must survive the change and how to check it; a codemod is one way a task executes a step of that plan.",
  },
];

const failureModes = [
  {
    mode: "Drift",
    code: "ERR-001",
    looksLike: "the agent solves a problem, not the problem",
    answer: "the task packet: an explicit scope and a &apos;Do not change&apos; list",
  },
  {
    mode: "Ambiguous input",
    code: "ERR-002",
    looksLike: "ambiguity degrades generated code; models do not reliably flag it",
    answer: "requirements written one per ID, each with its own verification method",
  },
  {
    mode: "Lost handoff",
    code: "ERR-003",
    looksLike: "the handoff from plan to implementation is the dominant failure surface",
    answer: "the handoff is a written, bounded task packet — not a chat message",
  },
  {
    mode: "Hallucinated completion",
    code: "ERR-004",
    looksLike: "&quot;done,&quot; but nothing was checked",
    answer: "a Pass needs pasted output, a CI link, or a named human's recorded observation",
  },
  {
    mode: "No resumable trail",
    code: "ERR-005",
    looksLike: "the session ends mid-stride; the next one starts from zero",
    answer: "work externalized to files — intake, spec, task, review",
  },
  {
    mode: "Repeated mistakes",
    code: "ERR-006",
    looksLike: "the same class of bug returns every few sessions",
    answer: "findings saved at Close, kept where the next task will look",
  },
];

export default function WhatIsSwarmPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-swarm-yellow/30 bg-swarm-yellow/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-swarm-yellow">
            <SignalPulse className="h-4 w-4" />
            <span>system overview</span>
          </div>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-5xl lg:text-6xl">
            What is <span className="text-swarm-yellow text-glow">Swarm</span>
            <TerminalCursor className="ml-2 align-middle" />
          </h1>
        </div>
      </Section>

      <Section>
        <TerminalWindow title="diagnostics" className="mx-auto max-w-3xl">
          <p className="text-concrete-400">
            <span className="text-swarm-yellow">$</span> swarm doctor --summary
          </p>
          <p className="mt-2 text-concrete-100">
            Swarm is a lightweight spec and review workflow for teams using coding agents. Turn
            tickets into clear specs, specs into agent-ready tasks, and agent output into evidence
            you can review.
          </p>
          <p className="mt-2 text-drone-green">✓ agent does the typing</p>
          <p className="text-drone-green">✓ human stays in the driver seat</p>
          <p className="text-drone-green">✓ plain markdown, any agent, no runtime</p>
          <p className="mt-2 text-concrete-400">
            <span className="text-swarm-yellow">$</span> _
          </p>
        </TerminalWindow>
      </Section>

      <Section className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <CheckCircle className="h-4 w-4" />
            <span>capabilities.conf — loaded</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            What Swarm is
          </h2>
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
            <span>capabilities.conf — excluded</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            What Swarm is not
          </h2>
          <ul className="mt-6 space-y-3">
            {isNotList.map((item) => (
              <li key={item} className="flex items-start gap-3 text-concrete-400">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-factory-700" aria-hidden="true" />
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
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Where Swarm sits
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adjacent.map((row) => (
            <li key={row.product}>
              <Card className="group h-full border-factory-800 transition-all duration-300 hover:border-swarm-yellow/30">
                <p className="font-mono text-xs text-swarm-yellow">{row.product}</p>
                {row.examples && (
                  <p className="mt-1 text-xs text-concrete-500">{row.examples}</p>
                )}
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
            <span>error.log — 6 failure modes detected</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Failure modes Swarm positions against
          </h2>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {failureModes.map((fm) => (
            <li key={fm.mode}>
              <Card className="group h-full animate-glow">
                <div className="flex items-start gap-3">
                  <HexBadge color="orange">
                    <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <div>
                    <p className="font-mono text-xs text-hazard-orange">{fm.code}</p>
                    <h3 className="mt-0.5 font-heading text-lg font-bold uppercase tracking-tight text-concrete-100">
                      {fm.mode}
                    </h3>
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
        <p className="text-concrete-400">
          Source:{" "}
          <Link
            href="https://github.com/jcosta33/swarm/blob/main/docs/01-what-is-swarm.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-swarm-yellow hover:underline focus-ring rounded"
          >
            docs/01-what-is-swarm.md
          </Link>
        </p>
      </Section>
    </div>
  );
}
