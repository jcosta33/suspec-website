// Palette grammar:
// core = loop/action, evidence = review/proof, greenfield = new workspaces,
// brownfield = existing codebases, change = edits/attention, reference = docs/catalogs.
// Prefer these role names over raw color aliases in new component code.
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
