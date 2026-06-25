import type { ReactNode } from "react";

export interface PanelProps {
  children: ReactNode;
  className?: string;
  variant?: "raised" | "inset";
  brushed?: boolean;
  rivets?: boolean;
  screws?: boolean;
  gilt?: boolean;
}

export function Panel({
  children,
  className = "",
  variant = "raised",
  brushed = false,
  rivets = false,
  screws = false,
  gilt = false,
}: PanelProps) {
  const base = variant === "inset" ? "panel-inset" : "panel-raised";
  return (
    <div
      className={`${base} relative overflow-hidden ${
        screws ? "screw-corners screw-corners-bottom" : ""
      } ${className}`}
    >
      {brushed && (
        <div
          className="brushed-metal absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      {rivets && (
        <div
          className="rivet-row absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      {gilt && (
        <div
          className="gilt-trim absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      <div className="surface-glint absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
