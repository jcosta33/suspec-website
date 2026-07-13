import { ArrowRight } from "lucide-react";
import { type SignalRole } from "./signalStyles";

export interface PageNavItem {
  label: string;
  href: string;
  signal: SignalRole;
}

export interface PageNavProps {
  items: ReadonlyArray<PageNavItem>;
  ariaLabel: string;
  /**
   * Positioning classes for an outer <nav> wrapper. When set, the link list is
    * rendered inside a page-nav wrapper, and `aria-label` lives on the outer
   * <nav> (the cli/mcp layout). When omitted, the link list is the <nav> itself
    * and carries `aria-label` directly (the package layout).
   */
  wrapperClassName?: string;
  /** Extra classes appended to the page-nav element. */
  className?: string;
}

export function PageNav({
  items,
  ariaLabel,
  wrapperClassName,
  className = "",
}: PageNavProps) {
  const links = items.map((item, index) => (
    <a
      key={item.href}
      href={item.href}
      data-color-role={item.signal}
      className={`agent-page-nav-link agent-page-nav-link-${item.signal} focus-ring group`}
    >
      <span className="agent-page-nav-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}{" "}
      </span>
      <span className="agent-page-nav-label">{item.label}</span>
      <ArrowRight className="motion-nudge-x h-3.5 w-3.5" aria-hidden="true" />
    </a>
  ));

  if (wrapperClassName !== undefined) {
    return (
      <nav className={`page-nav-wrap ${wrapperClassName}`} aria-label={ariaLabel}>
        <div className={`agent-page-nav ${className}`.trimEnd()}>{links}</div>
      </nav>
    );
  }

  return (
    <nav className={`page-nav-wrap agent-page-nav ${className}`.trimEnd()} aria-label={ariaLabel}>
      {links}
    </nav>
  );
}
