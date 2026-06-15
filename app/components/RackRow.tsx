import type { ReactNode } from "react";

export interface RackRowProps {
  children: ReactNode;
  className?: string;
}

export function RackRow({ children, className = "" }: RackRowProps) {
  return (
    <div className={`panel-raised rivet-row p-3 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}
