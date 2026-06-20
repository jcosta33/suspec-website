import type { ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "lg" | "xl" | "2xl" | "4xl";

export interface HeadingProps {
  children: ReactNode;
  as?: HeadingTag;
  size?: HeadingSize;
  className?: string;
}

const sizes: Record<HeadingSize, string> = {
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "4xl": "text-4xl",
};

export function Heading({ children, as: Tag = "h2", size = "2xl", className = "" }: HeadingProps) {
  return (
    <Tag
      className={`font-heading ${sizes[size]} font-bold uppercase tracking-tight text-concrete-100 ${className}`}
    >
      {children}
    </Tag>
  );
}
