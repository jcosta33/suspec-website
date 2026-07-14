import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { ActiveNavLink } from "./ActiveNavLink";
import { Logo } from "./Logo";
import { Section } from "./Section";

const navLinks = [
  { label: "Loop", href: "/the-loop" },
  { label: "Skills", href: "/skills" },
  { label: "CLI", href: "/cli" },
  { label: "MCP", href: "/mcp" },
  { label: "Get started", href: "/get-started" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/jcosta33/suspec" },
];

const mobileNavGroups = [
  {
    title: "Work",
    tone: "core",
    links: [
      { label: "Loop", href: "/the-loop", step: "01" },
      { label: "Get started", href: "/get-started", step: "02" },
    ],
  },
  {
    title: "Tools",
    tone: "reference",
    links: [
      { label: "Skills", href: "/skills" },
      { label: "CLI", href: "/cli" },
      { label: "MCP", href: "/mcp" },
    ],
  },
  {
    title: "Reference",
    tone: "reference",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com/jcosta33/suspec" },
    ],
  },
];

const mobileProofs = [
  { label: "Plain markdown", tone: "reference" },
  { label: "Human review", tone: "evidence" },
  { label: "No runtime required", tone: "muted" },
] as const;

const footerGroups = [
  {
    title: "Work",
    tone: "core",
    links: [
      { label: "Loop", href: "/the-loop" },
      { label: "Get started", href: "/get-started" },
    ],
  },
  {
    title: "Tools",
    tone: "reference",
    links: [
      { label: "Skills", href: "/skills" },
      { label: "CLI", href: "/cli" },
      { label: "MCP", href: "/mcp" },
    ],
  },
  {
    title: "Reference",
    tone: "reference",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com/jcosta33/suspec" },
      {
        label: "Skill catalog",
        href: "https://github.com/jcosta33/suspec-skills",
      },
      { label: "Colophon", href: "/colophon" },
    ],
  },
];

export function Shell({ children }: { children: ReactNode }) {
  const initialFolioLabel = "Suspec / record";

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-suspec-yellow focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to main content
      </a>

      <div className="site-background-perspective" aria-hidden="true">
        <span className="site-background-plane" />
      </div>

      <header
        data-nav-state="transparent"
        className="site-header fixed inset-x-0 top-0 z-40 border-b border-transparent bg-transparent transition-[background-color,border-color,box-shadow] duration-200"
      >
        <Section as="div" className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm"
            aria-label="Suspec home"
          >
            <Logo className="text-2xl text-concrete-100" />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <ActiveNavLink
                key={link.label}
                link={link}
                className="site-nav-link min-h-11 rounded-sm px-2 text-sm font-medium text-concrete-400 transition-[color] hover:text-suspec-yellow focus-ring"
              />
            ))}
          </nav>

          <button
            type="button"
            className="mobile-menu-toggle toggle active-shadow-toggle cursor-pointer rounded-control inline-flex h-11 w-11 items-center justify-center border p-2 text-concrete-100 hover:text-suspec-yellow focus-ring lg:hidden"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <Menu
              className="mobile-menu-toggle-icon-open h-6 w-6"
              aria-hidden="true"
            />
            <X
              className="mobile-menu-toggle-icon-close h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </Section>

        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          hidden
          className="mobile-menu-panel border-t border-panel-border bg-panel-recessed lg:hidden"
        >
          <Section as="nav" className="mobile-menu-shell" aria-label="Mobile">
            <div className="mobile-menu-register" aria-hidden="true">
              <span>Browse Suspec</span>
              <span data-folio-label>{initialFolioLabel}</span>
            </div>
            {mobileNavGroups.map((group) => (
              <div
                key={group.title}
                className={`mobile-menu-group mobile-menu-group-${group.tone}`}
              >
                <p className="mobile-menu-group-title">{group.title}</p>
                <div className="mobile-menu-link-list">
                  {group.links.map((link) => (
                    <ActiveNavLink
                      key={link.label}
                      link={link}
                      className="mobile-menu-link min-h-11 text-base font-medium transition-[background-color,border-color,color] focus-ring"
                    />
                  ))}
                </div>
              </div>
            ))}
            <ul className="mobile-menu-proof" aria-label="Suspec notes">
              {mobileProofs.map((item) => (
                <li
                  key={item.label}
                  className={`mobile-menu-proof-item mobile-menu-proof-${item.tone}`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </header>

      <div
        className="fixed inset-0 z-30 bg-night"
        aria-hidden="true"
        data-mobile-menu-overlay
        hidden
      />

      <div
        className="trace-rail"
        data-active="false"
        data-started="false"
        style={{ "--trace-progress": "0%" } as CSSProperties}
        aria-hidden="true"
      >
        <span className="trace-rail-label">trace</span>
        <span className="trace-rail-track">
          <span className="trace-rail-fill" />
        </span>
        <span className="trace-rail-readout">00%</span>
      </div>

      <main id="main-content" tabIndex={-1} className="site-main-frame flex-1">
        <div className="folio-rail folio-rail-left" aria-hidden="true">
          <span data-folio-label data-label={initialFolioLabel} />
        </div>
        <div className="folio-rail folio-rail-right" aria-hidden="true">
          <span data-label="reviewable work" />
        </div>
        {children}
      </main>

      <div className="site-footer gilt-trim overflow-hidden border-t border-panel-border bg-footer">
        <Section as="footer" className="site-footer-grid py-14 sm:py-16">
          <div className="site-footer-register" aria-hidden="true">
            <span>Suspec</span>
            <span data-folio-label>{initialFolioLabel}</span>
            <span>reviewable work</span>
          </div>

          <div className="site-footer-identity">
            <Link
              href="/"
              aria-label="Suspec home"
              className="focus-ring inline-flex min-h-11 w-fit items-center rounded-sm"
            >
              <Logo className="text-2xl text-concrete-100" />
            </Link>
            <p className="text-sm text-concrete-400">
              Built with Suspec. The evidence stays. The call stays yours.
            </p>
          </div>

          <nav className="site-footer-nav" aria-label="Footer">
            {footerGroups.map((group) => (
              <div
                key={group.title}
                className={`site-footer-link-group site-footer-link-group-${group.tone}`}
              >
                <p className="site-footer-link-title">{group.title}</p>
                <div className="site-footer-link-list">
                  {group.links.map((link) => (
                    <ActiveNavLink
                      key={link.label}
                      link={link}
                      className="min-h-11 min-w-11 rounded-sm px-1 text-sm font-medium text-concrete-400 transition-[color] hover:text-suspec-yellow focus-ring"
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <ul className="site-footer-proof" aria-label="Project note">
            <li>Plain markdown</li>
            <li>Human review</li>
            <li>No runtime required</li>
          </ul>

          <p className="site-footer-year">
            © {new Date().getFullYear()} Suspec contributors.
          </p>
        </Section>
      </div>
    </div>
  );
}
