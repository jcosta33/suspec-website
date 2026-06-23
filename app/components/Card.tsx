import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /** Decorative corner screws — same prop name + output as Panel's `screws` (shared CSS chrome). */
  screws?: boolean;
  brushed?: boolean;
  rivets?: boolean;
}

export function Card({
  children,
  className = "",
  contentClassName = "",
  screws = false,
  brushed = false,
  rivets = false,
}: CardProps) {
  return (
    <div
      className={`panel-raised group relative overflow-hidden ${
        screws ? "screw-corners screw-corners-bottom" : ""
      } p-6 transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(216,138,36,0.48),inset_0_-2px_0_rgba(0,0,0,0.5)] active:translate-y-0 active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.55)] sm:p-7 ${className}`}
    >
      {brushed && (
        <div
          className="brushed-metal absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      {rivets && (
        <div
          className="rivet-row absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      <div className={`relative z-10 min-w-0 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
