import type { ReactNode } from "react";
import "./docs.css";
import { buildNav } from "./lib/canon";
import { DocsNav } from "./components/DocsNav";
import { SearchBox } from "./components/SearchBox";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const nav = buildNav(); // server-side (node:fs); passed to the client DocsNav for active state
  return (
    <div className="docs-layout">
      <aside data-pagefind-ignore>
        <SearchBox />
        <DocsNav nav={nav} />
      </aside>
      {/* A <div>, not <main>: the app Shell already provides the single <main id="main-content">
          landmark; a nested second <main> fails axe (landmark-no-duplicate-main / -unique). [a11y gate]
          data-pagefind-body scopes the search index to docs content only (not the marketing pages). */}
      <div className="docs-prose" data-pagefind-body>
        {children}
      </div>
    </div>
  );
}
