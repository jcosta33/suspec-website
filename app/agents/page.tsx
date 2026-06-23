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
import { Badge } from "../components/Badge";
import { PaperArtifact } from "../components/PaperArtifact";

export const metadata: Metadata = {
  title: "Agents — corpus",
  description:
    "Claude-Code-first worker definitions for corpus roles: independent review, read-only exploration, evidence-checking, and bounded authoring. Copy one file into your repo.",
  openGraph: {
    title: "Agents — corpus",
    description:
      "A copy-based catalog of Claude Code subagent definitions for corpus roles, each in a fresh isolated context with an optional delegation trace.",
    type: "website",
    url: "/agents/",
    siteName: "corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "corpus agents — Claude-Code-first worker definitions for the corpus roles",
      },
    ],
  },
  alternates: {
    canonical: "/agents/",
  },
};

const readOnly = [
  {
    agent: "corpus-reviewer",
    icon: Scale,
    use: "independently review a finished task or PR — re-run Verify, read the diff, draft the packet",
  },
  {
    agent: "corpus-explorer",
    icon: Compass,
    use: "orient in a codebase read-only — locate and trace how something works, then report (no edits, no Bash)",
  },
  {
    agent: "corpus-evidence-checker",
    icon: ShieldCheck,
    use: "re-run a task's Verify items and paste verbatim output; flag every claim that lacks evidence",
  },
  {
    agent: "corpus-challenger",
    icon: Swords,
    use: "pressure-test a proposal before it is built — assumptions, the steelmanned alternative, external evidence",
  },
];

const authoring = [
  {
    agent: "corpus-spec-author",
    icon: PenTool,
    use: "draft a spec from an intake note — verifiable requirements, no smuggled implementation",
  },
  {
    agent: "corpus-researcher",
    icon: Microscope,
    use: "investigate one question against primary sources → a research note, committing to no decision",
  },
  {
    agent: "corpus-auditor",
    icon: FileSearch,
    use: "audit a code area — present state, file:line, severity by impact, observation not prescription",
  },
  {
    agent: "corpus-documentarian",
    icon: ScrollText,
    use: "draft human-facing docs — one Diátaxis frame, every example run as written",
  },
];

function repoHref(agent: string) {
  return `https://github.com/jcosta33/corpus-agents/blob/main/agents/${agent}.md`;
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-20 py-20 sm:gap-24 sm:py-24">
      <Section>
        <PageHero
          eyebrow="worker files / agent roles"
          title={
            <>
              corpus <span className="text-corpus-yellow">agents</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Claude-Code-first worker definitions for corpus roles: review,
            exploration, evidence checking, and bounded authoring.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            These are role files you can copy into a repo. They help route work;
            they do not run the project for you.
          </p>
        </PageHero>
      </Section>

      <Section>
        <PaperArtifact
          label="note"
          title="delegation record"
          meta="worker identity · inputs · tools · evidence"
          className="mx-auto max-w-3xl"
        >
          <p>
            A worker can return evidence. It cannot certify its own result. The
            packet still routes review to a human or an independent reviewer.
          </p>
        </PaperArtifact>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh — copy one worker</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
            <p className="text-concrete-500">
              # copy one agent into your repo (Claude Code reads
              .claude/agents/)
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> mkdir -p
              &lt;your-repo&gt;/.claude/agents
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> cp
              agents/corpus-reviewer.md &lt;your-repo&gt;/.claude/agents/
            </p>
            <p className="mt-2 text-concrete-500">
              # optional: the delegation-provenance hook + the read-only guard
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> cp
              hooks/delegations.sh hooks/readonly-guard.sh
              &lt;your-repo&gt;/.claude/hooks/
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          These are Claude Code{" "}
          <strong className="text-concrete-100">agents</strong> (
          <code className="text-corpus-yellow">.claude/agents/</code>), not
          Agent-Skills, so it is copy-based —{" "}
          <code className="text-corpus-yellow">npx skills</code> installs the{" "}
          <Link
            href="/skills/"
            className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
          >
            skills catalog
          </Link>
          , not these. Like skills, an agent names abstract command slots (
          <code className="text-corpus-yellow">cmdTest</code>,{" "}
          <code className="text-corpus-yellow">cmdLint</code>) that your
          repo&apos;s <code className="text-corpus-yellow">AGENTS.md</code>{" "}
          fills in.
        </p>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>tier-1.conf — read-only workers</span>
          </div>
          <Heading className="mt-3">Read-only workers</Heading>
          <p className="mt-4 text-concrete-400">
            Their <code className="text-corpus-yellow">tools</code> allowlist
            excludes Edit/Write; the ones that keep Bash pair with the read-only
            guard. Scoping is toolable/partial — it narrows the surface, it is
            not a sandbox.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="draft">review required</Badge>
            <Badge variant="unverified">toolable limits</Badge>
          </div>
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
                          <h3 className="font-mono text-sm font-semibold text-brass">
                            {a.agent}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                            {a.use}
                          </p>
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
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-phosphor">
            <Hammer className="h-4 w-4" aria-hidden="true" />
            <span>tier-2.conf — bounded authoring</span>
          </div>
          <Heading className="mt-3">Bounded-authoring workers</Heading>
          <p className="mt-4 text-concrete-400">
            These grant Edit/Write to draft one artifact. Their value is the
            baked-in discipline, fresh-context isolation, and the delegation
            trace — not enforcement; a granted Write is not path-locked, and the
            body says so.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="ready">bounded draft</Badge>
            <Badge variant="draft">review required</Badge>
          </div>
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
                  <Card className="h-full border-panel-border hover:border-phosphor/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="green">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3 className="font-mono text-sm font-semibold text-phosphor">
                            {a.agent}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                            {a.use}
                          </p>
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
            A read-only agent&apos;s{" "}
            <code className="text-corpus-yellow">tools</code> allowlist
            genuinely drops Edit/Write, and the guard hook trips on the obvious
            write idioms — but a shell can still write, and a parent permission
            mode can bypass a hook. Nothing here is labelled
            &ldquo;enforced.&rdquo; The honest limits are written down, with the
            bypasses cited.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/corpus-agents/blob/main/docs/enforcement.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Read what the scoping does and does not guarantee →
            </Link>
          </p>
        </Card>

        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
            <Network className="h-4 w-4" />
            <span>delegation trace</span>
          </div>
          <Heading className="mt-3">
            Why not just the built-in reviewer?
          </Heading>
          <p className="mt-4 text-concrete-400">
            You can get far with a built-in agent and a CLAUDE.md. These add a
            fresh isolated context per role and — with the hook — a reviewable
            delegation trace the built-ins do not emit. Reach for them when that
            earns its keep.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/corpus-agents/blob/main/docs/provenance.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
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
            The definitions are authored for Claude Code, but they are the
            single source — they don&apos;t get hand-copied for other tools.{" "}
            <code className="text-corpus-yellow">
              corpus agents emit --codex
            </code>{" "}
            generates Codex{" "}
            <code className="text-corpus-yellow">.codex/agents/*.toml</code>{" "}
            from the same files, and the shared discipline — evidence over
            assertion and reconcile-only review — ports through
            the open <code className="text-corpus-yellow">AGENTS.md</code>{" "}
            format that Codex, Cursor, Copilot, Gemini CLI, and Aider all read.
          </p>
          <p className="mt-4 text-concrete-400">
            What does <em>not</em> travel, stated plainly: the tool-scoping
            allowlist and the hooks are Claude-Code-only structural enforcement.
            Every emitted file says so in its header — a Codex adopter gets the
            prose discipline and scopes tools in their own config. The
            discipline is portable; the enforcement is not.
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
            Eight workers, two hooks, and the evidence behind the design — all
            plain markdown plus two short POSIX-sh hooks. Read an agent before
            you install it; pin to a commit for a stable install.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/corpus-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Browse corpus-agents on GitHub →
            </Link>
          </p>
        </Card>
      </Section>
    </div>
  );
}
