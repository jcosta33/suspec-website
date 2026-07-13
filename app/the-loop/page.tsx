import type { Metadata } from "next";
import {
  Inbox,
  FileText,
  ListChecks,
  Terminal,
  ScanEye,
  NotebookPen,
  Split,
  ArrowRight,
} from "lucide-react";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { GiltBand } from "../components/GiltBand";
import { HexBadge } from "../components/HexBadge";
import { PageHero } from "../components/PageHero";
import { HeroTrace } from "../components/HeroTrace";
import { Heading } from "../components/Heading";
import { PaperArtifact } from "../components/PaperArtifact";
import { LoopDiagram } from "../components/LoopDiagram";
import { TextLink } from "../components/TextLink";
import { JsonLd } from "../components/JsonLd";
import { signalRoles, type SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const stepIcons = [Inbox, FileText, Terminal, ScanEye, ListChecks, NotebookPen];
const loopDescription =
  "The Suspec loop: three keys — intent, review, findings — on virtually every change, and the full intent → spec → implement → review → check → findings pass when the change earns a contract.";
const loopTitle = "The Suspec loop — spec, implement, review, check";

export const metadata: Metadata = {
  title: loopTitle,
  description: loopDescription,
  openGraph: {
    title: loopTitle,
    description: loopDescription,
    type: "website",
    url: "/the-loop/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-the-loop.png",
        width: 1200,
        height: 630,
        alt: "The Suspec loop — Intent, Spec, Implement, Review, Check, Findings",
      },
    ],
  },
  alternates: canonicalAlternates("/the-loop/"),
};

const trivialPathLines = [
  "Fix: expired refresh tokens must redirect to /login, not 500.",
  "Verify with: pnpm test:run auth-refresh-expired-token",
].join("\n");

const steps = [
  {
    number: "01",
    name: "Intent",
    signal: "core",
    part: "key",
    output: "Source named, or an intake note",
    handoff: "Spec",
    body: "Every change starts here — often as one sentence folded inline. Name where the work came from — a ticket, a thread, your own idea. Capture the ask verbatim as an intake note only when you want the original preserved; otherwise the spec names its source directly (a URL, an issue, or self). How you entered the work never sets the ceremony level. The work does.",
    example: {
      title: "~/.claude/projects/acme-site/intake.md",
      lines: [
        {
          prompt: false,
          text: "## Intake — Add dark mode to marketing site",
        },
        { prompt: false, text: "" },
        { prompt: false, text: "- Requested by: design" },
        { prompt: false, text: "- Scope: homepage and global shell only" },
        { prompt: false, text: "- Deadline: launch week" },
      ],
    },
  },
  {
    number: "02",
    name: "Spec",
    signal: "core",
    part: "scaffold",
    output: "Requirements with Verify with: lines",
    handoff: "Implement",
    body: "The form intent graduates into when the work earns structure. The authoring skill turns intent into a lean spec: requirements with AC-NNN ids and Verify with: lines, non-goals, open questions. Place the file beside your harness's own artifacts and carry its full path forward. Lint it: suspec check spec.md.",
    example: {
      title: "~/.claude/projects/acme-site/spec.md",
      lines: [
        {
          prompt: false,
          text: "### AC-003 — Global shell includes nav and footer",
        },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "A Shell component renders on every route via app/layout.tsx.",
        },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "- Nav: logo, links, mobile hamburger below lg.",
        },
        { prompt: false, text: "- Footer: copyright, links, colophon line." },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "Verify with: npm run build passes; every generated page contains",
        },
        { prompt: false, text: "exactly one <nav> and one <footer>." },
      ],
    },
  },
  {
    number: "03",
    name: "Implement",
    signal: "core",
    output: "Real pasted output per requirement",
    handoff: "Review",
    body: "The implementer — your agent, or you — works from the spec by explicit path, runs every verify command, and pastes real output into the spec's ## Execution section. 'Tests passed' without output is not evidence.",
    example: {
      title: "~/.claude/projects/acme-site/spec.md",
      lines: [
        { prompt: false, text: "## Execution" },
        { prompt: false, text: "" },
        { prompt: true, text: "npm run build" },
        { prompt: false, text: "✓ Compiled successfully" },
        { prompt: false, text: "Route (app): /, /kitchen-sink" },
        { prompt: false, text: "" },
        { prompt: true, text: "grep -o '<nav>' out/index.html | wc -l" },
        { prompt: false, text: "1" },
      ],
    },
  },
  {
    number: "04",
    name: "Review",
    signal: "core",
    part: "key",
    output: "Review packet",
    handoff: "Check",
    body: "An independent reviewer — never the implementer — reconciles the result against the spec: one coverage row per scoped requirement, evidence per row, exceptions routed to human attention. On the trivial path this is the owner reading the pasted output, not a separate step.",
    example: {
      title: "~/.claude/projects/acme-site/review.md",
      lines: [
        {
          prompt: false,
          text: "| AC    | Result      | Evidence                  |",
        },
        {
          prompt: false,
          text: "|-------|-------------|---------------------------|",
        },
        {
          prompt: false,
          text: "| AC-003| Pass        | 1 nav, 1 footer found     |",
        },
        {
          prompt: false,
          text: "| AC-009| Unverified  | manual resize pending     |",
        },
      ],
    },
  },
  {
    number: "05",
    name: "Check",
    signal: "core",
    part: "scaffold",
    output: "Facts and exit codes",
    handoff: "Findings",
    body: "The deterministic floor, pulled in when the work earns it: coverage complete, commands match, every Pass evidenced, references resolve. Exit codes: 0 clean, 1 warning, 2 blocking. The human owns the review result; the check owns the facts. Every step keeps a by-hand path — no step requires a tool.",
    example: {
      title: "suspec check",
      lines: [
        { prompt: true, text: "suspec check review.md --spec spec.md" },
        {
          prompt: false,
          text: "C016 pass-needs-evidence: AC-007 is marked Pass with an",
        },
        { prompt: false, text: "empty evidence cell [blocking]" },
        { prompt: false, text: "" },
        { prompt: true, text: "echo $?" },
        { prompt: false, text: "2" },
      ],
    },
  },
  {
    number: "06",
    name: "Findings",
    signal: "core",
    part: "key",
    output: "Native harness memories",
    handoff: "Next change",
    body: "Ephemeral findings ride the review packet and die with it. A durable lesson becomes a native harness memory; a decision becomes an ADR; behavior becomes tests; the discussion lives on the PR. Artifacts are transient — code stays king.",
    example: {
      title: "CLAUDE.md (native memory)",
      lines: [
        { prompt: false, text: "## Lessons" },
        { prompt: false, text: "" },
        {
          prompt: false,
          text: "- Tailwind v4 custom keyframes: use plain CSS classes rather",
        },
        {
          prompt: false,
          text: "  than escaped utility prefixes — PostCSS parse errors",
        },
        { prompt: false, text: "  otherwise." },
      ],
    },
  },
] satisfies Array<{
  number: string;
  name: string;
  signal: SignalRole;
  part?: "key" | "scaffold";
  output: string;
  handoff: string;
  body: string;
  example: {
    title: string;
    lines: Array<{ prompt: boolean; text: string }>;
  };
}>;

const taskExample = {
  title: "~/.claude/projects/acme-site/task-shell.md",
  lines: [
    { prompt: false, text: "## Task — shell slice" },
    { prompt: false, text: "" },
    { prompt: false, text: "Scope: implement Shell component per AC-003." },
    { prompt: false, text: "Do not change: homepage content, analytics." },
    { prompt: false, text: "Verify:" },
    { prompt: false, text: "- npm run build passes" },
    { prompt: false, text: "- grep finds 1 <nav> and 1 <footer> per page" },
  ],
};

const commonPaths = [
  {
    work: "Trivial fix",
    path: "one-line inline spec → implement → verify → done",
  },
  {
    work: "Small feature",
    path: "spec → implement → review → check",
  },
  {
    work: "Bug fix against an existing spec",
    path: "amend the spec → implement → review → check",
  },
  {
    work: "Brownfield change",
    path: "inventory → spec → implement → review → check",
  },
  {
    work: "Migration or rewrite",
    path: "inventory → spec → change plan → wave tasks → reviews",
  },
  {
    work: "PR that already exists",
    path: "write the acceptance bar as a spec → review against it",
  },
] as const;

const dontSkip = [
  "verification output — real, pasted, per requirement",
  "independent review — a non-implementer judges it; the formal packet scales with risk",
  "evidence for every Pass — empty evidence means Unverified, never Pass",
  "a visible record of blocked or unverified work",
] as const;

export default function TheLoopPage() {
  const loopJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/the-loop/#webpage`,
    name: "The Suspec loop",
    url: `${SITE_URL}/the-loop/`,
    description: metadata.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      name: "Suspec loop steps",
      itemListElement: steps.map((step, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: step.name,
        url: `${SITE_URL}/the-loop/#${step.name.toLowerCase()}`,
        description: `${step.output}; hands off to ${step.handoff}. ${
          step.part === "key"
            ? "One of the three keys — present on virtually every change."
            : step.part === "scaffold"
              ? "Scaffold — pulled in when the work earns it."
              : "The work the loop serves."
        }`,
      })),
    },
  };

  return (
    <div className="flex flex-col gap-12 py-14 sm:gap-16 sm:py-16">
      <Section className="ambient-header">
        <PageHero
          eyebrow="workflow / six steps"
          motif="loop"
          title={
            <>
              The <span className="text-suspec-yellow">loop</span>
            </>
          }
        >
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Most changes need one line, not a file. When the diff earns a
            contract: intent → spec → implement → review → check → findings.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-concrete-400">
            Three of the six are the keys — intent, review, findings — present
            on virtually every change, at whatever weight it earns. The rest
            is scaffold the work pulls in.
          </p>
          <HeroTrace
            ariaLabel="Suspec loop trace"
            items={steps.map((step) => ({
              label: step.name,
              signal: "core",
            }))}
          />
        </PageHero>
      </Section>

      <Section
        id="trivial"
        register="01 / the trivial path"
        registerTone="evidence"
        className="reveal grid gap-8 lg:grid-cols-2 lg:items-center"
      >
        <div>
          <div className={`section-kicker ${signalRoles.evidence.sectionKicker}`}>
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>the trivial path first</span>
          </div>
          <Heading className="mt-3">Most changes stop here</Heading>
          <p className="mt-4 text-concrete-400">
            For a trivial fix the whole spec is one line, stated inline — in
            the conversation, not in a file. Implement, run the verify
            command, paste the output. Done. No file, no packet, no check run
            — the keys at their lightest, zero scaffold.
          </p>
          <p className="mt-3 text-concrete-400">
            Proportional rigor means the scaffold below exists for the work
            that earns it — never as a toll on the work that doesn&apos;t.
          </p>
        </div>
        <Panel brushed className="p-2">
          <TerminalWindow
            title="inline spec — the whole thing"
            ariaLabel="A one-line inline spec"
            copyText={trivialPathLines}
          >
            <p className="text-concrete-100">
              Fix: expired refresh tokens must redirect to /login, not 500.
            </p>
            <p className="text-concrete-100">
              Verify with: pnpm test:run auth-refresh-expired-token
            </p>
            <p className="mt-3 text-concrete-400">
              Implement it, run the command, paste the real output. That is
              the entire ceremony.
            </p>
          </TerminalWindow>
        </Panel>
      </Section>

      <Section
        register="02 / seal map"
        registerTone="core"
        className="loop-seal-section grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
      >
        <div className="loop-ledger-panel panel-raised lg:col-span-2">
          <div className="loop-ledger-copy">
            <p className="loop-ledger-kicker">loop ledger</p>
            <h2>Records between steps</h2>
            <p>
              When the work earns a record, the next step reads it by explicit
              full path — beside your harness&apos;s own artifacts, never
              committed to the repo you work on.
            </p>
          </div>
          <ol className="loop-ledger-list" aria-label="Suspec loop handoffs">
            {steps.map((step) => (
              <li key={step.name} className="loop-ledger-item">
                <a href={`#${step.name.toLowerCase()}`}>
                  <span className="loop-ledger-number">{step.number}</span>
                  <span className="loop-ledger-body">
                    <span className="loop-ledger-title">
                      {step.name}
                      {step.part ? (
                        <span className="loop-ledger-status">{step.part}</span>
                      ) : null}
                    </span>
                    <span className="loop-ledger-meta">
                      <span>{step.output}</span>
                      <span aria-hidden="true">→</span>
                      <span>{step.handoff}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="contents lg:order-none lg:grid lg:content-start lg:gap-4">
          <div className="order-2 lg:order-none">
            <PaperArtifact
              label="note"
              title="the keys"
              meta="Intent · Review · Findings"
            >
              <p>
                The parts on virtually every change, at whatever weight it
                earns: intent stated, evidence reconciled, lessons kept — as
                native harness memories.
              </p>
            </PaperArtifact>
          </div>
          <Panel
            variant="inset"
            className="order-3 p-5 lg:order-none"
          >
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-suspec-yellow">
              the scaffold
            </p>
            <p className="mt-3 text-sm text-concrete-400">
              What Suspec erects around the keys when the work earns it —
              never a station to pass through.
            </p>
            <ul className="mt-4 divide-y divide-panel-border/70 text-sm text-concrete-400">
              <li className="py-3 first:pt-0">
                <span className="font-semibold text-concrete-100">
                  <a href="#task">Task</a>
                </span>{" "}
                — cut only when one spec splits into parallel slices.
              </li>
              <li className="py-3">
                <span className="font-semibold text-concrete-100">
                  Inventory
                </span>{" "}
                maps existing code before brownfield work.
              </li>
              <li className="py-3">
                <span className="font-semibold text-concrete-100">
                  Change plan
                </span>{" "}
                records what must survive a migration or rewrite.
              </li>
              <li className="py-3 last:pb-0">
                <span className="font-semibold text-concrete-100">
                  Checker
                </span>{" "}
                — <code>suspec check</code>, the deterministic floor under the
                review.
              </li>
            </ul>
          </Panel>
        </div>
        <div className="order-1 lg:order-none">
          <LoopDiagram linkSteps />
        </div>
      </Section>

      <GiltBand height="sm" />

      <Section
        register="03 / operating steps"
        registerTone="core"
        className="section-flow section-flow-spacious"
      >
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <article
              key={step.name}
              id={step.name.toLowerCase()}
              className={`loop-operating-step loop-operating-step-${step.signal} reveal relative grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-start`}
            >
              <div className="loop-operating-copy relative">
                {index < steps.length - 1 && (
                  <div
                    className="loop-operating-rail absolute left-[1.75rem] top-20 hidden h-[calc(100%+4rem)] w-px lg:block"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-start gap-4">
                  <HexBadge color={step.signal}>
                    <span
                      className={`font-mono text-xs font-bold ${signalRoles[step.signal].text}`}
                    >
                      {step.number}
                    </span>
                  </HexBadge>
                  <div>
                    <div className="loop-operating-title-row flex items-center gap-2">
                      <Icon
                        className={`h-5 w-5 ${signalRoles[step.signal].text}`}
                        aria-hidden="true"
                      />
                      <Heading>{step.name}</Heading>
                      {step.part && (
                        <span className="loop-operating-optional font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
                          {step.part}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-concrete-400">{step.body}</p>
                  </div>
                </div>
              </div>
              <Panel
                brushed
                className={`loop-operating-terminal loop-operating-terminal-${step.signal} p-2`}
              >
                <TerminalWindow
                  title={step.example.title}
                  ariaLabel={`${step.name} — ${step.example.title}`}
                  copyText={step.example.lines
                    .map((line) => `${line.prompt ? "$ " : ""}${line.text}`)
                    .join("\n")}
                >
                  {step.example.lines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.prompt ? "text-concrete-100" : "text-concrete-400"
                      }
                    >
                      {line.prompt && (
                        <span className="text-suspec-yellow">$ </span>
                      )}
                      {line.text}
                    </p>
                  ))}
                </TerminalWindow>
              </Panel>
            </article>
          );
        })}
      </Section>

      <Section
        register="04 / the task split"
        registerTone="core"
        className="section-flow"
      >
        <article
          id="task"
          className="loop-operating-step loop-operating-step-core reveal relative grid scroll-mt-28 gap-8 lg:grid-cols-2 lg:items-start"
        >
          <div className="loop-operating-copy relative">
            <div className="flex items-start gap-4">
              <HexBadge color="core">
                <Split
                  className={`h-4 w-4 ${signalRoles.core.text}`}
                  aria-hidden="true"
                />
              </HexBadge>
              <div>
                <div className="loop-operating-title-row flex items-center gap-2">
                  <Heading>Task</Heading>
                  <span className="loop-operating-optional font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
                    scaffold
                  </span>
                </div>
                <p className="mt-4 text-concrete-400">
                  Cut only when one spec splits into parallel slices — the
                  common 1:1 case has no task packet; the implementer works
                  from the spec. When you do split, hand each agent a bounded
                  packet by explicit path: scope, do-not-change, Verify
                  commands. The review names the task it judged, and the
                  check refuses a review whose task reference doesn&apos;t
                  resolve.
                </p>
              </div>
            </div>
          </div>
          <Panel
            brushed
            className="loop-operating-terminal loop-operating-terminal-core p-2"
          >
            <TerminalWindow
              title={taskExample.title}
              ariaLabel={`Task — ${taskExample.title}`}
              copyText={taskExample.lines
                .map((line) => `${line.prompt ? "$ " : ""}${line.text}`)
                .join("\n")}
            >
              {taskExample.lines.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.prompt ? "text-concrete-100" : "text-concrete-400"
                  }
                >
                  {line.prompt && (
                    <span className="text-suspec-yellow">$ </span>
                  )}
                  {line.text}
                </p>
              ))}
            </TerminalWindow>
          </Panel>
        </article>
      </Section>

      <GiltBand height="sm" />

      <Section
        register="05 / common paths"
        registerTone="reference"
        className="reveal grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
      >
        <Panel variant="inset" className="p-5 sm:p-6">
          <div className={`section-kicker ${signalRoles.reference.sectionKicker}`}>
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            <span>common paths</span>
          </div>
          <Heading className="mt-3">Match the ceremony to the risk</Heading>
          <p className="mt-4 text-concrete-400">
            Pick the row that fits the change; heavier forms stay reserved for
            the change that earns them.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-concrete-400">
                  <th scope="col" className="pb-3 pr-4 font-bold">
                    Work
                  </th>
                  <th scope="col" className="pb-3 font-bold">
                    Path
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border/70">
                {commonPaths.map((row) => (
                  <tr key={row.work}>
                    <th
                      scope="row"
                      className="py-3 pr-4 align-top font-semibold text-concrete-100"
                    >
                      {row.work}
                    </th>
                    <td className="py-3 align-top text-concrete-400">
                      {row.path}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel variant="inset" className="p-5 sm:p-6">
          <div className={`section-kicker ${signalRoles.change.sectionKicker}`}>
            <ScanEye className="h-4 w-4" aria-hidden="true" />
            <span>what not to skip</span>
          </div>
          <Heading className="mt-3">For code-changing work, keep</Heading>
          <ul className="mt-5 divide-y divide-panel-border/70 text-sm text-concrete-400">
            {dontSkip.map((item) => (
              <li key={item} className="py-3 first:pt-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </Section>

      <Section register="06 / start" registerTone="core">
        <Card
          signal="core"
          screws
          contentClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Heading>Ready to run it?</Heading>
            <p className="mt-2 text-concrete-400">
              Install the skills —{" "}
              <code>npx skills add jcosta33/suspec-skills -g -a codex</code> — and
              write one spec. The same loop handles the next change.
            </p>
            <p className="mt-4 text-sm text-concrete-400">
              Source:{" "}
              <TextLink
                href="/docs/02-basic-workflow/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read docs/02-basic-workflow.md (opens in new tab)"
              >
                docs/02-basic-workflow.md
              </TextLink>
            </p>
          </div>
          <TextLink
            href="/get-started/"
            className="shrink-0 gap-2 text-base font-semibold"
            touchTarget
          >
            Get started{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TextLink>
        </Card>
      </Section>

      <GiltBand height="sm" />
      <JsonLd data={loopJsonLd} />
    </div>
  );
}
