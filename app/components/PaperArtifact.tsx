import type { ReactNode } from "react";

type PaperArtifactProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  title?: string;
  meta?: string;
};

export function PaperArtifact({
  children,
  className = "",
  label = "note",
  title,
  meta,
}: PaperArtifactProps) {
  return (
    <article className={`paper-artifact min-w-0 overflow-hidden p-5 sm:p-6 ${className}`}>
      <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-ink/20 pb-4 sm:gap-4">
        <div className="min-w-0">
          {title && (
            <p className="break-words font-heading text-sm font-bold uppercase tracking-wide text-ink">
              {title}
            </p>
          )}
          {meta && (
            <p className="break-words mt-1 font-mono text-xs uppercase tracking-wide text-pencil">
              {meta}
            </p>
          )}
        </div>
        <span className="paper-stamp shrink-0">{label}</span>
      </div>
      <div className="relative z-10 mt-5 break-words font-mono text-sm leading-7 text-ink">
        {children}
      </div>
    </article>
  );
}
