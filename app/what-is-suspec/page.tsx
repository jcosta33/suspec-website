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
  "A methodology for structuring work with coding agents. Skills implement lean specs, evidence-backed reviews, and durable findings.";
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
        alt: "What is Suspec? — a spec and review methodology shipped as skills",
      },
    ],
  },
  alternates: canonicalAlternates("/what-is-suspec/"),
};

const isList = [
  {
    label: "skills",
    text: "skills — plain Markdown for any capable harness",
    icon: Layers,
  },
  {
    label: "spec",
    text: "lean specs sized to the work — down to one inline line, with no file",
    icon: FileText,
  },
  {
    label: "task",
    text: "task packets, cut only when one spec splits into parallel slices",
    icon: LayoutList,
  },
  {
    label: "review",
    text: "review packets that reconcile evidence against the spec, one requirement at a time",
    icon: NotebookPen,
  },
  {
    label: "check",
    text: "a deterministic checker — suspec check — over the artifacts it receives",
    icon: CheckCircle,
  },
  {
    label: "finding",
    text: "durable lessons saved as native harness memories",
    icon: Workflow,
  },
];

const isNotList = [
  { label: "runtime", text: "an agent or agent runtime" },
  {
    label: "planner",
    text: "a replacement for your harness's plan mode — it coexists with it",
  },
  { label: "tracker", text: "a Jira/Linear replacement" },
  { label: "gate", text: "a replacement for PRs and CI" },
  { label: "proof", text: "a formal verification system" },
  {
    label: "verdict",
    text: "a correctness certificate — the human owns the review result",
  },
  { label: "shortcut", text: "permission to skip review" },
];

const adjacent = [
  {
    product: "Coding agents",
    role: "execution",
    signal: "muted",
    examples: "Claude Code, Cursor, Copilot, …",
    does: "write the code",
    relation: "Suspec shapes the work around it: spec, review, findings. The agent still has to type.",
  },
  {
    product: "Native plan mode",
    role: "planning",
    signal: "core",
    examples: "your harness's own planner",
    does: "sketch the approach inside a session",
    relation: "Suspec coexists — never modifies, replaces, or races it.",
  },
  {
    product: "Issue trackers",
    role: "source",
    signal: "reference",
    examples: "Jira, Linear, GitHub Issues",
    does: "hold the backlog and the conversation",
    relation: "Tickets stay there. The spec names the source directly.",
  },
  {
    product: "Docs portals",
    role: "manual",
    signal: "reference",
    examples: "wikis, Notion, docs sites",
    does: "describe the system after the fact",
    relation: "A Suspec spec drives a change before it ships. The wiki can wait.",
  },
  {
    product: "Review tooling",
    role: "proof",
    signal: "evidence",
    examples: "PRs, CI, review bots",
    does: "check the merge",
    relation: "The review packet tells reviewers where to look; discussion still lives on the PR.",
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
  { label: "Honesty floor", href: "#honesty-floor", signal: "evidence" },
  { label: "Nearby tools", href: "#nearby-tools", signal: "reference" },
  { label: "Failure modes", href: "#failure-modes", signal: "change" },
  { label: "Who shouldn't", href: "#who-should-not", signal: "muted" },
  { label: "The loop", href: "#next-step", signal: "core" },
] as const satisfies Array<{
  label: string;
  href: string;
  signal: SignalRole;
}>;

const overviewRigorLadder = [
  "Trivial fix — keys only: one inline line, zero files",
  "Feature — a lean spec",
  "Large work — more scaffold: inventory, change plan, tasks",
] as const;

const overviewAnswerFacts = [
  {
    label: "For",
    text: "Coding agents pointed at work that needs a reviewable trail.",
    signal: "reference",
  },
  {
    label: "Use when",
    text: "The diff outgrows your attention, or the work needs a later handoff.",
    signal: "core",
  },
  {
    label: "Records",
    text: "Specs, task packets, reviews, findings. Temporary files beside your harness.",
    signal: "evidence",
  },
  {
    label: "Does not",
    text: "Run agents, replace your tools, approve code, or certify correctness.",
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
    title: "Your agent writes the code",
    text: "Claude Code, Cursor, whichever. Suspec never replaces it — or your harness's plan mode.",
    signal: "muted",
    icon: LayoutList,
  },
  {
    label: "02",
    title: "Suspec shapes the work",
    text: "Skills produce the spec, task packets when needed, and the review packet — beside the harness's own artifacts, named by explicit path.",
    signal: "core",
    icon: NotebookPen,
  },
  {
    label: "03",
    title: "Durable value moves out",
    text: "A decision becomes an ADR, behavior becomes tests, a lesson becomes a native memory, discussion lives on the PR.",
    signal: "muted",
    icon: Workflow,
  },
] as const;

const honestyFloor = [
  {
    id: "C012",
    name: "Coverage",
    text: "Every in-scope requirement has a coverage row — nothing gets dropped silently.",
  },
  {
    id: "C013",
    name: "Command match",
    text: "The recorded evidence ran the command the spec's Verify with: line actually named.",
  },
  {
    id: "C016",
    name: "Pass needs evidence",
    text: "A Pass with an empty evidence cell is a structural contradiction — blocking.",
  },
  {
    id: "C020",
    name: "Reference resolves",
    text: "The review's task reference resolves to the packet it is checked against — blocking.",
  },
] as const;

const honestyFloorTerminalLines = [
  "$ suspec check review.md --spec spec.md",
  "C016 pass-needs-evidence: AC-007 is marked Pass with an empty evidence cell [blocking]",
  "$ echo $?",
  "2",
].join("\n");

const failureModes = [
  {
    mode: "Drift",
    looksLike: "the agent solves a problem, not the problem",
    answer: "a lean spec with requirements and non-goals",
  },
  {
    mode: "Ambiguous input",
    looksLike: "the request hides missing requirements",
    answer: "one requirement per AC id, each with a Verify with: line",
  },
  {
    mode: "Lost handoff",
    looksLike: "the plan lives only in chat",
    answer: "handoff by explicit path — the spec, or a task packet when split",
  },
  {
    mode: "Hallucinated completion",
    looksLike: "'done,' but nothing was checked",
    answer: "a Pass needs evidence; an empty cell is Unverified, never Pass",
  },
  {
    mode: "No resumable trail",
    looksLike: "the session ends mid-stride; the next one starts from zero",
    answer: "the spec records the run; the review packet reconciles it",
  },
  {
    mode: "Repeated mistakes",
    looksLike: "the same class of bug returns every few sessions",
    answer: "durable findings become native harness memories",
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
        name: "The honesty floor",
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
        name: "Who should not use Suspec",
      },
      ...overviewAnswerFacts.map((fact) => ({
        "@type": "WebPageElement",
        name: `${fact.label}: ${fact.text}`,
      })),
    ],
  };

  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
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
            {overviewDescription}
          </p>
          <HeroTrace
            ariaLabel="Suspec loop"
            items={[
              { label: "Intent", signal: "reference" },
              { label: "Spec", signal: "core" },
              { label: "Implement", signal: "core" },
              { label: "Review", signal: "evidence" },
              { label: "Check", signal: "evidence" },
              { label: "Findings", signal: "reference" },
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
              Skills shape the spec, task split, review packet, and findings.
              Your agent writes the code; Suspec keeps the work reviewable.
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
                aria-label={`Jump to ${item.label} section`}
                data-color-role={item.signal}
                className={`section-jump-nav-link section-jump-nav-link-${item.signal} focus-ring group`}
              >
                <span className="section-jump-nav-index" aria-hidden="true">
                  {String(index + 2).padStart(2, "0")}{" "}
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
              Suspec turns intent into a spec, the spec into an implementation
              contract, and the result into an evidence-backed review.
            </p>
            <div className={`overview-check-grid mt-3 ${signalRoles.evidence.text}`}>
              <p>agent does the typing</p>
              <p>human owns the review result</p>
              <p>every Pass carries evidence</p>
              <p>plain markdown, any agent</p>
            </div>
            <p className="mt-2 text-concrete-400">
              <span className="text-suspec-yellow">$</span> _
            </p>
          </TerminalWindow>
        </Panel>
        <PaperArtifact
          label="note"
          title="proportional rigor"
          meta="least structure that changes execution"
          className="overview-paper-artifact order-2"
        >
          <ol className="overview-artifact-chain" aria-label="Proportional rigor ladder">
            {overviewRigorLadder.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="overview-artifact-lines">
            <p>The keys — intent, review, findings — show up on virtually every change; the scaffold (spec, tasks, inventory, change plan, the checker) is what the work pulls in when it earns it.</p>
            <p className="text-pencil">Most changes stop at the inline path: state the fix in one line, implement, paste the output, done.</p>
            <p>A feature earns a lean spec: AC ids, Verify with: lines, non-goals. Large work extends the spec rather than padding it.</p>
            <p className="text-pencil">How the work arrived never sets the ceremony. The work does.</p>
          </div>
        </PaperArtifact>
      </Section>

      <Section
        id="boundaries"
        register="02 / boundaries"
        registerTone="muted"
        className="reveal grid gap-12 md:grid-cols-2"
      >
        <Panel
          variant="inset"
          className="overview-boundary-panel overview-boundary-panel-is h-full p-5 sm:p-6"
        >
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
                  <span className="overview-boundary-copy grid min-w-0 gap-1 pt-3 leading-snug">
                    <span className="overview-boundary-label block">
                      {item.label}:{" "}
                    </span>
                    <span>{item.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel
          variant="inset"
          className="overview-boundary-panel overview-boundary-panel-not h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <XCircle className="h-4 w-4" aria-hidden="true" />
            <span>what it is not</span>
          </div>
          <Heading className="mt-3">What Suspec is not</Heading>
          <ul className="overview-not-list mt-5 divide-y divide-panel-border/70">
            {isNotList.map((item) => (
              <li
                key={item.text}
                className="overview-not-item flex items-start gap-3 py-3 text-concrete-400 first:pt-0 last:pb-0"
              >
                <XCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-signal-change"
                  aria-hidden="true"
                />
                <span className="overview-boundary-copy grid min-w-0 gap-1 leading-snug">
                  <span className="overview-boundary-label block">
                    {item.label}:{" "}
                  </span>
                  <span>{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </Section>

      <Section
        id="honesty-floor"
        register="03 / honesty floor"
        registerTone="evidence"
        className="section-flow"
      >
        <div className="max-w-2xl">
          <div className={`section-kicker ${signalRoles.evidence.sectionKicker}`}>
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            <span>the honesty floor</span>
          </div>
          <Heading className="mt-3">
            The claims a reviewer cannot fake
          </Heading>
          <p className="mt-4 text-concrete-400">
            Review claims are where agent work goes wrong quietly. The
            deterministic checker — <code>suspec check</code> — pins the
            load-bearing facts at zero model cost: facts and exit codes
            (0 clean, 1 warning, 2 blocking), no model in the loop, no review
            result rendered. Every step keeps a by-hand path; no step requires
            a tool.
          </p>
        </div>
        <div className="reveal grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ul className="grid gap-6 sm:grid-cols-2">
            {honestyFloor.map((check) => (
              <li key={check.id}>
                <Card
                  signal="evidence"
                  className={`group h-full border-panel-border ${signalRoles.evidence.hoverBorder}`}
                >
                  <div className="flex items-start gap-3">
                    <HexBadge color="evidence">
                      <CheckCircle className="h-5 w-5" aria-hidden="true" />
                    </HexBadge>
                    <div>
                      <Heading as="h3" size="lg" className="mt-0.5">
                        {check.name}
                      </Heading>
                      <p className={`font-mono text-[0.625rem] uppercase tracking-[0.16em] ${signalRoles.evidence.text}`}>
                        {check.id}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-concrete-400">{check.text}</p>
                </Card>
              </li>
            ))}
          </ul>
          <Panel brushed className="p-2">
            <TerminalWindow
              title="the floor in action"
              ariaLabel="suspec check catching an unevidenced Pass"
              copyText={honestyFloorTerminalLines}
            >
              <p className="text-concrete-100">
                <span className="text-suspec-yellow">$ </span>
                suspec check review.md --spec spec.md
              </p>
              <p className="text-concrete-400">
                C016 pass-needs-evidence: AC-007 is marked Pass with an empty
                evidence cell [blocking]
              </p>
              <p className="mt-2 text-concrete-100">
                <span className="text-suspec-yellow">$ </span>
                echo $?
              </p>
              <p className="text-concrete-400">2</p>
              <p className="mt-3 text-concrete-400">
                Plus per-artifact lint on specs, change plans, and review
                packets. Add <span className="text-concrete-100">--task</span>{" "}
                when the review names one; <span className="text-concrete-100">--json</span>{" "}
                on every invocation.
              </p>
            </TerminalWindow>
          </Panel>
        </div>
      </Section>

      <Section
        id="nearby-tools"
        register="04 / nearby tools"
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
            Suspec is the discipline between the request, the agent, and the
            review. The surrounding tools keep their jobs. Everyone gets to
            keep their own tool.
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
        register="05 / failure modes"
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
            These are the places chat-only agent work tends to drop context.
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

      <Section
        id="who-should-not"
        register="06 / straight talk"
        registerTone="muted"
        className="reveal grid gap-12 md:grid-cols-2"
      >
        <Panel
          variant="inset"
          className="h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.core.sectionKicker}`}>
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>code is king</span>
          </div>
          <Heading className="mt-3">Artifacts are transient</Heading>
          <p className="mt-4 text-concrete-400">
            Suspec artifacts are working files. They live beside your
            harness&apos;s own artifacts — its plans, notes, and memories, in
            a folder named after the repo being worked on — and they are never
            committed to the repos you work on unless the project&apos;s own
            governance says otherwise.
          </p>
          <p className="mt-3 text-concrete-400">
            Nothing durable is supposed to live in them: a decision becomes an
            ADR, behavior becomes tests, a lesson becomes a native harness
            memory, the discussion lives on the PR. The durable record stays
            in the layers that already own it.
          </p>
        </Panel>

        <Panel
          variant="inset"
          className="h-full p-5 sm:p-6"
        >
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <XCircle className="h-4 w-4" aria-hidden="true" />
            <span>who should not use it</span>
          </div>
          <Heading className="mt-3">Maybe you don&apos;t need this</Heading>
          <p className="mt-4 text-concrete-400">
            If you work alone, in a codebase you know, on changes small enough
            to read whole — native plan mode, an AGENTS.md, and your test
            suite already cover most of this, at zero ceremony. On tractable,
            clearly-specified work a capable agent tends to reach the same
            result with or without the structure.
          </p>
          <p className="mt-3 text-concrete-400">
            Suspec starts paying when the diff outgrows your attention, when
            more than one person or agent touches the work, or when someone
            must later reconstruct what was intended and what was proven.
            Until one of those is true, don&apos;t adopt it.
          </p>
        </Panel>
      </Section>

      <Section id="next-step" register="07 / next step" registerTone="core">
        <Card
          signal="core"
          screws
          className="overview-next-card"
          contentClassName="overview-next-content grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
        >
          <div className="overview-next-copy">
            <Heading>See how it actually runs</Heading>
            <p className="mt-2 text-concrete-400">
            The loop is plain: intent, spec, implement, review, check,
            findings. Records appear when the work earns them and travel by
            explicit path. No runtime; no automatic decision.
            </p>
            <p className="overview-next-source mt-4 text-sm text-concrete-400">
              Source:{" "}
              <TextLink
                href="/docs/01-what-is-suspec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read docs/01-what-is-suspec.md (opens in new tab)"
                className="overview-source-link"
              >
                docs/01-what-is-suspec.md
              </TextLink>
            </p>
          </div>
          <nav
            className="overview-next-nav md:min-w-64"
            aria-label="Where to read next"
          >
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-signal-core">
              next records
            </p>
            <ul className="overview-next-links mt-2 grid gap-1">
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
                  Install the skills
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
      <JsonLd data={overviewJsonLd} />
    </div>
  );
}
