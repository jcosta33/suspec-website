import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle,
  ClipboardCheck,
  FileText,
  FolderSearch,
  GitFork,
  ListChecks,
  Map as MapIcon,
  RefreshCw,
  Route,
  ScanSearch,
  Search,
  ShieldCheck,
  Swords,
  Zap,
} from "lucide-react";
import type { SignalRole } from "../components/signalStyles";

export type SkillKind = "method" | "artifact";
export type SkillVisual =
  | "artifact"
  | "before-after"
  | "chat"
  | "decision"
  | "flow"
  | "memory"
  | "passes"
  | "revolver";

export type SkillExample = {
  title: string;
  meta: string;
  lines: readonly string[];
};

export type SkillDetail = {
  slug: string;
  name: string;
  kind: SkillKind;
  tone: SignalRole;
  icon: LucideIcon;
  description: string;
  rationale: string;
  output: string;
  boundary: string;
  misuse: string;
  visual: SkillVisual;
  visualLabels?: readonly [string, string, string];
  example: SkillExample;
};

export const skillDetails: readonly SkillDetail[] = [
  {
    slug: "bulletproof",
    name: "bulletproof",
    kind: "method",
    tone: "evidence",
    icon: ShieldCheck,
    description: "Test unsupported claims with direct evidence.",
    rationale: "Use it when a claim needs proof, not plausible prose or a green check.",
    output: "In-chat evidence table: Supported, Unsupported, Unverified, or Blocked, with proof.",
    boundary: "Verifies bounded claims; not a risk review or acceptance.",
    misuse: "Treating a plausible citation or green check as proof without inspecting it.",
    visual: "chat",
    visualLabels: ["bounded claim set", "inspect the evidence", "supported / unverified"],
    example: {
      title: "claim-check.md",
      meta: "assessment / evidence",
      lines: [
        "| ID | Assessment | Evidence |",
        "| AC-001 | Supported | npm test -- auth-refresh |",
        "| AC-002 | Unverified | CI output missing |",
      ],
    },
  },
  {
    slug: "demolition",
    name: "demolition",
    kind: "method",
    tone: "change",
    icon: Swords,
    description: "Make the strongest case against a proposal.",
    rationale: "Use it when attack beats another balanced summary.",
    output: "In-chat rejection case: assumptions, failure paths, opportunity costs.",
    boundary: "Advocacy is not evidence. Verify every claim.",
    misuse: "Using the advocacy case as the final review instead of verifying its claims.",
    visual: "chat",
    visualLabels: ["target proposal", "failure paths", "rejection case"],
    example: {
      title: "advocacy note",
      meta: "not evidence / one-sided case",
      lines: [
        "Advocacy exercise, not evidence.",
        "Target: replace the review packet with a dashboard.",
        "Failure path: the dashboard hides the requirement-level evidence.",
      ],
    },
  },
  {
    slug: "disrespec",
    name: "disrespec",
    kind: "method",
    tone: "muted",
    icon: Zap,
    description: "Anti-bloat vacuum cleaner.",
    rationale: "Point it at ceremonial sludge. Keep the facts.",
    output: "Tighter Markdown; every fact, decision, command, warning, and proof remains once.",
    boundary: "Markdown only. No invented facts or removed constraints.",
    misuse: "Cutting a constraint because it sounds repetitive.",
    visual: "before-after",
    example: {
      title: "copy pass",
      meta: "one fact / one home",
      lines: [
        "Before: A long explanation of why the command is important.",
        "After: Run the command. Paste its output.",
        "Kept: command, evidence requirement, action.",
      ],
    },
  },
  {
    slug: "dissect",
    name: "dissect",
    kind: "method",
    tone: "reference",
    icon: Search,
    description: "Trace a risky code path before changing it.",
    rationale: "Use it when callers, state, effects, failures, or configuration remain unproven.",
    output: "Bounded flow from entry point to effects, with unknown edges named.",
    boundary: "Traces one question. It is not an audit or redesign.",
    misuse: "Expanding the trace into a broad architecture audit.",
    visual: "flow",
    visualLabels: ["entry point", "state + branches", "terminal effects"],
    example: {
      title: "path map",
      meta: "entry -> branch -> effect",
      lines: [
        "Question: who writes the review decision?",
        "Entry: review route -> checker adapter",
        "Unknown: human selection after assessment",
      ],
    },
  },
  {
    slug: "fork-me",
    name: "fork-me",
    kind: "method",
    tone: "core",
    icon: GitFork,
    description: "Turn consequential ambiguity into a human choice.",
    rationale: "Use it when facts end but several valid paths remain.",
    output: "Recommendation-first picker with three real options and costs.",
    boundary: "No guessing. Dependent work waits for selection.",
    misuse: "Offering cosmetic options or continuing dependent work before selection.",
    visual: "decision",
    example: {
      title: "choice",
      meta: "human decision / blocked until selected",
      lines: [
        "Recommended: keep the existing API and add an adapter.",
        "Option 2: replace the API and migrate callers.",
        "Option 3: defer the change until the contract is settled.",
      ],
    },
  },
  {
    slug: "promote",
    name: "promote",
    kind: "method",
    tone: "reference",
    icon: ArrowUpRight,
    description: "Move a useful transient artifact into the project.",
    rationale: "Use it when a temporary record deserves a permanent home.",
    output: "Moved document, repaired references, validated format, explicit commit choice.",
    boundary: "Uses a real project destination. Never invents a store or pushes implicitly.",
    misuse: "Promoting a transient note without repairing references or checking its destination.",
    visual: "flow",
    visualLabels: ["transient record", "repair + validate", "project home"],
    example: {
      title: "promotion path",
      meta: "transient -> durable",
      lines: [
        "~/.agents/artifacts/app/AUDIT-api.md",
        "        | sanitize + repair links",
        "docs/decisions/AUDIT-api.md",
      ],
    },
  },
  {
    slug: "remember",
    name: "remember",
    kind: "method",
    tone: "evidence",
    icon: BookOpen,
    description: "Keep verified lessons after the work.",
    rationale: "Use it when a discovery will matter later.",
    output: "One evidenced, scoped claim in native memory or a project channel.",
    boundary: "Rejects weak or sensitive notes. Adds no Suspec memory store.",
    misuse: "Saving a hunch, secret, or narrow symptom as a general lesson.",
    visual: "memory",
    example: {
      title: "native memory",
      meta: "claim / evidence / boundary",
      lines: [
        "# Expired sessions return 409",
        "Evidence: checkout-expiry.test.ts",
        "Applies to checkout session expiry only.",
      ],
    },
  },
  {
    slug: "revolver",
    name: "revolver",
    kind: "method",
    tone: "core",
    icon: RefreshCw,
    description: "Attack a target from every relevant angle.",
    rationale: "Use it for broad adversarial coverage, resolving each finding before the next stance.",
    output: "Sequential stances, fixes, proof, and refutations.",
    boundary: "Creates no artifact. Stops on blockers or human decisions.",
    misuse: "Running every stance in parallel or moving on with an unresolved finding.",
    visual: "revolver",
    example: {
      title: "rotation log",
      meta: "stance 01 -> resolve -> stance 02",
      lines: [
        "01 contract: can the claim be falsified? resolved",
        "02 boundary: who owns the decision? resolved",
        "03 failure: what blocks the next pass? open",
      ],
    },
  },
  {
    slug: "sus-audit",
    name: "sus-audit",
    kind: "artifact",
    tone: "reference",
    icon: ScanSearch,
    description: "Record present code and its risks with evidence.",
    rationale: "Use it before anyone prescribes a change.",
    output: "Evidence-bound findings, firing conditions, blast radius, and unknowns.",
    boundary: "Observes and proves. No target state or fix.",
    misuse: "Turning an observation into a prescribed fix.",
    visual: "artifact",
    visualLabels: ["observed state", "evidence + risk", "unknowns"],
    example: {
      title: "audit.md",
      meta: "type: audit / present state",
      lines: [
        "type: audit",
        "## Finding",
        "Evidence: app/cache.ts:42",
        "Firing condition: stale key survives deploy",
      ],
    },
  },
  {
    slug: "sus-change-plan",
    name: "sus-change-plan",
    kind: "artifact",
    tone: "change",
    icon: Route,
    description: "Plan structural change without losing behavior.",
    rationale: "Use it when migrations, rewrites, or schema work require explicit preservation.",
    output: "Staged waves with preservation, verification, cutover, and rollback.",
    boundary: "Plans transformation. It neither replaces the spec nor implements.",
    misuse: "Calling a list of implementation tasks a preservation plan.",
    visual: "artifact",
    visualLabels: ["preservation", "transformation waves", "cutover + rollback"],
    example: {
      title: "change-plan.md",
      meta: "type: change-plan / wave 01",
      lines: [
        "preserves: SPEC-auth#AC-001",
        "Wave 01: add adapter",
        "Verify with: npm test -- adapter",
      ],
    },
  },
  {
    slug: "sus-inventory",
    name: "sus-inventory",
    kind: "artifact",
    tone: "reference",
    icon: MapIcon,
    description: "Map an unfamiliar code area from evidence.",
    rationale: "Use it before brownfield work when callers, tests, or coupling remain unproven.",
    output: "Present-state structure, interfaces, tests, constraints, and unknowns.",
    boundary: "Maps reality without judgment. Not a refactor plan.",
    misuse: "Treating the map as a recommendation or change plan.",
    visual: "artifact",
    visualLabels: ["modules + callers", "tests + constraints", "unknowns"],
    example: {
      title: "inventory.md",
      meta: "type: inventory / observed structure",
      lines: [
        "Observed structure: app/review/",
        "Interface: ReviewPacket -> CheckerReport",
        "Unknown: dynamic caller in generated route",
      ],
    },
  },
  {
    slug: "sus-research",
    name: "sus-research",
    kind: "artifact",
    tone: "evidence",
    icon: FolderSearch,
    description: "Research one decision until evidence can carry it.",
    rationale: "Use it when sources, uncertainty, and counter-evidence matter.",
    output: "Sourced findings, limits, and unresolved uncertainty.",
    boundary: "Informs the decision. Does not make it or fake certainty.",
    misuse: "Presenting a source gap as a decision.",
    visual: "artifact",
    visualLabels: ["question + sources", "findings + limits", "uncertainty"],
    example: {
      title: "research.md",
      meta: "type: research / one question",
      lines: [
        "Question: which adapter keeps the contract stable?",
        "Source: official API reference",
        "Open uncertainty: migration cost in older clients",
      ],
    },
  },
  {
    slug: "sus-review",
    name: "sus-review",
    kind: "artifact",
    tone: "evidence",
    icon: ClipboardCheck,
    description: "Reconcile finished work against its spec or task.",
    rationale: "Use it for independent, requirement-level evidence review.",
    output: "Coverage rows, evidence, findings, and a human-owned decision.",
    boundary: "Assesses evidence. Cannot accept its own work.",
    misuse: "Letting the reviewer grant acceptance or review its own implementation.",
    visual: "artifact",
    visualLabels: ["requirements", "evidence rows", "human decision"],
    example: {
      title: "review.md",
      meta: "type: review / requirement coverage",
      lines: [
        "| ID | Assessment | Evidence |",
        "| AC-001 | Supported | E-001 |",
        "| AC-002 | Unverified | missing receipt |",
      ],
    },
  },
  {
    slug: "sus-spec",
    name: "sus-spec",
    kind: "artifact",
    tone: "core",
    icon: FileText,
    description: "Turn decided intent into a verifiable spec.",
    rationale: "Use it when non-trivial work needs a contract before implementation.",
    output: "Intent, scoped AC ids, and one Verify with: line per requirement.",
    boundary: "Unresolved choices keep the spec draft and block dependent work.",
    misuse: "Writing unresolved choices as settled requirements.",
    visual: "artifact",
    visualLabels: ["intent + scope", "AC ids + verification", "ready contract"],
    example: {
      title: "spec.md",
      meta: "type: spec / ready",
      lines: [
        "### AC-001 — Expired sessions redirect",
        "The client redirects to /login.",
        "Verify with: npm test -- expired-session",
      ],
    },
  },
  {
    slug: "sus-task",
    name: "sus-task",
    kind: "artifact",
    tone: "core",
    icon: ListChecks,
    description: "Cut a ready spec into collision-free tasks.",
    rationale: "Use it only for independent slices or sequenced waves.",
    output: "Bounded packet with source spec, single-owner scope, and verify commands.",
    boundary: "Size alone proves nothing. Tasks never replace the spec.",
    misuse: "Splitting work merely because it is large.",
    visual: "artifact",
    visualLabels: ["source spec", "owned slice", "verify commands"],
    example: {
      title: "task.md",
      meta: "type: task / source: SPEC-auth",
      lines: [
        "scope: [AC-001, AC-002]",
        "Do not change: session persistence",
        "Verify: AC-001 -> npm test -- expired-session",
      ],
    },
  },
  {
    slug: "triple-check",
    name: "triple-check",
    kind: "method",
    tone: "core",
    icon: CheckCircle,
    description: "Run exactly three fresh passes over a narrow target.",
    rationale: "Use it when one high-consequence target merits three independent views.",
    output: "Three sequential passes with fixes and proof between them.",
    boundary: "Not a trace or broad audit. Unresolved defects block the next pass.",
    misuse: "Using it as a broad audit or counting three shallow passes as independent.",
    visual: "passes",
    example: {
      title: "pass ledger",
      meta: "fresh pass 01 -> 02 -> 03",
      lines: [
        "PASS 01 / contract boundary / fixed",
        "PASS 02 / failure path / refuted with evidence",
        "PASS 03 / regression surface / verified",
      ],
    },
  },
];

export const skillBySlug = new Map(skillDetails.map((skill) => [skill.slug, skill]));

export function getSkill(slug: string): SkillDetail | undefined {
  return skillBySlug.get(slug);
}

export function skillSourceUrl(slug: string): string {
  return `https://github.com/jcosta33/suspec-skills/blob/main/skills/${slug}/SKILL.md`;
}
