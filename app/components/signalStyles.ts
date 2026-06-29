// Palette grammar:
// core = Corpus identity / loop / primary action
// evidence = proof / review / verified output, not generic "green means good"
// greenfield = literal new-repo or starter-kit paths only
// brownfield = existing-project adoption and migration paths only
// change = edits / fixes / run work / blocked or attention states
// reference = docs / manuals / command catalogs / ledgers / read-only rosters
// muted = hardware, chrome, and non-semantic labels
// Prefer these role names over raw color aliases in new component code.
// The hue family is intentional: core starts at gold HSL(34 71% 49%).
// The exact complement is reserved for diagnostics; public complements use
// softer field, sage, umber, readable red-oxide, and verdigris roles. Brown means existing
// project; green means greenfield, not "good"; sage means evidence, not "new".
// Cyan and faded periwinkle are reserved for package hero accents, not general
// status or work-state meaning.
// A role is more than a color: use it for the text, lamp, rail, border, hatch,
// mark, icon, command plate, and hover state. Package cyan and faded periwinkle are
// identity accents only; terminal/status lamps stay semantic. Setup is not
// automatically green: only new-workspace paths get greenfield; mixed setup
// surfaces use reference, core, or muted. If a
// role appears on only one of those surfaces, the color will read as random
// decoration instead of product meaning.
// In CSS, reach for --signal-pattern-* and --signal-mark-* with the matching
// --signal-* token before adding a local gradient. Local treatments can adjust
// strength, not meaning.
export const signalRoleMeta = {
  core: {
    label: "core",
    family: "identity / action",
    hex: "#D88A24",
    relationship: "base hue: HSL(34 71% 49%)",
    wheel: "0° from core",
    tone: "orangy gold",
    use: "Corpus identity, primary CTAs, active navigation, and current loop state.",
    surface: "solid gilt plate, active rails, and primary controls",
    pattern: "single gilt rail with a soft center glow",
    avoid: "Do not use as a generic highlight when a more specific role exists.",
    example: "Start the loop, active nav, current step.",
  },
  evidence: {
    label: "evidence",
    family: "review / proof",
    hex: "#B7C96C",
    relationship: "olive-sage proof: HSL(72 46% 61%)",
    wheel: "+38° from core",
    tone: "olive-sage proof",
    use: "Review proof, verified output, factual claims, pass states, and evidence-oriented sections.",
    surface: "checkpoint ticks, pass lamps, and review rails",
    pattern: "small checkpoint marks and vertical proof ticks",
    avoid: "Do not use for setup paths, read-only lists, missing evidence, existing projects, or generic 'nice' accents.",
    example: "PASS, verified output, human-reviewed evidence.",
  },
  greenfield: {
    label: "greenfield",
    family: "setup path",
    hex: "#7FBD82",
    relationship: "fresh field green: HSL(123 32% 62%)",
    wheel: "+89° from core",
    tone: "fresh field green",
    use: "Fresh workspace setup paths, starter kits, first-run tutorial paths, and new-repo choices.",
    surface: "new-file icons, starter-kit cards, clean-start rails, and first-run command plates",
    pattern: "upright field rows with sparse seed marks",
    avoid: "Do not use for existing-project adoption, review success, or generic positive emphasis.",
    example: "New repo, starter kit, first-run tutorial.",
  },
  brownfield: {
    label: "brownfield",
    family: "setup path",
    hex: "#A96B40",
    relationship: "survey umber: HSL(25 45% 46%)",
    wheel: "-9° from core",
    tone: "survey umber",
    use: "Existing-project adoption, migration, repo-history paths, and brownfield choices only.",
    surface: "existing-project icons, adoption cards, repo-history rails, and migration command plates",
    pattern: "diagonal survey hatching with inherited-ground corner marks",
    avoid: "Do not use for new work, success, warnings, or generic warmth.",
    example: "Existing project, adopting guide, repo with history.",
  },
  change: {
    label: "change",
    family: "work / attention",
    hex: "#BD4B4F",
    relationship: "cinnabar attention: HSL(358 46% 52%)",
    wheel: "-39° from core",
    tone: "cinnabar red",
    use: "Edits, fixes, run work, blocked states, and attention markers.",
    surface: "angled change hatching and work-in-progress rails",
    pattern: "angled change hatching",
    avoid:
      "Do not use for normal navigation, reference material, or decorative contrast beside core gold.",
    example: "Change plans, run work, blocked, unverified, needs attention.",
  },
  reference: {
    label: "reference",
    family: "manual / catalog",
    hex: "#78BDB2",
    relationship: "tempered split-complement: HSL(170 34% 61%)",
    wheel: "+136° from core",
    tone: "verdigris ledger",
    use: "Docs, manuals, command catalogs, ledgers, index surfaces, loaders, and read-only rosters.",
    surface: "ledger rules, source notes, and reference shelves",
    pattern: "horizontal ledger rules",
    avoid: "Do not use for proof/pass states or primary calls to action.",
    example: "Docs source notes, CLI command catalog, manuals.",
  },
  muted: {
    label: "muted",
    family: "hardware / neutral",
    hex: "#B8844A",
    relationship: "aged brass analogue: HSL(32 44% 51%)",
    wheel: "-2° from core",
    tone: "aged brass",
    use: "Hardware chrome, low-emphasis labels, and neutral UI detail.",
    surface: "screws, rulers, low-emphasis counters, and chassis trim",
    pattern: "quiet brass ruler marks",
    avoid: "Do not use when the color carries product meaning.",
    example: "Panel labels, screws, rails, low-emphasis counters.",
  },
} as const;

export const signalRoles = {
  core: {
    text: "text-signal-core",
    hex: "core",
    sectionKicker: "section-kicker-core",
    processItem: "process-item-signal-core",
    accentCard: "accent-card-core",
    hoverBorder: "hover-border-signal-core",
  },
  evidence: {
    text: "text-signal-evidence",
    hex: "evidence",
    sectionKicker: "section-kicker-evidence",
    processItem: "process-item-signal-evidence",
    accentCard: "accent-card-evidence",
    hoverBorder: "hover-border-signal-evidence",
  },
  greenfield: {
    text: "text-signal-greenfield",
    hex: "greenfield",
    sectionKicker: "section-kicker-greenfield",
    processItem: "process-item-signal-greenfield",
    accentCard: "accent-card-greenfield",
    hoverBorder: "hover-border-signal-greenfield",
  },
  brownfield: {
    text: "text-signal-brownfield",
    hex: "brownfield",
    sectionKicker: "section-kicker-brownfield",
    processItem: "process-item-signal-brownfield",
    accentCard: "accent-card-brownfield",
    hoverBorder: "hover-border-signal-brownfield",
  },
  change: {
    text: "text-signal-change",
    hex: "change",
    sectionKicker: "section-kicker-change",
    processItem: "process-item-signal-change",
    accentCard: "accent-card-change",
    hoverBorder: "hover-border-signal-change",
  },
  reference: {
    text: "text-signal-reference",
    hex: "reference",
    sectionKicker: "section-kicker-reference",
    processItem: "process-item-signal-reference",
    accentCard: "accent-card-reference",
    hoverBorder: "hover-border-signal-reference",
  },
  muted: {
    text: "text-signal-muted",
    hex: "muted",
    sectionKicker: "section-kicker-muted",
    processItem: "process-item-signal-muted",
    accentCard: "accent-card-muted",
    hoverBorder: "hover-border-signal-muted",
  },
} as const;

export type SignalRole = keyof typeof signalRoles;

export const signalRoleOrder = [
  "core",
  "greenfield",
  "brownfield",
  "change",
  "evidence",
  "reference",
  "muted",
] as const satisfies readonly SignalRole[];

export const signalKeyItemByRole = {
  core: {
    label: "Core",
    role: "core",
    detail: "identity, primary CTA, current step",
  },
  greenfield: {
    label: "Greenfield",
    role: "greenfield",
    detail: "new repo, starter kit, first run",
  },
  brownfield: {
    label: "Brownfield",
    role: "brownfield",
    detail: "existing project, adoption, migration",
  },
  change: {
    label: "Change",
    role: "change",
    detail: "edits, fixes, blocked or unverified work",
  },
  evidence: {
    label: "Evidence",
    role: "evidence",
    detail: "review proof, facts, checked output",
  },
  reference: {
    label: "Reference",
    role: "reference",
    detail: "docs, ledgers, catalogs, source context",
  },
  muted: {
    label: "Muted",
    role: "muted",
    detail: "hardware, counters, neutral trim",
  },
} as const satisfies Record<
  SignalRole,
  { label: string; role: SignalRole; detail: string }
>;

export const signalSystemKey = signalRoleOrder.map(
  (role) => signalKeyItemByRole[role],
);

export const setupPathSignalKey = [
  signalKeyItemByRole.greenfield,
  signalKeyItemByRole.brownfield,
] as const;

export type SignalAlias = "yellow" | "gold" | "orange" | "olive" | "brass";

export type SignalInput = SignalRole | SignalAlias;

const aliases = {
  yellow: "core",
  gold: "core",
  orange: "core",
  olive: "evidence",
  brass: "muted",
} as const satisfies Record<SignalAlias, SignalRole>;

function isSignalAlias(signal: SignalInput): signal is SignalAlias {
  return signal in aliases;
}

export function normalizeSignalRole(signal: SignalInput): SignalRole {
  return isSignalAlias(signal) ? aliases[signal] : signal;
}
