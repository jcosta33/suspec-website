"use client";

import { useEffect } from "react";

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } finally {
    textarea.remove();
  }
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise((_, reject) =>
          window.setTimeout(() => reject(new Error("clipboard timeout")), 800),
        ),
      ]);
      return true;
    } catch {
      return fallbackCopy(text);
    }
  }
  return fallbackCopy(text);
}

export function DocsCodeCopy() {
  useEffect(() => {
    const timeouts = new WeakMap<HTMLButtonElement, number>();
    const activeTimeouts = new Set<number>();

    const reset = (button: HTMLButtonElement) => {
      button.dataset.copied = "false";
      button.dataset.copying = "false";
      button.dataset.copyError = "false";
      button.setAttribute("aria-busy", "false");
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";
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
      if (button.dataset.copying === "true") return;

      const shell = button.closest(".docs-code-shell");
      const code = shell?.querySelector("pre code");
      const text = code?.textContent ?? "";
      if (!text) return;

      button.dataset.copying = "true";
      button.dataset.copyError = "false";
      button.setAttribute("aria-busy", "true");
      button.setAttribute("aria-label", "Copying code");
      button.textContent = "...";
      const copied = await copyText(text);
      button.dataset.copying = "false";
      button.dataset.copied = copied ? "true" : "false";
      button.dataset.copyError = copied ? "false" : "true";
      button.setAttribute("aria-busy", "false");
      button.setAttribute(
        "aria-label",
        copied ? "Code copied" : "Copy failed. Retry",
      );
      button.textContent = copied ? "Done" : "Retry";

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
