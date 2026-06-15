import type { Metadata } from "next";
import { Section } from "../components/Section";
import { Panel } from "../components/Panel";
import { TerminalWindow } from "../components/TerminalWindow";
import { HazardStripe } from "../components/HazardStripe";
import { DroneIcon } from "../components/DroneIcon";
import { HexBadge } from "../components/HexBadge";
import { SignalPulse } from "../components/SignalPulse";
import { TerminalCursor } from "../components/TerminalCursor";

export const metadata: Metadata = {
  title: "The loop — Swarm",
  description:
    "Pull → Spec → Task → Run → Review → Close. The six steps that keep a human at every decision gate while agents do the typing.",
  openGraph: {
    title: "The loop — Swarm",
    description:
      "Pull → Spec → Task → Run → Review → Close. The six steps that keep humans in the driver seat while agents do the work.",
    type: "website",
    images: ["/og-the-loop.png"],
  },
  alternates: {
    canonical: "/the-loop/",
  },
};

const steps = [
  {
    number: "01",
    name: "Pull",
    body: "Capture the ticket and any context that matters — links, constraints, prior attempts — in an intake file. This becomes the source of truth for the spec, not the chat history.",
    example: {
      title: "intake/INTAKE-42.md",
      lines: [
        { prompt: false, text: "## INTAKE-42 — Add dark mode to marketing site" },
        { prompt: false, text: "" },
        { prompt: false, text: "- Requested by: design" },
        { prompt: false, text: "- Scope: homepage and global shell only" },
        { prompt: false, text: "- Deadline: launch week" },
        { prompt: false, text: "- Links: SPEC-design-system, CHANGE-website-launch" },
      ],
    },
  },
  {
    number: "02",
    name: "Spec",
    body: "Write requirements one per ID, each with a verification method. A requirement is only as good as the evidence that proves it.",
    example: {
      title: "specs/shell/spec.md",
      lines: [
        { prompt: false, text: "### AC-003 — Global shell includes nav and footer" },
        { prompt: false, text: "" },
        { prompt: false, text: "A Shell component renders on every route via app/layout.tsx." },
        { prompt: false, text: "" },
        { prompt: false, text: "- Nav: logo, links, mobile hamburger below lg." },
        { prompt: false, text: "- Footer: copyright, links, colophon line." },
        { prompt: false, text: "" },
        { prompt: false, text: "Verify with: npm run build passes; every generated page contains" },
        { prompt: false, text: "exactly one <nav> and one <footer>." },
      ],
    },
  },
  {
    number: "03",
    name: "Task",
    body: "Hand the agent a bounded packet: what to change, what not to change, and how to verify. The packet is the contract.",
    example: {
      title: "tasks/TASK-shell.md",
      lines: [
        { prompt: false, text: "## TASK-shell" },
        { prompt: false, text: "" },
        { prompt: false, text: "Scope: implement Shell component per AC-003." },
        { prompt: false, text: "Do not change: homepage content, analytics." },
        { prompt: false, text: "Verify:" },
        { prompt: false, text: "- npm run build passes" },
        { prompt: false, text: "- grep finds 1 <nav> and 1 <footer> per page" },
      ],
    },
  },
  {
    number: "04",
    name: "Run",
    body: "The agent implements and pastes real evidence — command output, screenshots, links — next to each requirement.",
    example: {
      title: "tasks/TASK-shell.md",
      lines: [
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
    number: "05",
    name: "Review",
    body: "Check evidence per requirement. Human attention goes only where the evidence is missing or ambiguous.",
    example: {
      title: "reviews/REVIEW-shell.md",
      lines: [
        { prompt: false, text: "| AC    | Result      | Evidence                  |" },
        { prompt: false, text: "|-------|-------------|---------------------------|" },
        { prompt: false, text: "| AC-003| Pass        | 1 nav, 1 footer found     |" },
        { prompt: false, text: "| AC-009| Unverified  | manual resize pending     |" },
      ],
    },
  },
  {
    number: "06",
    name: "Close",
    body: "Merge the change, save findings so the next session starts from them, and update the board. The loop ends where the next one begins.",
    example: {
      title: "findings/FINDING-tailwind-v4-syntax.md",
      lines: [
        { prompt: false, text: "## FINDING-tailwind-v4-syntax" },
        { prompt: false, text: "" },
        { prompt: false, text: "When adding custom keyframes in Tailwind v4, use plain CSS" },
        { prompt: false, text: "classes rather than escaped utility prefixes to avoid PostCSS" },
        { prompt: false, text: "parse errors." },
      ],
    },
  },
];

export default function TheLoopPage() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-3 panel-raised brushed-metal px-4 py-1.5">
            <SignalPulse className="h-4 w-4" />
            <span className="text-xs font-mono font-medium uppercase tracking-widest engraved">
              flight plan — 6 waypoints
            </span>
          </div>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-5xl lg:text-6xl">
            The <span className="text-swarm-yellow text-glow">loop</span>
            <TerminalCursor className="ml-2 align-middle" />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-concrete-400">
            Pull → Spec → Task → Run → Review → Close. Each step produces a file the next step can
            read. The agent does the work between gates; a human decides at every gate.
          </p>
        </div>
      </Section>

      <HazardStripe height="sm" />

      <Section className="flex flex-col gap-16">
        {steps.map((step, index) => (
          <article
            key={step.name}
            className="relative grid gap-8 lg:grid-cols-2 lg:items-start"
          >
            <div className="relative">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[1.75rem] top-20 hidden h-[calc(100%+4rem)] w-px bg-gradient-to-b from-brass/60 to-transparent lg:block"
                  aria-hidden="true"
                />
              )}
              <div className="flex items-start gap-4">
                <HexBadge color="yellow">
                  <span className="font-mono text-xs font-bold text-swarm-yellow">
                    {step.number}
                  </span>
                </HexBadge>
                <div>
                  <div className="flex items-center gap-2">
                    <DroneIcon className="h-5 w-5 text-swarm-yellow" />
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-concrete-100">
                      {step.name}
                    </h2>
                  </div>
                  <p className="mt-4 text-concrete-400">{step.body}</p>
                </div>
              </div>
            </div>
            <Panel brushed className="p-2">
              <TerminalWindow title={step.example.title}>
                {step.example.lines.map((line, i) => (
                  <p key={i} className={line.prompt ? "text-concrete-100" : "text-concrete-400"}>
                    {line.prompt && <span className="text-swarm-yellow">$ </span>}
                    {line.text}
                  </p>
                ))}
              </TerminalWindow>
            </Panel>
          </article>
        ))}
      </Section>

      <HazardStripe height="sm" />
    </div>
  );
}
