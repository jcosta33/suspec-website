import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { TerminalCursor } from "./TerminalCursor";

export interface PageHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  cursor?: boolean;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, cursor = true, children }: PageHeroProps) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
      <h1 className="font-heading text-4xl font-bold uppercase tracking-tight text-concrete-100 sm:text-5xl lg:text-6xl">
        {title}
        {cursor && <TerminalCursor className="ml-2 align-middle" />}
      </h1>
      {children}
    </div>
  );
}
