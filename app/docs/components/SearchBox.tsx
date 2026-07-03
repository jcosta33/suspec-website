"use client";

import { useEffect, useRef } from "react";

// Loads the Pagefind UI (generated into /pagefind by the postbuild step) at runtime.
// The index is a production-export artifact, so `next dev` keeps a non-interactive
// placeholder instead of requesting files it cannot serve.
const PAGEFIND_ENABLED = process.env.NODE_ENV === "production";

declare global {
  interface Window {
    PagefindUI?: new (opts: Record<string, unknown>) => { triggerSearch?: (term: string) => void };
  }
}

export function SearchBox() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!PAGEFIND_ENABLED) {
      el.dataset.searchState = "unavailable";
      return;
    }

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
      el.querySelector(".docs-search-fallback")?.remove();
      el.dataset.searchState = "ready";
      const ui = new window.PagefindUI({ element: el, showSubResults: true, resetStyles: false });
      // Deep-link: /docs/?q=term runs the search on load — this is what the WebSite SearchAction in
      // the JSON-LD points at, so that structured-data claim is real rather than decorative.
      const q = new URLSearchParams(window.location.search).get("q");
      if (q && ui.triggerSearch) ui.triggerSearch(q);
      if (!labelInput()) {
        const mo = new MutationObserver(() => {
          if (labelInput()) mo.disconnect();
        });
        mo.observe(el, { childList: true, subtree: true });
      }
    };
    const load = () => {
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
      s.onerror = () => {
        el.dataset.searchState = "unavailable";
        css.remove();
        s.remove();
      };
      document.body.appendChild(s);
    };

    // A deep-linked search (?q=) must load now so it can run on arrival; otherwise defer the ~131KB
    // Pagefind UI off the critical path until the browser is idle. The .docs-search min-height
    // (docs.css) reserves the input's space, so the deferred mount causes no layout shift.
    if (new URLSearchParams(window.location.search).get("q")) {
      load();
      return;
    }
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(load, 1200);
    return () => window.clearTimeout(t);
  }, []);

  // No role/aria-label on the wrapper: on the built site Pagefind renders its own
  // <form role="search" aria-label="Search this site">, so a wrapper role would create a second,
  // duplicate search landmark. The input itself is still named via the aria-label pass above.
  return (
    <div className="docs-search" data-search-state="loading" ref={ref}>
      <div
        className="docs-search-fallback"
        aria-hidden={PAGEFIND_ENABLED ? true : undefined}
        aria-label={PAGEFIND_ENABLED ? undefined : "Search is available on the built site"}
        role={PAGEFIND_ENABLED ? undefined : "status"}
      >
        <span className="docs-search-fallback-icon" />
        <span>Search docs</span>
      </div>
    </div>
  );
}
