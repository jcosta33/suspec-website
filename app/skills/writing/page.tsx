import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  ExternalLink,
  FileText,
  GitBranch,
  ListOrdered,
  Shield,
  Terminal,
} from "lucide-react";
import { Section } from "../../components/Section";
import { Card } from "../../components/Card";
import { Panel } from "../../components/Panel";
import { TerminalWindow } from "../../components/TerminalWindow";
import { DroneIcon } from "../../components/DroneIcon";
import { HexBadge } from "../../components/HexBadge";
import { PageHero } from "../../components/PageHero";
import { HeroTrace } from "../../components/HeroTrace";
import { Heading } from "../../components/Heading";
import { JsonLd } from "../../components/JsonLd";
import { TextLink } from "../../components/TextLink";
import { signalRoles, type SignalRole } from "../../components/signalStyles";
import { canonicalAlternates } from "../../seo";

const SITE_URL = "https://suspecframework.dev";
const pageDescription =
  "A short guide to writing Suspec skills: description, body, references, templates, and scope.";
const pageTitle = "Writing Suspec skills — structure and scope";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/skills/writing/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-skills.png",
        width: 1200,
        height: 630,
        alt: "Writing a Suspec skill",
      },
    ],
  },
  alternates: canonicalAlternates("/skills/writing/"),
};

const descriptionRules = [
  "Start with the work type: implement, review, audit, research, write.",
  "Name the task shape that admits the skill.",
  "Name the boundaries and skip cases.",
  "Keep repo facts out of the description.",
];

const skillFolderLayout = [
  "# minimal",
  "skills/write-feature/",
  "  SKILL.md",
  "",
  "# with one reference",
  "skills/write-feature/",
  "  SKILL.md",
  "  references/",
  "    task-template.md",
].join("\n");

const skillFrontMatter = [
  "---",
  "name: write-feature",
  "description: Implement a feature from a spec. ALWAYS apply when the task adds behavior. Do not refactor in passing. Skip fixes, migrations, and test-only work.",
  "---",
].join("\n");

const bodyRules = [
  {
    icon: ListOrdered,
    title: "Use numbered rules",
    text: "Make the checkpoints explicit enough to audit later.",
  },
  {
    icon: Shield,
    title: "Keep it self-contained",
    text: "Avoid hidden dependencies on another installed guide.",
  },
  {
    icon: CheckCircle,
    title: "Force visible proof",
    text: "If a rule matters, require evidence the next reader can inspect.",
  },
];

const outOfScope = [
  "stack-specific engineering advice",
  "internal product runbooks",
  "automation scripts",
  "always-on instructions",
  "shared core skills that every other skill imports",
  "business logic that belongs in the consuming repo",
];

const skillAnatomy = [
  {
    label: "Trigger",
    tag: "admission",
    text: "Load only when the task matches; name the skips.",
    href: "#trigger",
  },
  {
    label: "Rules",
    tag: "operating",
    text: "Short checklist, sharp constraints, visible proof.",
    href: "#rules",
  },
  {
    label: "References",
    tag: "source pack",
    text: "Templates and examples stay one hop away.",
    href: "#references",
  },
  {
    label: "Scope",
    tag: "local facts",
    text: "Commands and product policy stay in AGENTS.md.",
    href: "#scope",
  },
];

const writingPageNav = [
  { label: "Anatomy", href: "#anatomy", signal: "reference" },
  { label: "Folder", href: "#folder", signal: "reference" },
  { label: "Trigger", href: "#trigger", signal: "core" },
  { label: "Rules", href: "#rules", signal: "reference" },
  { label: "References", href: "#references", signal: "reference" },
  { label: "Scope", href: "#scope", signal: "muted" },
  { label: "Source", href: "#source", signal: "muted" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

const skillWritingJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${SITE_URL}/skills/writing/#article`,
  headline: "Writing a skill",
  description: pageDescription,
  url: `${SITE_URL}/skills/writing/`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/skills/writing/`,
  },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Suspec",
      url: SITE_URL,
    },
    {
      "@type": "CreativeWork",
      name: "Suspec skill files",
    },
  ],
  teaches:
    "How to write a portable SKILL.md file with trigger, rules, references, scope, and source links.",
  mainEntity: {
    "@type": "ItemList",
    name: "Writing a skill sections",
    itemListElement: writingPageNav.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `${SITE_URL}/skills/writing/${item.href}`,
    })),
  },
};

export default function WritingSkillsPage() {
  return (
    <div className="writing-skill-page flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <JsonLd data={skillWritingJsonLd} />
      <Section className="ambient-header">
        <PageHero
          eyebrow="SKILL.md"
          motif="manual"
          tone="core"
          title={
            <>
              Writing a{" "}
              <span className="text-suspec-yellow">skill</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Write the load boundary, operating rules, and source material. Keep
            local commands and team policy in the consuming repo.
          </p>
          <HeroTrace
            ariaLabel="Skill file anatomy trace"
            items={[
              { label: "Load", signal: "reference" },
              { label: "Act", signal: "core" },
              { label: "Prove", signal: "reference" },
              { label: "Stop", signal: "muted" },
            ]}
          />
        </PageHero>
      </Section>

      <nav
        className="writing-page-nav mx-auto w-full max-w-7xl px-6 lg:px-8"
        aria-label="Writing a skill page sections"
      >
        <div className="section-jump-nav">
          {writingPageNav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={`Jump to ${item.label} section`}
              data-color-role={item.signal}
              className={`section-jump-nav-link section-jump-nav-link-${item.signal} focus-ring group`}
            >
              <span className="section-jump-nav-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="section-jump-nav-label">{item.label}</span>
              <ArrowRight
                className={`motion-nudge-x h-3.5 w-3.5 ${signalRoles[item.signal].text}`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </nav>

      <Section
        id="anatomy"
        register="01 / one file"
        registerTone="reference"
        className="scroll-mt-28"
      >
        <Panel
          brushed
          className="mcp-adapter-panel skill-anatomy-panel p-0"
        >
          <div className="mcp-adapter-header skill-anatomy-header">
            <h2 className="m-0 font-mono text-[0.68rem] font-bold tracking-[0.1em] text-suspec-yellow uppercase">
              Skill anatomy
            </h2>
            <span className="font-mono text-[0.68rem] font-bold tracking-[0.1em] text-concrete-400 uppercase">
              portable context packet
            </span>
          </div>
          <ol
            className="skill-anatomy-rail process-strip process-strip-signal-reference grid gap-px bg-panel-border sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Skill file anatomy"
          >
            {skillAnatomy.map((item, index) => (
              <li
                key={item.label}
                className="mcp-adapter-step skill-anatomy-step bg-panel-raised/95"
              >
                <a
                  href={item.href}
                  aria-label={`Jump to ${item.label} section`}
                  className="focus-ring group flex min-h-[9.4rem] h-full flex-col p-5 no-underline sm:p-6"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wide text-suspec-yellow">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowRight
                      className="motion-nudge-x h-4 w-4 shrink-0 text-brass/70"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="skill-anatomy-label mt-3 font-heading text-xl font-semibold text-concrete-100">
                    {item.label}
                  </span>
                  <span className="skill-anatomy-tag mt-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-signal-reference">
                    {item.tag}
                  </span>
                  <span className="skill-anatomy-copy mt-2 text-sm leading-relaxed text-concrete-400">
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Panel>
      </Section>

      <Section
        id="folder"
        register="02 / folder"
        registerTone="reference"
        className="grid scroll-mt-28 gap-6 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="skill-folder-brief">
          <div className="section-kicker section-kicker-reference">
            <DroneIcon className="h-4 w-4" />
            <span>layout</span>
          </div>
          <Heading className="mt-3">Use a small folder</Heading>
          <p className="mt-4 text-concrete-400">
            A simple skill has one{" "}
            <code className="text-suspec-yellow">SKILL.md</code>. Add references
            only when the body would become too long.
          </p>
          <dl className="skill-folder-ledger mt-6">
            <div>
              <dt>Entry</dt>
              <dd>SKILL.md</dd>
            </div>
            <div>
              <dt>Optional</dt>
              <dd>references/</dd>
            </div>
            <div>
              <dt>Keep out</dt>
              <dd>repo policy</dd>
            </div>
          </dl>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="terminal"
            copyText={skillFolderLayout}
            copyLabel="Copy layout"
          >
            <p className="text-concrete-500"># minimal</p>
            <p className="text-concrete-100">
              skills/write-feature/
              <br />
              &nbsp;&nbsp;SKILL.md
            </p>
            <p className="mt-3 text-concrete-500"># with one reference</p>
            <p className="text-concrete-100">
              skills/write-feature/
              <br />
              &nbsp;&nbsp;SKILL.md
              <br />
              &nbsp;&nbsp;references/
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;task-template.md
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="trigger"
        register="03 / load rule"
        registerTone="core"
        className="section-flow section-flow-tight"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-core">
            <Terminal className="h-4 w-4" />
            <span>description</span>
          </div>
          <Heading className="mt-3">Write the trigger first</Heading>
          <p className="mt-4 text-concrete-400">
            The description decides whether the skill loads. Make it direct.
          </p>
        </div>
        <Card screws className="border-panel-border">
          <ul className="grid gap-3 sm:grid-cols-2">
            {descriptionRules.map((rule) => (
              <li key={rule} className="flex items-start gap-3 text-concrete-400">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-signal-evidence" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="SKILL.md"
            copyText={skillFrontMatter}
            copyLabel="Copy front matter"
          >
            <p className="text-concrete-500">---</p>
            <p className="text-concrete-100">name: write-feature</p>
            <p className="text-concrete-100">
              description: Implement a feature from a spec. ALWAYS apply when
              the task adds behavior. Do not refactor in passing. Skip fixes,
              migrations, and test-only work.
            </p>
            <p className="text-concrete-500">---</p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        id="rules"
        register="04 / checklist"
        registerTone="reference"
        className="section-flow section-flow-tight"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-reference">
            <BookOpen className="h-4 w-4" />
            <span>body</span>
          </div>
          <Heading className="mt-3">Keep the body actionable</Heading>
          <p className="mt-4 text-concrete-400">
            The body tells the agent what to do after the skill loads.
          </p>
        </div>
        <ul className="skill-body-rule-list grid gap-4 sm:grid-cols-3">
          {bodyRules.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Card
                  screws
                  className="skill-body-rule-card h-full border-panel-border"
                >
                  <HexBadge
                    color="reference"
                    className="skill-body-rule-icon mb-4"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-concrete-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                    {item.text}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section
        id="references"
        register="05 / extra material"
        registerTone="reference"
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card screws className="border-panel-border">
          <div className="section-kicker section-kicker-reference">
            <FileText className="h-4 w-4" />
            <span>references</span>
          </div>
          <Heading className="mt-3">Use references sparingly</Heading>
          <p className="mt-4 text-concrete-400">
            Put long templates or examples in{" "}
            <code className="text-suspec-yellow">references/</code>. Keep them
            one hop away from <code className="text-suspec-yellow">SKILL.md</code>.
          </p>
        </Card>

        <Card screws className="border-panel-border">
          <div className="section-kicker section-kicker-reference">
            <GitBranch className="h-4 w-4" />
            <span>templates</span>
          </div>
          <Heading className="mt-3">Add a task template only when useful</Heading>
          <p className="mt-4 text-concrete-400">
            Use a template for long work that needs state: plans, evidence,
            attempts, decisions, and follow-up.
          </p>
        </Card>
      </Section>

      <Section
        id="scope"
        register="06 / local knowledge"
        registerTone="muted"
        className="section-flow section-flow-tight"
      >
        <div className="max-w-2xl">
          <div className="section-kicker section-kicker-muted">
            <Shield className="h-4 w-4" />
            <span>scope</span>
          </div>
          <Heading className="mt-3">Keep repo knowledge out</Heading>
          <p className="mt-4 text-concrete-400">
            A Suspec skill must work in any repo. Put local commands and product
            knowledge in that repo&apos;s AGENTS.md.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outOfScope.map((item) => (
            <li key={item}>
              <Card screws className="h-full border-panel-border">
                <p className="text-sm text-concrete-400">{item}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="source"
        register="07 / source"
        registerTone="muted"
        className="scroll-mt-28"
      >
        <div className="mx-auto max-w-5xl">
          <Card
            screws
            className="border-panel-border"
            contentClassName="grid gap-6 md:grid-cols-[1fr_auto] md:items-start"
          >
            <div>
              <div className="section-kicker section-kicker-muted">
                <GitBranch className="h-4 w-4" />
                <span>next</span>
              </div>
              <Heading className="mt-3">Read the source</Heading>
              <p className="mt-4 max-w-2xl text-concrete-400">
                The same file shape is used in both tiers. Framework-free examples
                live in the suspec-skills catalog; the{" "}
                <code className="text-suspec-yellow">write-*</code> family used
                above (write-feature, write-fix, ...) lives in the Suspec kit.
              </p>
            </div>
            <ul className="space-y-3 md:min-w-56">
              <li>
                <TextLink
                  href="https://github.com/jcosta33/suspec-skills/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                  touchTarget
                >
                  suspec-skills docs{" "}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              </li>
              <li>
                <TextLink
                  href="https://github.com/jcosta33/suspec-skills/tree/main/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                  touchTarget
                >
                  catalog skills{" "}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              </li>
              <li>
                <TextLink
                  href="https://github.com/jcosta33/suspec-starter-kit/tree/main/.agents/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                  touchTarget
                >
                  kit skills (write-*){" "}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </div>
  );
}
