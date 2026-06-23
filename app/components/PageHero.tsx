import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { TerminalCursor } from "./TerminalCursor";

const TITLE_SIZES = {
  default: "sm:text-5xl lg:text-6xl", // the inner-page heroes
  hero: "sm:text-6xl lg:text-7xl", // the larger homepage hero
} as const;

export interface PageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  cursor?: boolean;
  titleSize?: keyof typeof TITLE_SIZES;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  cursor = true,
  titleSize = "default",
  children,
}: PageHeroProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
      <h1
        className={`font-display text-4xl font-semibold uppercase tracking-[0.015em] text-concrete-100 ${TITLE_SIZES[titleSize]}`}
      >
        {title}
        {cursor && <TerminalCursor className="ml-2 align-middle" />}
      </h1>
      {children}
    </div>
  );
}
