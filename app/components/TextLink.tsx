import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type TextLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  children: ReactNode;
  className?: string;
  touchTarget?: boolean;
};

export function TextLink({
  href,
  children,
  className = "",
  touchTarget = true,
  ...props
}: TextLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      className={`link-motion inline-flex ${touchTarget ? "min-h-11" : "min-h-8"} items-center rounded-sm text-corpus-yellow underline decoration-brass/60 underline-offset-4 transition-[color,text-decoration-color] hover:text-gold-bright hover:decoration-gold-bright focus-ring ${className}`}
    >
      {children}
    </Link>
  );
}
