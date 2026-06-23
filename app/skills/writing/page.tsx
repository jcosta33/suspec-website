import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Box,
  CheckCircle,
  ExternalLink,
  FileText,
  GitBranch,
  Layers,
  ListOrdered,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import { Section } from "../../components/Section";
import { Card } from "../../components/Card";
import { Panel } from "../../components/Panel";
import { TerminalWindow } from "../../components/TerminalWindow";
import { DroneIcon } from "../../components/DroneIcon";
import { HexBadge } from "../../components/HexBadge";
import { PageHero } from "../../components/PageHero";
import { Heading } from "../../components/Heading";
import { PilotLamp } from "../../components/PilotLamp";

export const metadata: Metadata = {
  title: "Writing a skill — Calma",
  description:
    "How to write a Calma skill: the open Agent Skills format, directive descriptions, self-contained bodies, forced visible output, and when to ship a task template.",
  openGraph: {
    title: "Writing a skill — Calma",
    description:
      "How to write a Calma skill: the open Agent Skills format, directive descriptions, self-contained bodies, forced visible output, and when to ship a task template.",
    type: "website",
    url: "/skills/writing/",
    siteName: "Calma",
    locale: "en_US",
    images: [
      {
        url: "/og-skills.png",
        width: 1200,
        height: 630,
        alt: "Writing a Calma skill — the open Agent Skills format",
      },
    ],
  },
  alternates: {
    canonical: "/skills/writing/",
  },
};

const anatomyItems = [
  {
    icon: ListOrdered,
    title: "Numbered rules with rationales",
    text: "Each rule pairs an imperative with the failure mode it prevents. Rationales let the model extend the rule to cases the author didn't imagine.",
  },
  {
    icon: AlertTriangle,
    title: "Anti-patterns section",
    text: "Negative examples are load-bearing. Document the temptations the agent should refuse, not just the happy path.",
  },
  {
    icon: Layers,
    title: "References one hop away",
    text: "Anything deeper than a single `references/*.md` file risks partial reads and silent omissions.",
  },
];

const scopeExclusions = [
  {
    title: "Engineering-domain prescriptions",
    example: "auth-patterns, caching guides",
  },
  {
    title: "Stack-specific skills",
    example: "react-19-best-practices, postgres-index-patterns",
  },
  {
    title: "Internal product knowledge",
    example: "business-logic wikis, vendor runbooks",
  },
  {
    title: "Automation or scripts",
    example: "CI workflows, eval harnesses, build generators",
  },
  { title: "Core / loader skills", example: "personas-core, write-core" },
  {
    title: "Always-on skills",
    example: "anything that tries to load for every request",
  },
];

export default function WritingSkillsPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <PageHero
          eyebrow="SKILL.md — open Agent Skills format"
          title={
            <>
              Writing a{" "}
              <span className="text-corpus-yellow text-glow">skill</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            A skill is a markdown file your agent reads when the work matches.
            It is instructions, not magic — and like any prompt, its structure
            determines whether it actually fires.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            This page distills the evidence-backed authoring guide from the{" "}
            <Link
              href="https://github.com/jcosta33/corpus-skills/tree/main/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              corpus-skills docs
            </Link>
            . No shortcuts. No silver bullets. Just a format that makes the
            agent more likely to do the right thing.
          </p>
        </PageHero>
      </Section>

      <Section>
        <Card screws className="mx-auto max-w-4xl border-panel-border">
          <nav aria-label="On this page">
            <p className="text-xs font-mono uppercase tracking-wide text-concrete-500">
              On this page
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <li>
                <a
                  href="#layout"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Layout
                </a>
              </li>
              <li>
                <a
                  href="#directive-description"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Directive description
                </a>
              </li>
              <li>
                <a
                  href="#body-anatomy"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Body anatomy
                </a>
              </li>
              <li>
                <a
                  href="#forced-visible-output"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Forced visible output
                </a>
              </li>
              <li>
                <a
                  href="#self-containment"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Self-containment
                </a>
              </li>
              <li>
                <a
                  href="#task-templates"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Task templates
                </a>
              </li>
              <li>
                <a
                  href="#scope"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Scope
                </a>
              </li>
              <li>
                <a
                  href="#next-steps"
                  className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
                >
                  Next steps
                </a>
              </li>
            </ol>
          </nav>
        </Card>
      </Section>

      <Section id="layout" className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>layout.txt — what a skill folder looks like</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
            <p className="text-concrete-500"># A minimal skill</p>
            <p className="text-concrete-100">
              skills/write-feature/
              <br />
              &nbsp;&nbsp;SKILL.md
              <br />
              &nbsp;&nbsp;references/
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;task-template.md
            </p>
            <p className="mt-3 text-concrete-500">
              # A persona needs no references folder
            </p>
            <p className="text-concrete-100">
              skills/persona-skeptic/
              <br />
              &nbsp;&nbsp;SKILL.md
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          The open Agent Skills spec defines the frontmatter and
          progressive-disclosure model: metadata is always present, the body
          loads when the description matches, and references load on demand.
        </p>
      </Section>

      <Section id="directive-description" className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
            <Terminal className="h-4 w-4" />
            <span>description.yaml — the load-bearing line</span>
          </div>
          <Heading className="mt-3">
            Activation: the directive description
          </Heading>
          <p className="mt-4 text-concrete-400">
            Agents scan the{" "}
            <code className="text-corpus-yellow">description</code> to decide
            whether to load the skill. A self-published 650-trial measurement
            (one author, not peer-reviewed) reported passive descriptions
            activating far less reliably than directive ones with an explicit
            exclusion clause. Treat the exact percentages as a hint, not a law —
            but the direction is consistent and the fix costs nothing, so we
            took it.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card
            screws
            className="border-panel-border hover:border-hazard-orange/50"
          >
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-hazard-orange">
              Passive (weak)
            </h3>
            <p className="mt-2 font-mono text-sm text-concrete-400">
              Use when implementing a feature from a spec. Encodes the
              discipline — read the spec, survey patterns, halt on ambiguity,
              validate after every batch, paste output.
            </p>
            <p className="mt-3 text-xs text-concrete-400">
              activates less reliably (self-reported)
            </p>
          </Card>
          <Card
            screws
            className="border-panel-border hover:border-drone-green/50"
          >
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-drone-green">
              Directive (strong)
            </h3>
            <p className="mt-2 font-mono text-sm text-concrete-400">
              Implement a feature from a spec. ALWAYS apply when the user asks
              to implement, build, or add a feature, when a spec doc is
              referenced, or when acceptance criteria are named — even with no
              spec. Do not code before surveying patterns, invent a requirement,
              or refactor in passing. Skip defect fixes, behavior-preserving
              refactors, deliberate rewrites, migrations, performance tuning,
              and test-only work.
            </p>
            <p className="mt-3 text-xs text-concrete-400">
              activates far more reliably (self-reported)
            </p>
          </Card>
        </div>
        <div className="max-w-3xl">
          <Heading as="h3" size="lg">
            Four required clauses
          </Heading>
          <ul className="mt-4 space-y-3 text-concrete-400">
            <li>
              <strong className="text-concrete-100">WHAT.</strong> Open with an
              imperative verb: &ldquo;Implement a feature&rdquo;, &ldquo;Back
              every claim&rdquo;, &ldquo;Judge another agent&apos;s work&rdquo;.
            </li>
            <li>
              <strong className="text-concrete-100">ALWAYS.</strong> Name
              concrete triggers, including implicit signals the user might not
              say literally.
            </li>
            <li>
              <strong className="text-concrete-100">Do not.</strong> Block the
              default bypass — the thing the agent would do if it skipped the
              skill.
            </li>
            <li>
              <strong className="text-concrete-100">Skip for.</strong> Name{" "}
              <em>task types</em>, not sibling skill names. This prevents
              directive saturation without assuming another skill is installed.
            </li>
          </ul>
          <p className="mt-4 text-concrete-500">
            Target 350–600 characters. Hard cap 800. The open spec allows 1024,
            but the tighter limit is a forcing function for clarity.
          </p>
        </div>
      </Section>

      <Section id="body-anatomy" className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <BookOpen className="h-4 w-4" />
            <span>body.md — the rules that fire after activation</span>
          </div>
          <Heading className="mt-3">Body anatomy</Heading>
          <p className="mt-4 text-concrete-400">
            Activation is necessary but not sufficient. The body must be shaped
            so the agent acts on it. Long contexts suffer from U-shaped
            attention: the start and end are remembered; the middle fades.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {anatomyItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                screws
                className="h-full border-panel-border"
              >
                <HexBadge color="green" className="mb-4">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </HexBadge>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-concrete-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {item.text}
                </p>
              </Card>
            );
          })}
        </div>
        <div className="max-w-3xl">
          <Heading as="h3" size="lg">
            Length budgets
          </Heading>
          <ul className="mt-4 space-y-2 text-concrete-400">
            <li>
              <strong className="text-concrete-100">~200 lines</strong> is the
              practical target.
            </li>
            <li>
              <strong className="text-concrete-100">500 lines</strong> is the
              hard cap, backed by Anthropic&apos;s own guidance.
            </li>
            <li>
              If a skill grows past 200 lines, the question is &ldquo;what moves
              to references?&rdquo;, not &ldquo;should I raise the
              limit?&rdquo;.
            </li>
          </ul>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="SKILL.md">
            <p className="text-concrete-500">---</p>
            <p className="text-concrete-100">name: write-feature</p>
            <p className="text-concrete-100">
              description: Implement a feature from a spec...
            </p>
            <p className="text-concrete-500">---</p>
            <p className="mt-2 text-concrete-100"># Skill: write-feature</p>
            <p className="mt-1 text-concrete-500">## Purpose</p>
            <p className="text-concrete-100">
              &lt;2–3 sentences. The failure mode this skill prevents.&gt;
            </p>
            <p className="mt-1 text-concrete-500">## Core rules</p>
            <p className="text-concrete-100">### 1. Read the packet first</p>
            <p className="text-concrete-100">
              ### 2. Map every AC before coding
            </p>
            <p className="text-concrete-100">...</p>
            <p className="mt-1 text-concrete-500">## What does not belong</p>
            <p className="mt-1 text-concrete-500">## Anti-patterns</p>
            <p className="mt-1 text-concrete-500">## Bundled resources</p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section id="forced-visible-output" className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-hazard-orange">
            <Zap className="h-4 w-4" />
            <span>execution.log — make the invisible visible</span>
          </div>
          <Heading className="mt-3">Forced visible output</Heading>
          <p className="mt-4 text-concrete-400">
            Skills have two reliability problems: activation and execution. A
            loaded skill can still skip late-stage verification steps because
            they produce no visible content. The fix is structural: every
            verification must leave a marker the next reader can see.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card screws className="border-panel-border">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-concrete-100">
              empirical-proof
            </h3>
            <p className="mt-2 text-sm text-concrete-400">
              Every claim in{" "}
              <code className="text-corpus-yellow">## Self-review</code> gets
              its own verbatim pasted output. No paraphrase, no &ldquo;✅ all
              passing&rdquo;.
            </p>
          </Card>
          <Card screws className="border-panel-border">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-concrete-100">
              write-testing
            </h3>
            <p className="mt-2 text-sm text-concrete-400">
              Flip each new test&apos;s assertion: it must fail; restore it: it
              must pass. Paste the fail-then-pass transition.
            </p>
          </Card>
        </div>
        <p className="max-w-prose text-concrete-400">
          The same mechanism drives Reflexion&apos;s +11 pp gain on HumanEval: a
          written artefact converts an implicit signal into a durable one. If
          the rule&apos;s compliance would otherwise be invisible, force it to
          produce output.
        </p>
      </Section>

      <Section id="self-containment" className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <Shield className="h-4 w-4" />
            <span>self-containment.md — no sibling dependencies</span>
          </div>
          <Heading className="mt-3">Self-containment</Heading>
          <p className="mt-4 text-concrete-400">
            A user who installs only{" "}
            <code className="text-corpus-yellow">write-feature</code> does not
            have <code className="text-corpus-yellow">empirical-proof</code> in
            context. Therefore{" "}
            <code className="text-corpus-yellow">write-feature</code> must read
            correctly on its own. If a related discipline is load-bearing,
            restate it inline — a sibling may be mentioned only as an optional
            &ldquo;if installed&rdquo; note.
          </p>
        </div>
        <div className="max-w-3xl">
          <Heading as="h3" size="lg">
            The AGENTS.md contract
          </Heading>
          <p className="mt-4 text-concrete-400">
            Skills name abstract command slots —{" "}
            <code className="text-corpus-yellow">cmdTest</code>,{" "}
            <code className="text-corpus-yellow">cmdLint</code>,{" "}
            <code className="text-corpus-yellow">cmdValidate</code> — never
            concrete commands. The consuming repo&apos;s{" "}
            <code className="text-corpus-yellow">AGENTS.md</code> Commands table
            supplies the implementations. An empty slot means ask; a skill never
            invents a command.
          </p>
          <p className="mt-4 text-concrete-400">
            This split is what makes a skill portable: the guide carries the
            discipline, your repo carries the toolchain.
          </p>
        </div>
      </Section>

      <Section id="task-templates" className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <FileText className="h-4 w-4" />
            <span>task-template.md — externalised working memory</span>
          </div>
          <Heading className="mt-3">Task templates</Heading>
          <p className="mt-4 text-concrete-400">
            Long-running tasks accumulate intermediate findings, abandoned
            hypotheses, and decisions. The task file is the agent&apos;s working
            memory, written to disk. It is not the deliverable; it is the
            scratchpad. Keep it gitignored, local, and personal.
          </p>
        </div>
        <div className="max-w-3xl">
          <Heading as="h3" size="lg">
            The MIHPSG rubric
          </Heading>
          <p className="mt-4 text-concrete-400">
            Ship a{" "}
            <code className="text-corpus-yellow">
              references/task-template.md
            </code>{" "}
            only when at least three of these six criteria hold:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li className="flex items-start gap-2 text-concrete-400">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-drone-green" />
              <span>
                <strong>Multi-session</strong> — likely to span more than one
                agent session
              </span>
            </li>
            <li className="flex items-start gap-2 text-concrete-400">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-drone-green" />
              <span>
                <strong>Iterative gates</strong> — validate → fix → re-validate
                cycles
              </span>
            </li>
            <li className="flex items-start gap-2 text-concrete-400">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-drone-green" />
              <span>
                <strong>Hypothesis tracking</strong> — multiple competing
                explanations
              </span>
            </li>
            <li className="flex items-start gap-2 text-concrete-400">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-drone-green" />
              <span>
                <strong>Multi-stage plan</strong> — four or more distinct phases
              </span>
            </li>
            <li className="flex items-start gap-2 text-concrete-400">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-drone-green" />
              <span>
                <strong>State separate from deliverable</strong> — working state
                is not the final artefact
              </span>
            </li>
            <li className="flex items-start gap-2 text-concrete-400">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-drone-green" />
              <span>
                <strong>Verification gates</strong> — paste-output proof
                required
              </span>
            </li>
          </ul>
          <p className="mt-6 text-concrete-400">
            Personas and cross-cutting quality gates like{" "}
            <code className="text-corpus-yellow">empirical-proof</code>{" "}
            deliberately ship no template — their discipline lives in the body
            and surfaces inside whichever workflow&apos;s task file is in play.
          </p>
        </div>
      </Section>

      <Section id="scope" className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-hazard-orange">
            <Box className="h-4 w-4" />
            <span>scope.txt — what stays out</span>
          </div>
          <Heading className="mt-3">Scope</Heading>
          <p className="mt-4 text-concrete-400">
            A skill must be useful in any consumer repo, by itself, with no
            implicit dependencies. The catalogue is deliberately narrow so it
            stays portable.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scopeExclusions.map((item) => (
            <li key={item.title}>
              <Card screws className="h-full border-panel-border">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-hazard-orange">
                    {item.title}
                  </h3>
                  <PilotLamp color="red" className="shrink-0" />
                </div>
                <p className="mt-2 text-sm text-concrete-400">{item.example}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="max-w-prose text-concrete-400">
          The right home for stack-specific or internal knowledge is the
          consuming repo&apos;s{" "}
          <code className="text-corpus-yellow">AGENTS.md</code>, not a skill.
        </p>
      </Section>

      <Section id="next-steps">
        <Card screws className="max-w-3xl border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <GitBranch className="h-4 w-4" />
            <span>next steps</span>
          </div>
          <Heading className="mt-3">Read the full reference</Heading>
          <p className="mt-4 text-concrete-400">
            This page is a summary. The full reasoning, controlled studies, and
            sample skills live in the repositories.
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href="https://github.com/jcosta33/corpus-skills/tree/main/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
              >
                corpus-skills docs{" "}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/jcosta33/corpus-skills/tree/main/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
              >
                Sample skills{" "}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href="https://agentskills.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
              >
                Open Agent Skills spec{" "}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </Card>
      </Section>
    </div>
  );
}
