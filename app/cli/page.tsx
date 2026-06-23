import type { Metadata } from "next";
import Link from "next/link";
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
import { Button } from "../components/Button";
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

export const metadata: Metadata = {
  title: "CLI — Calma",
  description:
    "calma-cli is optional command-line help for the Calma workflow: it checks your specs, sets up one git worktree per task, and prints the board. It never owns the review verdict — that is still you.",
  openGraph: {
    title: "CLI — Calma",
    description:
      "calma-cli is the optional reference companion for the Calma framework: check specs, scaffold the workspace, isolate tasks in worktrees, print the board. A helper, not an orchestrator.",
    type: "website",
    url: "/cli/",
    siteName: "Calma",
    locale: "en_US",
    images: [
      {
        url: "/og-cli.png",
        width: 1200,
        height: 630,
        alt: "calma-cli — the optional reference companion for the Calma workflow",
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
    what: "Scaffold the workspace into a new or existing repo, conflict-safe — walked through on Get started.",
    icon: Blocks,
  },
  {
    cmd: "update [--check]",
    what: "Tell you whether your workspace has drifted behind the latest starter kit, and what you would gain by updating. Read-only — it never rewrites your files.",
    icon: ShieldCheck,
  },
  {
    cmd: "check [file]",
    what: "Lint a spec, or render the whole-workspace verdict. Exit 0 clean / 1 warnings / 2 blocking — so it drops straight into pre-commit and CI.",
    icon: ShieldCheck,
  },
  {
    cmd: "worktree",
    what: "Create / list / remove / prune isolated git worktrees — one per task on corpus/<slug>, so parallel agents never trample each other.",
    icon: GitBranch,
  },
  {
    cmd: "status",
    what: "Print the workspace board — specs, tasks, reviews, and the gaps between them. --json for scripts, -i for an interactive board.",
    icon: LayoutDashboard,
  },
  {
    cmd: "review <task>",
    what: "Reconcile a finished run — the agent's self-report against the actual git diff against the spec. Surfaces omitted edits, out-of-scope changes, and unbacked claims. Never a verdict; that stays yours.",
    icon: ScanEye,
  },
  {
    cmd: "new <task|spec>",
    what: "Cut a task packet from a spec (scope never invented), or scaffold a fresh spec from the template.",
    icon: Plus,
  },
  {
    cmd: "pull <ref>",
    what: "Snapshot an external ticket into intake/ — verbatim, never a spec or the board. Turning a ticket into requirements is your call, not transcription.",
    icon: ArrowRight,
  },
  {
    cmd: "promote <task>",
    what: "Scaffold a candidate finding from a finished task, source pre-filled. It asserts no lesson — you decide what was learned.",
    icon: Plus,
  },
  {
    cmd: "run <task> --agent <name>",
    what: "Launch a prepared task on your own coding agent in its worktree and record the launch. It runs the agent; it never becomes one — no model loop, no edits of its own.",
    icon: Terminal,
  },
  {
    cmd: "show <task|spec|review|checks>",
    what: "Project a parsed artifact as JSON — read-only, renders no verdict. It is how editors, CI, and the MCP server read your workspace.",
    icon: Blocks,
  },
];

const principles = [
  {
    title: "One worktree per task",
    icon: GitBranch,
    text: "No more agents rewriting your main checkout while you are halfway through something else.",
  },
  {
    title: "Markdown is the source of truth",
    icon: Terminal,
    text: "The spec, the task, the evidence, the review — plain files you can read, diff, and grep. The CLI reads them; it does not replace them.",
  },
  {
    title: "It never renders the verdict",
    icon: ShieldCheck,
    text: "corpus check tells you what is malformed or unverified. Whether the code is actually done is a call a human makes, every time.",
  },
];

export default function CliPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <PageHero
          eyebrow="calma-cli — reference implementation"
          title={
            <>
              calma<span className="text-corpus-yellow text-glow">-cli</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Optional command-line help for the Calma workflow. The framework is
            just markdown and conventions; the CLI does the chores — checks your
            specs, isolates each task in its own git worktree, reconciles a
            finished run against the diff, and prints the board.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            It does the typing-adjacent work, not the thinking. It never decides
            whether your code is done — that is still a human reading evidence.
            Skip it entirely if you would rather drive by hand.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge variant="hazard">Command surface still settling</Badge>
            <Badge variant="default">
              Node &gt;= 18.18 · &gt;= 22.6 from source
            </Badge>
            <Badge variant="default">Needs git</Badge>
          </div>
        </PageHero>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" ariaLabel="install">
            <p className="text-concrete-500">
              # not on npm yet — clone, build, and link from source; the binary
              it provides is called corpus
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> git clone
              https://github.com/jcosta33/corpus-cli.git &amp;&amp; cd
              corpus-cli &amp;&amp; npm install &amp;&amp; npm run build
              &amp;&amp; npm link
            </p>
            <p className="mt-2 text-concrete-500"># then run commands as</p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> corpus --help
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>the-loop.sh — a task, end to end</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" ariaLabel="example session">
            <p className="text-concrete-500">
              # scaffold a workspace first — see Get started
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span> corpus check{" "}
              <span className="text-concrete-500">
                # lint a spec or the whole workspace; exit 0/1/2
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-corpus-yellow">$</span> corpus worktree
              create auth-refresh --task TASK-12{" "}
              <span className="text-concrete-500">
                # isolate the task on its own branch
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-corpus-yellow">$</span> corpus review
              TASK-12{" "}
              <span className="text-concrete-500">
                # reconcile the finished run — diff vs report vs spec
              </span>
            </p>
            <p className="mt-1 text-concrete-100">
              <span className="text-corpus-yellow">$</span> corpus status -i{" "}
              <span className="text-concrete-500">
                # the board — specs, tasks, reviews, gaps
              </span>
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <Bug className="h-4 w-4" aria-hidden="true" />
            <span>commands.md — kept in sync, checked by test</span>
          </div>
          <Heading className="mt-3">Commands that already dispatch</Heading>
          <p className="mt-4 text-concrete-400">
            Every command that ships, listed below. In the CLI,
            &ldquo;advertised equals dispatchable&rdquo; is a tested invariant —
            what the help prints, the binary runs. The two worth knowing first:{" "}
            <code className="text-corpus-yellow">corpus check</code> drops into
            pre-commit and CI on its exit code, and{" "}
            <code className="text-corpus-yellow">corpus review</code> reconciles
            a finished run — the agent&apos;s self-report against the real diff
            against the spec — and routes the mismatches to a human, without
            ever rendering the verdict.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {commands.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.cmd} className="min-w-0">
                <Card
                  screws
                  className="group h-full border-panel-border hover:border-drone-green/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <HexBadge color="green">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <h3 className="font-mono text-sm font-semibold text-drone-green break-words">
                          corpus {c.cmd}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                          {c.what}
                        </p>
                      </div>
                    </div>
                    <PilotLamp color="green" className="shrink-0" />
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
          <Heading className="mt-3">
            Why a CLI if Calma is markdown-only?
          </Heading>
          <p className="mt-4 text-concrete-400">
            The workflow itself is just conventions and files — you can run all
            of Calma with a text editor and a straight face. The CLI is
            optional: it scaffolds the workspace, runs the checks at a gate, and
            keeps one worktree per task so parallel agents do not trample each
            other. It is a helper, not an orchestrator, and it never renders the
            verdict. Use it for less typing; ignore it if you would rather
            orchestrate by hand.
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

      <Section>
        <Card
          screws
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading>Don&apos;t need the CLI yet?</Heading>
            <p className="mt-2 text-concrete-400">
              The whole workflow runs in plain markdown. Copy the starter kit
              and write a spec — add the CLI later, if and when the typing
              starts to annoy you.
            </p>
          </div>
          <Button asChild className="w-full md:w-auto">
            <Link href="/get-started/">
              Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Card>
      </Section>

      <Section>
        <Card screws className="max-w-2xl border-panel-border">
          <Heading>Reference repository</Heading>
          <p className="mt-4 text-concrete-400">
            The CLI is developed in the open. Issues, feature requests, and
            adversarial review are all welcome.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/corpus-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corpus-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Read the full reference on GitHub →
            </Link>
          </p>
        </Card>
      </Section>
    </div>
  );
}
