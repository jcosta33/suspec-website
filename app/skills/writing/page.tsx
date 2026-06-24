import type { Metadata } from "next";
import {
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
import { Heading } from "../../components/Heading";
import { TextLink } from "../../components/TextLink";

export const metadata: Metadata = {
  title: "Writing a skill — Corpus",
  description:
    "A short guide to writing Corpus skills: description, body, references, templates, and scope.",
  openGraph: {
    title: "Writing a skill — Corpus",
    description:
      "A short guide to writing Corpus skills: description, body, references, templates, and scope.",
    type: "website",
    url: "/skills/writing/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-skills.png",
        width: 1200,
        height: 630,
        alt: "Writing a Corpus skill",
      },
    ],
  },
  alternates: {
    canonical: "/skills/writing/",
  },
};

const descriptionRules = [
  "Start with the work: Implement, Review, Audit, Research, Write.",
  "Name when the skill applies.",
  "Name what the agent must not do.",
  "Name when to skip it.",
];

const bodyRules = [
  {
    icon: ListOrdered,
    title: "Use numbered rules",
    text: "Give the agent a small checklist it can follow.",
  },
  {
    icon: Shield,
    title: "Keep it self-contained",
    text: "Do not depend on a sibling skill being installed.",
  },
  {
    icon: CheckCircle,
    title: "Force visible proof",
    text: "When a rule matters, make the agent leave output the next reader can inspect.",
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

export default function WritingSkillsPage() {
  return (
    <div className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-20">
      <Section>
        <PageHero
          eyebrow="SKILL.md"
          title={
            <>
              Writing a{" "}
              <span className="text-corpus-yellow">skill</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            A skill is a markdown instruction file.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
            Write the trigger, the rules, and any references the agent needs.
            Keep the rest out.
          </p>
        </PageHero>
      </Section>

      <Section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <DroneIcon className="h-4 w-4" />
            <span>layout</span>
          </div>
          <Heading className="mt-3">Use a small folder</Heading>
          <p className="mt-4 text-concrete-400">
            A simple skill has one `SKILL.md`. Add references only when the body
            would become too long.
          </p>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow title="terminal">
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

      <Section className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
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
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-phosphor" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Panel brushed className="p-2">
          <TerminalWindow title="SKILL.md">
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

      <Section className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-olive">
            <BookOpen className="h-4 w-4" />
            <span>body</span>
          </div>
          <Heading className="mt-3">Keep the body actionable</Heading>
          <p className="mt-4 text-concrete-400">
            The body tells the agent what to do after the skill loads.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {bodyRules.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Card screws className="h-full border-panel-border">
                  <HexBadge color="olive" className="mb-4">
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

      <Section className="grid gap-6 lg:grid-cols-2">
        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-corpus-yellow">
            <FileText className="h-4 w-4" />
            <span>references</span>
          </div>
          <Heading className="mt-3">Use references sparingly</Heading>
          <p className="mt-4 text-concrete-400">
            Put long templates or examples in `references/`. Keep them one hop
            away from `SKILL.md`.
          </p>
        </Card>

        <Card screws className="border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-brass">
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

      <Section className="flex flex-col gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-rubedo">
            <Shield className="h-4 w-4" />
            <span>scope</span>
          </div>
          <Heading className="mt-3">Keep repo knowledge out</Heading>
          <p className="mt-4 text-concrete-400">
            A Corpus skill must work in any repo. Put local commands and product
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

      <Section>
        <Card screws className="max-w-3xl border-panel-border">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-concrete-400">
            <GitBranch className="h-4 w-4" />
            <span>next</span>
          </div>
          <Heading className="mt-3">Read the source</Heading>
          <p className="mt-4 text-concrete-400">
            The full catalog and current examples live in the skills repo.
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <TextLink
                href="https://github.com/jcosta33/corpus-skills/tree/main/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                corpus-skills docs{" "}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </TextLink>
            </li>
            <li>
              <TextLink
                href="https://github.com/jcosta33/corpus-skills/tree/main/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                sample skills{" "}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </TextLink>
            </li>
          </ul>
        </Card>
      </Section>
    </div>
  );
}
