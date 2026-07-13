import {
  FileText,
  Inbox,
  ListChecks,
  NotebookPen,
  ScanEye,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { SignalRole } from "../components/signalStyles";

export type LoopStepLine = {
  prompt: boolean;
  text: string;
};

export type LoopStep = {
  slug: string;
  number: string;
  name: string;
  icon: LucideIcon;
  signal: SignalRole;
  descriptor: string;
  output: string;
  handoff: string;
  body: string;
  example: {
    title: string;
    lines: readonly LoopStepLine[];
  };
};

export const loopSteps = [
  {
    slug: "intent",
    number: "01",
    name: "Intent",
    icon: Inbox,
    signal: "core",
    descriptor: "name the work",
    output: "Source named, or an intake note",
    handoff: "Spec",
    body: "Name the work. It may be a ticket, thread, or your own idea. Keep the original wording only when it matters; otherwise the spec names the source directly. How the work arrived does not set the ceremony. The work does.",
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
    slug: "spec",
    number: "02",
    name: "Spec",
    icon: FileText,
    signal: "core",
    descriptor: "set the bar",
    output: "Requirements with Verify with: lines",
    handoff: "Implement",
    body: "Use a spec when the work earns one. Give requirements AC-NNN ids, a Verify with: line each, plus non-goals and open questions. Keep the file beside your harness's artifacts and carry its full path. Lint it with suspec check spec.md.",
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
    slug: "implement",
    number: "03",
    name: "Implement",
    icon: Terminal,
    signal: "core",
    descriptor: "do the work",
    output: "Real pasted output per requirement",
    handoff: "Review",
    body: "You or your agent works from the spec by explicit path, runs every Verify with: command, and pastes real output into ## Execution. “Tests passed” without output is just a sentence wearing a lab coat.",
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
    slug: "review",
    number: "04",
    name: "Review",
    icon: ScanEye,
    signal: "core",
    descriptor: "read the receipts",
    output: "Review packet",
    handoff: "Check",
    body: "A reviewer who did not implement the change reconciles the result against the spec: one coverage row per requirement, evidence per row, exceptions sent to human attention. For a trivial fix, this is the owner reading the pasted output. No extra ceremony required.",
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
    slug: "check",
    number: "05",
    name: "Check",
    icon: ListChecks,
    signal: "core",
    descriptor: "check the shape",
    output: "Facts and exit codes",
    handoff: "Findings",
    body: "Use the deterministic floor when the work earns it: coverage complete, commands match, every Pass evidenced, references resolve. Exit codes are 0 clean, 1 warning, 2 blocking. The human owns the review result; the check reports facts. Every step has a by-hand path.",
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
    slug: "findings",
    number: "06",
    name: "Findings",
    icon: NotebookPen,
    signal: "core",
    descriptor: "keep what lasts",
    output: "Memory, ADR, or promoted record",
    handoff: "Next change",
    body: "Ephemeral findings leave with the review packet. A durable lesson becomes a native harness memory; a decision becomes an ADR; behavior becomes tests; discussion stays on the PR. If a record needs a permanent project home, promote it, repair references, validate the destination, and choose whether to commit it. Code stays king.",
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
] satisfies readonly LoopStep[];

export function loopStepHref(slug: string): string {
  return `/the-loop/${slug}/`;
}
