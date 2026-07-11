// Six-node seal field — concentric instrument rings, a turning degree ring, and
// the six-node loop dial with its durable spine (the inscribed triangle the
// three alternate nodes form) drawn through it. Kept as HeroHexGrid for the
// existing import surface.
const TICKS = Array.from({ length: 72 }, (_, i) => i);
const GOLD = "#d88a24";
const LOOP_POINTS = Array.from({ length: 6 }, (_, i) => {
  const angle = -90 + i * 60;
  const rad = (angle * Math.PI) / 180;
  return {
    x: 300 + Math.cos(rad) * 210,
    y: 300 + Math.sin(rad) * 210,
    spine: i % 2 === 0,
  };
});
const SPINE_POINTS = LOOP_POINTS.filter((p) => p.spine);

export function HeroHexGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`home-hero-seal-field pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.2]"
        viewBox="45 45 510 510"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
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

        {/* the six-node loop dial */}
        <polygon
          points={LOOP_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
          stroke={GOLD}
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.55"
        />

        {/* the durable spine — inscribed triangle through the alternate nodes */}
        <polygon
          points={SPINE_POINTS.map((p) => `${p.x},${p.y}`).join(" ")}
          fill={GOLD}
          fillOpacity="0.09"
          stroke={GOLD}
          strokeWidth="2.2"
          strokeLinejoin="round"
          opacity="1"
        />

        {/* hub spokes to the spine */}
        {SPINE_POINTS.map((p) => (
          <line
            key={`spoke-${p.x}-${p.y}`}
            x1="300"
            y1="300"
            x2={p.x}
            y2={p.y}
            stroke={GOLD}
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))}

        {/* nodes — spine filled, optional hollow */}
        {LOOP_POINTS.map((p) => (
          <circle
            key={`node-${p.x}-${p.y}`}
            cx={p.x}
            cy={p.y}
            r={p.spine ? 7 : 5}
            fill={p.spine ? GOLD : "none"}
            stroke={GOLD}
            strokeWidth="1"
            opacity={p.spine ? 0.95 : 0.62}
          />
        ))}

        {/* center hub */}
        <circle cx="300" cy="300" r="4" fill={GOLD} opacity="0.9" />
      </svg>
    </div>
  );
}
