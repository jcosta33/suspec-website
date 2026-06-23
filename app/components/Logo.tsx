export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display text-base font-semibold uppercase ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[1.5em] w-[1.5em] shrink-0 [filter:drop-shadow(0_0_3px_rgba(201,162,74,0.35))]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="corpus-gilt"
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ebd08a" />
            <stop offset="0.55" stopColor="#c9a24a" />
            <stop offset="1" stopColor="#7e6224" />
          </linearGradient>
          <radialGradient id="corpus-core" cx="0.5" cy="0.4" r="0.6">
            <stop stopColor="#fff3d4" />
            <stop offset="0.5" stopColor="#ebd08a" />
            <stop offset="1" stopColor="#c9a24a" />
          </radialGradient>
        </defs>
        {/* the seal — a fine gilt ring */}
        <circle cx="16" cy="16" r="13.6" stroke="url(#corpus-gilt)" strokeWidth="1" opacity="0.9" />
        {/* hexagram — fire △ and water ▽ joined: "as above, so below" */}
        <path
          d="M16 4.5 L25.96 21.75 L6.04 21.75 Z"
          stroke="url(#corpus-gilt)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M16 27.5 L6.04 10.25 L25.96 10.25 Z"
          stroke="url(#corpus-gilt)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* the quintessence — a gilded point at the centre */}
        <circle cx="16" cy="16" r="1.9" fill="url(#corpus-core)" />
      </svg>
      <span className="tracking-[0.2em]">CORPUS</span>
    </span>
  );
}
