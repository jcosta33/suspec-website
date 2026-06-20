"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "../lib/canon";

const norm = (p: string) => p.replace(/\/+$/, "");

// Client component: the layout (server) computes `nav` and passes it down so node:fs stays server-side;
// here we light up the active page from the pathname. Collapsed groups auto-open when they hold it.
export function DocsNav({ nav }: { nav: NavSection[] }) {
  const current = norm(usePathname() || "");
  const isActive = (slug: string) => norm(`/docs/${slug}`) === current;

  return (
    <nav className="docs-nav" aria-label="Documentation">
      {nav.map((sec) => {
        const items = sec.items.map((it) => {
          const active = isActive(it.slug);
          return (
            <li key={it.slug}>
              <Link
                href={`/docs/${it.slug}`}
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
            <h2>{sec.title}</h2>
            <ul>{items}</ul>
          </div>
        );
      })}
    </nav>
  );
}
