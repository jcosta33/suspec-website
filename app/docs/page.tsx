import Link from "next/link";
import type { Metadata } from "next";
import { buildNav, canonAvailable, type NavSection } from "./lib/canon";

export const metadata: Metadata = {
  title: "Documentation · Corpus",
  description: "The Corpus documentation.",
  alternates: { canonical: "/docs/" },
};

function Section({
  sec,
  intro,
  className = "",
}: {
  sec: NavSection;
  intro?: string;
  className?: string;
}) {
  return (
    <section className={`docs-index-section ${className}`}>
      <div className="docs-index-section-heading">
        <h2>{sec.title}</h2>
        <span>{sec.items.length}</span>
      </div>
      {intro ? <p>{intro}</p> : null}
      <ul className="docs-index-list">
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
    return <p>The docs source was not available at build time.</p>;
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
      <h1>Corpus documentation</h1>
      <p>
        Start with the numbered pages. Use the tutorial when you want to walk
        the loop once.
      </p>
      <div className="docs-index-grid">
        {startHere ? <Section sec={startHere} /> : null}
        {tutorial || examples ? (
          <div className="docs-index-stack">
            {tutorial ? <Section sec={tutorial} /> : null}
            {examples ? <Section sec={examples} /> : null}
          </div>
        ) : null}
        {reference ? (
          <Section
            sec={reference}
            intro="Detailed rules, formats, checks, and glossary."
            className="docs-index-section-wide"
          />
        ) : null}
        {adrs && adrs.items.length > 0 ? (
          <section className="docs-index-section docs-index-section-compact docs-index-section-wide">
            <div className="docs-index-section-heading">
              <h2>ADRs</h2>
              <span>{adrs.items.length}</span>
            </div>
            <p>
              Decision records for the framework.{" "}
              <Link href="/docs/adrs/README/">
                Browse {adrs.items.length} ADRs
              </Link>
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
