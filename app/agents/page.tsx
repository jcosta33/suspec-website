import type { Metadata } from "next";
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
import { TextLink } from "../components/TextLink";

export const metadata: Metadata = {
  title: "Agents — Corpus",
  description:
    "Claude Code worker definitions for Corpus review, exploration, evidence checks, and authoring.",
  openGraph: {
    title: "Agents — Corpus",
    description:
      "Copy-based Claude Code agent definitions for Corpus roles.",
    type: "website",
    url: "/agents/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "corpus-agents",
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
    use: "review a finished task or PR",
  },
  {
    agent: "corpus-explorer",
    icon: Compass,
    use: "read a codebase and report how something works",
  },
  {
    agent: "corpus-evidence-checker",
    icon: ShieldCheck,
    use: "re-run Verify items and flag missing evidence",
  },
  {
    agent: "corpus-challenger",
    icon: Swords,
    use: "pressure-test a proposal before build work starts",
  },
];

const authoring = [
  {
    agent: "corpus-spec-author",
    icon: PenTool,
    use: "draft a spec from an intake note",
  },
  {
    agent: "corpus-researcher",
    icon: Microscope,
    use: "research one question and write a note",
  },
  {
    agent: "corpus-auditor",
    icon: FileSearch,
    use: "audit a code area with file:line findings",
  },
  {
    agent: "corpus-documentarian",
    icon: ScrollText,
    use: "draft human-facing docs",
  },
];

function repoHref(agent: string) {
  return `https://github.com/jcosta33/corpus-agents/blob/main/agents/${agent}.md`;
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-20">
      <Section>
        <PageHero
          eyebrow="worker files / agent roles"
          title={
            <>
              corpus<span className="text-corpus-yellow">-agents</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Claude Code worker definitions for Corpus roles.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Copy one into a repo when you want a role with its own context.
          </p>
        </PageHero>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
        <PaperArtifact
          label="note"
          title="delegation record"
          meta="worker identity · inputs · tools · evidence"
          className="h-full"
        >
          <p>A worker can return evidence. It cannot certify its own result.</p>
        </PaperArtifact>
        <Card screws className="h-full">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">
                workers
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-concrete-100">
                8
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">
                hooks
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-concrete-100">
                2
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">
                home
              </p>
              <p className="mt-2 font-mono text-sm text-concrete-300">
                .claude/agents
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-concrete-400">
            This page is a roster. The repo holds the files; the docs explain
            when to delegate.
          </p>
        </Card>
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
              <span className="text-corpus-yellow">$</span>{" "}mkdir -p
              &lt;your-repo&gt;/.claude/agents
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cp
              agents/corpus-reviewer.md &lt;your-repo&gt;/.claude/agents/
            </p>
            <p className="mt-2 text-concrete-500">
              # optional: the delegation-provenance hook + the read-only guard
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cp
              hooks/delegations.sh hooks/readonly-guard.sh
              &lt;your-repo&gt;/.claude/hooks/
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          These are Claude Code agents in{" "}
          <code className="text-corpus-yellow">.claude/agents/</code>.{" "}
          <code className="text-corpus-yellow">npx skills</code> installs the{" "}
          <TextLink href="/skills/">skills catalog</TextLink>, not these.
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
            These drop Edit/Write from the tool list. The guard narrows shell
            writes. It is not a sandbox.
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
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-olive">
            <Hammer className="h-4 w-4" aria-hidden="true" />
            <span>tier-2.conf — bounded authoring</span>
          </div>
          <Heading className="mt-3">Bounded-authoring workers</Heading>
          <p className="mt-4 text-concrete-400">
            These can write one artifact. The scope is instruction, not hard
            enforcement.
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
                  <Card className="h-full border-panel-border hover:border-olive/60">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="olive">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3 className="font-mono text-sm font-semibold text-olive">
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
          <Heading className="mt-3">Limits</Heading>
          <p className="mt-4 text-concrete-400">
            Tool lists and hooks narrow the surface. They do not make a hard
            security boundary.
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/corpus-agents/blob/main/docs/enforcement.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the enforcement notes →
            </TextLink>
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
            Use built-ins when they are enough. Use these when a role file or
            delegation trace helps.
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/corpus-agents/blob/main/docs/provenance.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              How the delegation trace works →
            </TextLink>
          </p>
        </Card>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-2">
        <Card screws className="h-full border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>portability</span>
          </div>
          <Heading className="mt-3">Claude Code first</Heading>
          <p className="mt-4 text-concrete-400">
            <code className="text-corpus-yellow">
              corpus agents emit --codex
            </code>{" "}
            generates Codex agent files from the same definitions.
          </p>
          <p className="mt-4 text-concrete-400">
            Tool scoping and hooks are specific to Claude Code. Other runners
            need their own controls.
          </p>
        </Card>

        <Card screws className="h-full border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>catalog — browse on github</span>
          </div>
          <Heading className="mt-3">The full catalog</Heading>
          <p className="mt-4 text-concrete-400">
            Eight workers and two hooks. Read the file before you copy it.
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/corpus-agents"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse corpus-agents on GitHub →
            </TextLink>
          </p>
        </Card>
      </Section>
    </div>
  );
}
