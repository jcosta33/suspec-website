"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

interface ActiveNavLinkProps {
  link: { label: string; href: string; step?: string };
  className: string;
}

function normalizePath(value: string) {
  const pathname = value.split(/[?#]/, 1)[0] || "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function ActiveNavLink({ link, className }: ActiveNavLinkProps) {
  const pathname = usePathname() || "/";
  const external = link.href.startsWith("http");
  const currentPath = normalizePath(pathname);
  const linkPath = normalizePath(link.href);
  const active =
    !external &&
    (currentPath === linkPath ||
      (linkPath !== "/" && currentPath.startsWith(linkPath)));

  return (
    <Link
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={external ? `${link.label} (opens in new tab)` : undefined}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex min-w-11 items-center ${className}`}
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
    </Link>
  );
}
