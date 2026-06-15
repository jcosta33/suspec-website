export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-heading text-base font-bold uppercase tracking-tight ${className}`}
    >
      Swarm
      <span className="relative inline-flex h-[1.1em] w-[1.1em] items-center justify-center rounded-[2px] border border-panel-border bg-panel-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.5)]">
        <span className="absolute inset-0 rounded-[2px] bg-gradient-to-b from-white/10 to-transparent" />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-[0.65em] w-[0.65em]"
          aria-hidden="true"
        >
          <path
            d="M4 8h8M8 4v8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  );
}
