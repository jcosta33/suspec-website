import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle,
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
  Workflow,
  Zap,
} from "lucide-react";
import type { SignalRole } from "../components/signalStyles";
import {
  CANON_REPOSITORY,
  CANON_REVISION,
  SKILLS_REPOSITORY,
  SKILLS_REVISION,
} from "../productFacts";

export type SkillKind = "method" | "artifact";
export type SkillVisual =
  | "artifact"
  | "before-after"
  | "campaign"
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
    slug: "ask-user",
    name: "ask-user",
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
    slug: "bulletproof",
    name: "bulletproof",
    kind: "method",
    tone: "evidence",
    icon: ShieldCheck,
    description: "Fact-check claims and prove finished implementation.",
    rationale: "Use it when a claim needs evidence or completed work needs decisive command proof.",
    output: "In-chat evidence table: Supported, Unsupported, Unverified, or Blocked, with proof.",
    boundary: "Not broad risk discovery, spec conformance, or one-sided advocacy.",
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
    slug: "debloat",
    name: "debloat",
    kind: "method",
    tone: "muted",
    icon: Zap,
    description: "Anti-bloat vacuum cleaner.",
    rationale: "Point it at ceremonial sludge. Keep the facts.",
    output: "Tighter Markdown; every fact, decision, command, warning, and proof remains once.",
    boundary: "No source code, commit messages, or repository-native pull-request forms.",
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
    slug: "demolition",
    name: "demolition",
    kind: "method",
    tone: "change",
    icon: Swords,
    description: "Make the strongest case against a proposal.",
    rationale: "Use it only when the user explicitly asks for attack-at-all-costs advocacy.",
    output: "In-chat rejection case: assumptions, failure paths, opportunity costs.",
    boundary: "Not balanced evaluation, factual verification, or verdict-bearing review.",
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
    slug: "drill",
    name: "drill",
    kind: "method",
    tone: "core",
    icon: Route,
    description: "Lock language, obligation, place, and slice before writing.",
    rationale: "Use it when the levels mix, or implementation starts before the place is settled.",
    output: "The four locks, the write, and the verify evidence. No Suspec artifact.",
    boundary: "One seam. Escalate when ordered waves and rollback must outlive the session.",
    misuse: "Asking a lower question while a higher lock is still open.",
    visual: "passes",
    visualLabels: ["language", "obligation + place", "slice"],
    example: {
      title: "locks",
      meta: "one seam / native notes",
      lines: [
        "Language: the token store, not the session cache.",
        "Obligation: existing sessions survive; verify with the refresh test.",
        "Place: authRefresh.ts, one boundary. Slice: swap the lookup.",
      ],
    },
  },
  {
    slug: "panel",
    name: "panel",
    kind: "method",
    tone: "reference",
    icon: GitFork,
    description: "Produce one recommendation from independent analysis of legitimate alternatives.",
    rationale: "Use it when a consequential choice needs several perspectives before a human decides.",
    output: "One recommendation, a compact comparison, the strongest dissent, and the unknowns. No Suspec artifact.",
    boundary: "Chat only. It writes no artifact and does not decide human-owned intent.",
    misuse: "Running a panel when direct evidence already settles the choice.",
    visual: "decision",
    visualLabels: ["one question", "blind analyses", "one recommendation"],
    example: {
      title: "panel.md",
      meta: "type: panel / recommendation",
      lines: [
        "Question: store sessions in Redis or Postgres?",
        "Recommendation: Postgres; one system of record.",
        "Dissent: Redis if TTL eviction is a hard requirement.",
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
    description: "Exhaust every target-justified angle, repairing between stances.",
    rationale: "Use it when broad risk needs adaptive, sequential scrutiny rather than a fixed panel.",
    output: "Material fixes and proof, consequential refutations, and unresolved human decisions.",
    boundary: "No fixed stance count. Reviewers stay read-only; the orchestrator repairs.",
    misuse: "Adding filler stances, parallelizing the pool, or carrying a finding forward unresolved.",
    visual: "revolver",
    example: {
      title: "rotation log",
      meta: "stance 01 -> resolve -> stance 02",
      lines: [
        "pool: contract / boundary / failure / user",
        "stance: current target only -> resolved",
        "next rotation: rebuild the pool; no filler",
      ],
    },
  },
  {
    slug: "settle",
    name: "settle",
    kind: "method",
    tone: "evidence",
    icon: Search,
    description: "Resolve technical ambiguity from evidence instead of asking the user.",
    rationale: "Use it when implementation would stop for a technical question that the repository can answer.",
    output: "The decision, decisive evidence, why the nearest alternative lost, and residual risk.",
    boundary: "Not product intent, public behavior, material security or cost, waivers, or acceptance.",
    misuse: "Dumping a solvable technical choice on the user, or treating model agreement as proof.",
    visual: "chat",
    visualLabels: ["one decision", "repository evidence", "chosen option"],
    example: {
      title: "settlement",
      meta: "technical choice / proven",
      lines: [
        "Decision: accept type: panel as unchecked.",
        "Evidence: checks.yaml recognized_unchecked includes panel.",
        "Rejected: treat panel as unknown and fail the adapter.",
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
    slug: "sus-campaign",
    name: "sus-campaign",
    kind: "artifact",
    tone: "reference",
    icon: Workflow,
    description: "Write a restartable goal contract for one multi-pull-request delivery campaign.",
    rationale: "Use it when one durable objective needs write-disjoint streams and a project-native ledger.",
    output: "A type: campaign artifact that points at the ledger. The ledger owns mutable status.",
    boundary: "Does not grant merge, cleanup, credential, or resource authority.",
    misuse: "Using it for one pull request, sequential work, or a snapshot that mirrors tracker state.",
    visual: "campaign",
    visualLabels: ["goal contract", "native ledger", "write-disjoint lanes"],
    example: {
      title: "campaign.md",
      meta: "type: campaign / ready",
      lines: [
        "status: ready",
        "ledger: https://github.com/example/shop/issues/123",
        "Completion: auth migration merged; C029–C031 clean",
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
    description: "Run three fresh top-tier reviews in one parallel wave.",
    rationale: "Use it when a frozen target needs fast, independent scrutiny.",
    output: "Three attacks, one reconciled finding set, one repair, and final proof.",
    boundary: "Exactly three reviewers see the same snapshot and no peer prose.",
    misuse: "Running passes sequentially, sharing reviewer notes, or repeating without an explicit request.",
    visual: "passes",
    example: {
      title: "pass report",
      meta: "three fresh reviews / one frozen snapshot",
      lines: [
        "REVIEW 01 / same snapshot / independent",
        "REVIEW 02 / same snapshot / independent",
        "REVIEW 03 / same snapshot / independent",
        "RECONCILE -> REPAIR ONCE -> VERIFY",
      ],
    },
  },
];

export const skillBySlug = new Map(skillDetails.map((skill) => [skill.slug, skill]));

export function getSkill(slug: string): SkillDetail | undefined {
  return skillBySlug.get(slug);
}

export function skillSourceUrl(slug: string): string {
  const [repository, revision] = slug.startsWith("sus-")
    ? [CANON_REPOSITORY, CANON_REVISION]
    : [SKILLS_REPOSITORY, SKILLS_REVISION];
  return `${repository}/blob/${revision}/skills/${slug}/SKILL.md`;
}
