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
  title = "Suspec",
  ariaLabel,
}: TerminalWindowProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel ?? title}
      className={`terminal-window shadow-terminal-bevel relative min-w-0 overflow-hidden rounded-panel border border-panel-border bg-panel-raised ${className}`}
    >
      <div className="absolute inset-0 brushed-metal pointer-events-none" />
      <div className="terminal-toolbar relative flex min-w-0 items-center gap-3 border-b border-panel-border bg-panel-raised px-4 py-2">
        <div className="terminal-lamp-row flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <PilotLamp color="red" label="pwr" />
          <PilotLamp color="amber" pulse label="check" />
          <PilotLamp color="evidence" label="evidence" />
        </div>
        <div className="terminal-toolbar-actions ml-auto flex min-w-0 flex-1 items-center justify-end gap-2">
          <span className="terminal-title-label hidden min-w-0 items-center gap-2 font-mono font-medium uppercase engraved sm:flex">
            <span className="min-w-0 truncate">{title}</span>
            <span className="terminal-title-caret shrink-0" aria-hidden="true" />
          </span>
          {copyText && (
            <CopyButton
              text={copyText}
              label="Copy"
              ariaLabel={copyLabel ?? "Copy terminal contents"}
              compactLabel="Copy"
              className="terminal-copy-button"
            />
          )}
        </div>
      </div>
      <div
        className={`crt-screen terminal-content focus-ring relative max-h-[24rem] overflow-auto p-4 font-mono text-sm leading-relaxed text-concrete-100 sm:p-5 ${contentClassName}`}
        tabIndex={0}
      >
        <div className="pointer-events-none absolute inset-0 z-[3] animate-scanline bg-gradient-to-b from-transparent via-aurum/5 to-transparent opacity-20" />
        {children}
      </div>
    </div>
  );
}
