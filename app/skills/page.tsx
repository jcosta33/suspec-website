import type { Metadata } from "next";
import {
  ArrowRight,
  Bug,
  ClipboardCheck,
  Compass,
  FileCheck,
  FileCode,
  FileText,
  Files,
  FlaskConical,
  FolderSearch,
  Gauge,
  GitPullRequest,
  Glasses,
  Hammer,
  Layers,
  Lightbulb,
  Lock,
  Map,
  Puzzle,
  RefreshCw,
  Rocket,
  Route,
  Save,
  Scale,
  ScanSearch,
  Shield,
  ShieldCheck,
  Split,
  Swords,
  Target,
  Terminal,
  TrendingUp,
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
const SKILLS_CLI = "https://github.com/vercel-labs/skills";
const SKILLS_PAGE_URL = `${SITE_URL}/skills/`;
const skillsDescription =
  "The Suspec methodology as a globally installed skill family, plus universal engineering disciplines. Plain markdown, any agent.";
const skillsTitle = "suspec-skills — the Suspec methodology as skills";

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

const catalogInstallCommand = "npx skills add jcosta33/suspec-skills -g";
const singleSkillInstallCommand =
  "npx skills add jcosta33/suspec-skills --skill revolver-review -g";

// Every skill row links into the catalog repo.
const catalogRepo = `${SKILLS_REPOSITORY}/tree/main/skills`;

// Group 1a — the Suspec methodology: the six skills that run the loop.
const loopSkills = [
  {
    skill: "write-spec",
    icon: FileText,
    use: "turn intent into verifiable requirements, one Verify line per AC",
  },
  {
    skill: "spec-check",
    icon: ClipboardCheck,
    use: "check a spec against the checks contract before work is cut",
  },
  {
    skill: "split-work",
    icon: Split,
    use: "cut task packets that cover every requirement exactly once",
  },
  {
    skill: "implement-task",
    icon: Terminal,
    use: "implement a task packet in scope, real output pasted",
  },
  {
    skill: "review-output",
    icon: ShieldCheck,
    use: "review finished work against its spec, refute by default",
  },
  {
    skill: "save-findings",
    icon: Save,
    use: "keep what a run taught as native harness memories",
  },
];

// Group 1b — the Suspec methodology: the other typed artifacts, plus
// per-kind implementation depth.
const artifactSkills = [
  {
    skill: "write-prd",
    icon: Lightbulb,
    use: "capture the product problem before any spec exists",
  },
  {
    skill: "write-rfc",
    icon: Scale,
    use: "argue a contested approach, decision request included",
  },
  {
    skill: "write-research",
    icon: FolderSearch,
    use: "build an evidence base for one open question",
  },
  {
    skill: "write-audit",
    icon: ScanSearch,
    use: "record the present state of a code area, no prescriptions",
  },
  {
    skill: "write-inventory",
    icon: Map,
    use: "map what exists before a rewrite or migration",
  },
  {
    skill: "write-change-plan",
    icon: Route,
    use: "plan a structural transformation with waves and rollback",
  },
  {
    skill: "write-bug-report",
    icon: Bug,
    use: "diagnose a defect to root cause, reproduction pasted",
  },
  {
    skill: "write-feature",
    icon: Rocket,
    use: "add net-new capability, patterns surveyed first",
  },
  {
    skill: "write-fix",
    icon: Hammer,
    use: "repair a diagnosed defect with a minimal change",
  },
  {
    skill: "write-refactor",
    icon: Layers,
    use: "restructure without behavior change, equivalence proven",
  },
  {
    skill: "write-rewrite",
    icon: FileCode,
    use: "replace an implementation wholesale, delta table driven",
  },
  {
    skill: "write-migration",
    icon: Files,
    use: "move callers across a boundary with a rollback path",
  },
  {
    skill: "write-performance",
    icon: Gauge,
    use: "chase a measured target, baseline pasted first",
  },
  {
    skill: "write-testing",
    icon: FlaskConical,
    use: "author tests that are proven able to fail",
  },
  {
    skill: "write-documentation",
    icon: Glasses,
    use: "write human-facing docs, every example run",
  },
];

// Group 2 — universal disciplines. Framework-free; each stands alone in
// any repo with zero Suspec knowledge.
const universalSkills = [
  {
    skill: "persona-challenger",
    icon: Swords,
    use: "pressure-test a proposal before it is built",
  },
  {
    skill: "market-research",
    icon: TrendingUp,
    use: "synthesize market and UX-pattern evidence, confidence graded",
  },
  {
    skill: "bulletproof",
    icon: Shield,
    use: "harden an important claim or plan before it ships",
  },
  {
    skill: "revolver-review",
    icon: RefreshCw,
    use: "rotate adversarial stances until a change reviews clean",
  },
  {
    skill: "empirical-proof",
    icon: FileCheck,
    use: "bind every completion claim to pasted output",
  },
  {
    skill: "concise-output",
    icon: Zap,
    use: "make agent output terse and evidence-first",
  },
  {
    skill: "fix-flaky-test",
    icon: Puzzle,
    use: "fix the cause of an intermittent test, not the assertion",
  },
  {
    skill: "codebase-exploration",
    icon: Compass,
    use: "map an unfamiliar codebase before changing it",
  },
  {
    skill: "debugging",
    icon: Bug,
    use: "find a defect's root cause from runtime evidence",
  },
  {
    skill: "security-review",
    icon: Lock,
    use: "review a risk-bearing change by data flow, not string-matching",
  },
  {
    skill: "git-pr",
    icon: GitPullRequest,
    use: "ship a change end to end as a clean PR",
  },
  {
    skill: "planning-spec",
    icon: Target,
    use: "plan a non-trivial change and get a human go first",
  },
];

const skillRoutes = [
  {
    label: "The core loop",
    href: "#loop-skills",
    tag: "methodology",
    icon: Target,
    text: "Spec, check, split, implement, review, findings — the six skills that run the loop.",
    signal: "core",
  },
  {
    label: "Artifacts & depth",
    href: "#artifact-skills",
    tag: "methodology",
    icon: FileText,
    text: "Authoring the other typed artifacts, plus per-kind implementation depth.",
    signal: "reference",
  },
  {
    label: "Universal disciplines",
    href: "#universal-skills",
    tag: "framework-free",
    icon: ShieldCheck,
    text: "Review methods, evidence disciplines, and code-lifecycle fundamentals for any repo.",
    signal: "evidence",
  },
] as const;

const selectionRules = [
  {
    label: "Global",
    text: "Methodology + universal disciplines. One -g install, every repo.",
  },
  {
    label: "Repo",
    text: ".agents/skills/ carries only repo-specific guides.",
  },
  {
    label: "Overlap",
    text: "None. The two tiers never ship the same guide.",
  },
] as const;

const skillCatalogItems = [
  ...loopSkills.map((item) => ({
    name: item.skill,
    description: item.use,
    url: `${catalogRepo}/${item.skill}`,
    category: "Suspec methodology — the core loop",
  })),
  ...artifactSkills.map((item) => ({
    name: item.skill,
    description: item.use,
    url: `${catalogRepo}/${item.skill}`,
    category: "Suspec methodology — artifacts and depth",
  })),
  ...universalSkills.map((item) => ({
    name: item.skill,
    description: item.use,
    url: `${catalogRepo}/${item.skill}`,
    category: "Universal disciplines",
  })),
];

const skillsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SKILLS_PAGE_URL}#webpage`,
  name: "suspec-skills catalog",
  url: SKILLS_PAGE_URL,
  description: skillsDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SKILLS_PAGE_URL}#source-code` },
  mainEntity: {
    "@type": "ItemList",
    name: "suspec-skills catalog",
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
          eyebrow="skill catalog / the methodology, installed"
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
            Suspec ships as a skill family: the full methodology plus universal
            engineering disciplines, in plain markdown. One global install and
            every repo has the loop — your repos take nothing.
          </p>
          <HeroTrace
            ariaLabel="Skill catalog trace"
            items={[
              { label: "Install", signal: "core" },
              { label: "Load", signal: "reference" },
              { label: "Act", signal: "reference" },
              { label: "Prove", signal: "reference" },
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
        <h2 className="sr-only">Skill placement index</h2>
        <PaperArtifact
          label="index"
          title="placement rule"
          meta="global tier -> repo tier, never both"
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
              value="npx skills -g"
              signal="evidence"
              valueClassName="font-mono text-sm uppercase text-concrete-300"
            />
            <SignalStat
              label="catalog"
              value="33 skills"
              signal="core"
              valueClassName="font-mono text-sm uppercase text-concrete-300"
            />
            <SignalStat
              label="commands"
              value="AGENTS.md"
              signal="reference"
              valueClassName="font-mono text-sm text-concrete-300"
            />
          </div>
          <p className="repo-manifest-note">
            Skills name abstract command slots — cmdTest, cmdLint — and your
            repo&apos;s AGENTS.md supplies the implementations. An empty slot
            means ask; a skill never invents a command.
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
          <span>skills add -g</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={catalogInstallCommand}>
            <p className="text-concrete-500">
              # the whole catalog, at user level — available in every repo
            </p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}
              {catalogInstallCommand}
            </p>
            <p className="mt-3 text-concrete-500"># or a single skill</p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}
              {singleSkillInstallCommand}
            </p>
          </TerminalWindow>
        </Panel>
        <p className="section-after-panel-note">
          The{" "}
          <TextLink
            href={SKILLS_CLI}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Vercel skills CLI on GitHub (opens in new tab)"
          >
            Vercel skills CLI
          </TextLink>{" "}
          installs into Claude Code, Cursor, Codex, OpenCode, and Gemini CLI.
          No CLI? Copy the skill folders to{" "}
          <code className="text-suspec-yellow">~/.agents/skills/</code> and{" "}
          <code className="text-suspec-yellow">~/.claude/skills/</code>. Repo
          commands stay in{" "}
          <code className="text-suspec-yellow">AGENTS.md</code>; the{" "}
          <TextLink
            href="/docs/reference/agent-guides/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the agent guide docs (opens in new tab)"
          >
            agent guide docs
          </TextLink>{" "}
          cover placement.
        </p>
      </Section>

      <Section
        id="loop-skills"
        register="04 / methodology · loop"
        registerTone="core"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className="section-kicker section-kicker-core">
            <Target className="h-4 w-4" aria-hidden="true" />
            <span>the core loop</span>
          </div>
          <Heading>The Suspec methodology</Heading>
          <p className="text-concrete-400">
            The six skills that run the loop: intent to spec, spec to
            implementation, implementation to a reviewed result, result to
            findings worth keeping. Install globally — the methodology travels
            with you, not with any one repo.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="draft">markdown only</Badge>
            <Badge variant="ready">on demand</Badge>
          </div>
        </div>
        <SkillCatalog
          tone="core"
          skills={loopSkills}
          repo={catalogRepo}
          headerLabel="suspec-skills catalog"
          guidesLabel="skills"
          sourcePath="skills"
        />
      </Section>

      <Section
        id="artifact-skills"
        register="05 / methodology · artifacts"
        registerTone="reference"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>artifacts &amp; depth</span>
          </div>
          <Heading>Artifacts and implementation depth</Heading>
          <p className="text-concrete-400">
            Authoring skills for the other typed artifacts — PRDs, RFCs,
            research notes, audits, inventories, change plans, bug reports —
            plus per-kind execution discipline for the implementing agent.
            Artifacts live beside your agent&apos;s own native artifacts and are
            named by explicit path; durable value becomes native memories.
          </p>
        </div>
        <SkillCatalog
          tone="reference"
          skills={artifactSkills}
          repo={catalogRepo}
          headerLabel="suspec-skills catalog"
          guidesLabel="skills"
          sourcePath="skills"
        />
      </Section>

      <Section
        id="universal-skills"
        register="06 / universal disciplines"
        registerTone="evidence"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className="section-kicker section-kicker-evidence">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>framework-free</span>
          </div>
          <Heading>Disciplines for any repo</Heading>
          <p className="text-concrete-400">
            Review methods, evidence disciplines, and code-lifecycle
            fundamentals. Framework-free — each stands alone in any repo with
            zero Suspec knowledge, and they install in the same global tier.
          </p>
        </div>
        <SkillCatalog
          tone="evidence"
          skills={universalSkills}
          repo={catalogRepo}
          headerLabel="suspec-skills catalog"
          guidesLabel="skills"
          sourcePath="skills"
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
            One SKILL.md per folder: a trigger description that decides when it
            loads, numbered working rules, references one hop away, and the
            AGENTS.md command contract.
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
            Skills are instructions your agent follows. Everything here is
            plain markdown — no scripts, no network calls, no executables. Read
            before installing; pin to a commit. The optional deterministic
            checker is <TextLink href="/cli/">suspec-cli</TextLink>.
          </p>
          <p className="mt-6">
            <TextLink
              href={SKILLS_REPOSITORY}
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
          "agent skills",
          "npx skills",
          "Suspec methodology",
          "universal disciplines",
          "review skills",
        ]}
        catalogItems={skillCatalogItems}
      />
    </div>
  );
}
