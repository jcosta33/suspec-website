import type { Metadata } from "next";
import type { ComponentType } from "react";
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
import { SignalStat } from "../components/SignalStat";
import { signalRoles, type SignalRole } from "../components/signalStyles";

export const metadata: Metadata = {
  title: "corpus-agents — Corpus",
  description:
    "Claude Code worker files for Corpus review, exploration, evidence checks, and authoring.",
  openGraph: {
    title: "corpus-agents — Corpus",
    description:
      "Copy-based Claude Code worker files for Corpus roles.",
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

const agentInstallCommands = [
  "REPO=<your-repo>",
  "AGENT=corpus-reviewer.md",
  'DEST="$REPO"/.claude/agents',
  'mkdir -p "$DEST"',
  'cp agents/"$AGENT" "$DEST"/',
  'DEST="$REPO"/.claude/hooks',
  'mkdir -p "$DEST"',
  'cp hooks/*.sh "$DEST"/',
].join("\n");

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

const rosterGroups = [
  {
    title: "Read-only lane",
    note: "Review, inspect, verify, or challenge without writing artifacts.",
    tone: "read-only",
    signal: "reference",
    items: [
      {
        label: "Review",
        file: "corpus-reviewer",
        icon: Scale,
        use: "Review a finished task or PR.",
      },
      {
        label: "Explore",
        file: "corpus-explorer",
        icon: Compass,
        use: "Read a codebase and report how something works.",
      },
      {
        label: "Evidence",
        file: "corpus-evidence-checker",
        icon: ShieldCheck,
        use: "Re-run Verify items and flag missing evidence.",
      },
      {
        label: "Challenge",
        file: "corpus-challenger",
        icon: Swords,
        use: "Pressure-test a proposal before build work starts.",
      },
    ],
  },
  {
    title: "Bounded-authoring lane",
    note: "Draft one named artifact. Review still decides what it means.",
    tone: "write one artifact",
    signal: "change",
    items: [
      {
        label: "Spec",
        file: "corpus-spec-author",
        icon: PenTool,
        use: "Draft a spec from an intake note.",
      },
      {
        label: "Research",
        file: "corpus-researcher",
        icon: Microscope,
        use: "Research one question and write a note.",
      },
      {
        label: "Audit",
        file: "corpus-auditor",
        icon: FileSearch,
        use: "Audit a code area with file:line findings.",
      },
      {
        label: "Docs",
        file: "corpus-documentarian",
        icon: ScrollText,
        use: "Draft human-facing docs.",
      },
    ],
  },
] satisfies Array<{
  title: string;
  note: string;
  tone: string;
  signal: SignalRole;
  items: Array<{
    label: string;
    file: string;
    icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    use: string;
  }>;
}>;

function repoHref(agent: string) {
  return `https://github.com/jcosta33/corpus-agents/blob/main/agents/${agent}.md`;
}

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="worker files / agent roles"
          tone="reference"
          title={
            <>
              corpus<span className="text-corpus-yellow">-agents</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Claude Code worker files for Corpus roles.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Copy one into a repo when you want a role with its own context.
          </p>
        </PageHero>
      </Section>

      <Section
        register="01 / roster brief"
        registerTone="reference"
        className="manifest-pair grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch"
      >
        <PaperArtifact
          label="note"
          title="delegation record"
          meta="worker identity · inputs · tools · evidence"
          className="h-full"
        >
          <p>A worker can return evidence. It cannot certify its own result.</p>
        </PaperArtifact>
        <Card
          screws
          className="repo-manifest-card h-full"
          contentClassName="repo-manifest-content"
        >
          <p className="repo-manifest-label">role files</p>
          <div className="repo-manifest-grid">
            <SignalStat label="workers" value="8" signal="core" />
            <SignalStat label="hooks" value="2" signal="muted" />
            <SignalStat
              label="home"
              value=".claude/agents"
              signal="reference"
              valueClassName="font-mono text-sm text-concrete-300"
            />
          </div>
          <p className="repo-manifest-note">
            This page is a roster. The repo holds the files; the docs explain
            when to delegate.
          </p>
        </Card>
      </Section>

      <Section
        register="02 / worker lanes"
        registerTone="muted"
        className="agent-roster-grid grid gap-4 lg:grid-cols-2"
      >
        {rosterGroups.map((group, groupIndex) => (
          <Panel
            key={group.title}
            brushed
            className={`agent-roster-panel agent-roster-panel-${group.signal} p-0`}
          >
            <div className="agent-roster-header flex min-h-[8.25rem] items-start justify-between gap-5 border-b border-panel-border bg-panel-raised/95 p-5 sm:p-6">
              <div className="min-w-0">
                <p
                  className={`font-mono text-xs font-semibold uppercase tracking-[0.12em] ${signalRoles[group.signal].text}`}
                >
                  lane {String(groupIndex + 1).padStart(2, "0")} — {group.tone}
                </p>
                <h2 className="mt-2 font-heading text-xl font-bold text-concrete-100">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {group.note}
                </p>
              </div>
              <div
                className={`agent-roster-manifest grid min-w-16 justify-items-end gap-1 font-mono uppercase leading-none ${signalRoles[group.signal].text}`}
                aria-hidden="true"
              >
                <span>{group.items.length}</span>
                <span>files</span>
              </div>
            </div>
            <div className="agent-roster-cells grid gap-px bg-panel-border sm:grid-cols-2">
              {group.items.map((item, index) => (
                <a
                  key={item.file}
                  href={repoHref(item.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.file} definition on GitHub (opens in new tab)`}
                  className="agent-roster-cell group block h-full min-h-[13.25rem] bg-panel-raised/95 p-5 transition-[background-color] hover:bg-panel focus-ring sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <HexBadge
                      color={group.signal}
                      className="agent-roster-icon h-10 w-10"
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </HexBadge>
                    <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p
                      className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[group.signal].text}`}
                    >
                      {String(groupIndex * 4 + index + 1).padStart(2, "0")}
                    </p>
                    <ExternalLink
                      className="motion-nudge-x h-4 w-4 shrink-0 text-brass/70 transition-[opacity,transform] group-hover:opacity-100 group-focus:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                      <h3 className="mt-3 font-heading text-xl font-bold text-concrete-100">
                        {item.label}
                      </h3>
                      <p
                        className={`mt-2 break-words font-mono text-xs leading-relaxed ${signalRoles[group.signal].text}`}
                      >
                        {item.file}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-concrete-400">
                        {item.use}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Panel>
        ))}
      </Section>

      <Section
        register="03 / install"
        registerTone="reference"
        className="flex flex-col gap-8"
      >
        <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
          <DroneIcon className="h-4 w-4" />
          <span>install.sh — copy one worker</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={agentInstallCommands}>
            <p className="text-concrete-500">
              # copy one worker
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}REPO=&lt;your-repo&gt;
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}AGENT=corpus-reviewer.md
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}DEST=&quot;$REPO&quot;/.claude/agents
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}mkdir -p &quot;$DEST&quot;
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cp agents/&quot;$AGENT&quot; &quot;$DEST&quot;/
            </p>
            <p className="mt-2 text-concrete-500">
              # optional hooks
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}DEST=&quot;$REPO&quot;/.claude/hooks
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}mkdir -p &quot;$DEST&quot;
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cp hooks/*.sh &quot;$DEST&quot;/
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

      <Section
        register="04 / read-only"
        registerTone="reference"
        className="flex flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
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
        <ul className="reveal grid gap-4 sm:grid-cols-2">
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
                  <Card
                    className={`h-full border-panel-border ${signalRoles.reference.hoverBorder}`}
                  >
                    <div className="catalog-row catalog-row-reference flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="reference" className="catalog-row-badge">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3
                            className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.reference.text}`}
                          >
                            {a.agent}
                          </h3>
                          <p className="catalog-row-copy mt-1 text-sm leading-relaxed text-concrete-400">
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

      <Section
        register="05 / bounded authoring"
        registerTone="change"
        className="flex flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
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
        <ul className="reveal grid gap-4 sm:grid-cols-2">
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
                  <Card
                    className={`h-full border-panel-border ${signalRoles.change.hoverBorder}`}
                  >
                    <div className="catalog-row catalog-row-change flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="change" className="catalog-row-badge">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3
                            className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.change.text}`}
                          >
                            {a.agent}
                          </h3>
                          <p className="catalog-row-copy mt-1 text-sm leading-relaxed text-concrete-400">
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

      <Section
        register="06 / limits"
        registerTone="muted"
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card screws className="border-panel-border">
          <div className="section-kicker section-kicker-muted">
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
          <div className="section-kicker section-kicker-reference">
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

      <Section
        register="07 / portability"
        registerTone="reference"
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card screws className="h-full border-panel-border">
          <div className="section-kicker section-kicker-muted">
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
          <div className="section-kicker section-kicker-muted">
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
