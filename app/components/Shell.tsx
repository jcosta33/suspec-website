"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Section } from "./Section";

const navLinks = [
  { label: "What is corpus", href: "/what-is-corpus" },
  { label: "Loop", href: "/the-loop" },
  { label: "Skills", href: "/skills" },
  { label: "Agents", href: "/agents" },
  { label: "CLI", href: "/cli" },
  { label: "MCP", href: "/mcp" },
  { label: "Get started", href: "/get-started" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/jcosta33/corpus" },
];

const footerLinks = [
  { label: "Get started", href: "/get-started" },
  { label: "Skills", href: "/skills" },
  { label: "Agents", href: "/agents" },
  { label: "CLI", href: "/cli" },
  { label: "MCP", href: "/mcp" },
  { label: "GitHub", href: "https://github.com/jcosta33/corpus" },
  {
    label: "Starter kit",
    href: "https://github.com/jcosta33/corpus-starter-kit",
  },
  { label: "Docs", href: "/docs" },
  { label: "Colophon", href: "/colophon" },
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
      className={`relative inline-flex items-center ${className}`}
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
    <div className="flex min-h-full flex-col">
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
        }`}
      >
        <Section as="div" className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="focus-ring rounded-sm"
            aria-label="corpus home"
          >
            <Logo className="text-lg text-concrete-100" />
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
                  className={`text-sm font-medium transition-[color] focus-ring rounded-sm ${
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
            className={`toggle inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border p-2 text-concrete-100 hover:text-corpus-yellow focus-ring active:translate-y-px lg:hidden ${
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
            className="border-t border-panel-border bg-panel-recessed lg:hidden"
          >
            <Section
              as="nav"
              className="flex flex-col gap-1 py-6"
              aria-label="Mobile"
            >
              {navLinks.map((link) => {
                const active = isActiveLink(link.href, pathname);
                return (
                  <NavLink
                    key={link.label}
                    link={link}
                    isActive={active}
                    onClick={() => setMenuOpen(false)}
                    className={`min-h-11 -mx-2 px-2 text-base font-medium transition-[color] focus-ring rounded-sm ${
                      active
                        ? "text-corpus-yellow"
                        : "text-concrete-100 hover:text-corpus-yellow"
                    }`}
                  />
                );
              })}
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

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <div className="gilt-trim border-t border-panel-border bg-panel-raised">
        <Section
          as="footer"
          className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              aria-label="corpus home"
              className="focus-ring rounded-sm w-fit"
            >
              <Logo className="text-base text-concrete-100" />
            </Link>
            <p className="text-sm text-concrete-400">
              Built with corpus. Keep the evidence; make the call yourself.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Footer">
            {footerLinks.map((link) => {
              const active = isActiveLink(link.href, pathname);
              return (
                <NavLink
                  key={link.label}
                  link={link}
                  isActive={active}
                  className={`min-h-11 text-sm font-medium transition-[color] focus-ring rounded-sm ${
                    active
                      ? "text-corpus-yellow"
                      : "text-concrete-400 hover:text-corpus-yellow"
                  }`}
                />
              );
            })}
          </nav>

          <p className="text-sm text-concrete-400">
            © {new Date().getFullYear()} corpus contributors.
          </p>
        </Section>
      </div>
    </div>
  );
}
