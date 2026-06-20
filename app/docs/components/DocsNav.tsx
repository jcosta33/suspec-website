import Link from "next/link";
import { buildNav } from "../lib/canon";

// Server component — collapsible ADR group via native <details> (no client JS).
export function DocsNav() {
  const nav = buildNav();
  return (
    <nav className="docs-nav" aria-label="Documentation">
      {nav.map((sec) =>
        sec.collapsed ? (
          <details key={sec.title} className="docs-nav-group">
            <summary>{sec.title}</summary>
            <ul>
              {sec.items.map((it) => (
                <li key={it.slug}>
                  <Link href={`/docs/${it.slug}`}>{it.label}</Link>
                </li>
              ))}
            </ul>
          </details>
        ) : (
          <div key={sec.title} className="docs-nav-group">
            <h2>{sec.title}</h2>
            <ul>
              {sec.items.map((it) => (
                <li key={it.slug}>
                  <Link href={`/docs/${it.slug}`}>{it.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </nav>
  );
}
