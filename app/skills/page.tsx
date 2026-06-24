import type { Metadata } from "next";
import {
  Bug,
  ExternalLink,
  FileCode,
  Files,
  FolderSearch,
  Glasses,
  Hammer,
  Layers,
  Puzzle,
  Rocket,
  Scale,
  ShieldCheck,
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
import { Badge } from "../components/Badge";
import { PaperArtifact } from "../components/PaperArtifact";
import { TextLink } from "../components/TextLink";

export const metadata: Metadata = {
  title: "Skills — Corpus",
  description:
    "Optional agent guides for Corpus review, writing, testing, and docs work.",
  openGraph: {
    title: "Skills — Corpus",
    description:
      "Optional agent guides for Corpus review, writing, testing, and docs work.",
    type: "website",
    url: "/skills/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-skills.png",
        width: 1200,
        height: 630,
        alt: "corpus-skills",
      },
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
    use: "review another agent's work",
  },
  {
    skill: "persona-challenger",
    icon: Swords,
    use: "pressure-test a proposal before build work starts",
  },
  {
    skill: "persona-surveyor",
    icon: FolderSearch,
    use: "survey patterns across examples",
  },
  {
    skill: "empirical-proof",
    icon: ShieldCheck,
    use: "back completion claims with pasted output",
  },
];

const authoring = [
  {
    skill: "implement-task",
    icon: Terminal,
    use: "implement a Corpus task packet",
  },
  {
    skill: "write-feature",
    icon: Rocket,
    use: "add new behavior",
  },
  {
    skill: "write-fix",
    icon: Bug,
    use: "fix a reproduced defect",
  },
  {
    skill: "write-refactor",
    icon: Layers,
    use: "restructure without changing behavior",
  },
  {
    skill: "write-rewrite",
    icon: FileCode,
    use: "rewrite with a recorded behavior change",
  },
  {
    skill: "write-migration",
    icon: Files,
    use: "move from one API to another",
  },
  {
    skill: "write-performance",
    icon: Zap,
    use: "improve a measured bottleneck",
  },
  {
    skill: "write-testing",
    icon: Target,
    use: "add focused tests",
  },
  {
    skill: "write-documentation",
    icon: Glasses,
    use: "write human-facing docs",
  },
  {
    skill: "fix-flaky-test",
    icon: Puzzle,
    use: "stabilize an intermittent test",
  },
];

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-20">
      <Section>
        <PageHero
          eyebrow="tool index / agent guides"
          title={
            <>
              corpus<span className="text-corpus-yellow">-skills</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Optional agent guides for review, implementation, testing, and docs.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Install only the guide that matches the task.
          </p>
        </PageHero>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <PaperArtifact
          label="index"
          title="load when"
          meta="skill description -> matching work"
          className="h-full"
        >
          <p>
            A skill is a markdown instruction file. It loads when the task
            matches.
          </p>
        </PaperArtifact>
        <Card screws className="h-full">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">
                review
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-concrete-100">
                4
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">
                change
              </p>
              <p className="mt-2 font-heading text-3xl font-bold text-concrete-100">
                10
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-brass">
                file
              </p>
              <p className="mt-2 font-mono text-sm text-concrete-300">
                SKILL.md
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-concrete-400">
            Install one guide at a time. The description is the trigger; the
            body is the checklist.
          </p>
        </Card>
      </Section>

      <Section className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
          <DroneIcon className="h-4 w-4" />
          <span>install.sh — add one skill</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
            <p className="text-concrete-500"># list what&apos;s available</p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npx skills add
              jcosta33/corpus-skills --list
            </p>
            <p className="mt-2 text-concrete-500">
              # install into the current repo
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npx skills add
              jcosta33/corpus-skills --skill persona-skeptic
            </p>
            <p className="mt-2 text-concrete-500">
              # or install globally / for one agent
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npx skills add
              jcosta33/corpus-skills --skill persona-skeptic -g
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npx skills add
              jcosta33/corpus-skills --skill persona-skeptic -a claude-code
            </p>
            <p className="mt-2 text-concrete-500">
              # no CLI? copy the folder into your agent&apos;s skills directory
            </p>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}cp -R
              skills/persona-skeptic &lt;your-repo&gt;/.agents/skills/
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          Skills name abstract command slots like{" "}
          <code className="text-corpus-yellow">cmdTest</code> and{" "}
          <code className="text-corpus-yellow">cmdLint</code>; your repo&apos;s{" "}
          <code className="text-corpus-yellow">AGENTS.md</code> supplies the
          real commands.
        </p>
      </Section>

      <Section className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>review guides</span>
          </div>
          <Heading className="mt-3">Review guides</Heading>
          <p className="mt-4 text-concrete-400">
            Use these when the task is about judgment, evidence, or research.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="draft">markdown only</Badge>
            <Badge variant="ready">on demand</Badge>
          </div>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stances.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.skill}>
                <a
                  href={`https://github.com/jcosta33/corpus-skills/tree/main/skills/${s.skill}`}
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
                          <h3 className="font-mono text-sm font-semibold text-brass">
                            {s.skill}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                            {s.use}
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
            <span>change guides</span>
          </div>
          <Heading className="mt-3">Change guides</Heading>
          <p className="mt-4 text-concrete-400">
            Pick the guide that matches the work: feature, fix, refactor,
            rewrite, migration, performance, testing, or docs.
          </p>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authoring.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.skill}>
                <a
                  href={`https://github.com/jcosta33/corpus-skills/tree/main/skills/${s.skill}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
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
                            {s.skill}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-concrete-400">
                            {s.use}
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

      <Section>
        <Card
          screws
          className="max-w-2xl border-panel-border hover:border-brass/50"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>authoring.guide — write your own</span>
          </div>
          <Heading className="mt-3">How to write a Corpus skill</Heading>
          <p className="mt-4 text-concrete-400">
            Use a clear description, a self-contained body, visible output, and
            the AGENTS.md command contract.
          </p>
          <p className="mt-6">
            <TextLink
              href="/skills/writing/"
            >
              Read the skill-writing guide →
            </TextLink>
          </p>
        </Card>
      </Section>

      <Section>
        <Card screws className="max-w-2xl border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <ShieldCheck className="h-4 w-4" />
            <span>security.note — no runtime</span>
          </div>
          <Heading className="mt-3">Why there is no runtime</Heading>
          <p className="mt-4 text-concrete-400">
            A skill is a markdown guide your agent reads when the work matches.
            Read it before installing and pin to a commit. For scaffolding and
            checks, use{" "}
            <TextLink
              href="/cli/"
            >
              corpus-cli
            </TextLink>
            .
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/corpus-skills"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse the full catalog on GitHub →
            </TextLink>
          </p>
        </Card>
      </Section>
    </div>
  );
}
