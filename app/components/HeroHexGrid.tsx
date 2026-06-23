// An alchemical astrolabe — concentric gilt rings, a slowly turning degree ring,
// and an inscribed hexagram, very faint behind the hero. (Name kept for its one
// consumer; the motif is the night-sky instrument, no longer a hex grid.)
const TICKS = Array.from({ length: 72 }, (_, i) => i);
const GOLD = "#c9a24a";

export function HeroHexGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute left-1/2 top-1/2 h-[140%] w-auto min-w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* concentric rings */}
        {[270, 210, 150, 96].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} stroke={GOLD} strokeWidth="1" />
        ))}

        {/* slowly turning degree ring */}
        <g
          className="animate-rotate-slow"
          style={{ transformBox: "view-box", transformOrigin: "300px 300px" }}
        >
          {TICKS.map((i) => {
            const major = i % 6 === 0;
            const a = (i / TICKS.length) * Math.PI * 2;
            const r1 = major ? 252 : 258;
            const x1 = 300 + Math.cos(a) * r1;
            const y1 = 300 + Math.sin(a) * r1;
            const x2 = 300 + Math.cos(a) * 270;
            const y2 = 300 + Math.sin(a) * 270;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={GOLD}
                strokeWidth={major ? 1.4 : 0.8}
              />
            );
          })}
        </g>

        {/* inscribed hexagram — as above, so below */}
        <path
          d="M300 60 L502 410 L98 410 Z"
          stroke={GOLD}
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M300 540 L98 190 L502 190 Z"
          stroke={GOLD}
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
