import type { ReactNode } from "react";
import {
  normalizeSignalRole,
  type SignalInput,
} from "./signalStyles";

export interface BadgeProps {
  children: ReactNode;
  signal?: SignalInput;
  variant?:
    | "default"
    | "success"
    | "ready"
    | "pass"
    | "unverified"
    | "blocked"
    | "draft"
    | "archived";
}

export function Badge({ children, signal, variant = "default" }: BadgeProps) {
  // Status colors follow the site roles: ready/action = core, pass = evidence,
  // blocked = change, draft = reference, archived = muted.
  const styles = {
    default:
      "border-panel-border bg-panel-raised text-concrete-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    success: "badge-signal badge-signal-evidence",
    ready: "badge-signal badge-signal-core",
    pass: "badge-signal badge-signal-evidence",
    unverified: "badge-signal badge-signal-change",
    blocked: "badge-signal badge-signal-change",
    draft: "badge-signal badge-signal-reference",
    archived: "badge-signal badge-signal-muted",
  };

  const signalClass = signal
    ? `badge-signal badge-signal-${normalizeSignalRole(signal)}`
    : styles[variant];

  return (
    <span
      className={`inline-flex max-w-full min-w-0 items-center justify-center gap-1.5 rounded-sm border px-2.5 py-0.5 text-center font-mono text-xs font-semibold uppercase leading-snug tracking-wide ${signalClass}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      <span className="min-w-0 break-words [overflow-wrap:anywhere]">
        {children}
      </span>
    </span>
  );
}
