import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  FileText,
  ListChecks,
  Scale,
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
import { canonicalAlternates } from "./seo";

const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Suspec",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  softwareVersion: "0.1.0",
  url: "https://suspecframework.dev",
  description:
    "A methodology for structuring work with coding agents. Skills do the paperwork; your agent does the typing.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://suspecframework.dev/#organization" },
};

export const metadata: Metadata = {
  title: "Suspec — agent work with receipts",
  description:
    "Agent work with a paper trail. Skills implement the method; the optional CLI checks the records.",
  openGraph: {
    title: "Suspec — agent work with receipts",
    description:
      "Agent work with a paper trail. Skills implement the method; the optional CLI checks the records.",
    type: "website",
    url: "/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-home.png",
        width: 1200,
        height: 630,
        alt: "Suspec — agent work with receipts",
      },
    ],
  },
  alternates: canonicalAlternates("/"),
};

const loopSteps = [
  { label: "Intent", href: "/the-loop/intent/" },
  { label: "Spec", href: "/the-loop/spec/" },
  { label: "Implement", href: "/the-loop/implement/" },
  { label: "Review", href: "/the-loop/review/" },
  { label: "Check", href: "/the-loop/check/" },
  { label: "Findings", href: "/the-loop/findings/" },
] as const satisfies Array<{
  label: string;
  href: string;
}>;

const heroInstallCommand = "npx skills add jcosta33/suspec-skills -g";

const heroCheckCommand = "suspec check review.md --spec spec.md";

const heroProofs = [
  {
    label: "Plain markdown",
    text: "No format lock-in. Readable anywhere.",
    signal: "reference",
  },
  {
    label: "Any agent",
    text: "Install once globally. Your repos stay clean.",
    signal: "muted",
  },
  {
    label: "Human review",
    text: "The check reports facts, never verdicts.",
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
    text: "Capture the request verbatim. Turn it into verifiable requirements.",
    accent: "reference",
    lamp: "reference",
  },
  {
    code: "SCOPE",
    title: "Agent drift",
    text: "The spec names the requirements and non-goals before the agent starts.",
    accent: "change",
    lamp: "change",
  },
  {
    code: "EVIDENCE",
    title: "Unbacked completion",
    text: "“Tests passed” without output is not evidence. Empty evidence reads Unverified.",
    accent: "evidence",
    lamp: "evidence",
  },
  {
    code: "FINDINGS",
    title: "Lost lessons",
    text: "Durable findings become native harness memories the next pass can use.",
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
    text: "State intent as requirements, each with a Verify with: line.",
    accent: "core",
  },
  {
    icon: ScanEye,
    title: "Independent review",
    label: "review",
    text: "Evidence reconciled per requirement. The reviewer is never the implementer.",
    accent: "evidence",
  },
  {
    icon: Scale,
    title: "Proportional rigor",
    label: "rigor",
    text: "A trivial fix gets a one-line inline spec — no file at all.",
    accent: "muted",
  },
  {
    icon: Shield,
    title: "Honesty floor",
    label: "check",
    text: "A deterministic check reports facts a lazy review cannot fake.",
    accent: "reference",
  },
] as const;

const faqs = [
  {
    q: "Is Suspec an agent?",
    a: "No. Your coding tool writes the code. Suspec is the method around that work; skills implement it.",
  },
  {
    q: "Does Suspec decide whether code ships?",
    a: "No. suspec check reports facts, not verdicts. The human owns the review result: Pass, Fail, Unverified, or Blocked.",
  },
  {
    q: "Do I need the CLI?",
    a: "No. Suspec works as plain Markdown, and every step has a by-hand path. suspec check is scaffold: use it when the work earns it.",
  },
  {
    q: "Where do the artifacts live?",
    a: "Beside your agent's native artifacts, in a folder named for the repo. Every step names them by explicit path; they are never committed to your repo.",
  },
  {
    q: "Why the seal?",
    a: "The six points are Intent, Spec, Implement, Review, Check, and Findings. The triangle marks the three keys: intent, review, and findings. They show up on nearly every change.",
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
            className="home-step-rail-item home-step-rail-item-workflow focus-ring flex min-w-0 items-center justify-between gap-3 rounded-panel border bg-panel px-3 py-2 no-underline"
          >
            <span className="font-mono text-xs text-signal-core">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 break-words font-heading text-sm font-bold text-concrete-100">
              {step.label}
            </span>
            <PilotLamp color="core" className="scale-75" />
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
          className={`home-hero-proof home-hero-proof-${proof.signal} shadow-proof-hairline group flex min-w-0 items-start gap-3 rounded-panel border bg-panel/80 px-3 py-3 transition-colors duration-150`}
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
      <section className="home-hero-section relative isolate border-b border-panel-border">
        <HeroHexGrid />
        <Section className="ambient-header relative z-10">
          <PageHero
            eyebrow="methodology / shipped as skills"
            motif="loop"
            titleSize="default"
            title="Show, not tell."
          >
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-100">
              A methodology for structuring work with coding agents. Skills do
              the paperwork; your agent does the typing.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-concrete-400">
              State the work, run the change, reconcile the evidence, keep what
              survives. No runtime required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full max-w-72 sm:w-auto sm:max-w-none">
                <Link href="/get-started/">
                  Start the loop{" "}
                  <ArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
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
            <p className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 font-mono text-sm text-concrete-100">
              <span className="text-signal-core" aria-hidden="true">
                $
              </span>
              <code className="break-all">{heroInstallCommand}</code>
            </p>
            <HeroProofStrip />
          </PageHero>

          <Panel brushed screws className="hover-stable-surface home-hero-preview mx-auto mt-10 max-w-6xl p-3">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="home-hero-run-card min-w-0 rounded-panel border border-panel-border bg-panel p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-signal-reference">
                      loop preview
                    </p>
                    <h2 className="mt-1 font-heading text-xl font-bold text-concrete-100 sm:text-2xl">
                      One pass, nothing on faith.
                    </h2>
                  </div>
                  <Badge variant="ready">ready</Badge>
                </div>
                <StepRail />
                <TerminalWindow
                  title="suspec check"
                  copyText={heroCheckCommand}
                  copyLabel="Copy command"
                  className="mt-4"
                >
                  <p className="text-concrete-500"># the honesty floor</p>
                  <p>
                    <span className="text-signal-core">$</span> suspec check
                    <wbr /> review.md --spec spec.md
                  </p>
                  <p className="mt-2 text-signal-change">
                    C016 pass-needs-evidence — AC-002 marked Pass, evidence
                    cell empty
                  </p>
                  <p className="hidden text-signal-evidence md:block">
                    C012 coverage — all in-scope requirements have coverage
                    rows
                  </p>
                  <p className="hidden text-concrete-400 md:block">
                    exit 2 — blocking. Facts only; the result stays yours.
                  </p>
                </TerminalWindow>
              </div>

              <PaperArtifact
                label="review"
                title="review.md"
                meta="~/.claude/projects/acme-api/ · review packet"
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
                  Evidence cell empty. Unverified, never Pass.
                </p>
                <p className="mt-4 border-t border-ink/20 pt-3 text-pencil">
                  No evidence, no Pass. The human owns the result.
                </p>
              </PaperArtifact>
            </div>
          </Panel>
        </Section>
      </section>

      <section className="home-review-section py-16 sm:py-20">
        <Section
          register="01 / review signals"
          registerTone="evidence"
          className="section-flow"
        >
          <div className="max-w-2xl">
            <Eyebrow icon={<Terminal className="h-4 w-4" aria-hidden="true" />}>
              common failure modes
            </Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Make review visible.
            </h2>
            <p className="mt-4 text-concrete-400">
              A useful pass leaves receipts: intent, scope, verify commands,
              evidence, and findings. “Done” is not a receipt.
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
          className="section-flow"
        >
          <div className="max-w-2xl">
            <Eyebrow>workflow / six steps</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              The loop, without the ceremony.
            </h2>
            <p className="mt-4 text-concrete-400">
              Intent, Spec, Implement, Review, Check, Findings. Intent, review,
              and findings show up on virtually every change; the rest is
              scaffold the work pulls in when useful. Most changes stop at one
              inline line.
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
              spec / example
            </Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              Claims are cheap. Paste the output.
            </h2>
            <p className="mt-4 text-concrete-400">
              Specs and reviews are transient working files, handed around by
              explicit path. Keep commands, evidence, and results together;
              code stays king.
            </p>
          </div>
          <PaperArtifact
            label="spec"
            title="spec.md"
            meta="~/.claude/projects/acme-api/ · acceptance criterion"
          >
            <p>AC-003 — Expired refresh token redirects to login</p>
            <p className="mt-3 text-pencil">
              The client must clear local session state and route the user to
              `/login`.
            </p>
            <p className="mt-3">
              Verify with:{" "}
              <span className="font-semibold">
                npm test -- auth-refresh-expired
              </span>
            </p>
          </PaperArtifact>
        </Section>
      </section>

      <section className="border-y border-panel-border bg-section-band py-16 sm:py-20">
        <Section
          register="04 / pieces"
          registerTone="reference"
          className="section-flow"
        >
          <div className="max-w-2xl">
            <Eyebrow>what you get</Eyebrow>
            <h2 className="mt-4 font-heading text-2xl font-bold text-concrete-100 sm:text-3xl">
              What gets added.
            </h2>
            <p className="mt-4 text-concrete-400">
              A few working files beside your agent&apos;s native artifacts: the
              spec, task packets when needed, the review packet, and findings.
              They have explicit paths. Your repo does not collect them by
              accident.
            </p>
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

      <section className="pb-8 pt-16 sm:py-20">
        <Section
          register="05 / answers"
          registerTone="reference"
          className="section-flow"
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
            Install the skills globally, write one spec, implement one bounded
            change, and review the evidence. A typo does not need a filing
            cabinet.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/get-started/">
                Start the loop{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <ActionLink
              href="https://github.com/jcosta33/suspec-skills"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the skills catalog on GitHub (opens in new tab)"
              className="w-full sm:w-auto"
            >
              View the skills catalog
            </ActionLink>
          </div>
        </Section>
      </section>

      <JsonLd data={softwareApp} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
