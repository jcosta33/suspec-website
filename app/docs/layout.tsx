import type { ReactNode } from "react";
import "./docs-shell.css";
import "./docs-article.css";
import "./docs-index.css";
import "./docs-footer.css";
import "./docs-responsive.css";
import "../styles/docs-index-polish.css";
import "../styles/mobile-docs-index-polish.css";
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
          <main id="main-content">). The docs index/article elements carry data-pagefind-body so
          search indexes the manual body without the nav rail. Long docs also render a `.docs-toc`
          rail; both surfaces are flex children of .docs-layout. */}
      {children}
    </div>
  );
}
