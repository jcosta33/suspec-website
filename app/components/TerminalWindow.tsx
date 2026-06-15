import type { ReactNode } from "react";
import { PilotLamp } from "./PilotLamp";

export interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function TerminalWindow({ children, className = "", title = "swarm" }: TerminalWindowProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={`relative overflow-hidden rounded-sm border border-panel-border bg-panel-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_0_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="absolute inset-0 brushed-metal pointer-events-none" />
      <div className="relative flex items-center justify-between gap-3 border-b border-panel-border bg-panel-raised px-4 py-2">
        <div className="flex items-center gap-3">
          <PilotLamp color="red" label="pwr" />
          <PilotLamp color="amber" pulse label="sts" />
          <PilotLamp color="green" label="sig" />
        </div>
        <span className="text-xs font-mono font-medium uppercase tracking-widest engraved">
          {title}
        </span>
      </div>
      <div className="crt-screen relative max-h-[24rem] overflow-y-auto p-5 text-concrete-100">
        <div className="pointer-events-none absolute inset-0 z-[3] animate-scanline bg-gradient-to-b from-transparent via-phosphor/5 to-transparent opacity-30" />
        {children}
      </div>
    </div>
  );
}
