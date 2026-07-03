import { JsonLd } from "./JsonLd";

const SITE_URL = "https://suspecframework.dev";

type PackageJsonLdProps = {
  name: string;
  description: string;
  path: `/${string}/`;
  repository: string;
  keywords: string[];
  catalogItems?: Array<{
    name: string;
    description: string;
    url?: string;
    category?: string;
  }>;
};

export function PackageJsonLd({
  name,
  description,
  path,
  repository,
  keywords,
  catalogItems = [],
}: PackageJsonLdProps) {
  const url = `${SITE_URL}${path}`;
  const catalog =
    catalogItems.length > 0
      ? {
          "@type": "ItemList",
          name: `${name} catalog`,
          itemListElement: catalogItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: item.name,
              description: item.description,
              url: item.url,
              genre: item.category,
            },
          })),
        }
      : undefined;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "@id": `${url}#source-code`,
        name,
        description,
        url,
        codeRepository: repository,
        sameAs: repository,
        keywords,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        hasPart: catalog,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}
