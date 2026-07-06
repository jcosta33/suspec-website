import type { Metadata } from "next";
import {
  ArrowRight,
  Blocks,
  Bug,
  GitBranch,
  LayoutDashboard,
  Plus,
  ScanEye,
  ShieldCheck,
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
import { PilotLamp } from "../components/PilotLamp";
import { TextLink } from "../components/TextLink";
import { PageNav } from "../components/PageNav";
import { JsonLd } from "../components/JsonLd";
import { PackageJsonLd } from "../components/PackageJsonLd";
import { CopyButton } from "../components/CopyButton";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const CLI_REPOSITORY = "https://github.com/jcosta33/suspec-cli";
const CLI_PAGE_URL = `${SITE_URL}/cli/`;
const cliDescription =
  "suspec-cli scaffolds Suspec workspaces, runs checks, manages task worktrees, reviews evidence, and emits JSON without deciding correctness.";
const cliTitle = "suspec-cli — setup, checks, review, JSON";

export const metadata: Metadata = {
  title: cliTitle,
  description: cliDescription,
  openGraph: {
    title: cliTitle,
    description: cliDescription,
    type: "website",
    url: "/cli/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-cli.png",
        width: 1200,
        height: 630,
        alt: "suspec-cli command reference",
      },
    ],
  },
  alternates: canonicalAlternates("/cli/"),
};

const cliInstallCommands = [
  "HOST=github.com/jcosta33",
  "PKG=suspec-cli",
  "SRC=$HOST/$PKG.git",
  "git clone https://$SRC",
  'cd "$PKG"',
  "npm install",
  "npm run build",
  "npm link",
  "suspec --help",
].join("\n");

const cliExampleCommands = [
  "suspec check",
  "suspec worktree create auth-refresh --task TASK-12",
  "suspec review TASK-12",
  "suspec status -i",
].join("\n");

const commands = [
  {
    cmd: "init [dir]",
    family: "Setup",
    what: "Scaffold a Suspec workspace without overwriting existing files.",
    icon: Blocks,
  },
  {
    cmd: "update [--check|--write]",
    family: "Setup",
    what: "Check or refresh kit-owned files. Project work stays untouched.",
    icon: ShieldCheck,
  },
  {
    cmd: "check [file]",
    family: "Check",
    what: "Check one file or the workspace. Exit codes fit CI.",
    icon: ShieldCheck,
  },
  {
    cmd: "worktree",
    family: "Run",
    what: "Create, list, remove, or prune task worktrees.",
    icon: GitBranch,
  },
  {
    cmd: "status",
    family: "Check",
    what: "Print specs, tasks, reviews, and gaps. Use --json for scripts.",
    icon: LayoutDashboard,
  },
  {
    cmd: "review <task>",
    family: "Review",
    what: "Compare the task, run report, and git diff.",
    icon: ScanEye,
  },
  {
    cmd: "new <task|spec>",
    family: "Setup",
    what: "Create a spec or cut a task packet from a spec.",
    icon: Plus,
  },
  {
    cmd: "pull <ref>",
    family: "Setup",
    what: "Snapshot an external ticket into intake/.",
    icon: ArrowRight,
  },
  {
    cmd: "promote <task>",
    family: "Review",
    what: "Draft a finding from a finished task.",
    icon: Plus,
  },
  {
    cmd: "run <task> --agent <name>",
    family: "Run",
    what: "Launch a prepared task with your configured agent.",
    icon: Terminal,
  },
  {
    cmd: "show <task|spec|review|checks>",
    family: "JSON",
    what: "Print parsed artifacts as JSON.",
    icon: Blocks,
  },
  {
    cmd: "agents emit --codex",
    family: "Setup",
    what: "Generate Codex agent files from Claude Code agent definitions.",
    icon: Terminal,
  },
];

const principles = [
  {
    title: "One worktree per task",
    icon: GitBranch,
    text: "Keep parallel runs out of the main checkout.",
    signal: "reference",
  },
  {
    title: "Markdown is the source of truth",
    icon: Terminal,
    text: "The CLI reads Suspec files. The files stay canonical.",
    signal: "reference",
  },
  {
    title: "It reports checks, not decisions",
    icon: ShieldCheck,
    text: "Checks report facts. Review decides.",
    signal: "evidence",
  },
] as const satisfies Array<{
  title: string;
  icon: typeof GitBranch;
  text: string;
  signal: SignalRole;
}>;

const commandFamilies = [
  {
    label: "Setup",
    id: "setup-commands",
    commands: "init · update · new · pull · agents emit",
    detail: "Create or refresh kit-owned files.",
    icon: Blocks,
    signal: "reference",
  },
  {
    label: "Check",
    id: "check-commands",
    commands: "check · status",
    detail: "Report workspace facts and gaps.",
    icon: ShieldCheck,
    signal: "reference",
  },
  {
    label: "Review",
    id: "review-commands",
    commands: "review · promote",
    detail: "Compare evidence and draft findings.",
    icon: ScanEye,
    signal: "reference",
  },
  {
    label: "Run",
    id: "run-commands",
    commands: "worktree · run",
    detail: "Isolate task work and launch agents.",
    icon: GitBranch,
    signal: "reference",
  },
  {
    label: "JSON",
    id: "json-commands",
    commands: "show",
    detail: "Expose parsed artifacts for scripts.",
    icon: LayoutDashboard,
    signal: "reference",
  },
] as const;

const commandFamilyHrefByLabel = Object.fromEntries(
  commandFamilies.map((family) => [
    family.label,
    `/cli/#${family.id}` as `/cli/#${string}`,
  ]),
) as Record<string, `/cli/#${string}`>;

const cliCommandItems = commands.map((command) => ({
  name: `suspec ${command.cmd}`,
  description: `${command.what} Family: ${command.family}.`,
  url: commandFamilyHrefByLabel[command.family],
  category: `${command.family} command`,
}));

const cliPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${CLI_PAGE_URL}#webpage`,
  name: "suspec-cli command reference",
  url: CLI_PAGE_URL,
  description: cliDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${CLI_PAGE_URL}#source-code` },
  mainEntity: {
    "@type": "ItemList",
    name: "suspec-cli commands",
    itemListElement: cliCommandItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        url: `${SITE_URL}${item.url}`,
        genre: item.category,
      },
    })),
  },
};

const cliPageNav = [
  { label: "Families", href: "#command-families", signal: "reference" },
  { label: "Install", href: "#install", signal: "core" },
  { label: "Run loop", href: "#run-the-loop", signal: "core" },
  { label: "Commands", href: "#commands", signal: "reference" },
  { label: "Notes", href: "#design-notes", signal: "muted" },
  { label: "Source", href: "#source", signal: "reference" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

export default function CliPage() {
  return (
    <div className="repo-product-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="suspec-cli — reference implementation"
          className="page-hero-package-cli"
          motif="catalog"
          tone="reference"
          toneLabel="cli"
          titleLabel="suspec-cli"
          title={
            <>
              suspec<span className="product-name-suffix">-cli</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Optional CLI for setup, checks, task worktrees, evidence review,
            and JSON output. It reports facts; people decide.
          </p>
          <div className="hero-badge-row mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="draft">Command surface settling</Badge>
            <Badge variant="draft">No verdicts</Badge>
          </div>
        </PageHero>
      </Section>

      <PageNav
        items={cliPageNav}
        ariaLabel="suspec-cli page sections"
        wrapperClassName="mx-auto w-full max-w-7xl px-6 lg:px-8"
      />

      <Section
        id="command-families"
        register="01 / command families"
        registerTone="reference"
        className="scroll-mt-28 space-y-4"
      >
        <Panel brushed screws className="cli-surface-panel p-0">
          <div className="cli-surface-header">
            <h2>Command families</h2>
            <span>optional helper surface</span>
          </div>
          <ol
            className="cli-command-rail package-process-strip package-process-strip-cli process-strip process-strip-signal-reference grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-5"
            aria-label="suspec-cli command families"
          >
            {commandFamilies.map((family, index) => {
              const Icon = family.icon;
              return (
                <li
                  key={family.label}
                  className={`cli-command-step ${signalRoles[family.signal].processItem} bg-panel-raised/95`}
                >
                  <a
                    href={`#${family.id}`}
                    className="cli-command-link focus-ring group block h-full p-5 transition-colors duration-150 hover:bg-panel sm:p-6"
                    aria-label={`Jump to ${family.label} commands: ${family.commands}. ${family.detail}`}
                  >
                    <div className="cli-command-heading flex items-center gap-3">
                      <HexBadge
                        color={family.signal}
                        className="h-10 w-10 shrink-0"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <p
                          className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[family.signal].text}`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="cli-command-title font-heading text-lg font-semibold text-concrete-100">
                          {family.label}
                        </h3>
                      </div>
                      <ArrowRight
                        className="text-signal-reference motion-nudge-x ml-auto h-4 w-4 shrink-0 opacity-70"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="cli-command-code mt-3 font-mono text-xs leading-relaxed text-signal-reference">
                      {family.commands}
                    </p>
                    <p className="cli-command-detail mt-2 text-sm leading-relaxed text-concrete-400">
                      {family.detail}
                    </p>
                  </a>
                </li>
              );
            })}
          </ol>
        </Panel>
      </Section>

      <Section
        id="install"
        register="02 / install"
        registerTone="core"
        className="section-flow section-flow-tight scroll-mt-28"
      >
        <h2 className="sr-only">Install suspec-cli</h2>
        <div className="section-kicker section-kicker-core">
          <DroneIcon className="h-4 w-4" />
          <span>install</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="terminal"
            ariaLabel="install"
            copyText={cliInstallCommands}
          >
            <p className="text-concrete-500">
              # source install for now
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}HOST=github.com/jcosta33
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}PKG=suspec-cli
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}SRC=$HOST/$PKG.git
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}git clone https://$SRC
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}cd &quot;$PKG&quot;
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}npm install
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}npm run build
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}npm link
            </p>
            <p className="mt-2 text-concrete-500"># then run commands as</p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec --help
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="run-the-loop"
        register="03 / run the loop"
        registerTone="core"
        className="section-flow section-flow-tight scroll-mt-28"
      >
        <h2 className="sr-only">Run the Suspec loop with the CLI</h2>
        <div className="section-kicker section-kicker-core">
          <DroneIcon className="h-4 w-4" />
          <span>the-loop.sh — a task, end to end</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="terminal"
            ariaLabel="example session"
            copyText={cliExampleCommands}
          >
            <p className="text-concrete-500">
              # scaffold a workspace first
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec check{" "}
              <span className="text-concrete-500">
                # lint a spec or the whole workspace; exit 0/1/2
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec worktree
              create auth-refresh --task TASK-12{" "}
              <span className="text-concrete-500">
                # isolate the task on its own branch
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec review
              TASK-12{" "}
              <span className="text-concrete-500">
                # reconcile the finished run — diff vs report vs spec
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}suspec status -i{" "}
              <span className="text-concrete-500">
                # the board — specs, tasks, reviews, gaps
              </span>
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="commands"
        register="04 / command reference"
        registerTone="reference"
        className="cli-command-reference section-flow section-flow-tight scroll-mt-28"
      >
        <div className="cli-command-reference-intro max-w-5xl">
          <div className="section-kicker section-kicker-reference">
            <Bug className="h-4 w-4" aria-hidden="true" />
            <span>commands.md — public surface</span>
          </div>
          <Heading className="mt-3">Commands</Heading>
          <p className="mt-4 max-w-2xl text-concrete-400">
            Start with <code className="text-suspec-yellow">suspec check</code>
            {" "}
            and <code className="text-suspec-yellow">suspec review</code>. Use the
            rest when the workspace needs them.
          </p>
          <ul className="cli-command-legend mt-6" aria-label="Command family shortcuts">
            {commandFamilies.map((family) => (
              <li
                key={family.label}
                className={`cli-command-legend-item cli-command-legend-${family.signal}`}
              >
                <a
                  className="cli-command-legend-link focus-ring"
                  href={`#${family.id}`}
                  aria-label={`${family.label} commands: ${family.detail}`}
                >
                  <span>{family.label}</span>
                  <span>{family.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Panel brushed screws className="cli-command-catalog p-0">
          <div className="cli-command-catalog-header">
            <span>command catalog</span>
            <span>public surface</span>
          </div>
          <div className="cli-command-catalog-body">
            {commandFamilies.map((family) => {
              const signal = family.signal;
              const familyCommands = commands.filter(
                (command) => command.family === family.label,
              );
              return (
                <section
                  key={family.label}
                  id={family.id}
                  className={`cli-command-section cli-command-section-${signal} scroll-mt-28`}
                  aria-labelledby={`${family.id}-heading`}
                >
                  <div className="cli-command-section-heading">
                    <div>
                      <p className={`font-mono text-xs font-semibold uppercase tracking-[0.12em] ${signalRoles[signal].text}`}>
                        {family.commands}
                      </p>
                      <h3
                        id={`${family.id}-heading`}
                        className="mt-1 font-heading text-xl font-semibold text-concrete-100"
                      >
                        {family.label} commands
                      </h3>
                    </div>
                    <span className="cli-command-family-tag">family</span>
                  </div>
                  <ul className="cli-command-list">
                    {familyCommands.map((c) => {
                      const Icon = c.icon;
                      return (
                        <li key={c.cmd} className="min-w-0">
                          <div
                            className={`cli-command-row catalog-row catalog-row-${signal} group`}
                          >
                            <div className="flex min-w-0 items-start gap-4">
                              <HexBadge
                                color={signal}
                                className="catalog-row-badge cli-command-row-badge"
                              >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </HexBadge>
                              <div className="min-w-0">
                                <h4 className={`catalog-row-title font-mono text-[13px] leading-snug font-semibold break-words sm:text-sm ${signalRoles[signal].text}`}>
                                  suspec {c.cmd}
                                </h4>
                                <p className="catalog-row-copy mt-1 text-sm leading-relaxed text-concrete-400">
                                  {c.what}
                                </p>
                              </div>
                            </div>
                            <div className="cli-command-row-actions">
                              <CopyButton
                                text={`suspec ${c.cmd}`}
                                label="Copy"
                                ariaLabel={`Copy suspec ${c.cmd} command`}
                                className="cli-command-copy"
                              />
                              <PilotLamp
                                color={signal}
                                className="cli-command-row-lamp"
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </Panel>
      </Section>

      <Section
        id="design-notes"
        register="05 / design notes"
        registerTone="muted"
        className="section-flow scroll-mt-28"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-muted">
            <DroneIcon className="h-4 w-4" />
            <span>design.md — why a CLI?</span>
          </div>
          <Heading className="mt-3">
            Why a CLI?
          </Heading>
          <p className="mt-4 text-concrete-400">
            Suspec is plain files. The CLI handles repeatable chores around
            those files.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.title}>
                <Card
                  screws
                  className={`group h-full border-panel-border ${signalRoles[p.signal].hoverBorder}`}
                >
                    <div className={`catalog-row catalog-row-${p.signal}`}>
                      <HexBadge
                        color={p.signal}
                        className="catalog-row-badge mb-4"
                      >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <h3 className="catalog-row-title font-heading text-sm font-semibold uppercase tracking-wide text-concrete-100">
                      {p.title}
                    </h3>
                    <p className="catalog-row-copy mt-2 text-sm leading-relaxed text-concrete-400">
                      {p.text}
                    </p>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        id="source"
        register="06 / source"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-2"
      >
        <Card
          screws
          className="h-full"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div>
            <Heading>Don&apos;t need the CLI yet?</Heading>
            <p className="mt-2 text-concrete-400">
              Use the starter kit and write a spec. Add the CLI later when you
              want scaffolding, checks, worktrees, or JSON output.
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <TextLink
              href="/get-started/"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
            <TextLink
              href="/docs/ADOPTING/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the adopting notes docs (opens in new tab)"
              className="w-fit gap-2 text-base font-semibold"
              touchTarget
            >
              Read the adopting notes{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          </div>
        </Card>

        <Card
          screws
          className="h-full border-panel-border"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div>
            <Heading>Reference repository</Heading>
            <p className="mt-4 text-concrete-400">
              Source, issues, and release notes live on GitHub.
            </p>
          </div>
          <div className="mt-auto space-y-4">
            <p>
              <TextLink
                href="https://github.com/jcosta33/suspec-cli"
                target="_blank"
                rel="noopener noreferrer"
                touchTarget
                aria-label="Open suspec-cli on GitHub (opens in new tab)"
              >
                Open suspec-cli on GitHub →
              </TextLink>
            </p>
            <p className="text-concrete-400">
              Using an MCP client?{" "}
              <TextLink href="/mcp/">
                suspec-mcp exposes the same facts (read + reconcile, no verdict)
              </TextLink>
            </p>
          </div>
        </Card>
      </Section>
      <JsonLd data={cliPageJsonLd} />
      <PackageJsonLd
        name="suspec-cli"
        description={cliDescription}
        path="/cli/"
        repository={CLI_REPOSITORY}
        keywords={[
          "command line interface",
          "workspace checks",
          "task worktrees",
          "JSON output",
          "board status",
        ]}
        catalogItems={cliCommandItems}
      />
    </div>
  );
}
