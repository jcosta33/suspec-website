"use client";

import { useState } from "react";

export interface ToggleButtonProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function ToggleButton({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  label,
  className = "",
}: ToggleButtonProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internal;

  function toggle() {
    const next = !isChecked;
    if (controlledChecked === undefined) setInternal(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={toggle}
      className={`group inline-flex items-center gap-3 focus-ring rounded-sm ${className}`}
    >
      <span
        className={`relative inline-flex h-7 w-14 items-center border border-panel-border panel-inset transition-colors ${
          isChecked ? "bg-panel-raised" : "bg-panel-recessed"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 border border-panel-border panel-raised transition-transform duration-150 ${
            isChecked
              ? "translate-x-7 bg-corpus-yellow"
              : "translate-x-0 bg-concrete-400"
          }`}
        />
      </span>
      {label && (
        <span className="text-sm font-mono uppercase tracking-wide text-concrete-400">
          {label}
        </span>
      )}
    </button>
  );
}
