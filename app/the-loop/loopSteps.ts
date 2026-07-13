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
    descriptor: "capture the ask",
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
    slug: "spec",
    number: "02",
    name: "Spec",
    icon: FileText,
    signal: "core",
    descriptor: "define requirements",
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
    slug: "implement",
    number: "03",
    name: "Implement",
    icon: Terminal,
    signal: "core",
    descriptor: "run the change",
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
    slug: "review",
    number: "04",
    name: "Review",
    icon: ScanEye,
    signal: "core",
    descriptor: "compare evidence",
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
    slug: "check",
    number: "05",
    name: "Check",
    icon: ListChecks,
    signal: "core",
    descriptor: "report facts",
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
    slug: "findings",
    number: "06",
    name: "Findings",
    icon: NotebookPen,
    signal: "core",
    descriptor: "keep lessons",
    output: "Memory, ADR, or promoted record",
    handoff: "Next change",
    body: "Ephemeral findings ride the review packet and die with it. A durable lesson becomes a native harness memory; a decision becomes an ADR; behavior becomes tests; the discussion lives on the PR. When a record needs a permanent project home, promote the selected artifact, repair its references, validate the destination, and choose whether to commit it. Artifacts are transient — code stays king.",
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
