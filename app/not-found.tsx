import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GitBranch,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./components/Section";
import { ActionLink } from "./components/ActionLink";
import { PaperArtifact } from "./components/PaperArtifact";
import { PilotLamp } from "./components/PilotLamp";
import { signalRoles, type SignalRole } from "./components/signalStyles";

export const metadata = {
  title: "Page not found — Suspec",
  description: "The requested page was not found.",
  robots: "noindex",
};

const recoveryRoutes = [
  {
    href: "/docs/",
    label: "Docs index",
    path: "/docs",
    text: "Open the manual index.",
    icon: BookOpen,
    signal: "reference",
  },
  {
    href: "/the-loop/",
    label: "The loop",
    path: "/the-loop",
    text: "See the workflow.",
    icon: GitBranch,
    signal: "core",
  },
  {
    href: "/get-started/",
    label: "Get started",
    path: "/get-started",
    text: "Set up a workspace.",
    icon: ArrowRight,
    signal: "core",
  },
] as const satisfies Array<{
  href: string;
  label: string;
  path: string;
  text: string;
  icon: LucideIcon;
  signal: SignalRole;
}>;

export default function NotFoundPage() {
  return (
    <Section className="not-found-shell grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 overflow-hidden py-14 sm:py-16 md:min-h-[calc(100svh-28rem)] md:grid-cols-[minmax(18rem,0.82fr)_minmax(20rem,0.95fr)] md:items-center md:gap-10 md:py-20 lg:gap-14">
      <div className="not-found-control min-w-0 rounded-panel border border-panel-border bg-panel-raised/70 p-5 text-left shadow-[inset_0_1px_0_rgba(240,226,204,0.05)] sm:p-6">
        <div className="not-found-status-row">
          <span className="inline-flex items-center gap-2">
            <PilotLamp color="change" />
            <span>route check</span>
          </span>
          <span>export map</span>
        </div>
        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-signal-change">
          status / 404
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-concrete-100 sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-3 max-w-md text-base leading-7 text-concrete-400">
          The path is not in the current site map. Check the address, then use
          the manual index or workflow routes.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <ActionLink href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Suspec
          </ActionLink>
          <ActionLink href="/docs/">
            <Search className="h-4 w-4" aria-hidden="true" /> Open docs
          </ActionLink>
        </div>
      </div>
      <div className="grid w-full max-w-xl gap-5 md:justify-self-end">
        <PaperArtifact
          label="trace"
          title="route record"
          meta="no matching exported page"
          className="not-found-artifact w-full !p-4 sm:!p-5"
        >
          <p>Nothing was served for this URL.</p>
        </PaperArtifact>
        <nav
          aria-label="Recovery routes"
          className="process-strip process-strip-signal-muted overflow-hidden rounded-panel border border-panel-border bg-panel-raised/70 text-left shadow-[inset_0_1px_0_rgba(240,226,204,0.05)]"
        >
          {recoveryRoutes.map((route, index) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`focus-ring group flex min-h-16 items-center gap-3 border-b border-panel-border/80 px-4 py-3 text-concrete-300 transition-colors last:border-b-0 hover:bg-panel hover:text-concrete-100 ${signalRoles[route.signal].processItem}`}
              >
                <span
                  className={`font-mono text-xs font-semibold ${signalRoles[route.signal].text}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  className={`h-4 w-4 shrink-0 ${signalRoles[route.signal].text}`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-heading text-base font-bold text-concrete-100">
                      {route.label}
                    </span>
                    <span
                      className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] ${signalRoles[route.signal].text}`}
                    >
                      {route.path}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-concrete-400">
                    {route.text}
                  </span>
                </span>
                <ArrowRight
                  className={`motion-nudge-x h-4 w-4 shrink-0 opacity-70 ${signalRoles[route.signal].text}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </Section>
  );
}
