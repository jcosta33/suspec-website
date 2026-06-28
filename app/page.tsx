import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  FileText,
  GitBranch,
  ListChecks,
  ScanEye,
  Shield,
  Terminal,
} from "lucide-react";
import { ActionLink } from "./components/ActionLink";
import { Badge } from "./components/Badge";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Eyebrow } from "./components/Eyebrow";
import { HeroHexGrid } from "./components/HeroHexGrid";
import { JsonLd } from "./components/JsonLd";
import { LoopDiagram } from "./components/LoopDiagram";
import { PageHero } from "./components/PageHero";
import { Panel } from "./components/Panel";
import { PaperArtifact } from "./components/PaperArtifact";
import { PilotLamp } from "./components/PilotLamp";
import { Section } from "./components/Section";
import { TerminalWindow } from "./components/TerminalWindow";
import { signalRoles, type SignalRole } from "./components/signalStyles";

const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Corpus",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  softwareVersion: "0.1.0",
  url: "https://corpusframework.dev",
  description:
    "Corpus is a lightweight spec-and-review workflow for teams using coding agents. Plain markdown, any agent, no runtime.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://corpusframework.dev/#organization" },
};

export const metadata: Metadata = {
  title: "Corpus — spec and review workflow",
  description:
    "A markdown workflow for specs, tasks, reviews, findings, and evidence.",
  openGraph: {
    title: "Corpus — spec and review workflow",
    description:
      "A markdown workflow for specs, tasks, reviews, findings, and evidence.",
    type: "website",
    url: "/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Corpus — spec and review workflow",
      },
    ],
  },
  alternates: { canonical: "/" },
};

const loopSteps = [
  { label: "Pull", signal: "reference", href: "/the-loop/#pull" },
  { label: "Spec", signal: "core", href: "/the-loop/#spec" },
  { label: "Task", signal: "change", href: "/the-loop/#task" },
  { label: "Run", signal: "change", href: "/the-loop/#run" },
  { label: "Review", signal: "evidence", href: "/the-loop/#review" },
  { label: "Close", signal: "reference", href: "/the-loop/#close" },
] as const satisfies Array<{
  label: string;
  signal: SignalRole;
  href: string;
}>;

const heroReviewCommand = "corpus review TASK-auth-refresh";

const heroProofs = [
  {
    label: "Plain markdown",
    text: "Readable in any repo.",
    signal: "reference",
  },
  {
    label: "Any agent",
    text: "Bring the tool you already use.",
    signal: "muted",
  },
  {
    label: "Human review",
    text: "Checks provide evidence, not verdicts.",
    signal: "evidence",
  },
] as const satisfies Array<{
  label: string;
  text: string;
  signal: SignalRole;
}>;

const failureModes = [
  {
    code: "INTAKE",
    title: "Vague tickets",
    text: "Keep the request. Turn it into checkable requirements.",
    accent: "reference",
    lamp: "reference",
  },
  {
    code: "SCOPE",
    title: "Agent drift",
    text: "Name the files, limits, and checks before the run starts.",
    accent: "change",
    lamp: "change",
  },
  {
    code: "EVIDENCE",
    title: "Unbacked completion",
    text: "A Pass needs output, a CI link, or a named observation.",
    accent: "evidence",
    lamp: "evidence",
  },
  {
    code: "LEDGER",
    title: "Lost findings",
    text: "Save useful lessons so later tasks can reuse them.",
    accent: "reference",
    lamp: "reference",
  },
] as const satisfies Array<{
  code: string;
  title: string;
  text: string;
  accent: SignalRole;
  lamp: SignalRole;
}>;

const features = [
  {
    icon: FileText,
    title: "Spec-first",
    label: "spec",
    text: "Write the contract. Hand the agent a bounded task.",
    accent: "core",
  },
  {
    icon: ScanEye,
    title: "Review by exception",
    label: "review",
    text: "Show evidence per requirement. Escalate the gaps.",
    accent: "evidence",
  },
  {
    icon: GitBranch,
    title: "Worktree discipline",
    label: "branch",
    text: "One task, one branch, one diff to inspect.",
    accent: "change",
  },
  {
    icon: Shield,
    title: "Honesty framework",
    label: "limits",
    text: "Mark what is convention, checklist, toolable, or enforced.",
    accent: "reference",
  },
] as const;

const faqs = [
  {
    q: "Is Corpus an agent?",
    a: "No. Your coding tool writes code. Corpus structures the work around it.",
  },
  {
    q: "Does Corpus decide whether code ships?",
    a: "No. Checks produce evidence. Review decides what it means.",
  },
  {
    q: "Do I need the CLI?",
    a: "No. Corpus works as markdown. The CLI handles setup and checks.",
  },
  {
    q: "Why the seal?",
    a: "The six points are the six steps: Pull, Spec, Task, Run, Review, Close.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function StepRail() {
  return (
    <ol className="grid min-w-0 gap-2 sm:grid-cols-3">
      {loopSteps.map((step, index) => (
        <li key={step.label} className="min-w-0">
          <Link
            href={step.href}
            className={`home-step-rail-item home-step-rail-item-${step.signal} focus-ring flex min-w-0 items-center justify-between gap-3 rounded-panel border bg-panel px-3 py-2 no-underline`}
            aria-label={`Read the ${step.label} step in the loop`}
          >
            <span
              className={`font-mono text-xs ${signalRoles[step.signal].text}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 break-words font-heading text-sm font-bold text-concrete-100">
              {step.label}
            </span>
            <PilotLamp color={step.signal} className="scale-75" />
          </Link>
        </li>
      ))}
    </ol>
  );
}

function HeroProofStrip() {
  return (
    <ul className="home-hero-proof-strip mx-auto mt-6 grid max-w-3xl gap-2 text-left sm:grid-cols-3">
      {heroProofs.map((proof) => (
        <li
          key={proof.label}
          aria-label={`${proof.label}: ${proof.text}`}
          className={`home-hero-proof home-hero-proof-${proof.signal} group flex min-w-0 items-start gap-3 rounded-panel border bg-panel/80 px-3 py-3 shadow-[inset_0_1px_0_rgba(240,226,204,0.04)] transition-colors duration-150`}
        >
          <PilotLamp
            color={proof.signal}
            className="home-hero-proof-lamp mt-0.5 scale-75"
          />
          <div className="min-w-0">
            <p className="home-hero-proof-label font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em]">
              {proof.label}
            </p>
            <p className="home-hero-proof-body mt-1 text-sm leading-snug text-concrete-400">
              {proof.text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApp} />
      <section className="home-hero-section relative isolate border-b border-panel-border">
        <HeroHexGrid />
        <Section className="ambient-header relative z-10">
          <PageHero
            eyebrow="workflow / six steps"
            motif="loop"
            titleSize="hero"
            title="Corpus"
          >
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
              Structured agent work, checked at every step.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
              Define the work, run agents, verify outputs, keep the evidence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full max-w-72 sm:w-auto sm:max-w-none">
                <Link href="/get-started/">
                  Start the loop{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <ActionLink
                href="/docs/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read the docs (opens in a new tab)"
                className="w-auto"
              >
                Read the docs
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </ActionLink>
            </div>
            <HeroProofStrip />
          </PageHero>

          <Panel brushed screws className="home-hero-preview mx-auto mt-10 max-w-6xl p-3">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="min-w-0 rounded-panel border border-panel-border bg-panel p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-signal-reference">
                      loop preview
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-bold text-concrete-100 sm:text-2xl">
                      One run, six records.
                    </h2>
                  </div>
                  <Badge variant="ready">ready</Badge>
                </div>
                <StepRail />
                <TerminalWindow
                  title="corpus status"
                  copyText={heroReviewCommand}
                  copyLabel="Copy command"
                  className="mt-4"
                >
                  <p className="text-concrete-500"># current run</p>
                  <p>
                    <span className="text-signal-core">$</span> corpus review
                    <wbr /> TASK-auth-refresh
                  </p>
                  <p className="mt-2 text-signal-evidence">
                    PASS AC-001 — output pasted
                  </p>
                  <p className="text-signal-change">
                    UNVERIFIED AC-002 — manual resize pending
                  </p>
                  <p className="text-concrete-400">
                    HUMAN ATTENTION — retry.ts changed outside scope
                  </p>
                </TerminalWindow>
              </div>

              <PaperArtifact
                label="review"
                title="REVIEW-auth-refresh"
                meta="review packet / example"
                className="home-hero-artifact"
              >
                <p>
                  AC-001 <span className="paper-stamp ml-2">pass</span>
                </p>
                <p className="text-pencil">
                  Evidence: `npm test auth-refresh` pasted, exit 0.
                </p>
                <p className="mt-4">
                  AC-002 <span className="paper-stamp ml-2">unverified</span>
                </p>
                <p className="text-pencil">
                  Evidence missing. Human attention required before merge.
                </p>
                <p className="mt-4 border-t border-ink/20 pt-3 text-pencil">
                  No evidence, no Pass.
                </p>
              </PaperArtifact>
            </div>
          </Panel>
        </Section>
      </section>

      <section className="home-review-section py-16 sm:py-20">
        <Section
          register="01 / review signals"
          registerTone="change"
          className="flex flex-col gap-10"
        >
          <div className="max-w-2xl">
            <Eyebrow icon={<Terminal className="h-4 w-4" aria-hidden="true" />}>
              common failure modes
            </Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Make review visible.
            </h2>
            <p className="mt-4 text-concrete-400">
              A useful run leaves a trail: request, scope, checks, evidence,
              and findings.
            </p>
          </div>
          <ol className="review-signal-rail" aria-label="Review signal path">
            {failureModes.map((mode) => (
              <li
                key={mode.title}
                className={`review-signal-node review-signal-node-${mode.accent}`}
              >
                <div className="review-signal-node-head">
                  <p
                    className={`font-mono text-xs uppercase tracking-wide ${signalRoles[mode.accent].text}`}
                  >
                    {mode.code}
                  </p>
                  <PilotLamp color={mode.lamp} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-concrete-100">
                  {mode.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {mode.text}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </section>

      <section className="border-y border-panel-border bg-section-band py-16 sm:py-20">
        <Section
          register="02 / loop"
          registerTone="core"
          className="flex flex-col gap-10"
        >
          <div className="max-w-2xl">
            <Eyebrow>workflow / six steps</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              The loop is the product.
            </h2>
            <p className="mt-4 text-concrete-400">
              Pull, Spec, Task, Run, Review, Close. Each step writes or checks a
              record.
            </p>
          </div>
          <LoopDiagram />
        </Section>
      </section>

      <section className="py-16 sm:py-20">
        <Section
          register="03 / evidence"
          registerTone="evidence"
          className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <Eyebrow icon={<CheckCircle className="h-4 w-4" aria-hidden="true" />}>
              review packet / example
            </Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Put evidence next to the claim.
            </h2>
            <p className="mt-4 text-concrete-400">
              Specs and reviews are working records. Keep commands, notes, and
              results in the same place.
            </p>
          </div>
          <PaperArtifact
            label="spec"
            title="SPEC-auth-refresh"
            meta="spec example / acceptance criterion"
          >
            <p>AC-003 — Expired refresh token redirects to login</p>
            <p className="mt-3 text-pencil">
              The client must clear local session state and route the user to
              `/login`.
            </p>
            <p className="mt-3">
              Verify with:{" "}
              <span className="font-semibold">auth-refresh-expired.test</span>
            </p>
          </PaperArtifact>
        </Section>
      </section>

      <section className="border-y border-panel-border bg-section-band py-16 sm:py-20">
        <Section
          register="04 / pieces"
          registerTone="reference"
          className="flex flex-col gap-10"
        >
          <div className="max-w-2xl">
            <Eyebrow>what you get</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              The pieces.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  signal={feature.accent}
                  screws
                  className={`accent-card accent-card-${feature.accent} h-full`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon
                      className="feature-accent-icon h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="feature-accent-label font-mono text-xs uppercase tracking-wide">
                      {feature.label}
                    </span>
                  </div>
                  <h3 className="feature-accent-title mt-4 font-heading text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                    {feature.text}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>
      </section>

      <JsonLd data={faqJsonLd} />
      <section className="pb-8 pt-16 sm:py-20">
        <Section
          register="05 / answers"
          registerTone="reference"
          className="flex flex-col gap-10"
        >
          <div className="max-w-2xl">
            <Eyebrow>plain answers</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Plain answers.
            </h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group panel-raised overflow-hidden rounded-panel border border-panel-border"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-base font-semibold text-concrete-100 focus-ring [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <ListChecks
                    className="h-4 w-4 shrink-0 text-brass transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-concrete-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </Section>
      </section>

      <section className="relative pb-16 pt-6 sm:py-20">
        <Section register="06 / start" registerTone="core" className="text-center">
          <Eyebrow className="mx-auto">start / first pass</Eyebrow>
          <h2 className="mt-6 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
            Start with one spec.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-concrete-400">
            Copy the kit, write one contract, run one bounded task, review the
            evidence.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/get-started/">
                Start the loop{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <ActionLink
              href="https://github.com/jcosta33/corpus-starter-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              Copy the kit
            </ActionLink>
          </div>
        </Section>
      </section>
    </>
  );
}
