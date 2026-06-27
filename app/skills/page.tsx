import type { Metadata } from "next";
import {
  ArrowRight,
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
import { HeroTrace } from "../components/HeroTrace";
import { Heading } from "../components/Heading";
import { Badge } from "../components/Badge";
import { PaperArtifact } from "../components/PaperArtifact";
import { TextLink } from "../components/TextLink";
import { SignalStat } from "../components/SignalStat";
import { signalRoles } from "../components/signalStyles";

export const metadata: Metadata = {
  title: "corpus-skills — Corpus",
  description:
    "Agent guide files for Corpus review, writing, testing, and docs work.",
  openGraph: {
    title: "corpus-skills — Corpus",
    description:
      "Agent guide files for Corpus review, writing, testing, and docs work.",
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

const skillInstallCommands = [
  "npx skills add jcosta33/corpus-skill",
].join("\n");

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

const skillRoutes = [
  {
    label: "Review guides",
    href: "#review-guides",
    count: "4",
    icon: ShieldCheck,
    text: "Judgment, evidence, research, and challenge stances.",
    signal: "reference",
  },
  {
    label: "Change guides",
    href: "#change-guides",
    count: "10",
    icon: Hammer,
    text: "Feature, fix, refactor, rewrite, migration, performance, tests, docs.",
    signal: "reference",
  },
  {
    label: "Guide format",
    href: "#write-skill",
    count: "1",
    icon: FileCode,
    text: "The file shape for adding a guide without making it vague.",
    signal: "reference",
  },
] as const;

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="tool index / agent guides"
          motif="catalog"
          tone="reference"
          title={
            <>
              corpus<span className="product-name-suffix">-skills</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Task-scoped guides for review, implementation, testing, and docs.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Install once. Load only the guide in scope.
          </p>
          <HeroTrace
            ariaLabel="Skill guide trace"
            items={[
              { label: "Source", signal: "reference" },
              { label: "Install", signal: "core" },
              { label: "Load", signal: "reference" },
              { label: "Run", signal: "reference" },
            ]}
          />
        </PageHero>
      </Section>

      <Section
        register="01 / index"
        registerTone="reference"
        className="manifest-pair grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch"
      >
        <PaperArtifact
          label="index"
          title="load when"
          meta="source -> local install"
          className="h-full"
        >
          <p>Use the catalog to select context. Keep repo policy local.</p>
        </PaperArtifact>
        <Card
          screws
          className="repo-manifest-card h-full"
          contentClassName="repo-manifest-content"
        >
          <p className="repo-manifest-label">guide files</p>
          <div className="repo-manifest-grid">
            <SignalStat label="review" value="4" signal="reference" />
            <SignalStat label="change" value="10" signal="reference" />
            <SignalStat
              label="file"
              value="SKILL.md"
              signal="reference"
              valueClassName="font-mono text-sm text-concrete-300"
            />
          </div>
          <p className="repo-manifest-note">
            Guidance only. Read the file before it shapes a team workflow.
          </p>
        </Card>
      </Section>

      <Section
        register="02 / categories"
        registerTone="muted"
        className="space-y-4"
      >
        <Panel brushed screws className="p-0">
          <nav
            className="process-strip process-strip-signal-reference grid gap-px bg-panel-border md:grid-cols-3"
            aria-label="Skill catalog sections"
          >
            {skillRoutes.map((route, index) => {
              const Icon = route.icon;
              return (
                <a
                  key={route.href}
                  href={route.href}
                  className={`${signalRoles[route.signal].processItem} focus-ring group block bg-panel-raised/95 p-5 transition-colors duration-150 hover:bg-panel sm:p-6`}
                  aria-label={`Jump to ${route.label.toLowerCase()}`}
                >
                  <div className="flex items-center gap-3">
                    <HexBadge color={route.signal} className="h-10 w-10 shrink-0">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </HexBadge>
                    <div className="min-w-0">
                      <p
                        className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[route.signal].text}`}
                      >
                        {String(index + 1).padStart(2, "0")} / {route.count}
                      </p>
                      <h2
                        className={`font-heading text-lg font-bold ${signalRoles[route.signal].text}`}
                      >
                        {route.label}
                      </h2>
                    </div>
                    <ArrowRight
                      className="motion-nudge-x ml-auto h-4 w-4 shrink-0 text-brass/70"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-concrete-400">
                    {route.text}
                  </p>
                </a>
              );
            })}
          </nav>
        </Panel>
      </Section>

      <Section
        register="03 / install"
        registerTone="reference"
        className="flex flex-col gap-8"
      >
        <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
          <DroneIcon className="h-4 w-4" />
          <span>install.sh</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={skillInstallCommands}>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npx skills add{" "}
              jcosta33/corpus-skill
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          Keep repo-specific commands in{" "}
          <code className="text-corpus-yellow">AGENTS.md</code>. The installed
          guide should stay portable.
        </p>
      </Section>

      <Section
        id="review-guides"
        register="04 / review guides"
        registerTone="evidence"
        className="flex scroll-mt-28 flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-evidence">
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
        <Panel
          brushed
          screws
          className="skill-guide-catalog skill-guide-catalog-evidence p-0"
        >
          <div className="skill-guide-catalog-header">
            <span>review catalog</span>
            <span>{stances.length} guides</span>
          </div>
          <ul className="skill-guide-list">
            {stances.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.skill}>
                  <a
                    href={`https://github.com/jcosta33/corpus-skills/tree/main/skills/${s.skill}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
                    className="skill-guide-row catalog-row catalog-row-evidence group focus-ring"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <HexBadge
                        color="evidence"
                        className="catalog-row-badge skill-guide-row-badge"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <h3
                          className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.evidence.text}`}
                        >
                          {s.skill}
                        </h3>
                        <p className="catalog-row-copy mt-1 text-sm leading-relaxed text-concrete-400">
                          {s.use}
                        </p>
                      </div>
                    </div>
                    <ExternalLink
                      className="skill-guide-row-arrow"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </Panel>
      </Section>

      <Section
        id="change-guides"
        register="05 / change guides"
        registerTone="change"
        className="flex scroll-mt-28 flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-change">
            <Hammer className="h-4 w-4" aria-hidden="true" />
            <span>change guides</span>
          </div>
          <Heading className="mt-3">Change guides</Heading>
          <p className="mt-4 text-concrete-400">
            Pick the guide that matches the work: feature, fix, refactor,
            rewrite, migration, performance, testing, or docs.
          </p>
        </div>
        <Panel
          brushed
          screws
          className="skill-guide-catalog skill-guide-catalog-change p-0"
        >
          <div className="skill-guide-catalog-header">
            <span>change catalog</span>
            <span>{authoring.length} guides</span>
          </div>
          <ul className="skill-guide-list">
            {authoring.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.skill}>
                  <a
                    href={`https://github.com/jcosta33/corpus-skills/tree/main/skills/${s.skill}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
                    className="skill-guide-row catalog-row catalog-row-change group focus-ring"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <HexBadge
                        color="change"
                        className="catalog-row-badge skill-guide-row-badge"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <h3
                          className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.change.text}`}
                        >
                          {s.skill}
                        </h3>
                        <p className="catalog-row-copy mt-1 text-sm leading-relaxed text-concrete-400">
                          {s.use}
                        </p>
                      </div>
                    </div>
                    <ExternalLink
                      className="skill-guide-row-arrow"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </Panel>
      </Section>

      <Section
        id="write-skill"
        register="06 / authoring"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-2"
      >
        <Card
          signal="reference"
          screws
          className="h-full border-panel-border hover-border-signal-reference"
        >
          <div className="section-kicker section-kicker-reference">
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

        <Card signal="muted" screws className="h-full border-panel-border">
          <div className="section-kicker section-kicker-muted">
            <ShieldCheck className="h-4 w-4" />
            <span>security.note — no runtime</span>
          </div>
          <Heading className="mt-3">Why there is no runtime</Heading>
          <p className="mt-4 text-concrete-400">
            Review the guide before installing and pin to a commit when you use
            it in a team repo. For scaffolding and checks, use{" "}
            <TextLink href="/cli/">corpus-cli</TextLink>.
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
