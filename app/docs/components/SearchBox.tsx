"use client";

import { useEffect, useRef } from "react";

// Loads the Pagefind UI (generated into /pagefind by the postbuild step) at runtime. In `next dev`
// the index doesn't exist yet, so the script 404s harmlessly and search is empty — it works on the
// built/served site. Static, no API key, no third-party service.
declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => void;
  }
}

export function SearchBox() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The Pagefind UI input is labeled only by placeholder/title → axe `label-title-only`. Add a
    // programmatic aria-label once the input mounts (it may render a tick after construction). [a11y gate]
    const labelInput = (): boolean => {
      const input = el.querySelector("input");
      if (input && !input.getAttribute("aria-label")) {
        input.setAttribute("aria-label", "Search documentation");
      }
      return Boolean(input);
    };
    const init = () => {
      if (!window.PagefindUI) return;
      new window.PagefindUI({ element: el, showSubResults: true, resetStyles: false });
      if (!labelInput()) {
        const mo = new MutationObserver(() => {
          if (labelInput()) mo.disconnect();
        });
        mo.observe(el, { childList: true, subtree: true });
      }
    };
    if (window.PagefindUI) {
      init();
      return;
    }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/pagefind/pagefind-ui.css";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "/pagefind/pagefind-ui.js";
    s.async = true;
    s.onload = init;
    document.body.appendChild(s);
  }, []);

  return <div className="docs-search" ref={ref} aria-label="Search documentation" />;
}
