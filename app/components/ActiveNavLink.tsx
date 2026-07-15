import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ActiveNavLinkProps {
  link: { label: string; href: string; step?: string };
  className: string;
}

export function ActiveNavLink({ link, className }: ActiveNavLinkProps) {
  const external = link.href.startsWith("http");

  return (
    <Link
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={external ? `${link.label} (opens in new tab)` : undefined}
      data-site-nav-link={external ? undefined : "true"}
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
