import type { Metadata } from "next";
import {
  ArrowRight,
  Bug,
  ClipboardCheck,
  Compass,
  ExternalLink,
  FileCode,
  Files,
  FolderSearch,
  GitPullRequest,
  Glasses,
  Hammer,
  Layers,
  Puzzle,
  Rocket,
  Save,
  Scale,
  ScanSearch,
  ShieldCheck,
  Split,
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
    "Two tiers of agent guides: the framework-free corpus-skills catalog and the Corpus-coupled kit that ships in corpus-starter-kit.",
  openGraph: {
    title: "corpus-skills — Corpus",
    description:
      "Two tiers of agent guides: the framework-free corpus-skills catalog and the Corpus-coupled kit that ships in corpus-starter-kit.",
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

const catalogInstallCommand = "npx skills add jcosta33/corpus-skills";

// Tier 1 — the universal catalog (corpus-skills). Framework-free disciplines and
// stances, installable into any repo via `npx skills` with zero Corpus knowledge.
const catalogRepo = "https://github.com/jcosta33/corpus-skills/tree/main/skills";

// Review / judgment stances in the catalog.
const stances = [
  {
    skill: "adversarial-review",
    icon: Swords,
    use: "review another agent's work refute-by-default",
  },
  {
    skill: "persona-challenger",
    icon: Scale,
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
  {
    skill: "security-review",
    icon: ScanSearch,
    use: "audit a change for security exposure",
  },
  {
    skill: "debugging",
    icon: Bug,
    use: "find a defect's root cause from runtime evidence",
  },
];

// Working disciplines in the catalog — the everyday methods, not stances.
const disciplines = [
  {
    skill: "codebase-exploration",
    icon: Compass,
    use: "map an unfamiliar codebase before changing it",
  },
  {
    skill: "planning-spec",
    icon: Target,
    use: "plan a non-trivial change before fanning out",
  },
  {
    skill: "git-pr",
    icon: GitPullRequest,
    use: "ship a change end to end as a clean PR",
  },
  {
    skill: "concise-output",
    icon: Zap,
    use: "make agent output terse and evidence-first",
  },
  {
    skill: "fix-flaky-test",
    icon: Puzzle,
    use: "stabilize an intermittent test",
  },
];

// Tier 2 — the Corpus kit (ships in corpus-starter-kit/.agents/skills/). Every
// skill that operates a Corpus concept; not installable framework-free.
const kitRepo =
  "https://github.com/jcosta33/corpus-starter-kit/tree/main/.agents/skills";

const kitSkills = [
  {
    skill: "implement-task",
    icon: Terminal,
    use: "implement a Corpus task packet",
  },
  {
    skill: "review-output",
    icon: ShieldCheck,
    use: "build the review packet for a finished task",
  },
  {
    skill: "spec-check",
    icon: ClipboardCheck,
    use: "check a spec against the core checks",
  },
  {
    skill: "split-work",
    icon: Split,
    use: "split a spec into non-colliding task packets",
  },
  {
    skill: "save-findings",
    icon: Save,
    use: "save what a task taught as findings",
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
];

const catalogCount = stances.length + disciplines.length;

const skillRoutes = [
  {
    label: "Review stances",
    href: "#review-guides",
    count: String(stances.length),
    icon: ShieldCheck,
    text: "Catalog stances for judgment, evidence, security, and debugging.",
    signal: "evidence",
  },
  {
    label: "Working disciplines",
    href: "#change-guides",
    count: String(disciplines.length),
    icon: Hammer,
    text: "Catalog methods: exploration, planning, PRs, concision, flaky tests.",
    signal: "core",
  },
  {
    label: "Corpus kit",
    href: "#kit-skills",
    count: String(kitSkills.length),
    icon: Puzzle,
    text: "Corpus-coupled skills that ship in corpus-starter-kit, not the catalog.",
    signal: "reference",
  },
] as const;

export default function SkillsPage() {
  return (
    <div className="repo-product-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="tool index / agent guides"
          className="page-hero-package-skills"
          motif="catalog"
          tone="evidence"
          toneLabel="skills"
          title={
            <>
              corpus<span className="product-name-suffix">-skills</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Two tiers of task-scoped guides: a framework-free catalog and a
            Corpus-coupled kit.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            The catalog (corpus-skills) installs into any repo via{" "}
            <code className="text-corpus-yellow">npx skills</code>. The kit ships
            in corpus-starter-kit. Load only the guide in scope.
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
          title="two tiers"
          meta="catalog (any repo) -> kit (Corpus repos)"
          className="h-full"
        >
          <p>
            The catalog is framework-free. The kit operates Corpus concepts. Keep
            repo policy local.
          </p>
        </PaperArtifact>
        <Card
          screws
          className="repo-manifest-card h-full"
          contentClassName="repo-manifest-content"
        >
          <p className="repo-manifest-label">guide files</p>
          <div className="repo-manifest-grid">
            <SignalStat
              label="catalog"
              value={String(catalogCount)}
              signal="evidence"
            />
            <SignalStat
              label="kit"
              value={String(kitSkills.length)}
              signal="core"
            />
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
            className="skill-category-rail process-strip process-strip-signal-reference grid gap-px bg-panel-border md:grid-cols-3"
            aria-label="Skill catalog sections"
          >
            {skillRoutes.map((route, index) => {
              const Icon = route.icon;
              return (
                <a
                  key={route.href}
                  href={route.href}
                  className={`skill-category-link ${signalRoles[route.signal].processItem} focus-ring group block bg-panel-raised/95 p-5 transition-colors duration-150 hover:bg-panel sm:p-6`}
                  aria-label={`Jump to ${route.label.toLowerCase()}`}
                >
                  <div className="skill-category-heading flex items-center gap-3">
                    <HexBadge color={route.signal} className="h-10 w-10 shrink-0">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </HexBadge>
                    <div className="min-w-0">
                      <p
                        className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[route.signal].text}`}
                      >
                        {String(index + 1).padStart(2, "0")} / {route.count}
                      </p>
                      <h2 className="skill-category-title font-heading text-lg font-bold text-concrete-100">
                        {route.label}
                      </h2>
                    </div>
                    <ArrowRight
                      className="motion-nudge-x ml-auto h-4 w-4 shrink-0 text-brass/70"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="skill-category-detail mt-3 text-sm leading-relaxed text-concrete-400">
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
          <span>skills add</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={catalogInstallCommand}>
            <p className="text-concrete-100">
              <span className="text-corpus-yellow">$</span>{" "}npx skills add{" "}
              jcosta33/corpus-skills
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          This installs the framework-free catalog into any repo. The Corpus kit
          ships separately in{" "}
          <TextLink
            href="https://github.com/jcosta33/corpus-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            corpus-starter-kit
          </TextLink>
          . Keep repo-specific commands in{" "}
          <code className="text-corpus-yellow">AGENTS.md</code>.
        </p>
      </Section>

      <Section
        id="review-guides"
        register="04 / catalog · review stances"
        registerTone="evidence"
        className="flex scroll-mt-28 flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-evidence">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>catalog · review stances</span>
          </div>
          <Heading className="mt-3">Review stances</Heading>
          <p className="mt-4 text-concrete-400">
            Framework-free catalog stances for judgment, evidence, security, and
            debugging. Installed with <code className="text-corpus-yellow">npx skills</code>.
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
            <span>corpus-skills catalog</span>
            <span>{stances.length} guides</span>
          </div>
          <ul
            className="skill-guide-list"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
            }}
          >
            {stances.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.skill}>
                  <a
                    href={`${catalogRepo}/${s.skill}`}
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
        register="05 / catalog · working disciplines"
        registerTone="core"
        className="flex scroll-mt-28 flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-core">
            <Hammer className="h-4 w-4" aria-hidden="true" />
            <span>catalog · working disciplines</span>
          </div>
          <Heading className="mt-3">Working disciplines</Heading>
          <p className="mt-4 text-concrete-400">
            The catalog&apos;s everyday methods: map a codebase, plan a change,
            ship a PR, keep output terse, stabilize a flaky test. Also
            framework-free.
          </p>
        </div>
        <Panel
          brushed
          screws
          className="skill-guide-catalog skill-guide-catalog-core p-0"
        >
          <div className="skill-guide-catalog-header">
            <span>corpus-skills catalog</span>
            <span>{disciplines.length} guides</span>
          </div>
          <ul
            className="skill-guide-list"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
            }}
          >
            {disciplines.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.skill}>
                  <a
                    href={`${catalogRepo}/${s.skill}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
                    className="skill-guide-row catalog-row catalog-row-core group focus-ring"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <HexBadge
                        color="core"
                        className="catalog-row-badge skill-guide-row-badge"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <h3
                          className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.core.text}`}
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
        id="kit-skills"
        register="06 / kit · corpus-coupled"
        registerTone="reference"
        className="flex scroll-mt-28 flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <Puzzle className="h-4 w-4" aria-hidden="true" />
            <span>kit · corpus-coupled</span>
          </div>
          <Heading className="mt-3">The Corpus kit</Heading>
          <p className="mt-4 text-concrete-400">
            These skills operate Corpus concepts — task packets, review packets,
            specs, findings — so they are not framework-free. They ship in{" "}
            <TextLink
              href="https://github.com/jcosta33/corpus-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              corpus-starter-kit
            </TextLink>{" "}
            under <code className="text-corpus-yellow">.agents/skills/</code>, not
            in the <code className="text-corpus-yellow">npx skills</code> catalog.
            The <code className="text-corpus-yellow">write-*</code> family is opt-in
            task-implementation depth.
          </p>
        </div>
        <Panel
          brushed
          screws
          className="skill-guide-catalog p-0"
        >
          <div className="skill-guide-catalog-header">
            <span>corpus-starter-kit/.agents/skills</span>
            <span>{kitSkills.length} guides</span>
          </div>
          <ul
            className="skill-guide-list"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
            }}
          >
            {kitSkills.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.skill}>
                  <a
                    href={`${kitRepo}/${s.skill}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.skill} skill on GitHub (opens in new tab)`}
                    className="skill-guide-row catalog-row catalog-row-reference group focus-ring"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <HexBadge
                        color="reference"
                        className="catalog-row-badge skill-guide-row-badge"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div className="min-w-0">
                        <h3
                          className={`catalog-row-title font-mono text-sm font-semibold ${signalRoles.reference.text}`}
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
        register="07 / authoring"
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
              touchTarget
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
              touchTarget
            >
              Browse the full catalog on GitHub →
            </TextLink>
          </p>
        </Card>
      </Section>
    </div>
  );
}
