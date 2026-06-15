import type { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "hazard" | "success";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default:
      "border-panel-border bg-panel-raised text-concrete-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] engraved",
    hazard:
      "border-swarm-yellow bg-panel-raised text-swarm-yellow font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
    success:
      "border-panel-border bg-panel-raised text-drone-green shadow-[inset_0_0_8px_rgba(34,197,94,0.25)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
