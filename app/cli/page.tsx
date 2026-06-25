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

export const metadata: Metadata = {
  title: "CLI — Corpus",
  description:
    "corpus-cli scaffolds workspaces, runs checks, manages task worktrees, and prints the board.",
  openGraph: {
    title: "CLI — Corpus",
    description:
      "corpus-cli scaffolds workspaces, runs checks, manages task worktrees, and prints the board.",
    type: "website",
    url: "/cli/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-cli.png",
        width: 1200,
        height: 630,
        alt: "corpus-cli command reference",
      },
    ],
  },
  alternates: {
    canonical: "/cli/",
  },
};

const commands = [
  {
    cmd: "init [dir]",
    what: "Scaffold a Corpus workspace without overwriting existing files.",
    icon: Blocks,
  },
  {
    cmd: "update [--check|--write]",
    what: "Check or refresh kit-owned files. Project work stays untouched.",
    icon: ShieldCheck,
  },
  {
    cmd: "check [file]",
    what: "Check one file or the workspace. Exit codes fit CI.",
    icon: ShieldCheck,
  },
  {
    cmd: "worktree",
    what: "Create, list, remove, or prune task worktrees.",
    icon: GitBranch,
  },
  {
    cmd: "status",
    what: "Print specs, tasks, reviews, and gaps. Use --json for scripts.",
    icon: LayoutDashboard,
  },
  {
    cmd: "review <task>",
    what: "Compare the task, run report, and git diff.",
    icon: ScanEye,
  },
  {
    cmd: "new <task|spec>",
    what: "Create a spec or cut a task packet from a spec.",
    icon: Plus,
  },
  {
    cmd: "pull <ref>",
    what: "Snapshot an external ticket into intake/.",
    icon: ArrowRight,
  },
  {
    cmd: "promote <task>",
    what: "Draft a finding from a finished task.",
    icon: Plus,
  },
  {
    cmd: "run <task> --agent <name>",
    what: "Launch a prepared task with your configured agent.",
    icon: Terminal,
  },
  {
    cmd: "show <task|spec|review|checks>",
    what: "Print parsed artifacts as JSON.",
    icon: Blocks,
  },
  {
    cmd: "agents emit --codex",
    what: "Generate Codex agent files from Claude Code agent definitions.",
    icon: Terminal,
  },
];

const principles = [
  {
    title: "One worktree per task",
    icon: GitBranch,
    text: "Keep parallel runs out of the main checkout.",
  },
  {
    title: "Markdown is the source of truth",
    icon: Terminal,
    text: "The CLI reads the files. It does not replace them.",
  },
  {
    title: "It reports checks, not decisions",
    icon: ShieldCheck,
    text: "Checks report facts. Review decides.",
  },
];

export default function CliPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="corpus-cli — reference implementation"
          title={
            <>
              corpus<span className="text-corpus-yellow">-cli</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Optional command-line help for the Corpus workflow.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            It scaffolds files, runs checks, manages task worktrees, and prints
            the board.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="unverified">Command surface settling</Badge>
            <Badge variant="draft">No verdicts</Badge>
          </div>
        </PageHero>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="section-kicker section-kicker-gold">
          <DroneIcon className="h-4 w-4" />
          <span>install</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" ariaLabel="install">
            <p className="text-concrete-500">
              # source install for now
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}HOST=github.com/jcosta33
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}PKG=corpus-cli
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}SRC=$HOST/$PKG.git
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}git clone https://$SRC
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cd &quot;$PKG&quot;
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npm install
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npm run build
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npm link
            </p>
            <p className="mt-2 text-concrete-500"># then run commands as</p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus --help
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="section-kicker section-kicker-gold">
          <DroneIcon className="h-4 w-4" />
          <span>the-loop.sh — a task, end to end</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" ariaLabel="example session">
            <p className="text-concrete-500">
              # scaffold a workspace first
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus check{" "}
              <span className="text-concrete-500">
                # lint a spec or the whole workspace; exit 0/1/2
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus worktree
              create auth-refresh --task TASK-12{" "}
              <span className="text-concrete-500">
                # isolate the task on its own branch
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus review
              TASK-12{" "}
              <span className="text-concrete-500">
                # reconcile the finished run — diff vs report vs spec
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}corpus status -i{" "}
              <span className="text-concrete-500">
                # the board — specs, tasks, reviews, gaps
              </span>
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-olive">
            <Bug className="h-4 w-4" aria-hidden="true" />
            <span>commands.md — public surface</span>
          </div>
          <Heading className="mt-3">Commands</Heading>
          <p className="mt-4 text-concrete-400">
            Start with <code className="text-corpus-yellow">corpus check</code>
            and <code className="text-corpus-yellow">corpus review</code>. Use
            the rest when the workspace needs them.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {commands.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.cmd} className="min-w-0">
                <Card
                  screws
                  className="group h-full border-panel-border hover:border-olive/60"
                >
                  <div className="relative pr-8">
                    <div className="flex min-w-0 items-start gap-4">
                      <HexBadge color="olive">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <h3 className="font-mono text-[13px] leading-snug font-semibold text-olive break-words sm:text-sm">
                          corpus {c.cmd}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                          {c.what}
                        </p>
                      </div>
                    </div>
                    <PilotLamp color="green" className="absolute top-0 right-0" />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-muted">
            <DroneIcon className="h-4 w-4" />
            <span>design.md — why a CLI?</span>
          </div>
          <Heading className="mt-3">
            Why a CLI?
          </Heading>
          <p className="mt-4 text-concrete-400">
            Corpus is plain files. The CLI handles repeatable chores around
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
                  className="group h-full border-panel-border hover:border-brass/50"
                >
                  <HexBadge color="orange" className="mb-4">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-concrete-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                    {p.text}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-2">
        <Card
          screws
          className="h-full"
          contentClassName="flex h-full flex-col gap-6"
        >
          <div>
            <Heading>Don&apos;t need the CLI yet?</Heading>
            <p className="mt-2 text-concrete-400">
              Use the starter kit and write a spec. Add the CLI later.
            </p>
          </div>
          <TextLink
            href="/get-started/"
            className="mt-auto w-fit gap-2 text-base font-semibold"
          >
            Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TextLink>
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
                href="https://github.com/jcosta33/corpus-cli"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open corpus-cli on GitHub →
              </TextLink>
            </p>
            <p className="text-concrete-400">
              Using an MCP client?{" "}
              <TextLink href="/mcp/">
                corpus-mcp exposes the same read-only facts
              </TextLink>
            </p>
          </div>
        </Card>
      </Section>
    </div>
  );
}
