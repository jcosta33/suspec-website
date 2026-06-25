import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, GitBranch, Search } from "lucide-react";
import { Section } from "./components/Section";
import { ActionLink } from "./components/ActionLink";
import { PaperArtifact } from "./components/PaperArtifact";
import { Badge } from "./components/Badge";

export const metadata = {
  title: "Page not found — Corpus",
  description: "The requested page was not found.",
  robots: "noindex",
};

const recoveryRoutes = [
  {
    href: "/docs/",
    label: "Docs index",
    text: "Find the canonical manual page.",
    icon: BookOpen,
  },
  {
    href: "/the-loop/",
    label: "The loop",
    text: "Review the six-step workflow.",
    icon: GitBranch,
  },
  {
    href: "/get-started/",
    label: "Get started",
    text: "Set up a new or existing workspace.",
    icon: ArrowRight,
  },
];

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
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <Badge variant="blocked">missing route</Badge>
          <Badge variant="draft">no exported page</Badge>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
          <ActionLink href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Corpus
          </ActionLink>
          <ActionLink href="/docs/">
            <Search className="h-4 w-4" aria-hidden="true" /> Search docs
          </ActionLink>
        </div>
        <nav
          aria-label="Recovery routes"
          className="process-strip mx-auto mt-8 max-w-md overflow-hidden rounded-panel border border-panel-border bg-panel-raised/70 text-left shadow-[inset_0_1px_0_rgba(240,226,204,0.05)] md:mx-0"
        >
          {recoveryRoutes.map((route, index) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={route.href}
                className="focus-ring group flex min-h-20 items-center gap-4 border-b border-panel-border/80 px-4 py-3 text-concrete-300 transition-colors last:border-b-0 hover:bg-panel hover:text-concrete-100"
              >
                <span className="font-mono text-xs font-semibold text-corpus-yellow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  className="h-4 w-4 shrink-0 text-brass"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-base font-bold text-concrete-100">
                    {route.label}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-concrete-400">
                    {route.text}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-brass/70 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
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
