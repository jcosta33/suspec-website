"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "../lib/canon";

const norm = (p: string) => p.replace(/\/+$/, "");

// Client component: the layout (server) computes `nav` and passes it down so node:fs stays server-side;
// here we light up the active page from the pathname. Collapsed groups auto-open when they hold it.
// The mobile collapse is a PURE-CSS disclosure (a visually-hidden checkbox + label, see docs.css) —
// no JS toggles the open state, so the collapsed mobile state is the initial render and there is no
// post-hydration layout shift. On desktop (and with no JS/CSS) the nav is simply always shown.
export function DocsNav({ nav }: { nav: NavSection[] }) {
  const current = norm(usePathname() || "");
  const isActive = (slug: string) => norm(`/docs/${slug}`) === current;
  const pageCount = nav.reduce((sum, sec) => sum + sec.items.length, 0);

  const groups = nav.map((sec) => {
    const items = sec.items.map((it) => {
      const active = isActive(it.slug);
      return (
        <li key={it.slug}>
          <Link
            href={`/docs/${it.slug}/`}
            className={active ? "is-active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            {it.label}
          </Link>
        </li>
      );
    });
    const hasActive = sec.items.some((it) => isActive(it.slug));
    return sec.collapsed ? (
      <details key={sec.title} className="docs-nav-group" open={hasActive}>
        <summary>{sec.title}</summary>
        <ul>{items}</ul>
      </details>
    ) : (
      <div key={sec.title} className="docs-nav-group">
        {/* A styled <p>, not <h2>: the sidebar sits before the article <h1> in the DOM, so heading
            group titles here would put h2s ahead of the page h1. The <nav> is already a labelled
            landmark, so these are group labels, not document headings. */}
        <p className="docs-nav-title">{sec.title}</p>
        <ul>{items}</ul>
      </div>
    );
  });

  return (
    <div className="docs-nav-disclosure">
      <input type="checkbox" id="docs-nav-toggle" className="docs-nav-toggle" aria-label="Toggle documentation menu" />
      <label htmlFor="docs-nav-toggle" className="docs-nav-summary">
        <span className="docs-nav-summary-main">Manual index</span>
        <span className="docs-nav-summary-count">
          {nav.length} sections / {pageCount} pages
        </span>
      </label>
      <nav className="docs-nav" aria-label="Documentation">
        {groups}
      </nav>
    </div>
  );
}
