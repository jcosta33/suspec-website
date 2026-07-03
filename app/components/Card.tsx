import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import {
  normalizeSignalRole,
  type SignalInput,
} from "./signalStyles";

export interface CardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  ariaLabel?: string;
  /** Decorative corner screws — same prop name + output as Panel's `screws` (shared CSS chrome). */
  screws?: boolean;
  brushed?: boolean;
  rivets?: boolean;
  signal?: SignalInput;
}

export function Card({
  children,
  className = "",
  contentClassName = "",
  href,
  target,
  rel,
  ariaLabel,
  screws = false,
  brushed = false,
  rivets = false,
  signal,
}: CardProps) {
  const signalRole = signal ? normalizeSignalRole(signal) : undefined;
  const signalSurfaceClass = signalRole
    ? `signal-surface signal-surface-${signalRole}`
    : "";
  const linkedChromeClassName = signalRole
    ? "focus-ring block text-left no-underline"
    : "focus-ring block text-left no-underline hover:border-brass/75";
  const chromeClassName = `panel-raised group relative overflow-hidden ${
    screws ? "screw-corners screw-corners-bottom" : ""
  } ${href ? linkedChromeClassName : ""} ${signalSurfaceClass} p-6 transition-[border-color,box-shadow] duration-200 ease-out sm:p-7 ${className}`;
  const content = (
    <>
      {brushed && (
        <div
          className="brushed-metal absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      {rivets && (
        <div
          className="rivet-row absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      <div
        className="surface-engraving absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
      />
      <div
        className="surface-glint absolute inset-0 pointer-events-none z-[2]"
        aria-hidden="true"
      />
      <div className={`relative z-10 min-w-0 ${contentClassName}`}>
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        data-color-role={signalRole}
        className={chromeClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <div data-color-role={signalRole} className={chromeClassName}>
      {content}
    </div>
  );
}
