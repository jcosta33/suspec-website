import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  GitBranch,
  ListChecks,
  ScanEye,
  Shield,
  Terminal,
} from "lucide-react";
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
  name: "corpus",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  softwareVersion: "0.1.0",
  url: "https://corpusframework.dev",
  description:
    "corpus is a lightweight spec-and-review workflow for teams using coding agents. Plain markdown, any agent, no runtime.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://corpusframework.dev/#organization" },
};

export const metadata: Metadata = {
  title: "corpus — structured agent work, checked at every step",
  description:
    "Define the work, run agents, verify outputs, and preserve evidence with a lightweight markdown workflow.",
  openGraph: {
    title: "corpus — structured agent work, checked at every step",
    description:
      "A lightweight markdown workflow for autonomous coding loops: specs, tasks, reviews, findings, and evidence.",
    type: "website",
    url: "/",
    siteName: "corpus",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "corpus — structured agent work, checked at every step",
      },
    ],
  },
  alternates: { canonical: "/" },
};

const loopSteps = ["Pull", "Spec", "Task", "Run", "Review", "Close"];

const failureModes = [
  {
    code: "INTAKE",
    title: "Vague tickets",
    text: "A ticket enters as prose. corpus preserves it, then turns it into requirements.",
  },
  {
    code: "SCOPE",
    title: "Agent drift",
    text: "A task packet names what to change, what not to touch, and how to verify.",
  },
  {
    code: "EVIDENCE",
    title: "Unbacked completion",
    text: "A Pass needs pasted output, a CI link, or a named manual observation.",
  },
  {
    code: "LEDGER",
    title: "Lost findings",
    text: "Lessons move from a run summary into findings so the next task can load them.",
  },
];

const features = [
  {
    icon: FileText,
    title: "Spec-first",
    label: "spec",
    text: "Write the contract once. Give the agent a task packet, not a drifting chat thread.",
  },
  {
    icon: ScanEye,
    title: "Review by exception",
    label: "review",
    text: "The review packet shows evidence per requirement and routes the exceptions to a human.",
  },
  {
    icon: GitBranch,
    title: "Worktree discipline",
    label: "branch",
    text: "One task, one branch, one place to inspect what changed before it joins the main line.",
  },
  {
    icon: Shield,
    title: "Honesty framework",
    label: "limits",
    text: "Every rule says whether it is convention, checklist, toolable, or actually enforced.",
  },
];

const faqs = [
  {
    q: "Is corpus an agent?",
    a: "No. Your coding tool writes the code. corpus structures the files around it: specs, tasks, reviews, findings, and the status board.",
  },
  {
    q: "Does corpus decide whether code ships?",
    a: "No. Agents can run checks and paste evidence; a human or independent reviewer owns the result.",
  },
  {
    q: "Do I need the CLI?",
    a: "No. corpus works as plain markdown. The optional CLI scaffolds, checks, isolates worktrees, and reconciles facts; it does not become a model loop.",
  },
  {
    q: "Why the seal?",
    a: "The six points map to the six-step loop: Pull, Spec, Task, Run, Review, Close. It is a diagram before it is a mark.",
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApp} />
      <section className="relative isolate overflow-hidden border-b border-panel-border py-20 sm:py-28">
        <HeroHexGrid />
        <Section className="ambient-header relative z-10">
          <PageHero
            eyebrow="workflow / six steps"
            titleSize="hero"
            title="corpus"
          >
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
              Structured agent work, checked at every step.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
              Define the work, run agents, verify outputs, preserve evidence.
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/get-started/">
                  Start the loop{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/docs/">Read the docs</Link>
              </Button>
            </div>
          </PageHero>

          <Panel brushed screws className="mx-auto mt-12 max-w-6xl p-3">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="min-w-0 rounded-panel border border-panel-border bg-panel p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
                      loop preview
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-bold text-concrete-100 sm:text-2xl">
                      The loop at a glance.
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
                  Don&apos;t mark it done without evidence.
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
              The hard part is checking the work.
            </h2>
            <p className="mt-4 text-concrete-400">
              Agents can produce a plausible diff faster than a team can verify
              it. corpus makes the handoff, scope, evidence, and memory visible
              before the change ships.
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

      <section className="border-y border-panel-border bg-panel-raised py-16 sm:py-20">
        <Section className="flex flex-col gap-10">
          <div className="max-w-2xl">
            <Eyebrow>workflow / six steps</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              The six points are the loop.
            </h2>
            <p className="mt-4 text-concrete-400">
              Pull, Spec, Task, Run, Review, Close. Each point creates or
              checks an artifact the next point can read.
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
              Keep evidence next to the claim.
            </h2>
            <p className="mt-4 text-concrete-400">
              Specs and reviews are working records. The paper treatment shows
              up where commands, notes, and evidence live.
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

      <section className="border-y border-panel-border bg-panel-raised py-16 sm:py-20">
        <Section className="flex flex-col gap-10">
          <div className="max-w-2xl">
            <Eyebrow>what you get</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              A few pieces that help.
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
              What corpus does and doesn&apos;t do.
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
            Copy the kit, write the contract, hand the agent a bounded task, and
            review the evidence. The loop scales because the first pass is
            small.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/get-started/">
                Start the loop{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <Link
                href="https://github.com/jcosta33/corpus-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copy the kit
              </Link>
            </Button>
          </div>
        </Section>
      </section>
    </>
  );
}
