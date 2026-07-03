import type { ReactNode } from "react";
import {
  normalizeSignalRole,
  signalRoles,
  type SignalInput,
} from "./signalStyles";

export interface HexBadgeProps {
  children: ReactNode;
  className?: string;
  color?: SignalInput;
}

export function HexBadge({
  children,
  className = "",
  color = "core",
}: HexBadgeProps) {
  const role = normalizeSignalRole(color);

  return (
    <div
      className={`hex-badge hex-badge-${role} shadow-hex-bevel relative flex h-14 w-14 shrink-0 items-center justify-center clip-hex ${signalRoles[role].text} ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent" />
      <span className="hex-badge-rail hex-badge-rail-left" aria-hidden="true" />
      <span className="hex-badge-rail hex-badge-rail-right" aria-hidden="true" />
      <span className="relative drop-shadow-[0_0_6px_currentColor]">
        {children}
      </span>
    </div>
  );
}
