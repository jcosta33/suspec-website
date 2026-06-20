import Link from "next/link";
import type { Metadata } from "next";
import { buildNav, canonAvailable } from "./lib/canon";

export const metadata: Metadata = { title: "Documentation · Swarm" };

export default function DocsIndex() {
  if (!canonAvailable()) {
    return <p>The canon was not available at build time (see canon.ts — W3 deploy wiring).</p>;
  }
  const nav = buildNav();
  return (
    <>
      <h1>Swarm documentation</h1>
      <p>
        A spec and review workflow for teams using coding agents. New to it?{" "}
        <Link href="/docs/tutorial/README">Walk the loop once</Link> — a guided build. Then browse the
        reference and the decision ledger.
      </p>
      {nav.map((sec) => (
        <section key={sec.title}>
          <h2>{sec.title}</h2>
          <ul>
            {sec.items.slice(0, sec.collapsed ? 5 : sec.items.length).map((it) => (
              <li key={it.slug}>
                <Link href={`/docs/${it.slug}`}>{it.label}</Link>
              </li>
            ))}
            {sec.collapsed && sec.items.length > 5 ? <li>… and {sec.items.length - 5} more</li> : null}
          </ul>
        </section>
      ))}
    </>
  );
}
