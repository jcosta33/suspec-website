import { ArrowLeft, Search } from "lucide-react";
import { Section } from "./components/Section";
import { ActionLink } from "./components/ActionLink";
import { PaperArtifact } from "./components/PaperArtifact";

export const metadata = {
  title: "Page not found — Corpus",
  description: "The requested page was not found.",
  robots: "noindex",
};

export default function NotFoundPage() {
  return (
    <Section className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 overflow-hidden py-20 sm:py-24 md:min-h-[calc(100svh-22rem)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start md:pt-28">
      <div className="min-w-0 text-center md:text-left">
        <h1 className="font-heading text-6xl font-bold text-corpus-yellow">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-concrete-100">
          Page not found.
        </p>
        <p className="mx-auto mt-2 max-w-md text-concrete-400 md:mx-0">
          Check the URL, search the docs, or go back home.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
          <ActionLink href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Corpus
          </ActionLink>
          <ActionLink href="/docs/">
            <Search className="h-4 w-4" aria-hidden="true" /> Search docs
          </ActionLink>
        </div>
      </div>
      <PaperArtifact
        label="trace"
        title="missing route"
        meta="no matching exported page"
        className="w-full max-w-full"
      >
        <p>The requested path was not found in the site map.</p>
        <p className="mt-4 text-pencil">
          The docs index is usually the fastest way back.
        </p>
      </PaperArtifact>
    </Section>
  );
}
