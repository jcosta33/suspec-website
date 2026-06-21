import Link from "next/link";
import type { Metadata } from "next";
import { buildNav, canonAvailable, type NavSection } from "./lib/canon";

export const metadata: Metadata = {
  title: "Documentation · Swarm",
  description: "A spec and review workflow for teams using coding agents — the full Swarm documentation.",
  alternates: { canonical: "/docs/" },
};

function Section({ sec, intro }: { sec: NavSection; intro?: string }) {
  return (
    <section>
      <h2>{sec.title}</h2>
      {intro ? <p>{intro}</p> : null}
      <ul>
        {sec.items.map((it) => (
          <li key={it.slug}>
            <Link href={`/docs/${it.slug}/`}>{it.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function DocsIndex() {
  if (!canonAvailable()) {
    return <p>The canon was not available at build time (see canon.ts — W3 deploy wiring).</p>;
  }
  const nav = buildNav();
  const find = (title: string) => nav.find((s) => s.title === title);
  const startHere = find("Start here");
  const tutorial = find("Tutorial");
  const examples = find("Examples");
  const reference = find("Reference");
  const adrs = find("ADRs");

  return (
    <div className="docs-prose" data-pagefind-body>
      <h1>Swarm documentation</h1>
      <p>
        A spec and review workflow for teams using coding agents. New to it?{" "}
        <Link href="/docs/tutorial/README/">Walk the loop once</Link> — a guided build. Then keep the
        numbered path open as you go.
      </p>
      {startHere ? <Section sec={startHere} /> : null}
      {tutorial ? <Section sec={tutorial} /> : null}
      {examples ? <Section sec={examples} /> : null}
      {reference ? (
        <Section
          sec={reference}
          intro="The deep layer — structured requirements, the checks contract, step bars, artifact formats, and the glossary. Reach for these when you need the precise rule, not the happy path."
        />
      ) : null}
      {adrs && adrs.items.length > 0 ? (
        <section>
          <h2>Decision ledger</h2>
          <p>
            The architecture decisions behind every format and vocabulary rule — an internal record
            kept for traceability, not a starting point.{" "}
            <Link href="/docs/adrs/README/">Browse the {adrs.items.length} ADRs →</Link>
          </p>
        </section>
      ) : null}
    </div>
  );
}
