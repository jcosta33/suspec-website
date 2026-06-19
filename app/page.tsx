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
import { SignalPulse } from "./components/SignalPulse";
import { PilotLamp } from "./components/PilotLamp";

export const metadata: Metadata = {
  title: "Calma — specs for humans, tasks for agents",
  description:
    "AI writes code that looks right. Calma is a lightweight spec-and-review workflow that keeps humans in the driver seat. Plain markdown, any agent, no runtime.",
  openGraph: {
    title: "Calma — specs for humans, tasks for agents",
    description:
      "AI writes code that looks right. Calma is a lightweight spec-and-review workflow that keeps humans in the driver seat. Plain markdown, any agent, no runtime.",
    type: "website",
    images: ["/og-home.png"],
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
      "Every requirement names how it is verified. The review packet shows the evidence per line — so you read the exceptions, not the whole 40-file diff.",
  },
  {
    title: "Humans decide",
    command: "# this part is you",
    description:
      "Agents draft, run, and paste the output. You decide when the evidence is good enough. No autopilot, no merge-by-vibes.",
  },
  {
    title: "No enforcement theater",
    command: "# convention · checklist · enforced",
    description:
      "Every rule says what kind of guarantee it is — and cheerfully admits when the honest answer is “nothing checks this yet.”",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-panel-border py-24 sm:py-32">
        <HeroHexGrid />
        <Section className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 panel-raised brushed-metal px-4 py-1.5">
              <SignalPulse className="h-4 w-4" />
              <span className="text-xs font-mono font-medium uppercase tracking-widest engraved">
                v0.1.0 — spec-and-review workflow
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-6xl lg:text-7xl">
              AI writes code.
              <br />
              <span className="text-swarm-yellow text-glow">You keep the wheel.</span>
              <TerminalCursor className="ml-2 align-middle" />
            </h1>

            <Panel brushed className="mx-auto mt-10 max-w-2xl p-2 text-left">
              <TerminalWindow>
                <p className="text-concrete-500">
                  <span className="text-swarm-yellow">$</span> swarm status
                </p>
                <p className="mt-1 text-concrete-100">
                  Only 33% of developers trust the accuracy of AI output. 84% use it anyway.
                </p>
                <p className="mt-2 text-concrete-500">
                  <span className="text-swarm-yellow">$</span> swarm init
                </p>
                <p className="mt-1 text-drone-green">✓ scaffolded .agents/ workspace</p>
                <p className="mt-2 text-concrete-500">
                  <span className="text-swarm-yellow">$</span> swarm new spec --title &quot;every claim needs evidence&quot;
                </p>
                <p className="mt-1 text-concrete-100">
                  Turn tickets into clear specs, specs into agent-ready tasks, and agent output into
                  evidence you can review.
                </p>
                <p className="mt-2 text-concrete-500">
                  <span className="text-swarm-yellow">$</span> _
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
                <Link
                  href="https://github.com/jcosta33/swarm/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the docs
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </section>

      {/* Problem */}
      <section className="py-24">
        <Section className="flex flex-col gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-hazard-orange">
              <Terminal className="h-4 w-4" />
              <span>sys.log — 5 warnings detected</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              Five ways agent code goes sideways.
            </h2>
            <p className="mt-4 text-concrete-400">
              Coding agents are fast. They are also wrong in ways that look correct — and the one
              randomized trial that actually measured it found experienced devs were{" "}
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
              ). Calma does not answer that with hustle. It turns every change into a spec, a task,
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
                  hardware
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
              <span>flight.plan — 6 waypoints</span>
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
              <CheckCircle className="h-4 w-4" />
              <span>verify.log — evidence required</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              What a spec looks like
            </h2>
            <p className="mt-4 text-concrete-400">
              A requirement is only as good as its verification method. The review packet shows
              evidence per line item.
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
              <Shield className="h-4 w-4" />
              <span>capabilities — 4 modules loaded</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
              Built for validation, not generation.
            </h2>
          </div>
          <div className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                hardware
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

      {/* Final CTA */}
      <section className="relative py-24">
        <HazardStripe height="sm" />
        <Section className="py-16 text-center">
          <div className="mx-auto inline-flex items-center gap-3 panel-raised brushed-metal px-4 py-1.5">
            <Users className="h-4 w-4 text-drone-green" />
            <span className="text-xs font-mono font-medium uppercase tracking-widest engraved">
              human approval required
            </span>
          </div>
          <h2 className="mt-6 font-heading text-3xl font-bold uppercase tracking-tight text-concrete-100 sm:text-4xl">
            Stop shipping &quot;almost right&quot; code.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-concrete-400">
            Calma will not make you 10x, and it is not trying to replace you — it is trying to put you
            back in charge of the firehose. Copy the starter kit, write one spec, and give your agents a
            contract they can read. You still make the calls; they just finally know what you meant.
          </p>
          <div className="mt-10 flex justify-center">
            <Button asChild>
              <Link
                href="https://github.com/jcosta33/swarm-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Copy the starter kit <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-concrete-400">
            New here? Start with{" "}
            <Link
              href="/what-is-swarm/"
              className="text-swarm-yellow underline hover:no-underline focus-ring rounded-sm"
            >
              what Calma is
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
