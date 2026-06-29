import type { Metadata } from "next";
import {
  ArrowRight,
  Bug,
  ClipboardCheck,
  Compass,
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
import { SkillCatalog } from "../components/SkillCatalog";
import { signalRoles } from "../components/signalStyles";

export const metadata: Metadata = {
  title: "suspec-skills — Suspec",
  description:
    "Two tiers of agent guides: the framework-free suspec-skills catalog and the Suspec-coupled kit that ships in suspec-starter-kit.",
  openGraph: {
    title: "suspec-skills — Suspec",
    description:
      "Two tiers of agent guides: the framework-free suspec-skills catalog and the Suspec-coupled kit that ships in suspec-starter-kit.",
    type: "website",
    url: "/skills/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-skills.png",
        width: 1200,
        height: 630,
        alt: "suspec-skills",
      },
    ],
  },
  alternates: {
    canonical: "/skills/",
  },
};

const catalogInstallCommand = "npx skills add jcosta33/suspec-skills";

// Tier 1 — the universal catalog (suspec-skills). Framework-free disciplines and
// stances, installable into any repo via `npx skills` with zero Suspec knowledge.
const catalogRepo = "https://github.com/jcosta33/suspec-skills/tree/main/skills";

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

// Tier 2 — the Suspec kit (ships in suspec-starter-kit/.agents/skills/). Every
// skill that operates a Suspec concept; not installable framework-free.
const kitRepo =
  "https://github.com/jcosta33/suspec-starter-kit/tree/main/.agents/skills";

const kitSkills = [
  {
    skill: "implement-task",
    icon: Terminal,
    use: "implement a Suspec task packet",
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
    label: "Suspec kit",
    href: "#kit-skills",
    count: String(kitSkills.length),
    icon: Puzzle,
    text: "Suspec-coupled skills that ship in suspec-starter-kit, not the catalog.",
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
              suspec<span className="product-name-suffix">-skills</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Two tiers of task-scoped guides: a framework-free catalog and a
            Suspec-coupled kit.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            The catalog (suspec-skills) installs into any repo via{" "}
            <code className="text-suspec-yellow">npx skills</code>. The kit ships
            in suspec-starter-kit. Load only the guide in scope.
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
          meta="catalog (any repo) -> kit (Suspec repos)"
          className="h-full"
        >
          <p>
            The catalog is framework-free. The kit operates Suspec concepts. Keep
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
              <span className="text-suspec-yellow">$</span>{" "}npx skills add{" "}
              jcosta33/suspec-skills
            </p>
          </TerminalWindow>
        </Panel>
        <p className="text-concrete-400">
          This installs the framework-free catalog into any repo. The Suspec kit
          ships separately in{" "}
          <TextLink
            href="https://github.com/jcosta33/suspec-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
          >
            suspec-starter-kit
          </TextLink>
          . Keep repo-specific commands in{" "}
          <code className="text-suspec-yellow">AGENTS.md</code>.
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
            debugging. Installed with <code className="text-suspec-yellow">npx skills</code>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="draft">markdown only</Badge>
            <Badge variant="ready">on demand</Badge>
          </div>
        </div>
        <SkillCatalog
          tone="evidence"
          skills={stances}
          repo={catalogRepo}
          headerLabel="suspec-skills catalog"
          guidesLabel={`${stances.length} guides`}
        />
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
        <SkillCatalog
          tone="core"
          skills={disciplines}
          repo={catalogRepo}
          headerLabel="suspec-skills catalog"
          guidesLabel={`${disciplines.length} guides`}
        />
      </Section>

      <Section
        id="kit-skills"
        register="06 / kit · suspec-coupled"
        registerTone="reference"
        className="flex scroll-mt-28 flex-col gap-12"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <Puzzle className="h-4 w-4" aria-hidden="true" />
            <span>kit · suspec-coupled</span>
          </div>
          <Heading className="mt-3">The Suspec kit</Heading>
          <p className="mt-4 text-concrete-400">
            These skills operate Suspec concepts — task packets, review packets,
            specs, findings — so they are not framework-free. They ship in{" "}
            <TextLink
              href="https://github.com/jcosta33/suspec-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              suspec-starter-kit
            </TextLink>{" "}
            under <code className="text-suspec-yellow">.agents/skills/</code>, not
            in the <code className="text-suspec-yellow">npx skills</code> catalog.
            The <code className="text-suspec-yellow">write-*</code> family is opt-in
            task-implementation depth.
          </p>
        </div>
        <SkillCatalog
          tone="reference"
          skills={kitSkills}
          repo={kitRepo}
          headerLabel="suspec-starter-kit/.agents/skills"
          guidesLabel={`${kitSkills.length} guides`}
          toned={false}
        />
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
          <Heading className="mt-3">How to write a Suspec skill</Heading>
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
            <TextLink href="/cli/">suspec-cli</TextLink>.
          </p>
          <p className="mt-6">
            <TextLink
              href="https://github.com/jcosta33/suspec-skills"
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
