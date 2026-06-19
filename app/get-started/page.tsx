import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderPlus, Rocket, Terminal, Wrench } from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";

export const metadata: Metadata = {
  title: "Get started — Calma",
  description:
    "Adopt Calma in a new repo or an existing project. Start writing specs and keeping humans in the loop in plain markdown.",
  openGraph: {
    title: "Get started — Calma",
    description:
      "Adopt Calma in a new repo or an existing project. Start writing specs and keeping humans in the loop in plain markdown.",
    type: "website",
    images: ["/og-get-started.png"],
  },
  alternates: {
    canonical: "/get-started/",
  },
};

function KitIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-panel-border bg-panel-raised text-swarm-yellow shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.45)]">
      <div className="brushed-metal absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      <div className="screw-corners screw-corners-bottom absolute inset-0 pointer-events-none z-10" aria-hidden="true" />
      <span className="relative z-10">{children}</span>
    </div>
  );
}

function ListDot() {
  return (
    <span
      className="mt-2.5 h-2 w-2 shrink-0 rounded-sm bg-swarm-yellow shadow-[0_0_8px_#FFB000]"
      aria-hidden="true"
    />
  );
}

export default function GetStartedPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
            <span>onboarding / boot sequence</span>
          </div>
          <h1 className="mt-3 font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-5xl">
            Get started
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-concrete-400">
            Pick a path. Either way, you are writing specs and tasks in plain markdown. The agent gets
            a contract; you keep the keys.
          </p>
        </div>
      </Section>

      <Section className="grid gap-8 md:grid-cols-2">
        <Card hardware className="flex flex-col gap-6">
          <KitIcon>
            <Rocket className="h-6 w-6" aria-hidden="true" />
          </KitIcon>
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
              New repo
            </h2>
            <p className="mt-2 text-concrete-400">
              Use the GitHub template to create a fresh Calma workspace with the folder structure,
              templates, and agent guides already in place.
            </p>
          </div>
          <Button asChild>
            <Link
              href="https://github.com/jcosta33/swarm-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Use the starter kit template <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Card>

        <Card hardware className="flex flex-col gap-6">
          <KitIcon>
            <FolderPlus className="h-6 w-6" aria-hidden="true" />
          </KitIcon>
          <div>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
              Existing project
            </h2>
            <p className="mt-2 text-concrete-400">
              Copy the starter kit into a workspace folder inside your existing repo. Add specs and
              tasks alongside your code without changing the project structure.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link
              href="https://github.com/jcosta33/swarm/blob/main/docs/ADOPTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read ADOPTING.md <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Card>
      </Section>

      <Section className="flex flex-col gap-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
          <Terminal className="h-4 w-4" />
          <span>or scaffold it with the cli</span>
        </div>
        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
          Prefer the command line?
        </h2>
        <p className="max-w-2xl text-concrete-400">
          <code className="text-swarm-yellow">swarm init</code> scaffolds the same workspace into a new
          or existing repo — conflict-safe, so it never clobbers files you already have. The CLI is not
          on npm under that name yet (the name is taken), so install it from source.
        </p>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
            <p className="text-concrete-500"># install the CLI from source — the binary it provides is called swarm</p>
            <p className="text-concrete-100">
              <span className="text-swarm-yellow">$</span> git clone https://github.com/jcosta33/swarm-cli.git{" "}
              &amp;&amp; cd swarm-cli &amp;&amp; npm install &amp;&amp; npm link
            </p>
            <p className="mt-2 text-concrete-500"># then, in a new or existing repo</p>
            <p className="text-concrete-100">
              <span className="text-swarm-yellow">$</span> swarm init{" "}
              <span className="text-concrete-500"># scaffold the workspace, conflict-safe</span>
            </p>
            <p className="text-concrete-100">
              <span className="text-swarm-yellow">$</span> swarm check{" "}
              <span className="text-concrete-500"># confirm it is well-formed; exit 0/1/2</span>
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          What the CLI does (and deliberately does not):{" "}
          <Link href="/cli/" className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm">
            the CLI page
          </Link>
          .
        </p>
      </Section>

      <Section className="flex flex-col gap-8">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
          What the starter kit gives you
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">AGENTS.md</strong> — the bootloader your agent
              reads on every task.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">Core guides</strong> — write-spec,
              implement-task, review-output, save-findings, and more.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">Eight templates</strong> — spec, task, review,
              finding, status, intake, inventory, change-plan.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">Flow folders</strong> — specs/, tasks/,
              reviews/, findings/, and the rest, each with a one-line README.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">status.md</strong> — a hand-edited workboard
              for tracking what is in flight.
            </span>
          </li>
          <li className="flex items-start gap-3 text-concrete-400">
            <ListDot />
            <span>
              <strong className="text-concrete-100">decisions/</strong> — an ADR ledger, seeded
              with why you adopted Calma.
            </span>
          </li>
        </ul>
      </Section>

      <Section>
        <Card hardware className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <KitIcon>
              <Wrench className="h-6 w-6" aria-hidden="true" />
            </KitIcon>
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
                Need more depth?
              </h2>
              <p className="mt-2 text-concrete-400">
                Install optional skills for specific stances and change shapes — persona-skeptic,
                write-feature, write-fix, and others.
              </p>
            </div>
          </div>
          <Button variant="secondary" asChild className="w-full md:w-auto">
            <Link href="/skills/">
              Browse skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Card>
      </Section>

      <Section>
        <p className="text-concrete-400">
          Not sure which path fits? Read{" "}
          <Link
            href="https://github.com/jcosta33/swarm/blob/main/docs/ADOPTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
          >
            docs/ADOPTING.md
          </Link>{" "}
          for a decision checklist.
        </p>
      </Section>
    </div>
  );
}
