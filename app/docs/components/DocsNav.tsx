"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { NavSection } from "../lib/canon";

const norm = (p: string) => p.replace(/\/+$/, "");

// Client component: the layout (server) computes `nav` and passes it down so node:fs stays server-side;
// here we light up the active page from the pathname. Collapsed groups auto-open when they hold it.
// The mobile collapse is a PURE-CSS disclosure (a visually-hidden checkbox + label, see docs-shell.css) —
// no JS toggles the open state, so the collapsed mobile state is the initial render and there is no
// post-hydration layout shift. On desktop (and with no JS/CSS) the nav is simply always shown.
export function DocsNav({ nav }: { nav: NavSection[] }) {
  const current = norm(usePathname() || "");
  const toggleRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isActive = (slug: string) => norm(`/docs/${slug}`) === current;

  useEffect(() => {
    if (toggleRef.current) toggleRef.current.checked = false;
    if (navRef.current) navRef.current.scrollTop = 0;
  }, [current]);

  const revealActivePage = () => {
    if (!toggleRef.current?.checked) return;
    window.requestAnimationFrame(() => {
      const menu = navRef.current;
      const active = menu?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!menu || !active) return;
      const menuRect = menu.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      menu.scrollTop +=
        activeRect.top -
        menuRect.top -
        menu.clientHeight / 2 +
        activeRect.height / 2;
    });
  };

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
      <input
        ref={toggleRef}
        type="checkbox"
        id="docs-nav-toggle"
        className="docs-nav-toggle"
        aria-label="Toggle documentation menu"
        onChange={revealActivePage}
      />
      <label htmlFor="docs-nav-toggle" className="docs-nav-summary">
        <span className="docs-nav-summary-main">Manual index</span>
        <span className="docs-nav-summary-detail">Browse sections</span>
      </label>
      <nav ref={navRef} className="docs-nav" aria-label="Documentation">
        {groups}
      </nav>
    </div>
  );
}
