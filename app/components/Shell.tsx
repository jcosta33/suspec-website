"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Section } from "./Section";

const navLinks = [
  { label: "What is Suspec", href: "/what-is-suspec" },
  { label: "Loop", href: "/the-loop" },
  { label: "Skills", href: "/skills" },
  { label: "Agents", href: "/agents" },
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
      { label: "What is Suspec", href: "/what-is-suspec", step: "01" },
      { label: "Loop", href: "/the-loop", step: "02" },
      { label: "Get started", href: "/get-started", step: "03" },
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
      { label: "GitHub", href: "https://github.com/jcosta33/suspec" },
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
      { label: "What is Suspec", href: "/what-is-suspec" },
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
      { label: "GitHub", href: "https://github.com/jcosta33/suspec" },
      {
        label: "Starter kit",
        href: "https://github.com/jcosta33/suspec-starter-kit",
      },
      { label: "Colophon", href: "/colophon" },
    ],
  },
];

const backgroundMotionVars = [
  "--background-plane-origin-x",
  "--background-plane-origin-y",
  "--background-header-origin-x",
  "--background-header-origin-y",
  "--background-plane-normal-x",
  "--background-plane-normal-y",
  "--background-plane-rotate-x",
  "--background-plane-rotate-y",
  "--background-plane-shift-x",
  "--background-plane-shift-y",
  "--background-plane-drift-x",
  "--background-plane-drift-y",
  "--background-plane-drift-soft-x",
  "--background-plane-drift-soft-y",
  "--background-header-before-rotate-x",
  "--background-header-before-rotate-y",
  "--background-header-after-rotate-x",
  "--background-header-after-rotate-y",
  "--background-header-shift-x",
  "--background-header-shift-y",
  "--background-header-shift-soft-x",
  "--background-header-shift-soft-y",
  "--background-hero-edge-rotate-x",
  "--background-hero-edge-rotate-y",
  "--background-hero-motif-rotate-x",
  "--background-hero-motif-rotate-y",
  "--background-hero-shift-x",
  "--background-hero-shift-y",
] as const;

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
  if (normalizedPath === "/") return "Suspec / home";
  if (normalizedPath.startsWith("/what-is-suspec/")) return "Suspec / overview";
  if (normalizedPath.startsWith("/the-loop/")) return "Suspec / loop";
  if (normalizedPath.startsWith("/get-started/")) return "Suspec / setup";
  if (normalizedPath.startsWith("/agents/")) return "Suspec / agents";
  if (normalizedPath.startsWith("/skills/")) return "Suspec / skills";
  if (normalizedPath.startsWith("/cli/")) return "Suspec / cli";
  if (normalizedPath.startsWith("/mcp/")) return "Suspec / mcp";
  if (normalizedPath.startsWith("/docs/")) return "Suspec / manual";
  return "Suspec / record";
}

function NavLink({
  link,
  onClick,
  className,
  isActive,
  showIndicator = false,
}: {
  link: { label: string; href: string; step?: string };
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
        <span className="mobile-menu-link-main">
          {link.step && (
            <span className="mobile-menu-link-index" aria-hidden="true">
              {link.step}
            </span>
          )}
          <span>{link.label}</span>
        </span>
        {external && <ExternalLink className="h-3 w-3" aria-hidden="true" />}
      </span>
      {isActive && showIndicator && (
        <span
          className="absolute -bottom-2 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-suspec-yellow"
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
  const [trace, setTrace] = useState({ active: false, progress: 0 });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerIsOpaque = scrolled || menuOpen;

  useEffect(() => {
    document.documentElement.dataset.shellReact = "ready";
    return () => {
      delete document.documentElement.dataset.shellReact;
    };
  }, []);

  useEffect(() => {
    const canAnimate = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!canAnimate.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const writeMotion = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      const x = Math.max(-1, Math.min(1, currentX));
      const y = Math.max(-1, Math.min(1, currentY));
      const absX = Math.abs(x);
      const absY = Math.abs(y);
      const originX = 50 + x * 8;
      const originY = 53 + y * 6;

      root.style.setProperty("--background-plane-origin-x", `${originX}%`);
      root.style.setProperty("--background-plane-origin-y", `${originY}%`);
      root.style.setProperty("--background-header-origin-x", `${50 + x * 8}%`);
      root.style.setProperty("--background-header-origin-y", `${46 + y * 6}%`);
      root.style.setProperty("--background-plane-normal-x", x.toFixed(3));
      root.style.setProperty("--background-plane-normal-y", y.toFixed(3));
      root.style.setProperty("--background-plane-rotate-x", `${(-y * 8.6).toFixed(3)}deg`);
      root.style.setProperty("--background-plane-rotate-y", `${(x * 9.6).toFixed(3)}deg`);
      root.style.setProperty("--background-plane-shift-x", `${(-x * 1.8).toFixed(2)}px`);
      root.style.setProperty("--background-plane-shift-y", `${(-y * 1.45).toFixed(2)}px`);
      root.style.setProperty("--background-plane-drift-x", `${(-x * 0.62).toFixed(2)}px`);
      root.style.setProperty("--background-plane-drift-y", `${(-y * 0.5).toFixed(2)}px`);
      root.style.setProperty("--background-plane-drift-soft-x", `${(-x * 0.32).toFixed(2)}px`);
      root.style.setProperty("--background-plane-drift-soft-y", `${(-y * 0.25).toFixed(2)}px`);
      root.style.setProperty("--background-header-before-rotate-x", `${(-y * 5.3).toFixed(3)}deg`);
      root.style.setProperty("--background-header-before-rotate-y", `${(x * 6).toFixed(3)}deg`);
      root.style.setProperty("--background-header-after-rotate-x", `${(-y * 3.8).toFixed(3)}deg`);
      root.style.setProperty("--background-header-after-rotate-y", `${(x * 4.35).toFixed(3)}deg`);
      root.style.setProperty("--background-header-shift-x", `${(-x * 9.2).toFixed(2)}px`);
      root.style.setProperty("--background-header-shift-y", `${(-y * 7).toFixed(2)}px`);
      root.style.setProperty("--background-header-shift-soft-x", `${(-x * 5.2).toFixed(2)}px`);
      root.style.setProperty("--background-header-shift-soft-y", `${(-y * 4.1).toFixed(2)}px`);
      root.style.setProperty("--background-hero-edge-rotate-x", `${(-y * 4.1).toFixed(3)}deg`);
      root.style.setProperty("--background-hero-edge-rotate-y", `${(x * 4.6).toFixed(3)}deg`);
      root.style.setProperty("--background-hero-motif-rotate-x", `${(-y * 4.7).toFixed(3)}deg`);
      root.style.setProperty("--background-hero-motif-rotate-y", `${(x * 5.3).toFixed(3)}deg`);
      root.style.setProperty("--background-hero-shift-x", `${(-x * (6.6 + absY * 1.8)).toFixed(2)}px`);
      root.style.setProperty("--background-hero-shift-y", `${(-y * (5.2 + absX * 1.5)).toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.003 || Math.abs(targetY - currentY) > 0.003) {
        frame = window.requestAnimationFrame(writeMotion);
      }
    };

    const requestMotion = () => {
      if (frame === 0) frame = window.requestAnimationFrame(writeMotion);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      requestMotion();
    };

    const settleMotion = () => {
      targetX = 0;
      targetY = 0;
      requestMotion();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", settleMotion);
    window.addEventListener("blur", settleMotion);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", settleMotion);
      window.removeEventListener("blur", settleMotion);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      backgroundMotionVars.forEach((name) => root.style.removeProperty(name));
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateTrace = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const active = scrollable > 160;
      const progress = active
        ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollable) * 100)))
        : 0;

      setTrace((current) =>
        current.active === active && current.progress === progress
          ? current
          : { active, progress },
      );
    };

    const requestTraceUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateTrace);
      }
    };

    requestTraceUpdate();
    window.addEventListener("scroll", requestTraceUpdate, { passive: true });
    window.addEventListener("resize", requestTraceUpdate);

    return () => {
      window.removeEventListener("scroll", requestTraceUpdate);
      window.removeEventListener("resize", requestTraceUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-suspec-yellow focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to main content
      </a>

      <div className="site-background-perspective" aria-hidden="true">
        <span className="site-background-plane" />
      </div>

      <header
        data-nav-state={headerIsOpaque ? "opaque" : "transparent"}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          headerIsOpaque
            ? "border-panel-border bg-chassis shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
            : "border-transparent bg-transparent"
        } site-header`}
      >
        <Section as="div" className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center rounded-sm"
            aria-label="Suspec home"
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
                      ? "text-suspec-yellow"
                      : "text-concrete-400 hover:text-suspec-yellow"
                  }`}
                />
              );
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className={`toggle rounded-control inline-flex h-11 w-11 items-center justify-center border p-2 text-concrete-100 hover:text-suspec-yellow focus-ring lg:hidden ${
              headerIsOpaque
                ? "border-panel-border bg-panel-raised shadow-panel-bevel active-shadow-toggle"
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

        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          className="mobile-menu-panel border-t border-panel-border bg-panel-recessed lg:hidden"
        >
          <Section
            as="nav"
            className="mobile-menu-shell"
            aria-label="Mobile"
          >
            <div className="mobile-menu-register" aria-hidden="true">
              <span>Browse Suspec</span>
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
        hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className="trace-rail"
        data-active={trace.active ? "true" : "false"}
        data-started={trace.progress > 2 ? "true" : "false"}
        style={
          {
            "--trace-progress": `${trace.progress}%`,
          } as CSSProperties
        }
        aria-hidden="true"
      >
        <span className="trace-rail-label">trace</span>
        <span className="trace-rail-track">
          <span className="trace-rail-fill" />
        </span>
        <span className="trace-rail-readout">
          {trace.progress.toString().padStart(2, "0")}%
        </span>
      </div>

      <main id="main-content" tabIndex={-1} className="site-main-frame flex-1">
        <div className="folio-rail folio-rail-left" aria-hidden="true">
          <span data-label={folioLabel} />
        </div>
        <div className="folio-rail folio-rail-right" aria-hidden="true">
          <span data-label="reviewable work" />
        </div>
        {children}
      </main>

      <div className="site-footer gilt-trim overflow-hidden border-t border-panel-border bg-footer">
        <Section
          as="footer"
          className="site-footer-grid py-14 sm:py-16"
        >
          <div className="site-footer-register" aria-hidden="true">
            <span>closing ledger</span>
            <span>{folioLabel}</span>
            <span>reviewable work</span>
          </div>

          <div className="site-footer-identity">
            <Link
              href="/"
              aria-label="Suspec home"
              className="focus-ring inline-flex min-h-11 w-fit items-center rounded-sm"
            >
              <Logo className="text-xl text-concrete-100" />
            </Link>
            <p className="text-sm text-concrete-400">
              Built with Suspec. Keep the evidence; make the call yourself.
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
                            ? "text-suspec-yellow"
                            : "text-concrete-400 hover:text-suspec-yellow"
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
            © {new Date().getFullYear()} Suspec contributors.
          </p>
        </Section>
      </div>
    </div>
  );
}
