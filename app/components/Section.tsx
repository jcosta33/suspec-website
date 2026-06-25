import type { ReactNode } from "react";

export interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "header" | "footer" | "div" | "nav";
  id?: string;
}

export function Section({ children, className = "", as: Tag = "section", id }: SectionProps) {
  return (
    <Tag
      id={id}
      className={`motion-surface mx-auto w-full max-w-7xl scroll-mt-24 px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
