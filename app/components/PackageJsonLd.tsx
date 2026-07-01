import { JsonLd } from "./JsonLd";

const SITE_URL = "https://suspecframework.dev";

type PackageJsonLdProps = {
  name: string;
  description: string;
  path: `/${string}/`;
  repository: string;
  keywords: string[];
};

export function PackageJsonLd({
  name,
  description,
  path,
  repository,
  keywords,
}: PackageJsonLdProps) {
  const url = `${SITE_URL}${path}`;

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
        keywords,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}
