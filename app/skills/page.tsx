import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Bug,
  FileCode,
  FileSearch,
  Files,
  FolderSearch,
  Glasses,
  Hammer,
  Layers,
  PenTool,
  Puzzle,
  Rocket,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Zap,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { TerminalWindow } from "../components/TerminalWindow";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { SignalPulse } from "../components/SignalPulse";
import { TerminalCursor } from "../components/TerminalCursor";

export const metadata: Metadata = {
  title: "Skills — Swarm",
  description:
    "An optional catalog of agent guides for Swarm workflows: conditioning stances and code-authoring depth, installable into any agent CLI.",
  openGraph: {
    title: "Skills — Swarm",
    description:
      "An optional catalog of agent guides for Swarm workflows: conditioning stances and code-authoring depth, installable into any agent CLI.",
    type: "website",
    images: ["/og-skills.png"],
  },
  alternates: {
    canonical: "/skills/",
  },
};

const stances = [
  {
    skill: "persona-skeptic",
    icon: Scale,
    use: "judging another agent's work — refute by default, re-run the checks",
  },
  {
    skill: "persona-architect",
    icon: PenTool,
    use: "shaping a spec free of smuggled implementation",
  },
  {
    skill: "persona-auditor",
    icon: FileSearch,
    use: "recording present state with file:line findings",
  },
  {
    skill: "persona-documentarian",
    icon: ScrollText,
    use: "writing human-facing docs that actually get read",
  },
  {
    skill: "persona-researcher",
    icon: Brain,
    use: "depth inquiry against primary sources",
  },
  {
    skill: "persona-surveyor",
    icon: FolderSearch,
    use: "breadth research across patterns or products",
  },
  {
    skill: "empirical-proof",
    icon: ShieldCheck,
    use: "any completion claim — bind it to pasted output or it reads unverified",
  },
];

const authoring = [
  {
    skill: "implement-task",
    icon: Terminal,
    use: "the full Swarm task-packet frame, long form",
  },
  {
    skill: "write-feature",
    icon: Rocket,
    use: "net-new behavior behind a defined surface",
  },
  {
    skill: "write-fix",
    icon: Bug,
    use: "a reproduced defect with a root cause",
  },
  {
    skill: "write-refactor",
    icon: Layers,
    use: "restructuring with behavior pinned by tests",
  },
  {
    skill: "write-rewrite",
    icon: FileCode,
    use: "re-implementing code whose behavior changes on purpose",
  },
  {
    skill: "write-migration",
    icon: Files,
    use: "moving from API A to API B, green after every wave",
  },
  {
    skill: "write-performance",
    icon: Zap,
    use: "a measured bottleneck with a target and baseline",
  },
  {
    skill: "write-testing",
    icon: Target,
    use: "adding the tests an area should already have",
  },
  {
    skill: "write-documentation",
    icon: Glasses,
    use: "human-facing docs for a reader who hasn't read the code",
  },
  {
    skill: "fix-flaky-test",
    icon: Puzzle,
    use: "a test that fails intermittently — diagnose, don't retry-loop",
  },
];

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-swarm-yellow/30 bg-swarm-yellow/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-swarm-yellow">
            <SignalPulse className="h-4 w-4" />
            <span>skills.catalog — 17 modules available</span>
          </div>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-5xl lg:text-6xl">
            Swarm <span className="text-swarm-yellow text-glow">skills</span>
            <TerminalCursor className="ml-2 align-middle" />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
            An optional catalog of agent guides — conditioning stances and code-authoring depth — in
            the open Agent Skills format. Install only what your work calls for.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            The starter kit ships the core loop; this catalog is the extra seasoning.
          </p>
        </div>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh — add one skill</span>
        </div>
        <TerminalWindow title="terminal">
          <p className="text-concrete-500"># list what&apos;s available</p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> npx skills add jcosta33/swarm-skills --list
          </p>
          <p className="mt-2 text-concrete-500"># install into the current repo</p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> npx skills add jcosta33/swarm-skills --skill persona-skeptic
          </p>
          <p className="mt-2 text-concrete-500"># or install globally / for one agent</p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> npx skills add jcosta33/swarm-skills --skill persona-skeptic -g
          </p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> npx skills add jcosta33/swarm-skills --skill persona-skeptic -a claude-code
          </p>
          <p className="mt-2 text-concrete-500">
            # no CLI? copy the folder into your agent&apos;s skills directory
          </p>
          <p className="text-concrete-100">
            <span className="text-swarm-yellow">$</span> cp -R skills/persona-skeptic{" "}
            &lt;your-repo&gt;/.agents/skills/
          </p>
        </TerminalWindow>
        <p className="text-concrete-400">
          Skills name abstract command slots like <code>cmdTest</code> and <code>cmdLint</code>;
          your repo&apos;s <code>AGENTS.md</code> supplies the real commands. That is what makes them
          portable across stacks.
        </p>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
            <Sparkles className="h-4 w-4" />
            <span>stances.conf — cognitive postures</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Conditioning stances
          </h2>
          <p className="mt-4 text-concrete-400">
            Cognitive postures that tilt what the agent looks for and refuses. Load one alongside a
            task guide when the work needs a particular lens.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stances.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.skill}>
                <Card className="group h-full border-factory-800 transition-all duration-300 hover:border-swarm-yellow/30 hover:bg-factory-800">
                  <div className="flex items-start gap-4">
                    <HexBadge color="yellow">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-swarm-yellow">
                        {s.skill}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-concrete-400">{s.use}</p>
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
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
            <Hammer className="h-4 w-4" />
            <span>authoring.conf — change-shape guides</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Code-authoring depth
          </h2>
          <p className="mt-4 text-concrete-400">
            Guides for specific change shapes. Pick the one that matches the task so the agent does
            not treat every problem like a feature.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authoring.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.skill}>
                <Card className="group h-full border-factory-800 transition-all duration-300 hover:border-drone-green/30 hover:bg-factory-800">
                  <div className="flex items-start gap-4">
                    <HexBadge color="green">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <div>
                      <h3 className="font-mono text-sm font-semibold text-drone-green">
                        {s.skill}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-concrete-400">{s.use}</p>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <Card className="max-w-2xl border-factory-800 bg-factory-900/50 transition-all duration-300 hover:border-swarm-yellow/30">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
            <Terminal className="h-4 w-4" />
            <span>authoring.guide — write your own</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            How to write a Swarm skill
          </h2>
          <p className="mt-4 text-concrete-400">
            Skills are plain markdown, but their structure is evidence-backed: directive
            descriptions, self-contained bodies, forced visible output, and the AGENTS.md contract.
          </p>
          <p className="mt-6">
            <Link
              href="/skills/writing/"
              className="text-swarm-yellow hover:underline focus-ring rounded"
            >
              Read the skill-writing guide →
            </Link>
          </p>
        </Card>
      </Section>

      <Section>
        <Card className="max-w-2xl border-factory-800 bg-factory-900/50">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <ShieldCheck className="h-4 w-4" />
            <span>security.note — no runtime</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
            Why there is no runtime
          </h2>
          <p className="mt-4 text-concrete-400">
            A skill is a markdown guide your agent reads when the work matches. That means you can
            read it first, pin to a commit, and audit what your agent was told to do. If you are
            looking for command-line scaffolding or automated checks, that is{" "}
            <Link
              href="/cli/"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded"
            >
              swarm-cli
            </Link>
            . It is real, but the command surface is still settling.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/swarm-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-swarm-yellow hover:underline focus-ring rounded"
            >
              Browse the full catalog on GitHub →
            </Link>
          </p>
        </Card>
      </Section>
    </div>
  );
}
