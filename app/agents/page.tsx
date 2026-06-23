import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ExternalLink,
  FileSearch,
  Hammer,
  Microscope,
  Network,
  PenTool,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Swords,
  Terminal,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { Heading } from "../components/Heading";

export const metadata: Metadata = {
  title: "Agents — Corpus",
  description:
    "Claude-Code-first worker definitions for Corpus roles: independent review, read-only exploration, evidence-checking, and bounded authoring. Copy one file. Records and tripwires, never an orchestrator.",
  openGraph: {
    title: "Agents — Corpus",
    description:
      "A copy-based catalog of Claude Code subagent definitions for Corpus roles — each in a fresh isolated context, with a reviewable delegation trace. Records, never an executor.",
    type: "website",
    url: "/agents/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Corpus agents — Claude-Code-first worker definitions for the Corpus roles",
      },
    ],
  },
  alternates: {
    canonical: "/agents/",
  },
};

const readOnly = [
  {
    agent: "swarm-reviewer",
    icon: Scale,
    use: "independently review a finished task or PR — re-run Verify, read the diff, draft the packet, no verdict",
  },
  {
    agent: "swarm-explorer",
    icon: Compass,
    use: "orient in a codebase read-only — locate and trace how something works, then report (no edits, no Bash)",
  },
  {
    agent: "swarm-evidence-checker",
    icon: ShieldCheck,
    use: "re-run a task's Verify items and paste verbatim output; flag every claim that lacks evidence",
  },
  {
    agent: "swarm-challenger",
    icon: Swords,
    use: "pressure-test a proposal before it is built — assumptions, the steelmanned alternative, external evidence",
  },
];

const authoring = [
  {
    agent: "swarm-spec-author",
    icon: PenTool,
    use: "draft a spec from an intake note — verifiable requirements, no smuggled implementation",
  },
  {
    agent: "swarm-researcher",
    icon: Microscope,
    use: "investigate one question against primary sources → a research note, committing to no decision",
  },
  {
    agent: "swarm-auditor",
    icon: FileSearch,
    use: "audit a code area — present state, file:line, severity by impact, observation not prescription",
  },
  {
    agent: "swarm-documentarian",
    icon: ScrollText,
    use: "draft human-facing docs — one Diátaxis frame, every example run as written",
  },
];

function repoHref(agent: string) {
  return `https://github.com/jcosta33/swarm-agents/blob/main/agents/${agent}.md`;
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <PageHero
          eyebrow="agents.catalog — 8 agents · claude code · ports to codex"
          title={<>Corpus <span className="text-swarm-yellow text-glow">agents</span></>}
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Claude-Code-first worker definitions for the Corpus roles. Each runs in a fresh, isolated
            context with its tools scoped to the work — you copy the one file you need.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Records and tripwires, never an orchestrator. Nothing here runs a model loop or owns the
            verdict — a human still decides, and each refuses to grade its own work.
          </p>
        </PageHero>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh — copy one worker</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
            <p className="text-concrete-500"># copy one agent into your repo (Claude Code reads .claude/agents/)</p>
            <p className="text-concrete-100">
              <span className="text-swarm-yellow">$</span> mkdir -p &lt;your-repo&gt;/.claude/agents
            </p>
            <p className="text-concrete-100">
              <span className="text-swarm-yellow">$</span> cp agents/swarm-reviewer.md
              &lt;your-repo&gt;/.claude/agents/
            </p>
            <p className="mt-2 text-concrete-500">
              # optional: the delegation-provenance hook + the read-only guard
            </p>
            <p className="text-concrete-100">
              <span className="text-swarm-yellow">$</span> cp hooks/delegations.sh
              hooks/readonly-guard.sh &lt;your-repo&gt;/.claude/hooks/
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          These are Claude Code <strong className="text-concrete-100">agents</strong> (
          <code className="text-swarm-yellow">.claude/agents/</code>), not Agent-Skills, so it is
          copy-based — <code className="text-swarm-yellow">npx skills</code> installs the{" "}
          <Link
            href="/skills/"
            className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
          >
            skills catalog
          </Link>
          , not these. Like skills, an agent names abstract command slots (
          <code className="text-swarm-yellow">cmdTest</code>,{" "}
          <code className="text-swarm-yellow">cmdLint</code>) that your repo&apos;s{" "}
          <code className="text-swarm-yellow">AGENTS.md</code> fills in.
        </p>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>tier-1.conf — read-only workers</span>
          </div>
          <Heading className="mt-3">Read-only workers</Heading>
          <p className="mt-4 text-concrete-400">
            Their <code className="text-swarm-yellow">tools</code> allowlist excludes Edit/Write; the
            ones that keep Bash pair with the read-only guard. Scoping is toolable/partial — it narrows
            the surface, it is not a sandbox.
          </p>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {readOnly.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.agent}>
                <a
                  href={repoHref(a.agent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.agent} definition on GitHub (opens in new tab)`}
                  className="group block rounded-sm focus-ring"
                >
                  <Card className="h-full border-panel-border hover:border-brass/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="yellow">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3 className="font-mono text-sm font-semibold text-brass">{a.agent}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">{a.use}</p>
                        </div>
                      </div>
                      <ExternalLink
                        className="mt-0.5 h-4 w-4 shrink-0 text-concrete-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <Hammer className="h-4 w-4" aria-hidden="true" />
            <span>tier-2.conf — bounded authoring</span>
          </div>
          <Heading className="mt-3">Bounded-authoring workers</Heading>
          <p className="mt-4 text-concrete-400">
            These grant Edit/Write to draft one artifact. Their value is the baked-in discipline,
            fresh-context isolation, and the delegation trace — not enforcement; a granted Write is not
            path-locked, and the body says so. Each refuses to self-issue a verdict.
          </p>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authoring.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.agent}>
                <a
                  href={repoHref(a.agent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.agent} definition on GitHub (opens in new tab)`}
                  className="group block rounded-sm focus-ring"
                >
                  <Card className="h-full border-panel-border hover:border-drone-green/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="green">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3 className="font-mono text-sm font-semibold text-drone-green">
                            {a.agent}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">{a.use}</p>
                        </div>
                      </div>
                      <ExternalLink
                        className="mt-0.5 h-4 w-4 shrink-0 text-concrete-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-2">
        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <ShieldCheck className="h-4 w-4" />
            <span>scope.note — toolable, not a wall</span>
          </div>
          <Heading className="mt-3">What is real, what is honor-system</Heading>
          <p className="mt-4 text-concrete-400">
            A read-only agent&apos;s <code className="text-swarm-yellow">tools</code> allowlist genuinely
            drops Edit/Write, and the guard hook trips on the obvious write idioms — but a shell can
            still write, and a parent permission mode can bypass a hook. Nothing here is labelled
            &ldquo;enforced.&rdquo; The honest limits are written down, with the bypasses cited.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/swarm-agents/blob/main/docs/enforcement.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Read what the scoping does and does not guarantee →
            </Link>
          </p>
        </Card>

        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
            <Network className="h-4 w-4" />
            <span>provenance.note — the delegation trace</span>
          </div>
          <Heading className="mt-3">Why not just the built-in reviewer?</Heading>
          <p className="mt-4 text-concrete-400">
            You can get far with a built-in agent and a CLAUDE.md. These add a fresh isolated context
            per role, a hard refusal to self-issue a verdict, and — with the hook — a reviewable
            delegation trace the built-ins do not emit. Reach for them when that earns its keep.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/swarm-agents/blob/main/docs/provenance.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              How the delegation trace works →
            </Link>
          </p>
        </Card>
      </Section>

      <Section>
        <Card screws className="max-w-2xl border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>portability — one source, a second runner</span>
          </div>
          <Heading className="mt-3">Claude Code first, and it ports</Heading>
          <p className="mt-4 text-concrete-400">
            The definitions are authored for Claude Code, but they are the single source — they don&apos;t
            get hand-copied for other tools. <code className="text-swarm-yellow">swarm agents emit --codex</code>{" "}
            generates Codex <code className="text-swarm-yellow">.codex/agents/*.toml</code> from the same
            files, and the shared discipline — evidence over assertion, reconcile-only, no self-issued
            verdict — ports through the open <code className="text-swarm-yellow">AGENTS.md</code> format that
            Codex, Cursor, Copilot, Gemini CLI, and Aider all read.
          </p>
          <p className="mt-4 text-concrete-400">
            What does <em>not</em> travel, stated plainly: the tool-scoping allowlist and the hooks are
            Claude-Code-only structural enforcement. Every emitted file says so in its header — a Codex
            adopter gets the prose discipline and scopes tools in their own config. The discipline is
            portable; the enforcement is not.
          </p>
        </Card>
      </Section>

      <Section>
        <Card screws className="max-w-2xl border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>catalog — browse on github</span>
          </div>
          <Heading className="mt-3">The full catalog</Heading>
          <p className="mt-4 text-concrete-400">
            Eight workers, two hooks, and the evidence behind the design — all plain markdown plus two
            short POSIX-sh hooks. Read an agent before you install it; pin to a commit for a stable
            install.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/swarm-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Browse swarm-agents on GitHub →
            </Link>
          </p>
        </Card>
      </Section>
    </div>
  );
}
