export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-heading text-base font-bold uppercase ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[1.45em] w-[1.45em] shrink-0 [filter:drop-shadow(0_0_3px_rgba(250,204,21,0.3))]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="corpus-hex-face"
            x1="16"
            y1="1.5"
            x2="16"
            y2="30.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2B2B22" />
            <stop offset="0.55" stopColor="#191912" />
            <stop offset="1" stopColor="#0C0C09" />
          </linearGradient>
          <radialGradient id="corpus-core" cx="0.5" cy="0.4" r="0.62">
            <stop stopColor="#FFEFB0" />
            <stop offset="0.45" stopColor="#FACC15" />
            <stop offset="1" stopColor="#9A7A12" />
          </radialGradient>
        </defs>
        {/* hexagonal cell — beveled so it reads as extruded from the bar */}
        <path
          d="M16 1.5 L29.5 9.25 L29.5 22.75 L16 30.5 L2.5 22.75 L2.5 9.25 Z"
          fill="url(#corpus-hex-face)"
          stroke="#54544A"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* lit upper edges (top bevel) */}
        <path
          d="M2.5 9.25 L16 1.5 L29.5 9.25"
          stroke="#7C7C6E"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* shadowed lower edges (bottom bevel) */}
        <path
          d="M2.5 22.75 L16 30.5 L29.5 22.75"
          stroke="#000000"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />
        {/* glowing core — the drone in its cell */}
        <circle cx="16" cy="16" r="4.8" fill="url(#corpus-core)" />
        <circle cx="16" cy="16" r="4.8" fill="none" stroke="#FFEFB0" strokeWidth="0.7" opacity="0.55" />
      </svg>
      <span className="tracking-[0.14em]">CORPUS</span>
    </span>
  );
}
