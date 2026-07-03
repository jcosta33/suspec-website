import type { Metadata } from "next";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { PaperArtifact } from "../components/PaperArtifact";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { HeroTrace } from "../components/HeroTrace";
import { Heading } from "../components/Heading";
import { JsonLd } from "../components/JsonLd";
import { PilotLamp } from "../components/PilotLamp";
import { TextLink } from "../components/TextLink";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Layers,
  LayoutList,
  NotebookPen,
  ShieldAlert,
  Workflow,
  XCircle,
} from "lucide-react";

const SITE_URL = "https://suspecframework.dev";
const overviewDescription =
  "A markdown workflow for turning requests into scoped agent work, review evidence, and saved findings.";
const overviewTitle = "What is Suspec? — specs, evidence, review";

export const metadata: Metadata = {
  title: overviewTitle,
  description: overviewDescription,
  openGraph: {
    title: overviewTitle,
    description: overviewDescription,
    type: "website",
    url: "/what-is-suspec/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-what-is-suspec.png",
        width: 1200,
        height: 630,
        alt: "What is Suspec? — a spec and review workflow",
      },
    ],
  },
  alternates: canonicalAlternates("/what-is-suspec/"),
};

const isList = [
  { text: "specs humans write and agents work from", icon: FileText },
  { text: "optional task packets for split work", icon: LayoutList },
  {
    text: "review packets with evidence per requirement",
    icon: NotebookPen,
  },
  {
    text: "findings that carry lessons forward",
    icon: CheckCircle,
  },
  { text: "markdown templates", icon: Layers },
  { text: "workspace conventions", icon: Workflow },
];

const isNotList = [
  "an agent or agent runtime",
  "a Jira/Linear replacement",
  "a code generator",
  "a replacement for PRs and CI",
  "a formal verification system",
  "a guarantee that code is correct",
  "permission to skip review",
];

const adjacent = [
  {
    product: "Coding agents",
    role: "execution",
    signal: "muted",
    examples: "Claude Code, Cursor, Copilot, …",
    does: "write the code",
    relation: "Suspec gives them scoped tasks and review records.",
  },
  {
    product: "Spec-driven workflows",
    role: "requirements",
    signal: "core",
    examples: "",
    does: "turn a written spec into an implementation",
    relation: "Suspec keeps requirements tied to checks and evidence.",
  },
  {
    product: "Issue trackers",
    role: "source",
    signal: "reference",
    examples: "Jira, Linear, GitHub Issues",
    does: "hold the backlog and the conversation",
    relation: "Tickets stay there. Suspec snapshots the work into files.",
  },
  {
    product: "Docs portals",
    role: "manual",
    signal: "reference",
    examples: "wikis, Notion, docs sites",
    does: "describe the system after the fact",
    relation: "A Suspec spec drives a change before it ships.",
  },
  {
    product: "Review tooling",
    role: "proof",
    signal: "evidence",
    examples: "PRs, CI, review bots",
    does: "check the merge",
    relation: "The review packet tells reviewers where to look.",
  },
  {
    product: "Refactoring tooling",
    role: "mechanical change",
    signal: "muted",
    examples: "codemods, OpenRewrite, …",
    does: "execute mechanical change",
    relation: "A change plan states what must survive and how to check it.",
  },
] satisfies Array<{
  product: string;
  role: string;
  signal: SignalRole;
  examples: string;
  does: string;
  relation: string;
}>;

const overviewDiagnosticCommand = "cat docs/01-what-is-suspec.md";

const overviewJumpLinks = [
  { label: "Boundaries", href: "#boundaries", signal: "muted" },
  { label: "Nearby tools", href: "#nearby-tools", signal: "reference" },
  { label: "Failure modes", href: "#failure-modes", signal: "change" },
  { label: "The loop", href: "#next-step", signal: "core" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

const overviewArtifactChain = [
  "Intake",
  "Spec",
  "Task",
  "Review",
  "Finding",
] as const;

const overviewAnswerFacts = [
  {
    label: "For",
    text: "Teams using coding agents on work that needs a reviewable trail.",
    signal: "reference",
  },
  {
    label: "Use when",
    text: "A request needs scoped requirements, bounded execution, and evidence.",
    signal: "core",
  },
  {
    label: "Records",
    text: "Specs, task packets, review packets, findings, and execution notes.",
    signal: "evidence",
  },
  {
    label: "Does not",
    text: "Run an agent, approve code, replace CI, or declare correctness.",
    signal: "change",
  },
] as const satisfies Array<{
  label: string;
  text: string;
  signal: SignalRole;
}>;

const boundarySteps = [
  {
    label: "01",
    title: "Tickets stay put",
    text: "Backlog and conversation remain in Jira, Linear, or GitHub Issues.",
    signal: "muted",
    icon: LayoutList,
  },
  {
    label: "02",
    title: "Suspec records the run",
    text: "Spec, task, review, and finding files keep the work inspectable.",
    signal: "core",
    icon: NotebookPen,
  },
  {
    label: "03",
    title: "Tools keep their jobs",
    text: "Agents write code. PRs, CI, and reviewers decide what ships.",
    signal: "muted",
    icon: Workflow,
  },
] as const;

const failureModes = [
  {
    mode: "Drift",
    looksLike: "the agent solves a problem, not the problem",
    answer: "write scope and a Do not change list",
  },
  {
    mode: "Ambiguous input",
    looksLike: "the request hides missing requirements",
    answer: "write one requirement per ID, with a check",
  },
  {
    mode: "Lost handoff",
    looksLike: "the plan lives only in chat",
    answer: "handoff through a bounded spec, or a task packet when split",
  },
  {
    mode: "Hallucinated completion",
    looksLike: "'done,' but nothing was checked",
    answer: "a Pass needs evidence",
  },
  {
    mode: "No resumable trail",
    looksLike: "the session ends mid-stride; the next one starts from zero",
    answer: "write a spec, record the run in its Execution, and a review packet",
  },
  {
    mode: "Repeated mistakes",
    looksLike: "the same class of bug returns every few sessions",
    answer: "save findings at Close",
  },
];

function BoundaryMap() {
  return (
    <ol className="boundary-map reveal grid gap-3 md:grid-cols-3">
      {boundarySteps.map((step, index) => (
        <li
          key={step.title}
          className={`boundary-step boundary-step-${step.signal} relative min-w-0`}
        >
          <div className="boundary-step-card panel-raised h-full">
            <div className="boundary-step-head">
              <HexBadge color={step.signal} className="boundary-step-icon">
                <step.icon className="h-4 w-4" aria-hidden="true" />
              </HexBadge>
              <div className="min-w-0">
                <span className="boundary-step-index">{step.label}</span>
                <h3 className="boundary-step-title">{step.title}</h3>
              </div>
              <PilotLamp color={step.signal} className="boundary-step-lamp" />
            </div>
            <p className="boundary-step-copy">
              {step.text}
            </p>
          </div>
          {index < boundarySteps.length - 1 ? (
            <ArrowRight
              className="text-signal-muted absolute -right-5 top-1/2 z-20 hidden h-5 w-5 -translate-y-1/2 opacity-70 md:block"
              aria-hidden="true"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export default function WhatIsSuspecPage() {
  const overviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/what-is-suspec/#about`,
    name: "What is Suspec?",
    url: `${SITE_URL}/what-is-suspec/`,
    description: overviewDescription,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Suspec",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      url: SITE_URL,
      description: overviewDescription,
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        name: "What Suspec is",
      },
      {
        "@type": "WebPageElement",
        name: "What Suspec is not",
      },
      {
        "@type": "WebPageElement",
        name: "Where Suspec sits",
      },
      {
        "@type": "WebPageElement",
        name: "Common failure modes Suspec helps make reviewable",
      },
      {
        "@type": "WebPageElement",
        name: "How Suspec differs from agent runtimes, issue trackers, CI, and review tools",
      },
      ...overviewAnswerFacts.map((fact) => ({
        "@type": "WebPageElement",
        name: `${fact.label}: ${fact.text}`,
      })),
    ],
  };

  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <JsonLd data={overviewJsonLd} />
      <Section className="ambient-header">
        <PageHero
          eyebrow="system overview"
          motif="overview"
          tone="core"
          title={
            <>
              What is{" "}
              <span className="text-suspec-yellow">Suspec?</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            A markdown workflow for turning requests into scoped agent work,
            review evidence, and saved findings.
          </p>
          <HeroTrace
            ariaLabel="Suspec artifact chain"
            items={[
              { label: "Intake", signal: "reference" },
              { label: "Spec", signal: "core" },
              { label: "Task", signal: "core" },
              { label: "Review", signal: "evidence" },
              { label: "Finding", signal: "reference" },
            ]}
          />
        </PageHero>
      </Section>

      <Section
        id="summary"
        register="01 / summary"
        registerTone="evidence"
        className="overview-summary-grid grid gap-4 lg:grid-cols-[1fr_0.9fr]"
      >
        <div className="overview-answer-panel panel-raised lg:col-span-2">
          <div className="overview-answer-copy">
            <p className="overview-answer-kicker">plain answer</p>
            <h2>What Suspec does</h2>
            <p>
              Suspec is the record around agent work: the request, the scope,
              the run, the evidence, and the lesson saved for next time.
            </p>
          </div>
          <dl className="overview-answer-list">
            {overviewAnswerFacts.map((fact) => (
              <div
                key={fact.label}
                className={`overview-answer-fact overview-answer-fact-${fact.signal}`}
              >
                <dt>{fact.label}</dt>
                <dd>{fact.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <nav
          className="overview-section-nav-shell overview-section-nav-inline lg:col-span-2"
          aria-label="What is Suspec page sections"
        >
          <div className="section-jump-nav">
            {overviewJumpLinks.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                data-color-role={item.signal}
                className={`section-jump-nav-link section-jump-nav-link-${item.signal} focus-ring group`}
              >
                <span className="section-jump-nav-index">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span className="section-jump-nav-label">{item.label}</span>
                <ArrowRight
                  className="motion-nudge-x h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </nav>
        <Panel brushed className="overview-terminal-shell order-1 mx-auto h-full max-w-3xl p-2">
          <TerminalWindow
            title="diagnostics"
            copyText={overviewDiagnosticCommand}
            copyLabel="Copy command"
            className="overview-terminal mx-auto h-full max-w-3xl"
            contentClassName="overview-terminal-content"
          >
            <p className="text-concrete-400">
              <span className="text-suspec-yellow">$</span>{" "}
              {overviewDiagnosticCommand}
            </p>
            <p className="mt-2 text-concrete-100">
              Suspec turns requests into specs, specs into tasks, and task
              output into review evidence.
            </p>
            <div className={`overview-check-grid mt-3 ${signalRoles.evidence.text}`}>
              <p>agent does the typing</p>
              <p>human makes the call</p>
              <p>claims need evidence</p>
              <p>plain markdown</p>
            </div>
            <p className="mt-2 text-concrete-400">
              <span className="text-suspec-yellow">$</span> _
            </p>
          </TerminalWindow>
        </Panel>
        <PaperArtifact
          label="example"
          title="artifact chain"
          meta="record sequence"
          className="overview-paper-artifact order-2"
        >
          <ol className="overview-artifact-chain" aria-label="Artifact chain">
            {overviewArtifactChain.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="overview-artifact-lines">
            <p>Intent becomes a requirement.</p>
            <p className="text-pencil">The task bounds what may change.</p>
            <p>The run pastes evidence.</p>
            <p className="text-pencil">The review routes exceptions.</p>
            <p>The finding preserves what the next task should know.</p>
          </div>
        </PaperArtifact>
      </Section>

      <Section
        id="boundaries"
        register="02 / boundaries"
        registerTone="muted"
        className="reveal grid gap-12 md:grid-cols-2"
      >
        <Panel variant="inset" className="h-full p-5 sm:p-6">
          <div className={`section-kicker ${signalRoles.evidence.sectionKicker}`}>
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is</span>
          </div>
          <Heading className="mt-3">What Suspec is</Heading>
          <ul className="overview-is-list mt-6 space-y-4">
            {isList.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  className="overview-is-item flex items-start gap-4 text-concrete-100"
                >
                  <HexBadge color="evidence" className="overview-is-icon">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <span className="pt-3">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel variant="inset" className="h-full p-5 sm:p-6">
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <XCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is not</span>
          </div>
          <Heading className="mt-3">What Suspec is not</Heading>
          <ul className="mt-5 divide-y divide-panel-border/70">
            {isNotList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 py-3 text-concrete-400 first:pt-0 last:pb-0"
              >
                <XCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-signal-change"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </Section>

      <Section
        id="nearby-tools"
        register="03 / nearby tools"
        registerTone="reference"
        className="section-flow"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <DroneIcon className="h-4 w-4" />
            <span>nearby tools</span>
          </div>
          <Heading className="mt-3">Where Suspec sits</Heading>
          <p className="mt-4 text-concrete-400">
            Suspec is the file layer between the request, the agent, and the
            review. The surrounding tools keep their jobs.
          </p>
        </div>
        <BoundaryMap />
        <ul className="overview-relation-grid reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adjacent.map((row, index) => (
            <li key={row.product}>
              <Card
                signal={row.signal}
                className={`relation-card relation-card-${row.signal} group h-full border-panel-border ${signalRoles[row.signal].hoverBorder}`}
              >
                <div className="relation-card-head">
                  <div>
                    <div className="relation-card-meta">
                      <p className="relation-card-index">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="relation-card-role">{row.role}</p>
                    </div>
                    <p className="relation-card-title">
                      {row.product}
                    </p>
                    {row.examples && (
                      <p className="relation-card-examples">
                        {row.examples}
                      </p>
                    )}
                  </div>
                  <PilotLamp color={row.signal} className="shrink-0" />
                </div>
                <dl className="relation-card-body">
                  <div>
                    <dt>Their job</dt>
                    <dd>{row.does}</dd>
                  </div>
                  <div>
                    <dt>Suspec job</dt>
                    <dd>{row.relation}</dd>
                  </div>
                </dl>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="failure-modes"
        register="04 / failure modes"
        registerTone="change"
        className="section-flow"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            <span>where handoffs fail</span>
          </div>
          <Heading className="mt-3">
            Common failure modes
          </Heading>
          <p className="mt-4 text-concrete-400">
            These are the places chat-only agent work tends to lose the plot.
            Suspec makes the missing record visible before review has to
            reconstruct the run from chat.
          </p>
        </div>
        <ul className="overview-failure-grid reveal grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {failureModes.map((fm) => (
            <li key={fm.mode}>
              <Card
                signal="change"
                screws
                className={`overview-failure-card group h-full border-panel-border ${signalRoles.change.hoverBorder}`}
              >
                <div className="flex items-start gap-3">
                  <HexBadge color="change">
                    <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                  </HexBadge>
                  <div>
                    <Heading as="h3" size="lg" className="mt-0.5">
                      {fm.mode}
                    </Heading>
                  </div>
                </div>
                <p className="mt-4 text-sm text-concrete-400">{fm.looksLike}</p>
                <p className="mt-3 text-sm text-concrete-100">
                  <span className="text-signal-change">&gt;</span> {fm.answer}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="next-step" register="05 / next step" registerTone="core">
        <Card
          signal="core"
          screws
          contentClassName="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
        >
          <div>
            <Heading>See how it actually runs</Heading>
            <p className="mt-2 text-concrete-400">
              Six steps, each producing a file the next one reads. That is the
              framework: no runtime, no automatic decision.
            </p>
            <p className="mt-4 text-sm text-concrete-400">
              Source:{" "}
              <TextLink
                href="/docs/01-what-is-suspec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read docs/01-what-is-suspec.md (opens in new tab)"
              >
                docs/01-what-is-suspec.md
              </TextLink>
            </p>
          </div>
          <nav className="md:min-w-64" aria-label="What is Suspec next pages">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-signal-core">
              next records
            </p>
            <ul className="mt-2 grid gap-1">
              <li>
                <TextLink
                  href="/the-loop/"
                  className="gap-2 text-base font-semibold"
                  touchTarget
                >
                  See the loop{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              </li>
              <li>
                <TextLink href="/get-started/" className="gap-2" touchTarget>
                  Set up a workspace
                </TextLink>
              </li>
              <li>
                <TextLink href="/cli/" className="gap-2" touchTarget>
                  Read the CLI page
                </TextLink>
              </li>
              <li>
                <TextLink href="/mcp/" className="gap-2" touchTarget>
                  Read the MCP page
                </TextLink>
              </li>
            </ul>
          </nav>
        </Card>
      </Section>
    </div>
  );
}
