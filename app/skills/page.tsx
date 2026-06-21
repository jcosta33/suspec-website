import type { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Bug,
  ExternalLink,
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
  Swords,
  Target,
  Terminal,
  Zap,
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
  title: "Skills — Calma",
  description:
    "Optional agent guides for Calma workflows: conditioning stances and code-authoring depth. Not shortcuts — discipline prompts that load when the work matches.",
  openGraph: {
    title: "Skills — Calma",
    description:
      "An optional catalog of agent guides for Calma workflows: conditioning stances and code-authoring depth, installable into any agent CLI.",
    type: "website",
    siteName: "Calma",
    images: [
      { url: "/og-skills.png", width: 1200, height: 630, alt: "Calma skills — conditioning stances and code-authoring depth guides" },
    ],
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
    use: "writing human-facing docs a reader can actually follow",
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
    skill: "persona-challenger",
    icon: Swords,
    use: "pressure-testing a live proposal before it's built — surface assumptions, steelman the alternative",
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
    use: "the full Calma task-packet frame, long form",
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
        <PageHero
          eyebrow="skills.catalog — 18 skills"
          title={<>Calma <span className="text-swarm-yellow text-glow">skills</span></>}
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Optional agent guides — conditioning stances and code-authoring depth — in the open Agent
            Skills format. Install only what your work calls for.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Skills are not shortcuts. They are discipline prompts that load when the work matches and
            pull the agent back toward the discipline before it drifts.
          </p>
        </PageHero>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh — add one skill</span>
        </div>
        <Panel brushed className="p-2">
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
        </Panel>
        <p className="text-concrete-400">
          Skills name abstract command slots like <code className="text-swarm-yellow">cmdTest</code>{" "}
          and <code className="text-swarm-yellow">cmdLint</code>; your repo&apos;s{" "}
          <code className="text-swarm-yellow">AGENTS.md</code> supplies the real commands. That is what
          makes them portable across stacks.
        </p>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>stances.conf — cognitive postures</span>
          </div>
          <Heading className="mt-3">Conditioning stances</Heading>
          <p className="mt-4 text-concrete-400">
            Cognitive postures that tilt what the agent looks for and refuses. Load one alongside a
            task guide when the work needs a particular lens.
          </p>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stances.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.skill}>
                <a
                  href={`https://github.com/jcosta33/swarm-skills/tree/main/skills/${s.skill}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
                  className="group block rounded-sm focus-ring"
                >
                  <Card className="h-full border-panel-border hover:border-brass/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <HexBadge color="yellow">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </HexBadge>
                        <div>
                          <h3 className="font-mono text-sm font-semibold text-brass">{s.skill}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">{s.use}</p>
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
            <span>authoring.conf — change-shape guides</span>
          </div>
          <Heading className="mt-3">Code-authoring depth</Heading>
          <p className="mt-4 text-concrete-400">
            Guides for specific change shapes. Pick the one that matches the task so the agent does
            not treat every problem like a feature.
          </p>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authoring.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.skill}>
                <a
                  href={`https://github.com/jcosta33/swarm-skills/tree/main/skills/${s.skill}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
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
                            {s.skill}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">{s.use}</p>
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

      <Section>
        <Card hardware className="max-w-2xl border-panel-border hover:border-brass/50">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>authoring.guide — write your own</span>
          </div>
          <Heading className="mt-3">How to write a Calma skill</Heading>
          <p className="mt-4 text-concrete-400">
            Skills are plain markdown, but their structure is evidence-backed: directive
            descriptions, self-contained bodies, forced visible output, and the AGENTS.md contract.
          </p>
          <p className="mt-6">
            <Link
              href="/skills/writing/"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Read the skill-writing guide →
            </Link>
          </p>
        </Card>
      </Section>

      <Section>
        <Card hardware className="max-w-2xl border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <ShieldCheck className="h-4 w-4" />
            <span>security.note — no runtime</span>
          </div>
          <Heading className="mt-3">Why there is no runtime</Heading>
          <p className="mt-4 text-concrete-400">
            A skill is a markdown guide your agent reads when the work matches. You can read it
            first, pin to a commit, and audit what your agent was told to do. If you want command-line
            scaffolding or automated checks, that is{" "}
            <Link
              href="/cli/"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              calma-cli
            </Link>
            . It is real, but the command surface is still settling.
          </p>
          <p className="mt-6">
            <Link
              href="https://github.com/jcosta33/swarm-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Browse the full catalog on GitHub →
            </Link>
          </p>
        </Card>
      </Section>
    </div>
  );
}
