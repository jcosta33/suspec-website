import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ActionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ActionLink({
  href,
  children,
  className = "",
  ...props
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      className={`link-motion inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] px-1 text-center text-sm font-semibold text-concrete-100 underline decoration-brass/60 underline-offset-4 transition-[color,text-decoration-color] hover:text-suspec-yellow hover:decoration-suspec-yellow focus-ring ${className}`}
    >
      {children}
    </Link>
  );
}
