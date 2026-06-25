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
      } p-6 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 sm:p-7 ${className}`}
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
      <div className="surface-glint absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" />
      <div className={`relative z-10 min-w-0 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
