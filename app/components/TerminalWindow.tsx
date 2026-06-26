import type { ReactNode } from "react";
import { CopyButton } from "./CopyButton";
import { PilotLamp } from "./PilotLamp";

export interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
  copyLabel?: string;
  copyText?: string;
  contentClassName?: string;
  title?: string;
  ariaLabel?: string;
}

export function TerminalWindow({
  children,
  className = "",
  copyLabel,
  copyText,
  contentClassName = "",
  title = "Corpus",
  ariaLabel,
}: TerminalWindowProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel ?? title}
      className={`terminal-window relative min-w-0 overflow-hidden rounded-panel border border-panel-border bg-panel-raised shadow-[inset_0_1px_0_rgba(240,226,204,0.08),inset_0_-2px_0_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="absolute inset-0 brushed-metal pointer-events-none" />
      <div className="relative flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-panel-border bg-panel-raised px-4 py-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <PilotLamp color="change" label="pwr" />
          <PilotLamp color="core" pulse label="check" />
          <PilotLamp color="evidence" label="evidence" />
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden min-w-0 items-center gap-2 text-xs font-mono font-medium uppercase tracking-widest engraved sm:flex">
            <span className="min-w-0 break-words">{title}</span>
            <span className="terminal-title-caret shrink-0" aria-hidden="true" />
          </span>
          {copyText && <CopyButton text={copyText} label={copyLabel} />}
        </div>
      </div>
      <div
        className={`crt-screen terminal-content relative max-h-[24rem] overflow-auto p-4 font-mono text-sm leading-relaxed text-concrete-100 sm:p-5 ${contentClassName}`}
      >
        <div className="pointer-events-none absolute inset-0 z-[3] animate-scanline bg-gradient-to-b from-transparent via-aurum/5 to-transparent opacity-20" />
        {children}
      </div>
    </div>
  );
}
