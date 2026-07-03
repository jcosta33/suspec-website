"use client";

import { Check, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function fallbackCopy() {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      fallbackCopy();
    }

    setCopied(true);
  }

  const Icon = copied ? Check : Clipboard;

  return (
    <button
      type="button"
      data-copied={copied ? "true" : "false"}
      data-copy-text={text}
      data-copy-label={label}
      data-copy-compact-label={compactLabel}
      data-compact-label={compactLabel ? "true" : "false"}
      className={`copy-button focus-ring rounded-control inline-flex min-h-11 items-center gap-1.5 border border-panel-border bg-panel-recessed/80 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-concrete-300 transition-[background-color,border-color,color,box-shadow] ${className}`}
      aria-label={copied ? "Copied" : label}
      onClick={handleCopy}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span
        className="copy-button-label-full copy-button-label-stack"
        aria-live="polite"
      >
        <span className="copy-button-label-current">
          {copied ? "Copied" : label}
        </span>
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
          <span className="copy-button-label-current">
            {copied ? "Copied" : compactLabel}
          </span>
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
