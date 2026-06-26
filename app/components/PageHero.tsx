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
  tone?:
    | "core"
    | "evidence"
    | "greenfield"
    | "brownfield"
    | "change"
    | "reference"
    | "muted";
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  cursor = false,
  titleSize = "default",
  tone = "core",
  children,
}: PageHeroProps) {
  return (
    <div
      className={`page-hero page-hero-tone-${tone} motion-surface mx-auto w-full min-w-0 max-w-4xl text-center`}
    >
      <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
      <h1
        className={`page-hero-title max-w-full break-words font-heading text-4xl font-bold tracking-[0] text-concrete-100 ${TITLE_SIZES[titleSize]}`}
      >
        {title}
        {cursor && <TerminalCursor className="ml-2 align-middle" />}
      </h1>
      <div className="page-hero-datum" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {children}
    </div>
  );
}
