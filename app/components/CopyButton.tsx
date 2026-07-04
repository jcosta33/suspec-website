import { Check, Clipboard } from "lucide-react";

export interface CopyButtonProps {
  text: string;
  label?: string;
  compactLabel?: string;
  className?: string;
}

export function CopyButton({
  text,
  label = "Copy",
  compactLabel,
  className = "",
}: CopyButtonProps) {
  return (
    <button
      type="button"
      data-copied="false"
      data-copy-text={text}
      data-copy-label={label}
      data-copy-compact-label={compactLabel}
      data-compact-label={compactLabel ? "true" : "false"}
      className={`copy-button focus-ring rounded-control inline-flex min-h-11 items-center gap-1.5 border border-panel-border bg-panel-recessed/80 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-concrete-300 transition-[background-color,border-color,color,box-shadow] ${className}`}
      aria-label={label}
    >
      <Clipboard className="copy-button-icon copy-button-icon-copy h-3.5 w-3.5" aria-hidden="true" />
      <Check className="copy-button-icon copy-button-icon-check h-3.5 w-3.5" aria-hidden="true" />
      <span
        className="copy-button-label-full copy-button-label-stack"
        aria-live="polite"
      >
        <span className="copy-button-label-current">{label}</span>
        <span className="copy-button-label-sizer" aria-hidden="true">
          {label}
        </span>
        <span className="copy-button-label-sizer" aria-hidden="true">
          Copied
        </span>
      </span>
      {compactLabel && (
        <span
          className="copy-button-label-compact copy-button-label-stack"
          aria-hidden="true"
        >
          <span className="copy-button-label-current">{compactLabel}</span>
          <span className="copy-button-label-sizer" aria-hidden="true">
            {compactLabel}
          </span>
          <span className="copy-button-label-sizer" aria-hidden="true">
            Copied
          </span>
        </span>
      )}
    </button>
  );
}
