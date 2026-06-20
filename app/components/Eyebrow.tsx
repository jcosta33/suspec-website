import type { ReactNode } from "react";
import { SignalPulse } from "./SignalPulse";

export interface EyebrowProps {
  children: ReactNode;
  pulse?: boolean;
  className?: string;
}

export function Eyebrow({ children, pulse = true, className = "" }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 panel-raised brushed-metal px-4 py-1.5 ${className}`}
    >
      {pulse && <SignalPulse className="h-4 w-4" />}
      <span className="text-xs font-mono font-medium uppercase tracking-widest engraved">
        {children}
      </span>
    </div>
  );
}
