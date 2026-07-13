import Link from "next/link";
import type { Metadata } from "next";
import { buildNav, canonAvailable, type NavSection } from "./lib/canon";
import { JsonLd } from "../components/JsonLd";
import type { SignalRole } from "../components/signalStyles";
import { canonicalAlternates } from "../seo";

const SITE_URL = "https://suspecframework.dev";
const docsDescription =
  "The Suspec manual for workflow steps, artifact formats, checks, examples, ADRs, and glossary. Start small; look things up when needed.";
const docsTitle = "Suspec documentation — manual and reference";

export const metadata: Metadata = {
  title: docsTitle,
  description: docsDescription,
  alternates: canonicalAlternates("/docs/"),
  openGraph: {
    title: docsTitle,
    description: docsDescription,
    type: "website",
    url: "/docs/",
    siteName: "Suspec",
    locale: "en_US",
    images: [
      {
        url: "/og-docs.png",
        width: 1200,
        height: 630,
        alt: "Suspec docs — canonical manual and artifact reference",
      },
    ],
  },
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

const readingPath = [
  {
    label: "Start with the model",
    href: "/docs/01-what-is-suspec/",
    detail: "What Suspec is, which records exist, and what it refuses to decide.",
    role: "core",
  },
  {
    label: "Walk one loop",
    href: "/docs/tutorial/README/",
    detail: "Run one small change through the loop before customising it.",
    role: "core",
  },
  {
    label: "Check the records",
    href: "/docs/reference/checks/",
    detail: "Use checks and artifact formats when the receipts need review.",
    role: "reference",
  },
] as const satisfies Array<{
  label: string;
  href: string;
  detail: string;
  role: SignalRole;
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
      </div>
      {intro ? <p className="docs-index-section-intro">{intro}</p> : null}
      <ul className="docs-index-list">
        {sec.items.map((it, index) => (
          <li key={it.slug}>
            <Link href={`/docs/${it.slug}/`}>
              <span
                className="docs-index-item-number"
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
    return <p>The docs source was not available at build time. The manual cannot quote a book it cannot open.</p>;
  }
  const nav = buildNav();
  const find = (title: string) => nav.find((s) => s.title === title);
  const startHere = find("Start here");
  const tutorial = find("Tutorial");
  const examples = find("Examples");
  const reference = find("Reference");
  const adrs = find("ADRs");
  const balancedGrid =
    startHere && tutorial && examples ? { startHere, tutorial, examples } : null;
  const listedSections = [startHere, tutorial, examples, reference, adrs].filter(
    (section): section is NavSection => Boolean(section),
  );
  const docsIndexJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/docs/#collection`,
    name: "Suspec docs",
    url: `${SITE_URL}/docs/`,
    description: docsDescription,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: {
      "@type": "SoftwareApplication",
      name: "Suspec",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Suspec documentation sections",
      itemListElement: listedSections.map((section, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: section.title,
        url: `${SITE_URL}/docs/#${section.title.toLowerCase().replaceAll(" ", "-")}`,
      })),
    },
    hasPart: readingPath.map((item) => ({
      "@type": "WebPage",
      name: item.label,
      url: `${SITE_URL}${item.href}`,
      description: item.detail,
    })),
  };

  return (
    <section
      id="docs-primary-content"
      className="docs-prose docs-index-prose"
      data-pagefind-body
      tabIndex={-1}
      aria-labelledby="docs-index-title"
    >
      <JsonLd data={docsIndexJsonLd} />
      <header className="docs-index-cover">
        <div className="docs-index-cover-copy">
          <p className="docs-index-kicker" data-pagefind-ignore>
            manual / reference index
          </p>
          <h1 id="docs-index-title">Suspec docs</h1>
          <p className="docs-index-lede">
            Start with the numbered pages; run the tutorial once; keep the
            reference nearby for formats, checks, glossary, and ADRs. No need
            to read the filing cabinet end to end.
          </p>
        </div>
        <div className="docs-index-manual" aria-label="Documentation metadata">
          <p className="docs-index-manual-label">manual index</p>
          <ul className="docs-index-legend" aria-label="Documentation paths">
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
      <section
        className="docs-reading-path"
        aria-labelledby="docs-reading-path-title"
      >
        <div className="docs-reading-path-copy">
          <p className="docs-reading-path-kicker" data-pagefind-ignore>
            recommended path
          </p>
          <h2 id="docs-reading-path-title">Read this first</h2>
          <p>
            Read these three before the full reference: model, one loop, and
            review checks. Then use the index like a normal person.
          </p>
        </div>
        <ol className="docs-reading-path-list">
          {readingPath.map((item, index) => (
            <li
              key={item.href}
              className={`docs-reading-path-item docs-reading-path-item-${item.role}`}
            >
              <Link href={item.href}>
                <span className="docs-reading-path-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="docs-reading-path-label">{item.label}</span>
                  <span className="docs-reading-path-detail">{item.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <div
        className={`docs-index-grid ${balancedGrid ? "docs-index-grid-balanced" : ""}`}
      >
        {balancedGrid ? (
          <div className="docs-index-top">
            <Section
              id="start-here"
              sec={balancedGrid.startHere}
              intro="Core pages in the order most changes need."
              role="core"
              className="docs-index-section-primary"
            />
            <div className="docs-index-stack">
              <Section
                id="tutorial"
                sec={balancedGrid.tutorial}
                intro="A single pass through the loop, with fewer surprises."
                role="core"
                className="docs-index-section-tutorial"
              />
              <Section
                id="examples"
                sec={balancedGrid.examples}
                intro="Worked records you can copy into real changes."
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
                intro="Core pages in the order most changes need."
                role="core"
                className="docs-index-section-primary"
              />
            ) : null}
            {tutorial ? (
              <Section
                id="tutorial"
                sec={tutorial}
                intro="A single pass through the loop."
                role="core"
                className="docs-index-section-tutorial"
              />
            ) : null}
            {examples ? (
              <Section
                id="examples"
                sec={examples}
                intro="Worked records you can copy into real changes."
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
            intro="Detailed rules, formats, checks, and glossary. The reference shelf."
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
            </div>
            <p>
              Decision records for the framework.{" "}
              <Link href="/docs/adrs/README/">
                Browse ADRs
              </Link>
            </p>
          </section>
        ) : null}
      </div>
    </section>
  );
}
