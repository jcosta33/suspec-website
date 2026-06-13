import type { Metadata } from "next";
import Link from "next/link";
import {
  Blocks,
  Bug,
  GitBranch,
  LayoutDashboard,
  List,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  Stethoscope,
  TestTube,
  Terminal,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { TerminalWindow } from "../components/TerminalWindow";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { SignalPulse } from "../components/SignalPulse";
import { TerminalCursor } from "../components/TerminalCursor";
import { Badge } from "../components/Badge";

export const metadata: Metadata = {
  title: "CLI — Swarm",
  description:
    "swarm-cli is the reference command-line companion for the Swarm framework: sandboxed worktrees, task-driven sessions, and quality-of-life automation.",
  openGraph: {
    title: "CLI — Swarm",
    description:
      "swarm-cli is the reference command-line companion for the Swarm framework: sandboxed worktrees, task-driven sessions, and quality-of-life automation.",
    type: "website",
    images: ["/og-cli.png"],
  },
  alternates: {
    canonical: "/cli/",
  },
};

const commands = [
  { cmd: "init", what: "Scaffold .agents/, swarm.config.json, enable git rerere", icon: Blocks },
  { cmd: "new <slug>", what: "Create a sandbox worktree and seeded task file", icon: Plus },
  { cmd: "open <slug>", what: "Reopen an existing sandbox terminal", icon: Play },
  { cmd: "list", what: "List active sandboxes with status and PID", icon: List },
  { cmd: "validate", what: "Run configured lint/typecheck with LLM-truncated output", icon: RefreshCw },
  { cmd: "test", what: "Run Vitest with smart log truncation", icon: TestTube },
  { cmd: "pr <slug>", what: "Auto-commit and open a GitHub PR from the task file", icon: Rocket },
  { cmd: "doctor", what: "Deep diagnostics of Node, git, worktrees, telemetry DB", icon: Stethoscope },
];

const principles = [
  {
    title: "One worktree per task",
    icon: GitBranch,
    text: "No more agents rewriting your main checkout while you are halfway through something else.",
  },
  {
    title: "Task file as source of truth",
    icon: Terminal,
    text: "A markdown file carries the request, the AC, the evidence, and the review result.",
  },
  {
    title: "Context compression",
    icon: LayoutDashboard,
    text: "Check output is truncated for the LLM window, not dumped raw into the chat.",
  },
];

export default function CliPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-drone-green/30 bg-drone-green/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-drone-green">
            <SignalPulse className="h-4 w-4" />
            <span>swarm-cli v0.x — reference implementation</span>
          </div>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-5xl lg:text-6xl">
            swarm<span className="text-swarm-yellow text-glow">-cli</span>
            <TerminalCursor className="ml-2 align-middle" />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
            The reference command-line companion for the Swarm framework. Quality-of-life automation
            around the spec-and-review workflow.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Sandboxed worktrees, Markdown task files as the source of truth, and commands that
            compress context, run checks, and keep your main checkout clean.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge variant="hazard">In flux</Badge>
            <Badge variant="default">Node &gt;= 22.6.0</Badge>
            <Badge variant="default">Git &gt;= 2.5</Badge>
          </div>
        </div>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh</span>
        </div>
        <TerminalWindow title="terminal">
          <p className="text-concrete-500"># install from npm</p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> npm install -g swarm-cli
          </p>
          <p className="mt-2 text-concrete-500"># or link from a local clone</p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> git clone https://github.com/jcosta33/swarm-cli.git{" "}
            &amp;&amp; cd swarm-cli &amp;&amp; npm link
          </p>
        </TerminalWindow>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>first-run.sh</span>
        </div>
        <TerminalWindow title="terminal">
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> swarm init{" "}
            <span className="text-concrete-500"># scaffold .agents/ and swarm.config.json</span>
          </p>
          <p className="mt-1 text-concrete-100">
            <span className="text-swarm-yellow">$</span> swarm doctor{" "}
            <span className="text-concrete-500"># verify Node, git, worktrees, telemetry DB</span>
          </p>
          <p className="mt-1 text-concrete-100">
            <span className="text-swarm-yellow">$</span> swarm{" "}
            <span className="text-concrete-500"># launch the interactive dashboard</span>
          </p>
        </TerminalWindow>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <Bug className="h-4 w-4" />
            <span>commands.json — currently dispatching</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Commands that already dispatch
          </h2>
          <p className="mt-4 text-concrete-400">
            The small set you can rely on today. The rest is the planned shape.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {commands.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.cmd}>
                <Card className="group h-full border-factory-800 transition-all duration-300 hover:border-drone-green/30 hover:bg-factory-800">
                  <div className="flex items-start gap-4">
                    <HexBadge color="green">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-drone-green">
                        swarm {c.cmd}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-concrete-400">{c.what}</p>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <DroneIcon className="h-4 w-4" />
            <span>design.md — why a CLI?</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Why a CLI if Swarm is markdown-only?
          </h2>
          <p className="mt-4 text-concrete-400">
            The framework itself is just conventions and files. The CLI is optional automation: it
            spins up worktrees, runs checks, compresses output, and turns a finished task file into
            a PR. Use it if you want less typing; ignore it if you prefer to orchestrate by hand.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.title}>
                <Card className="group h-full border-factory-800 bg-factory-900/50 transition-all duration-300 hover:border-swarm-yellow/30">
                  <HexBadge color="orange" className="mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-concrete-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-400">{p.text}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <Card className="max-w-2xl border-factory-800 bg-factory-900/50">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Reference repository
          </h2>
          <p className="mt-4 text-concrete-400">
            The CLI is developed in the open. Issues, feature requests, and adversarial review are
            all welcome.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/swarm-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-swarm-yellow hover:underline focus-ring rounded"
            >
              Read the full reference on GitHub →
            </Link>
          </p>
        </Card>
      </Section>
    </div>
  );
}
