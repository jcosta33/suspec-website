import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
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
import { HeroTrace } from "../components/HeroTrace";
import { Heading } from "../components/Heading";
import { Badge } from "../components/Badge";
import { PaperArtifact } from "../components/PaperArtifact";
import { TextLink } from "../components/TextLink";
import { SignalStat } from "../components/SignalStat";
import { PageNav } from "../components/PageNav";
import { PackageJsonLd } from "../components/PackageJsonLd";
import { JsonLd } from "../components/JsonLd";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const AGENTS_REPOSITORY = "https://github.com/jcosta33/suspec-agents";
const AGENTS_PAGE_URL = `${SITE_URL}/agents/`;
const agentsDescription =
  "suspec-agents provides Claude Code worker files for Suspec review, challenge, research, spec, audit, and docs roles; workers return evidence, not verdicts.";
const agentsTitle = "suspec-agents — Claude Code workers for Suspec";

export const metadata: Metadata = {
  title: agentsTitle,
  description: agentsDescription,
  openGraph: {
    title: agentsTitle,
    description: agentsDescription,
    type: "website",
    url: "/agents/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-agents.png",
        width: 1200,
        height: 630,
        alt: "suspec-agents — Claude Code worker files for review, challenge, and authoring",
      },
    ],
  },
  alternates: canonicalAlternates("/agents/"),
};

const agentInstallCommands = [
  "REPO=<your-repo>",
  "AGENT=suspec-reviewer.md",
  'DEST="$REPO"/.claude/agents',
  'mkdir -p "$DEST"',
  'cp agents/"$AGENT" "$DEST"/',
  'DEST="$REPO"/.claude/hooks',
  'mkdir -p "$DEST"',
  'cp hooks/*.sh "$DEST"/',
].join("\n");

const readOnly = [
  {
    agent: "suspec-reviewer",
    icon: Scale,
    use: "review a finished task or PR, or re-run Verify items in proof-first mode",
  },
  {
    agent: "suspec-challenger",
    icon: Swords,
    use: "pressure-test a proposal before build work starts",
  },
];

const authoring = [
  {
    agent: "suspec-spec-author",
    icon: PenTool,
    use: "draft a spec from an intake note",
  },
  {
    agent: "suspec-researcher",
    icon: Microscope,
    use: "research one question and write a note",
  },
  {
    agent: "suspec-auditor",
    icon: FileSearch,
    use: "audit a code area with file:line findings",
  },
  {
    agent: "suspec-documentarian",
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
        file: "suspec-reviewer",
        icon: Scale,
        signal: "evidence",
        use: "Review a finished task or PR, or re-run Verify items in proof-first mode.",
      },
      {
        label: "Challenge",
        file: "suspec-challenger",
        icon: Swords,
        signal: "muted",
        use: "Pressure-test a proposal before build work starts.",
      },
    ],
  },
  {
    title: "Bounded-authoring lane",
    note: "Draft one named artifact. Review still decides what it means.",
    tone: "write one artifact",
    signal: "muted",
    items: [
      {
        label: "Spec",
        file: "suspec-spec-author",
        icon: PenTool,
        signal: "core",
        use: "Draft a spec from an intake note.",
      },
      {
        label: "Research",
        file: "suspec-researcher",
        icon: Microscope,
        signal: "reference",
        use: "Research one question and write a note.",
      },
      {
        label: "Audit",
        file: "suspec-auditor",
        icon: FileSearch,
        signal: "evidence",
        use: "Audit a code area with file:line findings.",
      },
      {
        label: "Docs",
        file: "suspec-documentarian",
        icon: ScrollText,
        signal: "reference",
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
    signal: SignalRole;
    use: string;
  }>;
}>;

const laneSummary = [
  {
    href: "#read-only-workers",
    label: "Read-only",
    count: "2 roles",
    files: "reviewer · challenger",
    text: "Inspect, verify, and challenge without writing artifacts.",
    ariaLabel:
      "Read-only lane: two roles, reviewer and challenger. Inspect, verify, and challenge without writing artifacts.",
    signal: "reference",
  },
  {
    href: "#bounded-authoring",
    label: "Bounded authoring",
    count: "4 roles",
    files: "spec · research · audit · docs",
    text: "Draft one named artifact; review still decides.",
    ariaLabel:
      "Bounded authoring lane: four roles, spec, research, audit, and docs. Draft one named artifact; review still decides.",
    signal: "core",
  },
] as const satisfies Array<{
  href: string;
  label: string;
  count: string;
  files: string;
  text: string;
  ariaLabel: string;
  signal: SignalRole;
}>;

const delegationContract = [
  {
    label: "Input",
    value: "Task, spec, PR, or focused question.",
  },
  {
    label: "Scope",
    value: "Role prompt plus any tool limits the runner can enforce.",
  },
  {
    label: "Output",
    value: "Evidence, draft text, or notes that a reviewer can inspect.",
  },
  {
    label: "Gate",
    value: "A human or team rule decides what passes.",
  },
] as const;

const agentPageNav = [
  { label: "Roster", href: "#roster-brief", signal: "reference" },
  { label: "Install", href: "#install", signal: "core" },
  { label: "Read-only", href: "#read-only-workers", signal: "reference" },
  { label: "Authoring", href: "#bounded-authoring", signal: "core" },
  { label: "Limits", href: "#limits", signal: "muted" },
  { label: "Portability", href: "#portability", signal: "reference" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

function repoHref(agent: string) {
  return `${AGENTS_REPOSITORY}/blob/main/agents/${agent}.md`;
}

const agentCatalogItems = rosterGroups.flatMap((group) =>
  group.items.map((item) => ({
    name: item.file,
    description: item.use,
    url: repoHref(item.file),
    category: group.title,
  })),
);

const agentsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${AGENTS_PAGE_URL}#webpage`,
  name: "suspec-agents worker roster",
  url: AGENTS_PAGE_URL,
  description: agentsDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${AGENTS_PAGE_URL}#source-code` },
  mainEntity: {
    "@type": "ItemList",
    name: "suspec-agents worker files",
    itemListElement: agentCatalogItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        url: item.url,
        genre: item.category,
      },
    })),
  },
};

function AgentInstallSection() {
  return (
    <Section
      id="install"
      register="02 / install"
      registerTone="reference"
      className="section-flow section-flow-tight"
    >
      <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
        <DroneIcon className="h-4 w-4" />
        <span>install.sh — copy one worker</span>
      </div>
      <Panel brushed className="p-2">
        <TerminalWindow title="terminal" copyText={agentInstallCommands}>
          <p className="text-concrete-500"># copy one worker</p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}
            REPO=&lt;your-repo&gt;
          </p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}
            AGENT=suspec-reviewer.md
          </p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}
            DEST=&quot;$REPO&quot;/.claude/agents
          </p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}
            mkdir -p &quot;$DEST&quot;
          </p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}cp agents/&quot;$AGENT&quot; &quot;$DEST&quot;/
          </p>
          <p className="mt-2 text-concrete-500"># optional hooks</p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}
            DEST=&quot;$REPO&quot;/.claude/hooks
          </p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}
            mkdir -p &quot;$DEST&quot;
          </p>
          <p className="text-concrete-100">
            <span className="text-suspec-yellow">$</span>{" "}cp hooks/*.sh &quot;$DEST&quot;/
          </p>
        </TerminalWindow>
      </Panel>
      <p className="section-after-panel-note">
        These are Claude Code agents in{" "}
        <code className="text-suspec-yellow">.claude/agents/</code>.{" "}
        <code className="text-suspec-yellow">npx skills</code> installs the{" "}
        <TextLink href="/skills/">skills catalog</TextLink>, not these.
      </p>
    </Section>
  );
}

export default function AgentsPage() {
  return (
    <div className="repo-product-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="worker files / agent roles"
          className="page-hero-package-agents"
          motif="catalog"
          tone="reference"
          toneLabel="agents"
          titleLabel="suspec-agents"
          title={
            <>
              suspec<span className="product-name-suffix">-agents</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Claude Code role files for review, challenge, research, spec, audit,
            and docs work. They return evidence, not verdicts.
          </p>
          <HeroTrace
            ariaLabel="Agent role trace"
            items={[
              { label: "Role", signal: "reference" },
              { label: "Inputs", signal: "core" },
              { label: "Tools", signal: "muted" },
              { label: "Evidence", signal: "evidence" },
            ]}
          />
        </PageHero>
      </Section>

      <PageNav
        items={agentPageNav}
        ariaLabel="suspec-agents page sections"
        wrapperClassName="mx-auto w-full max-w-7xl px-6 lg:px-8"
      />

      <Section
        id="roster-brief"
        register="01 / roster brief"
        registerTone="reference"
        className="manifest-pair grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start"
      >
        <h2 className="sr-only">Roster brief</h2>
        <PaperArtifact
          label="note"
          title="delegation contract"
          meta="input · scope · output · gate"
          className="manifest-paper-fit lg:self-start"
        >
          <dl className="agent-delegation-contract">
            {delegationContract.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </PaperArtifact>
        <Card
          screws
          className="repo-manifest-card h-full"
          contentClassName="repo-manifest-content"
        >
          <p className="repo-manifest-label">role files</p>
          <div className="repo-manifest-grid">
            <SignalStat
              label="workers"
              value="6 role files"
              signal="reference"
              valueClassName="font-mono text-sm uppercase text-concrete-300"
            />
            <SignalStat
              label="hooks"
              value="optional"
              signal="muted"
              valueClassName="font-mono text-sm uppercase text-concrete-300"
            />
            <SignalStat
              label="target"
              value=".claude/agents"
              signal="reference"
              valueClassName="font-mono text-sm text-concrete-300"
            />
          </div>
          <p className="repo-manifest-note">
            Copy the role file that matches the job.{" "}
            <TextLink
              href="/docs/07-running-agents/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the running agents docs (opens in new tab)"
            >
              The docs cover delegation timing
            </TextLink>
            , review boundaries, and what still needs human judgment.
          </p>
          <div className="agent-lane-summary" aria-label="Agent role lanes">
            {laneSummary.map((lane) => (
              <a
                key={lane.label}
                href={lane.href}
                aria-label={lane.ariaLabel}
                className={`agent-lane-summary-link agent-lane-summary-link-${lane.signal} focus-ring`}
              >
                <span>
                  <span className="agent-lane-summary-title">{lane.label}</span>
                  <span className="agent-lane-summary-count">{lane.count}</span>
                </span>
                <span className="agent-lane-summary-files">{lane.files}</span>
                <span className="agent-lane-summary-copy">{lane.text}</span>
              </a>
            ))}
          </div>
        </Card>
      </Section>

      <AgentInstallSection />

      <Section
        id="worker-lanes"
        register="03 / worker lanes"
        registerTone="muted"
        className="agent-roster-grid grid gap-4 min-[54rem]:grid-cols-[0.58fr_1fr] lg:grid-cols-[0.62fr_1fr]"
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
                <h2 className="mt-2 font-heading text-xl font-semibold text-concrete-100">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {group.note}
                </p>
              </div>
            </div>
            <div
              className={`agent-roster-cells grid gap-px bg-panel-border ${
                groupIndex === 0 ? "" : "sm:grid-cols-2"
              }`}
            >
              {group.items.map((item, index) => (
                <a
                  key={item.file}
                  href={repoHref(item.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.file} definition on GitHub (opens in new tab)`}
                  className={`agent-roster-cell agent-roster-cell-${item.signal} group block h-full min-h-[13.25rem] bg-panel-raised/95 p-5 transition-[background-color] hover:bg-panel focus-ring sm:p-6`}
                >
                  <div className="flex items-start gap-4">
                    <HexBadge
                      color={item.signal}
                      className="agent-roster-icon h-10 w-10"
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </HexBadge>
                    <div className="agent-roster-cell-body min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <p
                          className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[item.signal].text}`}
                        >
                          {String(
                            (groupIndex === 0
                              ? 0
                              : rosterGroups[0].items.length) +
                              index +
                              1,
                          ).padStart(2, "0")}
                        </p>
                        <ExternalLink
                          className="motion-nudge-x h-4 w-4 shrink-0 text-brass/70 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="agent-roster-cell-title mt-3 font-heading text-xl font-semibold">
                        {item.label}
                      </h3>
                      <p
                        className={`agent-roster-file mt-2 break-words font-mono text-xs leading-relaxed ${signalRoles[item.signal].text}`}
                      >
                        {item.file}
                      </p>
                      <p className="agent-roster-use mt-3 text-sm leading-relaxed text-concrete-400">
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
        id="read-only-workers"
        register="04 / read-only"
        registerTone="reference"
        className="section-flow"
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
        <ul className="agent-worker-list reveal grid gap-4 sm:grid-cols-2">
          {readOnly.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.agent}>
                <a
                  href={repoHref(a.agent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.agent}.md role file on GitHub (opens in new tab)`}
                  className="group block rounded-sm focus-ring"
                >
                  <Card
                    signal="reference"
                    className={`agent-worker-card h-full border-panel-border ${signalRoles.reference.hoverBorder}`}
                  >
                    <div className="catalog-row catalog-row-reference flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="reference" className="catalog-row-badge">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div className="agent-worker-body min-w-0">
                          <h3
                            className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.reference.text}`}
                          >
                            {a.agent}
                          </h3>
                          <p className="agent-worker-file font-mono text-xs leading-relaxed text-concrete-500">
                            <span className="sr-only"> role file </span>
                            .claude/agents/{a.agent}.md
                          </p>
                          <p className="catalog-row-copy text-sm leading-relaxed text-concrete-400">
                            <span className="sr-only"> purpose </span>
                            {a.use}
                          </p>
                        </div>
                      </div>
                      <ExternalLink
                        className="catalog-row-link-icon mt-0.5 h-4 w-4 shrink-0 text-concrete-500 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
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
        id="bounded-authoring"
        register="05 / bounded authoring"
        registerTone="core"
        className="section-flow"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.core.sectionKicker}`}>
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
        <ul className="agent-worker-list reveal grid gap-4 sm:grid-cols-2">
          {authoring.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.agent}>
                <a
                  href={repoHref(a.agent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.agent}.md role file on GitHub (opens in new tab)`}
                  className="group block rounded-sm focus-ring"
                >
                  <Card
                    signal="core"
                    className={`agent-worker-card h-full border-panel-border ${signalRoles.core.hoverBorder}`}
                  >
                    <div className="catalog-row catalog-row-core flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="core" className="catalog-row-badge">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div className="agent-worker-body min-w-0">
                          <h3
                            className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.core.text}`}
                          >
                            {a.agent}
                          </h3>
                          <p className="agent-worker-file font-mono text-xs leading-relaxed text-concrete-500">
                            <span className="sr-only"> role file </span>
                            .claude/agents/{a.agent}.md
                          </p>
                          <p className="catalog-row-copy text-sm leading-relaxed text-concrete-400">
                            <span className="sr-only"> purpose </span>
                            {a.use}
                          </p>
                        </div>
                      </div>
                      <ExternalLink
                        className="catalog-row-link-icon mt-0.5 h-4 w-4 shrink-0 text-concrete-500 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
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
        id="limits"
        register="06 / limits"
        registerTone="muted"
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card signal="muted" screws className="border-panel-border">
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
              href="https://github.com/jcosta33/suspec-agents/blob/main/docs/enforcement.md"
              target="_blank"
              rel="noopener noreferrer"
              touchTarget
              aria-label="Read the suspec-agents enforcement notes on GitHub (opens in new tab)"
            >
              Read the enforcement notes →
            </TextLink>
          </p>
        </Card>

        <Card signal="reference" screws className="border-panel-border">
          <div className="section-kicker section-kicker-reference">
            <Network className="h-4 w-4" />
            <span>delegation trace</span>
          </div>
          <Heading className="mt-3">
            When role files help
          </Heading>
          <p className="mt-4 text-concrete-400">
            Use built-ins for quick passes. Use role files when the review needs
            a repeatable scope, tool list, or delegation trace.
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/suspec-agents/blob/main/docs/provenance.md"
              target="_blank"
              rel="noopener noreferrer"
              touchTarget
              aria-label="Read how the suspec-agents delegation trace works on GitHub (opens in new tab)"
            >
              How the delegation trace works →
            </TextLink>
          </p>
        </Card>
      </Section>

      <Section
        id="portability"
        register="07 / portability"
        registerTone="reference"
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card signal="muted" screws className="h-full border-panel-border">
          <div className="section-kicker section-kicker-muted">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>portability</span>
          </div>
          <Heading className="mt-3">Claude Code first</Heading>
          <p className="mt-4 text-concrete-400">
            <code className="text-suspec-yellow">
              suspec agents emit --codex
            </code>{" "}
            generates Codex agent files from the same definitions.
          </p>
          <p className="mt-4 text-concrete-400">
            Tool scoping and hooks are specific to Claude Code. Other runners
            need their own controls.
          </p>
        </Card>

        <Card signal="reference" screws className="h-full border-panel-border">
          <div className="section-kicker section-kicker-muted">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>catalog — browse on github</span>
          </div>
          <Heading className="mt-3">The full catalog</Heading>
          <p className="mt-4 text-concrete-400">
            Worker files and optional hooks. Read the file before you copy it.
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/suspec-agents"
              target="_blank"
              rel="noopener noreferrer"
              touchTarget
              aria-label="Browse suspec-agents on GitHub (opens in new tab)"
            >
              Browse suspec-agents on GitHub →
            </TextLink>
          </p>
        </Card>
      </Section>
      <JsonLd data={agentsPageJsonLd} />
      <PackageJsonLd
        name="suspec-agents"
        description={agentsDescription}
        path="/agents/"
        repository={AGENTS_REPOSITORY}
        keywords={[
          "Claude Code agents",
          "worker files",
          "review agents",
          "challenge agents",
          "authoring agents",
        ]}
        catalogItems={agentCatalogItems}
      />
    </div>
  );
}
