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
  example: SkillExample;
};

export const skillDetails: readonly SkillDetail[] = [
  {
    slug: "bulletproof",
    name: "bulletproof",
    kind: "method",
    tone: "evidence",
    icon: ShieldCheck,
    description: "Crush unsupported claims with direct evidence.",
    rationale:
      "Use it when a claim matters enough to test instead of trusting plausible prose or a green check.",
    output:
      "An in-chat evidence table: Supported, Unsupported, Unverified, or Blocked, with the proof for each row.",
    boundary:
      "It verifies a bounded claim set. It does not perform a broad risk review or issue acceptance.",
    misuse: "Treating a plausible citation or green check as proof without inspecting it.",
    visual: "chat",
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
    description: "Destroy an idea, design, claim, change, or plan through explicit one-sided advocacy.",
    rationale:
      "Use it when the strongest case against a proposal is more useful than another balanced summary.",
    output:
      "A focused in-chat rejection case that exposes assumptions, failure paths, and opportunity costs.",
    boundary:
      "Its advocacy is not evidence. Claims from the exercise need independent verification before use.",
    misuse: "Using the advocacy case as the final review instead of verifying its claims.",
    visual: "chat",
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
    description: "Make supplied Markdown ruthless and economical.",
    rationale:
      "Use it when repetition, soft framing, or ceremony is consuming attention without changing the work.",
    output:
      "A tighter version of the supplied Markdown with every fact, decision, command, warning, and proof still present once.",
    boundary:
      "It edits Markdown. It does not compress source code, invent missing facts, or remove load-bearing constraints.",
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
    description: "Cut an unfamiliar or dangerous code path open before changing or judging it.",
    rationale:
      "Use it when callers, state, effects, failure handling, or configuration remain unproven.",
    output:
      "A bounded flow from entry point to terminal effects, with every unresolved edge named.",
    boundary:
      "It traces one question to closure. It does not replace a broad audit or prescribe a redesign.",
    misuse: "Expanding the trace into a broad architecture audit.",
    visual: "flow",
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
    description: "Force every ambiguity into explicit human selection.",
    rationale:
      "Use it when facts are exhausted but scope, authority, behavior, or tradeoffs still have multiple valid paths.",
    output:
      "A recommendation-first picker with at least three materially different options and their costs.",
    boundary:
      "It does not guess. Dependent work stops until the human selects an option.",
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
    description: "Move a transient artifact into project-owned permanence.",
    rationale:
      "Use it when a temporary record has durable value and needs a real home in the project.",
    output:
      "A moved document with repaired references, validated format, and an explicit commit choice.",
    boundary:
      "It promotes selected content into a project-owned destination. It does not invent a store or push implicitly.",
    misuse: "Promoting a transient note without repairing references or checking its destination.",
    visual: "flow",
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
    description: "Preserve verified lessons after work settles.",
    rationale:
      "Use it when a discovery, constraint, edge case, or pattern will matter to later work.",
    output:
      "One durable claim with evidence, scope, and boundaries in native memory or a project channel.",
    boundary:
      "It rejects weak or sensitive observations and adds no parallel Suspec memory store.",
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
    description: "Hammer code, diffs, artifacts, plans, or systems from every relevant angle.",
    rationale:
      "Use it for broad adversarial coverage when each finding must be resolved before the next reviewer sees the target.",
    output:
      "A full sequential rotation of target-derived stances, fixes, proof, and consequential refutations.",
    boundary:
      "It creates no artifact. It stops on an unresolved blocker or human decision instead of silently moving on.",
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
    description: "Audit present code and expose its risk with exact evidence.",
    rationale:
      "Use it to record the current state and its risks before anyone prescribes a change.",
    output:
      "An evidence-bound audit with findings, firing conditions, blast radius, and unknowns.",
    boundary:
      "It observes and proves. It does not write a target state or prescribe the fix.",
    misuse: "Turning an observation into a prescribed fix.",
    visual: "artifact",
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
    rationale:
      "Use it for migrations, rewrites, schema work, or other changes where preservation must be explicit.",
    output:
      "A staged transformation with preservation guarantees, verification per wave, cutover, and rollback.",
    boundary:
      "It plans the transformation. It does not replace the governing spec or implement the change.",
    misuse: "Calling a list of implementation tasks a preservation plan.",
    visual: "artifact",
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
    description: "Reconstruct an unfamiliar or change-critical code area from evidence.",
    rationale:
      "Use it before brownfield work when modules, callers, tests, or coupling are not yet proven.",
    output:
      "A present-state map of structure, interfaces, tests, constraints, and unknowns.",
    boundary:
      "It maps reality without judgment or prescriptions. It is not a refactor plan.",
    misuse: "Treating the map as a recommendation or change plan.",
    visual: "artifact",
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
    description: "Research a decision until evidence can carry it.",
    rationale:
      "Use it for one decision-informing question where sources, uncertainty, and counter-evidence matter.",
    output:
      "A source-qualified research note with findings, limitations, and unresolved uncertainty.",
    boundary:
      "It informs a decision without making the decision or manufacturing certainty.",
    misuse: "Presenting a source gap as a decision.",
    visual: "artifact",
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
    description: "Put finished work on trial against its governing Suspec spec or task.",
    rationale:
      "Use it when implementation evidence needs requirement-level reconciliation by an independent reviewer.",
    output:
      "A review packet with one coverage row per requirement, evidence, findings, and a human-owned decision.",
    boundary:
      "The reviewer assesses evidence; it cannot accept work or grant its own final authority.",
    misuse: "Letting the reviewer grant acceptance or review its own implementation.",
    visual: "artifact",
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
    description: "Forge decided intent into a verifiable Suspec spec.",
    rationale:
      "Use it when a non-trivial change needs a contract before implementation begins.",
    output:
      "A lean spec with intent, scoped requirements, stable AC ids, and a Verify with: line for each requirement.",
    boundary:
      "It captures decided intent. Unresolved choices keep the spec draft and block dependent work.",
    misuse: "Writing unresolved choices as settled requirements.",
    visual: "artifact",
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
    description: "Cut a ready Suspec spec into collision-proof task packets.",
    rationale:
      "Use it only when a spec has independently dispatchable slices or sequenced transformation waves.",
    output:
      "A bounded packet that preserves the source spec, assigns scope once, and carries its verify commands.",
    boundary:
      "Size alone does not justify a task. A task never replaces the governing spec.",
    misuse: "Splitting work merely because it is large.",
    visual: "artifact",
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
    description: "Crush a narrow target through exactly three fresh top-tier passes.",
    rationale:
      "Use it for a focused high-consequence target that merits three independent views and current-state fixes between them.",
    output:
      "Three sequential passes, each seeing the addressed target, with supported defects fixed and verified before the next.",
    boundary:
      "It is not a general trace or broad audit. An unresolved defect blocks the next pass.",
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
