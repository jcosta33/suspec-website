import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { PilotLamp } from "./PilotLamp";
import { TerminalCursor } from "./TerminalCursor";
import type { SignalRole } from "./signalStyles";

const TITLE_SIZES = {
  default: "sm:text-5xl lg:text-6xl", // the inner-page heroes
  hero: "sm:text-6xl lg:text-7xl", // the larger homepage hero
} as const;

const HERO_MOTIFS = {
  loop: "page-hero-motif-loop",
  overview: "page-hero-motif-overview",
  setup: "page-hero-motif-setup",
  catalog: "page-hero-motif-catalog",
  bridge: "page-hero-motif-bridge",
  manual: "page-hero-motif-manual",
  internal: "page-hero-motif-internal",
} as const;

export interface PageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  className?: string;
  cursor?: boolean;
  titleSize?: keyof typeof TITLE_SIZES;
  tone?: SignalRole;
  motif?: keyof typeof HERO_MOTIFS;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  className = "",
  cursor = false,
  titleSize = "default",
  tone = "core",
  motif = "overview",
  children,
}: PageHeroProps) {
  return (
    <div
      className={`page-hero page-hero-tone-${tone} ${HERO_MOTIFS[motif]} motion-surface mx-auto w-full min-w-0 max-w-4xl text-center ${className}`}
      data-motif={motif}
      data-tone={tone}
    >
      <div className="page-hero-motif" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="page-hero-calibration" aria-hidden="true">
        <span>{motif}</span>
        <span>{tone}</span>
      </div>
      <Eyebrow
        className="page-hero-eyebrow mb-6"
        icon={<PilotLamp color={tone} pulse className="scale-90" />}
      >
        {eyebrow}
      </Eyebrow>
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
