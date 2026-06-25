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

const loopSteps = ["Pull", "Spec", "Task", "Run", "Review", "Close"];

const heroProofs = [
  {
    label: "Plain markdown",
    text: "Readable in any repo.",
  },
  {
    label: "Any agent",
    text: "Bring the tool you already use.",
  },
  {
    label: "Human review",
    text: "Checks provide evidence, not verdicts.",
  },
];

const failureModes = [
  {
    code: "INTAKE",
    title: "Vague tickets",
    text: "Keep the request. Turn it into checkable requirements.",
  },
  {
    code: "SCOPE",
    title: "Agent drift",
    text: "Name the files, limits, and checks before the run starts.",
  },
  {
    code: "EVIDENCE",
    title: "Unbacked completion",
    text: "A Pass needs output, a CI link, or a named observation.",
  },
  {
    code: "LEDGER",
    title: "Lost findings",
    text: "Save useful lessons so later tasks can reuse them.",
  },
];

const features = [
  {
    icon: FileText,
    title: "Spec-first",
    label: "spec",
    text: "Write the contract. Hand the agent a bounded task.",
  },
  {
    icon: ScanEye,
    title: "Review by exception",
    label: "review",
    text: "Show evidence per requirement. Escalate the gaps.",
  },
  {
    icon: GitBranch,
    title: "Worktree discipline",
    label: "branch",
    text: "One task, one branch, one diff to inspect.",
  },
  {
    icon: Shield,
    title: "Honesty framework",
    label: "limits",
    text: "Mark what is convention, checklist, toolable, or enforced.",
  },
];

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
        <li
          key={step}
          className="flex min-w-0 items-center justify-between gap-3 rounded-panel border border-panel-border bg-panel px-3 py-2"
        >
          <span className="font-mono text-xs text-brass">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 break-words font-heading text-sm font-bold text-concrete-100">
            {step}
          </span>
          <PilotLamp
            color={index < 5 ? "amber" : "green"}
            className="scale-75"
          />
        </li>
      ))}
    </ol>
  );
}

function HeroProofStrip() {
  return (
    <ul className="mx-auto mt-6 grid max-w-3xl gap-2 text-left sm:grid-cols-3">
      {heroProofs.map((proof) => (
        <li
          key={proof.label}
          className="group flex min-w-0 items-start gap-3 rounded-panel border border-panel-border bg-panel/80 px-3 py-3 shadow-[inset_0_1px_0_rgba(240,226,204,0.04)] transition-colors duration-150 hover:border-brass/45"
        >
          <PilotLamp color="amber" className="mt-0.5 scale-75" />
          <div className="min-w-0">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-brass">
              {proof.label}
            </p>
            <p className="mt-1 text-sm leading-snug text-concrete-400">
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
      <section className="relative isolate overflow-hidden border-b border-panel-border py-16 sm:py-20">
        <HeroHexGrid />
        <Section className="ambient-header relative z-10">
          <PageHero
            eyebrow="workflow / six steps"
            titleSize="hero"
            title="Corpus"
          >
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
              Structured agent work, checked at every step.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
              Define the work, run agents, verify outputs, keep the evidence.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button asChild className="w-full sm:w-auto">
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
                className="w-full sm:w-auto"
              >
                Read the docs
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </ActionLink>
            </div>
            <HeroProofStrip />
          </PageHero>

          <Panel brushed screws className="mx-auto mt-10 max-w-6xl p-3">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="min-w-0 rounded-panel border border-panel-border bg-panel p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
                      loop preview
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-bold text-concrete-100 sm:text-2xl">
                      One run, six records.
                    </h2>
                  </div>
                  <Badge variant="ready">ready</Badge>
                </div>
                <StepRail />
                <TerminalWindow title="corpus status" className="mt-4">
                  <p className="text-concrete-500"># current run</p>
                  <p>
                    <span className="text-aurum">$</span> corpus review
                    <wbr /> TASK-auth-refresh
                  </p>
                  <p className="mt-2 text-phosphor">
                    PASS AC-001 — output pasted
                  </p>
                  <p className="text-amber">
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

      <section className="py-16 sm:py-20">
        <Section className="flex flex-col gap-10">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {failureModes.map((mode) => (
              <Card key={mode.title} screws className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-wide text-rubedo">
                    {mode.code}
                  </p>
                  <PilotLamp color="red" />
                </div>
                <h3 className="mt-3 font-heading text-lg font-bold text-concrete-100">
                  {mode.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {mode.text}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      <section className="border-y border-panel-border bg-section-band py-16 sm:py-20">
        <Section className="flex flex-col gap-10">
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
        <Section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
        <Section className="flex flex-col gap-10">
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
                <Card key={feature.title} screws className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-5 w-5 text-aurum" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-wide text-brass">
                      {feature.label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-concrete-100">
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
      <section className="py-16 sm:py-20">
        <Section className="flex flex-col gap-10">
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

      <section className="relative py-16 sm:py-20">
        <Section className="text-center">
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
