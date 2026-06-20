import type { ReactNode } from "react";
import "./docs.css";
import { DocsNav } from "./components/DocsNav";
import { SearchBox } from "./components/SearchBox";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-layout">
      <aside data-pagefind-ignore>
        <SearchBox />
        <DocsNav />
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
