export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-heading text-base font-bold uppercase tracking-tight ${className}`}
    >
      Swarm
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1em] w-[1em]"
        aria-hidden="true"
      >
        <rect width="16" height="16" rx="2" fill="#FACC15" />
        <path
          d="M4 8h8M8 4v8"
          stroke="#0A0A0A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
