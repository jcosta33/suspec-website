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
import { JsonLd } from "../components/JsonLd";
import { PackageJsonLd } from "../components/PackageJsonLd";
import { signalRoles } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const SKILLS_REPOSITORY = "https://github.com/jcosta33/suspec-skills";
const STARTER_KIT_REPOSITORY = "https://github.com/jcosta33/suspec-starter-kit";
const SKILLS_PAGE_URL = `${SITE_URL}/skills/`;
const skillsDescription =
  "Two tiers of agent guides: the framework-free suspec-skills catalog and the Suspec-coupled kit that ships in suspec-starter-kit.";
const skillsTitle = "suspec-skills — agent guide catalog for Suspec";

export const metadata: Metadata = {
  title: skillsTitle,
  description: skillsDescription,
  openGraph: {
    title: skillsTitle,
    description: skillsDescription,
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
  alternates: canonicalAlternates("/skills/"),
};

const catalogInstallCommand = "npx skills add jcosta33/suspec-skills";

// Tier 1 — the universal catalog (suspec-skills). Framework-free disciplines and
// methods, installable into any repo via `npx skills` with zero Suspec knowledge.
const catalogRepo = `${SKILLS_REPOSITORY}/tree/main/skills`;

// Market / review methods in the catalog.
const methods = [
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
    skill: "market-research",
    icon: FolderSearch,
    use: "synthesize market and UX-pattern evidence",
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

// Working disciplines in the catalog — the everyday methods.
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
  `${STARTER_KIT_REPOSITORY}/tree/main/.agents/skills`;

const kitSkills = [
  {
    skill: "implement-task",
    icon: Terminal,
    use: "implement a Suspec spec or task packet",
  },
  {
    skill: "review-output",
    icon: ShieldCheck,
    use: "build the review packet for a finished run",
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
    use: "save what a run taught as findings",
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

const skillRoutes = [
  {
    label: "Review catalog",
    href: "#review-guides",
    tag: "method guides",
    icon: ShieldCheck,
    text: "Judgment, evidence, market research, security, and debugging methods.",
    signal: "evidence",
  },
  {
    label: "Method catalog",
    href: "#change-guides",
    tag: "work guides",
    icon: Hammer,
    text: "Exploration, planning, PRs, concision, and flaky tests.",
    signal: "core",
  },
  {
    label: "Suspec-coupled kit",
    href: "#kit-skills",
    tag: "loop guides",
    icon: Puzzle,
    text: "Loop-specific guides that ship with suspec-starter-kit.",
    signal: "reference",
  },
] as const;

const selectionRules = [
  {
    label: "Catalog",
    text: "Any repo; framework-free method.",
  },
  {
    label: "Kit",
    text: "Suspec repo; loop and artifact context.",
  },
  {
    label: "Gate",
    text: "Read first; pin shared installs; commands in AGENTS.md.",
  },
] as const;

const skillCatalogItems = [
  ...methods.map((item) => ({
    name: item.skill,
    description: item.use,
    url: `${catalogRepo}/${item.skill}`,
    category: "Framework-free review catalog",
  })),
  ...disciplines.map((item) => ({
    name: item.skill,
    description: item.use,
    url: `${catalogRepo}/${item.skill}`,
    category: "Framework-free method catalog",
  })),
  ...kitSkills.map((item) => ({
    name: item.skill,
    description: item.use,
    url: `${kitRepo}/${item.skill}`,
    category: "Suspec-coupled starter kit",
  })),
];

const skillsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SKILLS_PAGE_URL}#webpage`,
  name: "suspec-skills agent guide catalog",
  url: SKILLS_PAGE_URL,
  description: skillsDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SKILLS_PAGE_URL}#source-code` },
  mainEntity: {
    "@type": "ItemList",
    name: "suspec-skills guide catalog",
    itemListElement: skillCatalogItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
        url: item.url,
        genre: item.category,
      },
    })),
  },
};

export default function SkillsPage() {
  return (
    <div className="repo-product-page skills-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="tool index / agent guides"
          className="page-hero-package-skills"
          motif="catalog"
          tone="evidence"
          toneLabel="skills"
          titleLabel="suspec-skills"
          title={
            <>
              suspec<span className="product-name-suffix">-skills</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Framework-free agent disciplines, plus Suspec-coupled kit files for
            the loop. Install the catalog anywhere; load only the guide in scope.
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
        id="index"
        register="01 / index"
        registerTone="reference"
        className="manifest-pair grid gap-5 lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] lg:items-start"
      >
        <h2 className="sr-only">Skill selection index</h2>
        <PaperArtifact
          label="index"
          title="selection rule"
          meta="catalog -> repo policy -> kit"
          className="manifest-paper-fit lg:self-start"
        >
          <dl className="agent-delegation-contract skill-selection-contract">
            {selectionRules.map((rule) => (
              <div key={rule.label}>
                <dt>{rule.label}</dt>
                <dd>{rule.text}</dd>
              </div>
            ))}
          </dl>
        </PaperArtifact>
        <Card
          screws
          className="repo-manifest-card h-full"
          contentClassName="repo-manifest-content"
        >
          <p className="repo-manifest-label">activation contract</p>
          <div className="repo-manifest-grid">
            <SignalStat
              label="install"
              value="npx skills"
              signal="evidence"
              valueClassName="font-mono text-sm uppercase text-concrete-300"
            />
            <SignalStat
              label="kit"
              value="starter-kit"
              signal="core"
              valueClassName="font-mono text-sm uppercase text-concrete-300"
            />
            <SignalStat
              label="policy"
              value="AGENTS.md"
              signal="reference"
              valueClassName="font-mono text-sm text-concrete-300"
            />
          </div>
          <p className="repo-manifest-note">
            Use the catalog for general agent discipline; use the kit only when
            the repo already speaks Suspec. Skills advise; review still decides.
          </p>
        </Card>
      </Section>

      <Section
        id="categories"
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
                  aria-label={`Jump to ${route.label}`}
                >
                  <div className="skill-category-heading flex items-center gap-3">
                    <HexBadge color={route.signal} className="h-10 w-10 shrink-0">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </HexBadge>
                    <div className="min-w-0">
                      <p
                        className={`font-mono text-xs font-semibold uppercase tracking-wide ${signalRoles[route.signal].text}`}
                      >
                        {String(index + 1).padStart(2, "0")} / {route.tag}
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
        id="install"
        register="03 / install"
        registerTone="reference"
        className="section-flow section-flow-tight"
      >
        <h2 className="sr-only">Install suspec-skills</h2>
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
        <p className="section-after-panel-note">
          This installs the framework-free catalog into any repo. The Suspec kit
          ships separately in{" "}
          <TextLink
            href="https://github.com/jcosta33/suspec-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open suspec-starter-kit on GitHub (opens in new tab)"
          >
            suspec-starter-kit
          </TextLink>
          . Keep repo-specific commands in{" "}
          <code className="text-suspec-yellow">AGENTS.md</code>.
        </p>
      </Section>

      <Section
        id="review-guides"
        register="04 / review catalog"
        registerTone="evidence"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className="section-kicker section-kicker-evidence">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>method files</span>
          </div>
          <Heading>Market and review methods</Heading>
          <p className="text-concrete-400">
            Framework-free catalog methods for judgment, evidence, market research, security, and
            debugging. Installed with <code className="text-suspec-yellow">npx skills</code>.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="draft">markdown only</Badge>
            <Badge variant="ready">on demand</Badge>
          </div>
        </div>
        <SkillCatalog
          tone="evidence"
          skills={methods}
          repo={catalogRepo}
          headerLabel="suspec-skills catalog"
          guidesLabel="guides"
          sourcePath="skills"
        />
      </Section>

      <Section
        id="change-guides"
        register="05 / catalog methods"
        registerTone="core"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className="section-kicker section-kicker-core">
            <Hammer className="h-4 w-4" aria-hidden="true" />
            <span>change discipline</span>
          </div>
          <Heading>Working disciplines</Heading>
          <p className="text-concrete-400">
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
          guidesLabel="guides"
          sourcePath="skills"
        />
      </Section>

      <Section
        id="kit-skills"
        register="06 / kit · suspec-coupled"
        registerTone="reference"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <Puzzle className="h-4 w-4" aria-hidden="true" />
            <span>kit · suspec-coupled</span>
          </div>
          <Heading>The Suspec kit</Heading>
          <div className="section-prose-stack">
            <p>
              These guides operate Suspec artifacts: specs, optional task
              packets, review packets, and findings. They ship in{" "}
              <TextLink
                href="https://github.com/jcosta33/suspec-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open suspec-starter-kit on GitHub (opens in new tab)"
              >
                suspec-starter-kit
              </TextLink>{" "}
              under <code className="text-suspec-yellow">.agents/skills/</code>;
              they are not framework-free catalog entries.
            </p>
          </div>
        </div>
        <SkillCatalog
          tone="reference"
          skills={kitSkills}
          repo={kitRepo}
          headerLabel="suspec-starter-kit/.agents/skills"
          guidesLabel="guides"
          sourcePath=".agents/skills"
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
              aria-label="Browse the full suspec-skills catalog on GitHub (opens in new tab)"
            >
              Browse the full catalog on GitHub →
            </TextLink>
          </p>
        </Card>
      </Section>
      <JsonLd data={skillsPageJsonLd} />
      <PackageJsonLd
        name="suspec-skills"
        description={skillsDescription}
        path="/skills/"
        repository={SKILLS_REPOSITORY}
        keywords={[
          "agent guides",
          "npx skills",
          "suspec-starter-kit",
          "review guides",
          "implementation guides",
        ]}
        catalogItems={skillCatalogItems}
      />
    </div>
  );
}
