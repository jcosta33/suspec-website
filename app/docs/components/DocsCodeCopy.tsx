"use client";

import { useEffect } from "react";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall through to the textarea path for browsers with stricter clipboard gates.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function DocsCodeCopy() {
  useEffect(() => {
    const timeouts = new WeakMap<HTMLButtonElement, number>();
    const activeTimeouts = new Set<number>();

    const reset = (button: HTMLButtonElement) => {
      button.dataset.copied = "false";
      button.textContent = "COPY";
      const timeout = timeouts.get(button);
      if (timeout) {
        window.clearTimeout(timeout);
        activeTimeouts.delete(timeout);
      }
    };

    const onClick = async (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target
          : event.target instanceof Node
            ? event.target.parentElement
            : null;
      if (!target) return;

      const button = target.closest<HTMLButtonElement>(
        "button[data-docs-code-copy]",
      );
      if (!button) return;

      const shell = button.closest(".docs-code-shell");
      const code = shell?.querySelector("pre code");
      const text = code?.textContent ?? "";
      if (!text) return;

      await copyText(text);
      button.dataset.copied = "true";
      button.textContent = "DONE";

      const timeout = window.setTimeout(() => reset(button), 1600);
      timeouts.set(button, timeout);
      activeTimeouts.add(timeout);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      activeTimeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return null;
}
