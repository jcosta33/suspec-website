// Palette grammar:
// core = corpus identity / loop / primary action
// evidence = review proof / verified output / pass states
// greenfield = new workspace or starter-kit paths only
// brownfield = existing-project adoption paths only
// change = edits / fixes / run work / blocked or attention states
// reference = docs / manuals / command catalogs / ledgers
// muted = hardware, chrome, and non-semantic labels
// Prefer these role names over raw color aliases in new component code.
export const signalRoleMeta = {
  core: {
    label: "core",
    hex: "#D88A24",
    relationship: "base hue: HSL(34 71% 49%)",
    tone: "orangy gold",
    use: "Corpus identity, primary actions, active navigation, and current loop state.",
    avoid: "Do not use as a generic highlight when a more specific role exists.",
    example: "Start the loop, active nav, current step.",
  },
  evidence: {
    label: "evidence",
    hex: "#8ABF6B",
    relationship: "warm proof green: HSL(98 40% 58%)",
    tone: "proof green",
    use: "Review proof, verified output, pass states, and evidence-oriented sections.",
    avoid: "Do not use for setup paths, existing projects, or generic 'nice' accents.",
    example: "PASS, verified output, human-reviewed evidence.",
  },
  greenfield: {
    label: "greenfield",
    hex: "#62C79D",
    relationship: "fresh field green: HSL(155 47% 58%)",
    tone: "fresh field green",
    use: "Fresh workspace setup paths and first-run starts.",
    avoid: "Do not use for existing-project adoption or review success.",
    example: "New repo, starter kit, first pass through the docs.",
  },
  brownfield: {
    label: "brownfield",
    hex: "#BC8055",
    relationship: "earth analogue: HSL(25 44% 54%)",
    tone: "brownfield copper",
    use: "Existing-project adoption paths only.",
    avoid: "Do not use for new work, success, or warnings.",
    example: "Existing project, adopt kit, repo with history.",
  },
  change: {
    label: "change",
    hex: "#CA7059",
    relationship: "red-clay analogue: HSL(12 52% 57%)",
    tone: "red clay",
    use: "Edits, fixes, run work, blocked states, and attention markers.",
    avoid: "Do not use for normal navigation or reference material.",
    example: "Change plans, run work, blocked, unverified, needs attention.",
  },
  reference: {
    label: "reference",
    hex: "#76B8A9",
    relationship: "tempered complement: HSL(166 32% 59%)",
    tone: "verdigris ledger",
    use: "Docs, manuals, command catalogs, ledgers, and index surfaces.",
    avoid: "Do not use for proof/pass states or primary calls to action.",
    example: "Docs source notes, CLI command catalog, manuals.",
  },
  muted: {
    label: "muted",
    hex: "#BF7927",
    relationship: "aged brass analogue: HSL(32 66% 45%)",
    tone: "aged brass",
    use: "Hardware chrome, low-emphasis labels, and neutral UI detail.",
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

export type SignalAlias = "yellow" | "gold" | "green" | "orange" | "olive" | "brass";

export type SignalInput = SignalRole | SignalAlias;

const aliases = {
  yellow: "core",
  gold: "core",
  green: "evidence",
  orange: "change",
  olive: "reference",
  brass: "muted",
} as const satisfies Record<SignalAlias, SignalRole>;

function isSignalAlias(signal: SignalInput): signal is SignalAlias {
  return signal in aliases;
}

export function normalizeSignalRole(signal: SignalInput): SignalRole {
  return isSignalAlias(signal) ? aliases[signal] : signal;
}
