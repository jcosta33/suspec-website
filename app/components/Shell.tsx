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

const pointerMotionProperties = [
  "--background-plane-tilt-x",
  "--background-plane-tilt-y",
  "--background-plane-origin-x",
  "--background-plane-origin-y",
  "--background-header-tilt-x",
  "--background-header-tilt-y",
  "--background-plane-rotate-x",
  "--background-plane-rotate-y",
  "--background-plane-shift-x",
  "--background-plane-shift-y",
  "--background-plane-drift-x",
  "--background-plane-drift-y",
  "--background-plane-drift-soft-x",
  "--background-plane-drift-soft-y",
  "--background-plane-skew-x",
  "--background-plane-skew-y",
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
  "--background-header-origin-x",
  "--background-header-origin-y",
  "--background-plane-normal-x",
  "--background-plane-normal-y",
] as const;

function setPointerMotion(
  root: HTMLElement,
  values: Partial<Record<(typeof pointerMotionProperties)[number], string>>,
) {
  Object.entries(values).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

function resetPointerMotion(root: HTMLElement) {
  pointerMotionProperties.forEach((name) => root.style.removeProperty(name));
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
    const root = document.documentElement;
    const motionQuery = window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const applyPointerMotion = () => {
      frame = 0;
      root.dataset.backgroundMotion = "active";
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      const normalX = Math.max(-1, Math.min(1, (pointerX / width - 0.5) * 2));
      const normalY = Math.max(-1, Math.min(1, (pointerY / height - 0.5) * 2));
      const planeTiltX = -normalY * 7.6;
      const planeTiltY = normalX * 8.8;
      const headerTiltX = planeTiltX * 0.88;
      const headerTiltY = planeTiltY * 0.88;
      const planeShiftX = -normalX * 2.6;
      const planeShiftY = -normalY * 1.8;
      const planeDriftX = -normalX * 0.9;
      const planeDriftY = -normalY * 0.6;
      const headerShiftX = -normalX * 13.8;
      const headerShiftY = -normalY * 8.2;
      const heroShiftX = -normalX * 10.2;
      const heroShiftY = -normalY * 6.2;

      setPointerMotion(root, {
        "--background-plane-normal-x": normalX.toFixed(3),
        "--background-plane-normal-y": normalY.toFixed(3),
        "--background-plane-origin-x": `${(50 + normalX * 5).toFixed(2)}%`,
        "--background-plane-origin-y": `${(54 + normalY * 4).toFixed(2)}%`,
        "--background-plane-tilt-x": `${planeTiltX.toFixed(3)}deg`,
        "--background-plane-tilt-y": `${planeTiltY.toFixed(3)}deg`,
        "--background-plane-rotate-x": `${planeTiltX.toFixed(3)}deg`,
        "--background-plane-rotate-y": `${planeTiltY.toFixed(3)}deg`,
        "--background-plane-shift-x": `${planeShiftX.toFixed(2)}px`,
        "--background-plane-shift-y": `${planeShiftY.toFixed(2)}px`,
        "--background-plane-drift-x": `${planeDriftX.toFixed(2)}px`,
        "--background-plane-drift-y": `${planeDriftY.toFixed(2)}px`,
        "--background-plane-drift-soft-x": `${(planeDriftX * 0.54).toFixed(2)}px`,
        "--background-plane-drift-soft-y": `${(planeDriftY * 0.54).toFixed(2)}px`,
        "--background-plane-skew-x": "0deg",
        "--background-plane-skew-y": "0deg",
        "--background-header-origin-x": `${(50 + normalX * 4).toFixed(2)}%`,
        "--background-header-origin-y": `${(46 + normalY * 3).toFixed(2)}%`,
        "--background-header-tilt-x": `${headerTiltX.toFixed(3)}deg`,
        "--background-header-tilt-y": `${headerTiltY.toFixed(3)}deg`,
        "--background-header-before-rotate-x": `${(headerTiltX * 1.12).toFixed(3)}deg`,
        "--background-header-before-rotate-y": `${(headerTiltY * 1.12).toFixed(3)}deg`,
        "--background-header-after-rotate-x": `${(headerTiltX * 0.92).toFixed(3)}deg`,
        "--background-header-after-rotate-y": `${(headerTiltY * 0.92).toFixed(3)}deg`,
        "--background-header-shift-x": `${headerShiftX.toFixed(2)}px`,
        "--background-header-shift-y": `${headerShiftY.toFixed(2)}px`,
        "--background-header-shift-soft-x": `${(headerShiftX * 0.72).toFixed(2)}px`,
        "--background-header-shift-soft-y": `${(headerShiftY * 0.72).toFixed(2)}px`,
        "--background-hero-edge-rotate-x": `${headerTiltX.toFixed(3)}deg`,
        "--background-hero-edge-rotate-y": `${headerTiltY.toFixed(3)}deg`,
        "--background-hero-motif-rotate-x": `${(headerTiltX * 1.08).toFixed(3)}deg`,
        "--background-hero-motif-rotate-y": `${(headerTiltY * 1.08).toFixed(3)}deg`,
        "--background-hero-shift-x": `${heroShiftX.toFixed(2)}px`,
        "--background-hero-shift-y": `${heroShiftY.toFixed(2)}px`,
      });
    };

    const requestPointerMotion = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(applyPointerMotion);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!motionQuery.matches || event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      requestPointerMotion();
    };

    const onMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        root.dataset.backgroundMotion = "active";
        requestPointerMotion();
      } else {
        delete root.dataset.backgroundMotion;
        resetPointerMotion(root);
      }
    };

    const onWindowBlur = () => {
      delete root.dataset.backgroundMotion;
      resetPointerMotion(root);
    };

    onMotionPreferenceChange();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    motionQuery.addEventListener("change", onMotionPreferenceChange);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onWindowBlur);
      motionQuery.removeEventListener("change", onMotionPreferenceChange);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      delete root.dataset.backgroundMotion;
      resetPointerMotion(root);
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
            className={`toggle inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border p-2 text-concrete-100 hover:text-suspec-yellow focus-ring lg:hidden ${
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
