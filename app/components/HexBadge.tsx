import type { ReactNode } from "react";

export interface HexBadgeProps {
  children: ReactNode;
  className?: string;
  color?: "yellow" | "orange" | "green";
}

export function HexBadge({
  children,
  className = "",
  color = "yellow",
}: HexBadgeProps) {
  const colors = {
    yellow: "border-corpus-yellow/80 text-corpus-yellow",
    orange: "border-hazard-orange/80 text-hazard-orange",
    green: "border-drone-green/80 text-drone-green",
  };

  return (
    <div
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center clip-hex border-2 bg-panel-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-3px_4px_rgba(0,0,0,0.45)] ${colors[color]} ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent" />
      <span className="relative drop-shadow-[0_0_6px_currentColor]">
        {children}
      </span>
    </div>
  );
}
