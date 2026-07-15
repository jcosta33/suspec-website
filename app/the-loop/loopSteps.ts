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
    body: "Name the work: ticket, thread, or idea. Preserve the original wording only when it matters. Arrival does not set the ceremony; the work does.",
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
    body: "When needed, write AC-NNN requirements with a Verify with: line each. Add non-goals and open questions. Carry the full path. Check it with suspec check spec.md.",
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
    body: "Work from the spec path. Run every Verify with: command. Paste the output into ## Execution. “Tests passed” is not evidence.",
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
    body: "A reviewer who did not implement reconciles each requirement with evidence. Exceptions go to a human. For trivial fixes, the owner reads the pasted output.",
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
          text: "| AC-003| Supported   | 1 nav, 1 footer found     |",
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
    body: "When useful, check coverage, commands, evidence, and references. Exit 0 is clean, 1 warning, 2 blocking. The check reports facts; humans decide.",
    example: {
      title: "suspec check",
      lines: [
        { prompt: true, text: "suspec check review.md --spec spec.md" },
        {
          prompt: false,
          text: "C016 supported-needs-evidence: AC-007 is marked Supported with an",
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
    body: "Discard the transient. Save durable lessons to native memory, decisions to ADRs, behavior to tests, and discussion to the PR. Promote records that need a project home.",
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
