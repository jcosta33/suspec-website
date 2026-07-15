import type { Metadata } from "next";
import {
  ExternalLink,
  FileText,
  ShieldCheck,
  Target,
  Terminal,
} from "lucide-react";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Heading } from "../components/Heading";
import { HeroTrace } from "../components/HeroTrace";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { PaperArtifact } from "../components/PaperArtifact";
import { Panel } from "../components/Panel";
import { Section } from "../components/Section";
import { SkillCatalog } from "../components/SkillCatalog";
import { TerminalWindow } from "../components/TerminalWindow";
import { TextLink } from "../components/TextLink";
import { PackageJsonLd } from "../components/PackageJsonLd";
import { canonicalAlternates } from "../seo";
import {
  SKILLS_INSTALL_COMMAND,
  skillInstallCommand,
} from "../productFacts";
import { skillDetails, type SkillDetail } from "./skillData";

const SITE_URL = "https://suspecframework.dev";
const SKILLS_REPOSITORY = "https://github.com/jcosta33/suspec-skills";
const SKILLS_CLI = "https://github.com/vercel-labs/skills";
const skillsDescription =
  "Standalone Markdown skills that implement the Suspec method: intent, evidence, review, decisions, and durable lessons.";
const skillsTitle = "suspec-skills — installable parts of the Suspec methodology";
const catalogInstallCommand = SKILLS_INSTALL_COMMAND;
const singleSkillInstallCommand = skillInstallCommand("revolver");

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
        alt: "suspec-skills — installable parts of the Suspec methodology",
      },
    ],
  },
  alternates: canonicalAlternates("/skills/"),
};

const methodSkills = skillDetails.filter((skill) => skill.kind === "method");
const artifactSkills = skillDetails.filter((skill) => skill.kind === "artifact");

function catalogItems(skills: readonly SkillDetail[]) {
  return skills.map((skill) => ({
    skill: skill.slug,
    icon: skill.icon,
    use: skill.description,
  }));
}

const packageCatalog = skillDetails.map((skill) => ({
  name: skill.name,
  description: skill.description,
  url: `${SITE_URL}/skills/${skill.slug}/`,
  category: skill.kind === "artifact" ? "artifact author" : "universal method",
}));

const skillsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/skills/#webpage`,
  name: skillsTitle,
  url: `${SITE_URL}/skills/`,
  description: skillsDescription,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "ItemList",
    name: "Suspec skill detail pages",
    itemListElement: packageCatalog.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TechArticle",
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
          eyebrow="installable parts / methodology"
          className="page-hero-package-skills"
          motif="catalog"
          tone="reference"
          toneLabel="skills"
          titleLabel="suspec-skills"
          title={
            <>
              suspec<span className="product-name-suffix">-skills</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Markdown skills for structured agent work. Load only what the task
            needs.
          </p>
          <HeroTrace
            ariaLabel="Skill catalog path"
            items={[
              { label: "Install", signal: "core" },
              { label: "Load", signal: "reference" },
              { label: "Apply", signal: "reference" },
              { label: "Review", signal: "evidence" },
            ]}
          />
        </PageHero>
      </Section>

      <Section
        id="index"
        register="01 / index"
        registerTone="reference"
        className="grid gap-5 lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] lg:items-start"
      >
        <PaperArtifact
          label="index"
          title="placement rule"
          meta="method -> artifact author"
        >
          <p>Install independently. Use together.</p>
          <p className="mt-3 text-pencil">
            Keep repo commands in
            <span className="font-semibold"> AGENTS.md</span>.
          </p>
        </PaperArtifact>
        <Card screws className="h-full" contentClassName="space-y-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-panel border border-panel-border bg-panel-raised p-3">
              <Target className="h-6 w-6 text-signal-core" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-signal-reference">
                methodology / pieces
              </p>
              <Heading as="h2" size="xl" className="mt-1">
                The method is bigger than the install.
              </Heading>
              <p className="mt-2 text-concrete-400">
                Skills carry the rules. Suspec supplies the method.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="ready">standalone Markdown</Badge>
            <Badge variant="draft">load on demand</Badge>
            <Badge variant="draft">any capable harness</Badge>
          </div>
        </Card>
      </Section>

      <Section
        id="install"
        register="02 / install"
        registerTone="reference"
        className="section-flow section-flow-tight"
      >
        <div className="section-kicker section-kicker-reference">
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>skills add -g</span>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal" copyText={`${catalogInstallCommand}\n${singleSkillInstallCommand}`}>
            <p className="text-concrete-500"># install the catalog globally</p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}{catalogInstallCommand}
            </p>
            <p className="mt-3 text-concrete-500"># or install one skill</p>
            <p className="text-concrete-100">
              <span className="text-suspec-yellow">$</span>{" "}{singleSkillInstallCommand}
            </p>
          </TerminalWindow>
        </Panel>
        <p className="section-after-panel-note">
          The{" "}
          <TextLink
            href={SKILLS_CLI}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the skills CLI source on GitHub (opens in new tab)"
          >
            skills CLI
          </TextLink>{" "}
          installs plain Markdown into supported harnesses. No runtime.
        </p>
      </Section>

      <Section
        id="methods"
        register="03 / universal methods"
        registerTone="core"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className="section-kicker section-kicker-core">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>standalone methods</span>
          </div>
          <Heading>Methods that sharpen the work.</Heading>
          <p className="text-concrete-400">
            One job each. Open one for its contract and example.
          </p>
        </div>
        <SkillCatalog
          tone="core"
          skills={catalogItems(methodSkills)}
          headerLabel="universal methods"
          guidesLabel="open detail"
          sourcePath="skills"
        />
      </Section>

      <Section
        id="artifact-authors"
        register="04 / artifact authors"
        registerTone="reference"
        className="section-flow scroll-mt-28"
      >
        <div className="section-intro">
          <div className="section-kicker section-kicker-reference">
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>owned artifacts</span>
          </div>
          <Heading>Skills for records that earn structure.</Heading>
          <p className="text-concrete-400">
            These skills create Suspec artifacts when the work earns one.
          </p>
        </div>
        <SkillCatalog
          tone="reference"
          skills={catalogItems(artifactSkills)}
          headerLabel="artifact authors"
          guidesLabel="open detail"
          sourcePath="skills"
        />
      </Section>

      <Section register="05 / source" registerTone="muted">
        <Card
          screws
          contentClassName="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brass">
              source record
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-concrete-400">
              Read the catalog for the full skill contracts.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <TextLink href="/skills/writing/" className="w-fit" touchTarget>
              Write a skill
            </TextLink>
            <TextLink
              href="/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit"
              touchTarget
              aria-label="Read the Suspec documentation (opens in a new tab)"
            >
              Read the docs
            </TextLink>
            <TextLink
              href={SKILLS_REPOSITORY}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit gap-2"
              touchTarget
              aria-label="Open suspec-skills on GitHub (opens in new tab)"
            >
              Open repository <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          </div>
        </Card>
      </Section>

      <JsonLd data={skillsPageJsonLd} />
      <PackageJsonLd
        name="suspec-skills"
        description={skillsDescription}
        path="/skills/"
        repository={SKILLS_REPOSITORY}
        keywords={["Suspec", "methodology", "agent skills", "Markdown", "code review"]}
        catalogItems={packageCatalog}
      />
    </div>
  );
}
