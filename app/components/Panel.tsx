import type { ReactNode } from "react";

export interface PanelProps {
  children: ReactNode;
  className?: string;
  variant?: "raised" | "inset";
  brushed?: boolean;
  rivets?: boolean;
  screws?: boolean;
  hazard?: boolean;
}

export function Panel({
  children,
  className = "",
  variant = "raised",
  brushed = false,
  rivets = false,
  screws = false,
  hazard = false,
}: PanelProps) {
  const base = variant === "inset" ? "panel-inset" : "panel-raised";
  return (
    <div
      data-screws={screws ? "true" : undefined}
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
      {hazard && (
        <div
          className="hazard-trim absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
