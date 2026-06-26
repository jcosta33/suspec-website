// Palette grammar:
// core = corpus identity / loop / primary action
// evidence = review proof / verified output / pass states
// greenfield = new workspace or starter-kit paths only
// brownfield = existing-project adoption paths only
// change = edits / fixes / blocked or attention states
// reference = docs / manuals / command catalogs / ledgers
// muted = hardware, chrome, and non-semantic labels
// Prefer these role names over raw color aliases in new component code.
export const signalRoleMeta = {
  core: {
    label: "core",
    hex: "#D88A24",
    tone: "orangy gold",
    use: "Corpus identity, primary actions, active navigation, and current loop state.",
    avoid: "Do not use as a generic highlight when a more specific role exists.",
    example: "Start the loop, active nav, current step.",
  },
  evidence: {
    label: "evidence",
    hex: "#8ABF6B",
    tone: "proof green",
    use: "Review proof, verified output, pass states, and evidence-oriented sections.",
    avoid: "Do not use for setup paths or generic 'nice' accents.",
    example: "PASS, verified output, human-reviewed evidence.",
  },
  greenfield: {
    label: "greenfield",
    hex: "#5FBD8B",
    tone: "fresh green",
    use: "Fresh workspace setup paths only.",
    avoid: "Do not use for existing-project adoption or review success.",
    example: "New repo, starter kit, clean project path.",
  },
  brownfield: {
    label: "brownfield",
    hex: "#B9784E",
    tone: "earth copper",
    use: "Existing-project adoption paths only.",
    avoid: "Do not use for new work, success, or warnings.",
    example: "Existing project, adopt kit, repo with history.",
  },
  change: {
    label: "change",
    hex: "#CA7059",
    tone: "red clay",
    use: "Edits, fixes, blocked states, and attention markers.",
    avoid: "Do not use for normal navigation or reference material.",
    example: "Change plans, blocked, unverified, needs attention.",
  },
  reference: {
    label: "reference",
    hex: "#A6913D",
    tone: "olive ledger",
    use: "Docs, manuals, command catalogs, ledgers, and index surfaces.",
    avoid: "Do not use for proof/pass states or primary calls to action.",
    example: "Docs source notes, CLI command catalog, manuals.",
  },
  muted: {
    label: "muted",
    hex: "#BF7927",
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
