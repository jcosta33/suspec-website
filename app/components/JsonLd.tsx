// Emits a JSON-LD <script> for structured data (SEO/GEO). Server component — the static export
// bakes it straight into the page HTML, so answer engines and crawlers read it without running JS.
// The `<` escape stops a stray "</script>" inside the data from breaking out of the tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
