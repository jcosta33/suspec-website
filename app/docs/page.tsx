import Link from "next/link";
import type { Metadata } from "next";
import { buildNav, canonAvailable, type NavSection } from "./lib/canon";
import type { SignalRole } from "../components/signalStyles";

export const metadata: Metadata = {
  title: "Documentation · Suspec",
  description: "The Suspec documentation.",
  alternates: { canonical: "/docs/" },
  openGraph: { url: "/docs/" }, // /docs/ is indexable — emit og:url so reshares consolidate
};

const docsLegend = [
  { label: "Start", role: "core", detail: "entry", href: "#start-here" },
  { label: "Tutorial", role: "core", detail: "first pass", href: "#tutorial" },
  { label: "Examples", role: "muted", detail: "worked pages", href: "#examples" },
  { label: "Reference", role: "reference", detail: "manual", href: "#reference" },
  { label: "ADRs", role: "muted", detail: "decisions", href: "#adrs" },
] as const satisfies Array<{
  label: string;
  role: SignalRole;
  detail: string;
  href: string;
}>;

function Section({
  sec,
  intro,
  role = "core",
  className = "",
  id,
}: {
  sec: NavSection;
  intro?: string;
  role?: SignalRole;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`docs-index-section docs-index-section-${role} ${className}`}
      data-color-role={role}
    >
      <div className="docs-index-section-heading">
        <h2>{sec.title}</h2>
        <span>{sec.items.length}</span>
      </div>
      {intro ? <p>{intro}</p> : null}
      <ul className="docs-index-list">
        {sec.items.map((it, index) => (
          <li key={it.slug}>
            <Link
              href={`/docs/${it.slug}/`}
              aria-label={`Open ${it.label} documentation page`}
            >
              <span
                className="docs-index-item-number"
                aria-hidden="true"
                data-pagefind-ignore
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="docs-index-item-label">{it.label}</span>
            </Link>
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
  const totalPages = nav.reduce((sum, section) => sum + section.items.length, 0);
  const balancedGrid =
    startHere && tutorial && examples ? { startHere, tutorial, examples } : null;

  return (
    <div className="docs-prose docs-index-prose" data-pagefind-body>
      <header className="docs-index-cover">
        <div className="docs-index-cover-copy">
          <p className="docs-index-kicker" data-pagefind-ignore>
            canon / manual index
          </p>
          <h1>Suspec docs</h1>
          <p className="docs-index-lede">
            Start with the numbered pages. Use the tutorial for one pass
            through the loop.
          </p>
        </div>
        <div className="docs-index-manual" aria-label="Documentation metadata">
          <span>canon manual</span>
          <span>{nav.length} sections</span>
          <span>{totalPages} pages</span>
          <span>markdown source</span>
          <ul className="docs-index-legend" aria-label="Documentation color key">
            {docsLegend.map((item) => (
              <li
                key={item.label}
                className={`docs-index-legend-item docs-index-legend-${item.role}`}
              >
                <a href={item.href} aria-label={`${item.label}: ${item.detail}`}>
                  <span>{item.label}</span>
                  <span>{item.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <div
        className={`docs-index-grid ${balancedGrid ? "docs-index-grid-balanced" : ""}`}
      >
        {balancedGrid ? (
          <div className="docs-index-top">
            <Section
              id="start-here"
              sec={balancedGrid.startHere}
              role="core"
              className="docs-index-section-primary"
            />
            <div className="docs-index-stack">
              <Section
                id="tutorial"
                sec={balancedGrid.tutorial}
                role="core"
                className="docs-index-section-tutorial"
              />
              <Section
                id="examples"
                sec={balancedGrid.examples}
                role="muted"
                className="docs-index-section-examples"
              />
            </div>
          </div>
        ) : (
          <>
            {startHere ? (
              <Section
                id="start-here"
                sec={startHere}
                role="core"
                className="docs-index-section-primary"
              />
            ) : null}
            {tutorial ? (
              <Section
                id="tutorial"
                sec={tutorial}
                role="core"
                className="docs-index-section-tutorial"
              />
            ) : null}
            {examples ? (
              <Section
                id="examples"
                sec={examples}
                role="muted"
                className="docs-index-section-examples"
              />
            ) : null}
          </>
        )}
        {reference ? (
          <Section
            id="reference"
            sec={reference}
            intro="Detailed rules, formats, checks, and glossary."
            role="reference"
            className="docs-index-section-wide docs-index-section-reference"
          />
        ) : null}
        {adrs && adrs.items.length > 0 ? (
          <section
            id="adrs"
            className="docs-index-section docs-index-section-muted docs-index-section-compact docs-index-section-wide docs-index-section-adrs"
            data-color-role="muted"
          >
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
