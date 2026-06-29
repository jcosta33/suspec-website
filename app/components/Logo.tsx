import { useId } from "react";

// The mark synthesizes the two shapes of the method: the six-step loop is the
// hexagon; the durable spine (Spec · Run · Close) is the equilateral triangle
// its three alternate vertices already form. The triangle is not added to the
// hexagon — it is read out of it. Spine vertices are filled; the three optional
// steps (Pull · Task · Review) sit between as quiet nodes.
const HEX: ReadonlyArray<readonly [number, number]> = [
  [16, 4.2],
  [26.22, 10.1],
  [26.22, 21.9],
  [16, 27.8],
  [5.78, 21.9],
  [5.78, 10.1],
];
const SPINE = [HEX[0], HEX[2], HEX[4]] as const;
const OPTIONAL = [HEX[1], HEX[3], HEX[5]] as const;

export function Logo({ className = "" }: { className?: string }) {
  const gradientId = `${useId().replaceAll(":", "")}-corpus-gilt`;

  return (
    <span
      className={`inline-flex items-center gap-2 align-middle font-heading text-xl font-bold leading-none tracking-[0] ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-[1.18em] w-[1.18em] shrink-0"
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
          strokeWidth="1.15"
          strokeLinejoin="round"
          opacity="0.62"
        />

        {/* the spine — inscribed triangle, a filled core within the loop */}
        <polygon
          points={SPINE.map(([x, y]) => `${x},${y}`).join(" ")}
          fill={`url(#${gradientId})`}
          fillOpacity="0.1"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.65"
          strokeLinejoin="round"
        />

        {/* the three optional steps — quiet nodes between the spine */}
        {OPTIONAL.map(([x, y]) => (
          <circle
            key={`opt-${x}-${y}`}
            cx={x}
            cy={y}
            r="0.9"
            fill="#080604"
            stroke={`url(#${gradientId})`}
            strokeWidth="0.85"
            opacity="0.7"
          />
        ))}

        {/* the spine vertices — filled */}
        {SPINE.map(([x, y]) => (
          <circle
            key={`spine-${x}-${y}`}
            cx={x}
            cy={y}
            r="1.85"
            fill={`url(#${gradientId})`}
          />
        ))}

        {/* center hub */}
        <circle cx="16" cy="16" r="1.4" fill="#d88a24" />
      </svg>
      <span className="text-[1.1em] font-bold leading-[0.92]">Corpus</span>
    </span>
  );
}
