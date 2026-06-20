import type { ReactNode } from "react";
import "./docs.css";
import { DocsNav } from "./components/DocsNav";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-layout">
      <aside>
        <DocsNav />
      </aside>
      <main className="docs-prose">{children}</main>
    </div>
  );
}
