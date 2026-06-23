import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  FileText,
  GitBranch,
  Layers,
  MessageSquareWarning,
  Plus,
  Shield,
  Terminal,
  Users,
} from "lucide-react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Panel } from "./components/Panel";
import { Section } from "./components/Section";
import { HazardStripe } from "./components/HazardStripe";
import { HeroHexGrid } from "./components/HeroHexGrid";
import { LoopDiagram } from "./components/LoopDiagram";
import { TerminalCursor } from "./components/TerminalCursor";
import { TerminalWindow } from "./components/TerminalWindow";
import { DroneIcon } from "./components/DroneIcon";
import { HexBadge } from "./components/HexBadge";
import { PilotLamp } from "./components/PilotLamp";
import { JsonLd } from "./components/JsonLd";
import { Eyebrow } from "./components/Eyebrow";
import { PageHero } from "./components/PageHero";

// The product itself, as a citable entity for answer engines and rich results. Version + the free
// offer match the v0.1.0 badge and the markdown-only, no-runtime reality stated in the copy.
const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Corpus",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  softwareVersion: "0.1.0",
  url: "https://swarmframework.dev",
  description:
    "Corpus is a lightweight spec-and-review workflow that keeps humans in charge of code written by AI agents. Plain markdown, any agent, no runtime.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": "https://swarmframework.dev/#organization" },
};

export const metadata: Metadata = {
  title: "Corpus — specs for humans, tasks for agents",
  description:
    "AI writes code that looks right. Corpus is a lightweight spec-and-review workflow that keeps humans in the driver seat. Plain markdown, any agent, no runtime.",
  openGraph: {
    title: "Corpus — specs for humans, tasks for agents",
    description:
      "AI writes code that looks right. Corpus is a lightweight spec-and-review workflow that keeps humans in the driver seat. Plain markdown, any agent, no runtime.",
    type: "website",
    url: "/",
    siteName: "Corpus",
    locale: "en_US",
    images: [
      { url: "/og-home.png", width: 1200, height: 630, alt: "Corpus — specs for humans, tasks for agents" },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

const walls = [
  {
    icon: MessageSquareWarning,
    title: "Vague tickets",
    code: "INTAKE-001",
    description:
      "The ticket says improve session handling; the agent picks one reading and builds it convincingly.",
  },
  {
    icon: Layers,
    title: "Re-pasted context",
    code: "CONTEXT-002",
    description:
      "The same constraints get retyped into every prompt — and forgotten in the one session that mattered.",
  },
  {
    icon: GitBranch,
    title: "Agent drift",
    code: "DRIFT-003",
    description:
      "Mid-task, the agent solves a nearby problem instead, touching files nobody mentioned.",
  },
  {
    icon: FileText,
    title: "Giant PRs",
    code: "PR-004",
    description:
      "Forty files of plausible code arrive at once; nobody can say which requirement any hunk satisfies.",
  },
  {
    icon: MessageSquareWarning,
    title: "Lost findings",
    code: "FINDING-005",
    description:
      "Hard-won lessons evaporate with the session; the next one re-learns them the expensive way.",
  },
];

const features = [
  {
    title: "Spec-first, not vibes-first",
    command: "swarm new",
    description:
      "Write the contract once. The task packet bounds scope and tells the agent, in writing, what not to touch.",
  },
  {
    title: "Review by exception",
    command: "swarm check",
    description:
      "Every requirement names how it is verified. The review packet shows the evidence per requirement — so you read the exceptions, not the whole 40-file diff.",
  },
  {
    title: "Humans decide",
    command: "# this part is you",
    description:
      "Agents draft, run, and paste the output. You decide when the evidence is good enough. No autopilot, no merge-by-vibes.",
  },
  {
    title: "No enforcement theater",
    command: "# convention · checklist · toolable · enforced",
    description:
      "Every rule says what kind of guarantee it is — and cheerfully admits when the honest answer is “nothing checks this yet.”",
  },
];

// Honest, plain-text Q&A — answers a reader (and an AI answer-engine) the real questions, grounded
// in what Corpus actually is. Doubles as FAQPage structured data for generative-engine visibility.
const faqs = [
  {
    q: "Is Corpus just another spec-driven development tool?",
    a: "No. Most spec-driven tools optimize generating code from a spec; Corpus's emphasis is the review gate. Every change produces a review packet with pasted evidence per requirement, and a human decides when it is good enough. The spec sets scope; the review is where “almost right” has to prove it is right.",
  },
  {
    q: "Do I need a particular AI agent?",
    a: "No. Corpus is plain markdown and conventions, so it works with Claude Code, Cursor, Copilot, or any agent that reads files in your repo. Nothing to integrate, no lock-in.",
  },
  {
    q: "Does Corpus replace code review, CI, or pull requests?",
    a: "No — it rides alongside them. The review packet tells a reviewer where to look; your CI output is the evidence the packet cites. PRs and CI stay exactly where they are.",
  },
  {
    q: "Is there a runtime or a service to install?",
    a: "No. The whole workflow is markdown files you can read, diff, and grep. An optional reference CLI does chores — checking specs, isolating tasks in worktrees, printing the board, and launching a prepared task on your agent — but it never becomes an agent of its own (no model loop, no edits) and never renders the verdict, and you can skip it entirely.",
  },
  {
    q: "What is “review by exception”?",
    a: "Instead of reading a 40-file diff line by line, you read the review packet — it shows the evidence for each requirement and flags only the exceptions: what is unverified, missing, or out of scope. Your attention goes where it is actually needed.",
  },
  {
    q: "Who makes the final call on whether code ships?",
    a: "A human, every time. Agents draft, run, and paste output; you decide when the evidence is good enough. Corpus has no autopilot and no merge-by-vibes — which is where developers already are: in the 2025 Stack Overflow survey, the top reason to keep a person in the loop was “when I don't trust AI's answers.”",
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApp} />
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-panel-border py-24 sm:py-32">
        <HeroHexGrid />
        <Section className="relative z-10">
          <PageHero
            eyebrow="v0.1.0 — spec-and-review workflow"
            titleSize="hero"
            title={
              <>
                AI writes code.
                <br />
                <span className="text-swarm-yellow text-glow">You keep the wheel.</span>
              </>
            }
          >
            <Panel brushed className="mx-auto mt-10 max-w-2xl p-2 text-left">
              <TerminalWindow>
                <p className="text-concrete-500">
                  <span className="text-swarm-yellow">$</span> swarm status
                </p>
                <p className="mt-1 text-concrete-500"># the gap Corpus is built for:</p>
                <p className="mt-1 text-concrete-100">
                  Only 33% of developers trust the accuracy of AI output. 84% use it anyway.
                </p>
                <p className="mt-2 text-concrete-500">
                  <span className="text-swarm-yellow">$</span> swarm init
                </p>
                <p className="mt-1 text-drone-green">✓ scaffolded workspace (specs/, tasks/, reviews/, status.md)</p>
                <p className="mt-2 text-concrete-500">
                  <span className="text-swarm-yellow">$</span> swarm new spec evidence --from intake/WEB-412.md
                </p>
                <p className="mt-1 text-concrete-100">
                  Turn tickets into clear specs, specs into agent-ready tasks, and agent output into
                  evidence you can review.
                </p>
                <p className="mt-2 text-concrete-500">
                  <span className="text-swarm-yellow">$</span>{" "}
                  <TerminalCursor className="ml-0.5 align-middle" />
                </p>
              </TerminalWindow>
            </Panel>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-concrete-400">
              Source: Stack Overflow 2025 Developer Survey —{" "}
              <Link
                href="https://survey.stackoverflow.co/2025/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
              >
                survey.stackoverflow.co/2025/ai
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </Link>
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href="https://github.com/jcosta33/swarm-starter-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Copy the starter kit <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="/docs/">Read the docs</Link>
              </Button>
            </div>
          </PageHero>
        </Section>
      </section>

      {/* Problem */}
      <section className="py-24">
        <Section className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-hazard-orange">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>sys.log — 5 warnings detected</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              Five ways agent code goes sideways.
            </h2>
            <p className="mt-4 text-concrete-400">
              Coding agents are fast. They are also wrong in ways that look correct: the{" "}
              <span className="text-concrete-100">#1 frustration</span> developers report with AI is
              code that is &quot;almost right, but not quite&quot; —{" "}
              <span className="text-concrete-100">66%</span> of them (
              <Link
                href="https://survey.stackoverflow.co/2025/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
              >
                Stack Overflow 2025
              </Link>
              ). And in a randomized trial, experienced devs on their own mature repos came out{" "}
              <span className="text-concrete-100">19% slower</span> with AI while{" "}
              <span className="text-concrete-100">feeling ~20% faster</span> (
              <Link
                href="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
              >
                METR
              </Link>
              ). Corpus does not answer that with hustle. It turns every change into a spec, a task,
              and a review packet with pasted evidence — so &quot;almost right&quot; has to prove it is right
              before it ships.
            </p>
          </div>

          <div className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {walls.map((wall) => {
              const Icon = wall.icon;
              return (
                <Card
                  key={wall.title}
                  screws
                  rivets
                  className="group h-full border-panel-border hover:border-hazard-orange/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <HexBadge color="orange">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </HexBadge>
                      <div>
                        <p className="font-mono text-xs text-hazard-orange">{wall.code}</p>
                        <h3 className="mt-1 font-heading text-lg font-bold uppercase tracking-tight text-concrete-100">
                          {wall.title}
                        </h3>
                      </div>
                    </div>
                    <PilotLamp color="amber" className="shrink-0" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-concrete-400">
                    {wall.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>
      </section>

      {/* Loop */}
      <section className="relative border-y border-panel-border bg-panel-raised py-24">
        <HazardStripe height="sm" />
        <Section className="mt-12 flex flex-col gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
              <DroneIcon className="h-4 w-4" />
              <span>flight.plan — 6 waypoints (+2 optional)</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              The loop
            </h2>
            <p className="mt-4 text-concrete-400">
              Pull → Spec → Task → Run → Review → Close. Each step produces a file the next step can
              read. The agent does the work; the human owns the gates.
            </p>
          </div>
          <LoopDiagram />
          <p className="text-sm text-concrete-400">
            <Link
              href="/the-loop/"
              className="inline-flex items-center gap-1 text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              Walk the full loop, step by step
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </Section>
      </section>

      {/* Example */}
      <section className="py-24">
        <Section className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-drone-green">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>verify.log — evidence required</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              What a spec looks like
            </h2>
            <p className="mt-4 text-concrete-400">
              A requirement is only as good as its verification method. The review packet shows
              evidence per requirement.
            </p>
          </div>

          <div className="reveal grid gap-6 lg:grid-cols-2">
            <TerminalWindow title="specs/shell/spec.md">
              <p className="text-concrete-500">
                <span className="text-swarm-yellow">##</span> AC-003 — Global shell includes nav and footer
              </p>
              <p className="mt-2 text-concrete-100">
                A <span className="text-swarm-yellow">Shell</span> component renders on every route via{" "}
                <span className="text-swarm-yellow">app/layout.tsx</span>.
              </p>
              <ul className="mt-2 list-disc pl-4 text-concrete-100">
                <li>Nav: logo, links, mobile hamburger below lg.</li>
                <li>Footer: copyright, links, colophon line.</li>
              </ul>
              <p className="mt-3 text-concrete-500">
                <span className="text-swarm-yellow">Verify with:</span> npm run build passes; every
                generated page contains exactly one &lt;nav&gt; and one &lt;footer&gt;; nav links are valid.
              </p>
            </TerminalWindow>

            <TerminalWindow title="reviews/REVIEW-spec-shell.md">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead className="border-b border-panel-border text-concrete-400">
                    <tr>
                      <th className="py-2 pr-4 font-heading font-bold uppercase tracking-wide">AC</th>
                      <th className="py-2 pr-4 font-heading font-bold uppercase tracking-wide">Result</th>
                      <th className="py-2 font-heading font-bold uppercase tracking-wide">Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-panel-border">
                    <tr>
                      <td className="py-3 pr-4 font-mono text-concrete-100">AC-003</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-2 text-drone-green">
                          <span className="pilot-lamp pilot-lamp-green" aria-hidden="true" /> Pass
                        </span>
                      </td>
                      <td className="py-3 text-concrete-400">grep found 1 nav and 1 footer</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono text-concrete-100">AC-009</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center gap-2 text-concrete-400">
                          <span className="pilot-lamp pilot-lamp-amber" aria-hidden="true" /> Unverified
                        </span>
                      </td>
                      <td className="py-3 text-concrete-400">manual resize pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TerminalWindow>
          </div>
        </Section>
      </section>

      {/* Features */}
      <section className="border-y border-panel-border bg-panel-raised py-24">
        <Section className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span>how it works — 4 moving parts</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              Built for validation, not generation.
            </h2>
          </div>
          <div className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                screws
                className="group h-full border-panel-border hover:border-swarm-yellow/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-mono text-xs text-brass">{feature.command}</p>
                  <PilotLamp color="green" className="shrink-0" />
                </div>
                <h3 className="mt-2 font-heading text-lg font-bold uppercase tracking-tight text-concrete-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      {/* FAQ */}
      <JsonLd data={faqJsonLd} />
      <section className="py-24">
        <Section className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-swarm-yellow">
              <DroneIcon className="h-4 w-4" aria-hidden="true" />
              <span>faq.md — common questions</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              Questions, answered straight
            </h2>
          </div>
          <div className="reveal flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="faq-item group panel-raised overflow-hidden rounded-panel border border-panel-border"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-base font-semibold text-concrete-100 focus-ring [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <Plus
                    className="h-4 w-4 shrink-0 text-brass transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-concrete-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </section>

      {/* Final CTA */}
      <section className="relative py-24">
        <HazardStripe height="sm" />
        <Section className="py-16 text-center">
          <Eyebrow
            icon={<Users className="h-4 w-4 text-drone-green" aria-hidden="true" />}
            className="mx-auto"
          >
            human approval required
          </Eyebrow>
          <h2 className="mt-6 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
            Stop shipping &quot;almost right&quot; code.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-concrete-400">
            Corpus will not make you 10x, and it is not trying to replace you — it just puts you
            back in charge of the firehose. Copy the starter kit, write one spec, and give your agents a
            contract they can read. You still make the calls; they just finally know what you meant.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/get-started/">
                Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <Link
                href="https://github.com/jcosta33/swarm-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copy the starter kit
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-concrete-400">
            New here? Start with{" "}
            <Link
              href="/what-is-swarm/"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              what Corpus is
            </Link>{" "}
            or{" "}
            <Link
              href="/the-loop/"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              the loop
            </Link>
            .
          </p>
        </Section>
        <HazardStripe height="sm" />
      </section>
    </>
  );
}
