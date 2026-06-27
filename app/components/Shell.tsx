"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Section } from "./Section";

const navLinks = [
  { label: "What is Corpus", href: "/what-is-corpus" },
  { label: "Loop", href: "/the-loop" },
  { label: "Skills", href: "/skills" },
  { label: "Agents", href: "/agents" },
  { label: "CLI", href: "/cli" },
  { label: "MCP", href: "/mcp" },
  { label: "Get started", href: "/get-started" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/jcosta33/corpus" },
];

const mobileNavGroups = [
  {
    title: "Work",
    tone: "core",
    links: [
      { label: "What is Corpus", href: "/what-is-corpus" },
      { label: "Loop", href: "/the-loop" },
      { label: "Get started", href: "/get-started" },
    ],
  },
  {
    title: "Tools",
    tone: "reference",
    links: [
      { label: "Skills", href: "/skills" },
      { label: "Agents", href: "/agents" },
      { label: "CLI", href: "/cli" },
      { label: "MCP", href: "/mcp" },
    ],
  },
  {
    title: "Reference",
    tone: "reference",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com/jcosta33/corpus" },
    ],
  },
];

const mobileProofs = [
  { label: "Plain markdown", tone: "reference" },
  { label: "Human review", tone: "evidence" },
  { label: "No runtime", tone: "muted" },
] as const;

const footerGroups = [
  {
    title: "Work",
    tone: "core",
    links: [
      { label: "What is Corpus", href: "/what-is-corpus" },
      { label: "Loop", href: "/the-loop" },
      { label: "Get started", href: "/get-started" },
    ],
  },
  {
    title: "Tools",
    tone: "reference",
    links: [
      { label: "Skills", href: "/skills" },
      { label: "Agents", href: "/agents" },
      { label: "CLI", href: "/cli" },
      { label: "MCP", href: "/mcp" },
    ],
  },
  {
    title: "Reference",
    tone: "reference",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com/jcosta33/corpus" },
      {
        label: "Starter kit",
        href: "https://github.com/jcosta33/corpus-starter-kit",
      },
      { label: "Colophon", href: "/colophon" },
    ],
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

function normalizeHref(href: string) {
  if (isExternal(href)) return href;
  return href.endsWith("/") ? href : `${href}/`;
}

function isActiveLink(href: string, pathname: string) {
  if (isExternal(href)) return false;
  const normalizedHref = normalizeHref(href);
  const normalizedPath = normalizeHref(pathname);
  return (
    normalizedPath === normalizedHref ||
    normalizedPath.startsWith(normalizedHref)
  );
}

function getFolioLabel(pathname: string) {
  const normalizedPath = normalizeHref(pathname);
  if (normalizedPath === "/") return "Corpus / home";
  if (normalizedPath.startsWith("/what-is-corpus/")) return "Corpus / overview";
  if (normalizedPath.startsWith("/the-loop/")) return "Corpus / loop";
  if (normalizedPath.startsWith("/get-started/")) return "Corpus / setup";
  if (normalizedPath.startsWith("/agents/")) return "Corpus / agents";
  if (normalizedPath.startsWith("/skills/")) return "Corpus / skills";
  if (normalizedPath.startsWith("/cli/")) return "Corpus / cli";
  if (normalizedPath.startsWith("/mcp/")) return "Corpus / mcp";
  if (normalizedPath.startsWith("/docs/")) return "Corpus / manual";
  return "Corpus / record";
}

function NavLink({
  link,
  onClick,
  className,
  isActive,
  showIndicator = false,
}: {
  link: { label: string; href: string };
  onClick?: () => void;
  className: string;
  isActive?: boolean;
  showIndicator?: boolean;
}) {
  const external = isExternal(link.href);
  return (
    <Link
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={external ? `${link.label} (opens in new tab)` : undefined}
      aria-current={isActive ? "page" : undefined}
      className={`relative inline-flex min-w-11 items-center ${className}`}
      onClick={onClick}
    >
      <span className="inline-flex items-center gap-1.5">
        {link.label}
        {external && <ExternalLink className="h-3 w-3" aria-hidden="true" />}
      </span>
      {isActive && showIndicator && (
        <span
          className="absolute -bottom-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-corpus-yellow"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const folioLabel = getFolioLabel(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerIsOpaque = scrolled || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canTrackPointer = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!canTrackPointer.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.18;

    const updatePointer = () => {
      frame = 0;
      root.style.setProperty("--cursor-x", `${pointerX}px`);
      root.style.setProperty("--cursor-y", `${pointerY}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === 0) {
        frame = window.requestAnimationFrame(updatePointer);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    updatePointer();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const toggle = toggleRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggle?.focus();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-corpus-yellow focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to main content
      </a>

      <header
        data-nav-state={headerIsOpaque ? "opaque" : "transparent"}
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          headerIsOpaque
            ? "border-panel-border bg-chassis shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            : "border-transparent bg-transparent"
        } site-header`}
      >
        <Section as="div" className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm"
            aria-label="Corpus home"
          >
            <Logo className="text-xl text-concrete-100" />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <NavLink
                  key={link.label}
                  link={link}
                  isActive={active}
                  showIndicator
                  className={`site-nav-link min-h-11 px-2 text-sm font-medium transition-[color] focus-ring rounded-sm ${
                    active
                      ? "text-corpus-yellow"
                      : "text-concrete-400 hover:text-corpus-yellow"
                  }`}
                />
              );
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className={`toggle inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border p-2 text-concrete-100 hover:text-corpus-yellow focus-ring active:translate-y-px motion-reduce:active:translate-y-0 lg:hidden ${
              headerIsOpaque
                ? "border-panel-border bg-panel-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.5)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.45)]"
                : "border-transparent bg-transparent active:shadow-none"
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </Section>

        {menuOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="mobile-menu-panel border-t border-panel-border bg-panel-recessed lg:hidden"
          >
            <Section
              as="nav"
              className="mobile-menu-shell"
              aria-label="Mobile"
            >
              <div className="mobile-menu-register" aria-hidden="true">
                <span>Browse Corpus</span>
                <span>{folioLabel}</span>
              </div>
              {mobileNavGroups.map((group) => (
                <div
                  key={group.title}
                  className={`mobile-menu-group mobile-menu-group-${group.tone}`}
                >
                  <p className="mobile-menu-group-title">{group.title}</p>
                  <div className="mobile-menu-link-list">
                    {group.links.map((link) => {
                      const active = isActiveLink(link.href, pathname);
                      return (
                        <NavLink
                          key={link.label}
                          link={link}
                          isActive={active}
                          onClick={() => setMenuOpen(false)}
                          className="mobile-menu-link min-h-11 text-base font-medium transition-[background-color,border-color,color] focus-ring"
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
              <ul className="mobile-menu-proof" aria-label="Corpus notes">
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
        )}
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-night"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main id="main-content" className="site-main-frame flex-1">
        <div className="folio-rail folio-rail-left" aria-hidden="true">
          <span>{folioLabel}</span>
        </div>
        <div className="folio-rail folio-rail-right" aria-hidden="true">
          <span>reviewable work</span>
        </div>
        {children}
      </main>

      <div className="site-footer gilt-trim overflow-hidden border-t border-panel-border bg-footer">
        <Section
          as="footer"
          className="site-footer-grid py-12"
        >
          <div className="site-footer-register" aria-hidden="true">
            <span>closing ledger</span>
            <span>{folioLabel}</span>
            <span>reviewable work</span>
          </div>

          <div className="site-footer-identity">
            <Link
              href="/"
              aria-label="Corpus home"
              className="focus-ring inline-flex min-h-11 w-fit items-center rounded-sm"
            >
              <Logo className="text-xl text-concrete-100" />
            </Link>
            <p className="text-sm text-concrete-400">
              Built with Corpus. Keep the evidence; make the call yourself.
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
                  {group.links.map((link) => {
                    const active = isActiveLink(link.href, pathname);
                    return (
                      <NavLink
                        key={link.label}
                        link={link}
                        isActive={active}
                        className={`min-h-11 min-w-11 px-1 text-sm font-medium transition-[color] focus-ring rounded-sm ${
                          active
                            ? "text-corpus-yellow"
                            : "text-concrete-400 hover:text-corpus-yellow"
                        }`}
                      />
                    );
                  })}
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
            © {new Date().getFullYear()} Corpus contributors.
          </p>
        </Section>
      </div>
    </div>
  );
}
