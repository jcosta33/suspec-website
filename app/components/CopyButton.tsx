import { Check, Clipboard } from "lucide-react";

export interface CopyButtonProps {
  ariaLabel?: string;
  text: string;
  label?: string;
  compactLabel?: string;
  className?: string;
}

export function CopyButton({
  ariaLabel,
  text,
  label = "Copy",
  compactLabel,
  className = "",
}: CopyButtonProps) {
  const compactSuccessLabel = compactLabel ? "Done" : "Copied";

  return (
    <button
      type="button"
      data-copied="false"
      data-copy-text={text}
      data-copy-label={label}
      data-copy-compact-label={compactLabel}
      data-copy-aria-label={ariaLabel ?? label}
      data-copy-compact-success-label={compactSuccessLabel}
      data-compact-label={compactLabel ? "true" : "false"}
      className={`copy-button focus-ring rounded-control inline-flex min-h-10 items-center gap-1 border border-panel-border bg-panel-recessed/80 px-2 py-1 font-mono text-[10px] font-bold leading-none tracking-[0.06em] text-concrete-300 transition-[background-color,border-color,color,box-shadow] ${className}`}
      aria-label={ariaLabel ?? label}
    >
      <Clipboard className="copy-button-icon copy-button-icon-copy h-3 w-3" aria-hidden="true" />
      <Check className="copy-button-icon copy-button-icon-check h-3 w-3" aria-hidden="true" />
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
            {compactSuccessLabel}
          </span>
        </span>
      )}
    </button>
  );
}
