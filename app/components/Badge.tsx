import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
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

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default:
      "border-panel-border bg-panel-raised text-concrete-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
    success:
      "border-phosphor/60 bg-panel-raised text-phosphor shadow-[inset_0_0_8px_rgba(112,178,117,0.16)]",
    ready:
      "border-greenfield/60 bg-panel-raised text-greenfield shadow-[inset_0_0_8px_rgba(95,185,137,0.13)]",
    pass: "border-phosphor/60 bg-panel-raised text-phosphor",
    unverified: "border-amber/70 bg-panel-raised text-amber",
    blocked: "border-rubedo/70 bg-panel-raised text-rubedo",
    draft: "border-olive/55 bg-panel-raised text-olive",
    archived: "border-ash/70 bg-panel-raised text-concrete-400",
  };

  return (
    <span
      className={`inline-flex max-w-full min-w-0 items-center justify-center gap-1.5 rounded-sm border px-2.5 py-0.5 text-center font-mono text-xs font-semibold uppercase leading-snug tracking-wide ${styles[variant]}`}
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
