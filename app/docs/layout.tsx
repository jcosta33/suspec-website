import type { ReactNode } from "react";
import "./docs.css";
import { buildNav } from "./lib/canon";
import { DocsNav } from "./components/DocsNav";
import { SearchBox } from "./components/SearchBox";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const nav = buildNav(); // server-side (node:fs); passed to the client DocsNav for active state
  return (
    <div className="docs-layout">
      <a className="docs-skip-link" href="#docs-primary-content">
        Skip docs navigation
      </a>
      <aside data-pagefind-ignore>
        <SearchBox />
        <DocsNav nav={nav} />
      </aside>
      {/* The page renders its own `.docs-prose` (a <div>, not <main> — the Shell owns the single
          <main id="main-content">; it carries data-pagefind-body to scope the search index to article
          content) plus, for long docs, a `.docs-toc` rail — both as flex children of .docs-layout. */}
      {children}
    </div>
  );
}
