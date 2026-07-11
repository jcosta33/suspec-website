import { useId } from "react";

// The mark synthesizes the two shapes of the method: the hexagon is the full
// six-step loop — intent, spec, implement, review, check, findings — and the
// equilateral triangle its three alternate vertices form is the three keys —
// intent · review · findings, the parts present on virtually every change.
// The triangle is read out of the hexagon, not added; it points DOWN, its
// apex where the loop bottoms out at reconciliation. The remaining three
// vertices are the quiet nodes.
const HEX: ReadonlyArray<readonly [number, number]> = [
  [16, 4.2], // 0 — top vertex (quiet)
  [26.22, 10.1], // 1 — triangle vertex
  [26.22, 21.9], // 2 — quiet
  [16, 27.8], // 3 — triangle vertex (apex)
  [5.78, 21.9], // 4 — quiet
  [5.78, 10.1], // 5 — triangle vertex
];
const KEYS = [HEX[1], HEX[3], HEX[5]] as const;
const QUIET = [HEX[0], HEX[2], HEX[4]] as const;

export function Logo({ className = "" }: { className?: string }) {
  const gradientId = `${useId().replaceAll(":", "")}-suspec-gilt`;

  return (
    <span
      className={`inline-flex items-center align-middle leading-none ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[1.55em] w-[1.55em] shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#f0b85c" />
            <stop offset="0.55" stopColor="#d88a24" />
            <stop offset="1" stopColor="#bf7927" />
          </linearGradient>
        </defs>

        {/* the loop — hexagon frame */}
        <polygon
          points={HEX.map(([x, y]) => `${x},${y}`).join(" ")}
          stroke={`url(#${gradientId})`}
          strokeWidth="1.9"
          strokeLinejoin="round"
          opacity="0.52"
        />

        {/* the keys — inscribed triangle, a filled core within the loop */}
        <polygon
          points={KEYS.map(([x, y]) => `${x},${y}`).join(" ")}
          fill={`url(#${gradientId})`}
          fillOpacity="0.1"
          stroke={`url(#${gradientId})`}
          strokeWidth="2.45"
          strokeLinejoin="round"
        />

        {/* the quiet nodes between the triangle's vertices */}
        {QUIET.map(([x, y]) => (
          <circle
            key={`quiet-${x}-${y}`}
            cx={x}
            cy={y}
            r="1.05"
            fill="#080604"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.3"
            opacity="0.76"
          />
        ))}

        {/* the triangle vertices — filled */}
        {KEYS.map(([x, y]) => (
          <circle
            key={`keys-${x}-${y}`}
            cx={x}
            cy={y}
            r="2.22"
            fill={`url(#${gradientId})`}
          />
        ))}

        {/* center hub */}
        <circle cx="16" cy="16" r="1.82" fill="#d88a24" />
      </svg>
    </span>
  );
}
