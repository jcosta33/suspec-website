import type { CSSProperties } from "react";

const points = [
  [16, 6],
  [26, 11],
  [26, 21],
  [16, 26],
  [6, 21],
  [6, 11],
];
// The three keys (spec · review · findings) — the downward triangle the alternate
// vertices form, read out of the hexagon; its apex sits where the loop bottoms out.
const keys = [points[1], points[3], points[5]];

// The loop mark: the six-node loop hexagon with the keys triangle inscribed. Echoes the
// wordmark Logo; used inline as a section glyph. Strokes inherit currentColor.
export function DroneIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.1" />
      <polygon
        points={points.map(([x, y]) => `${x},${y}`).join(" ")}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <polygon
        points={keys.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {points.map(([x, y]) => (
        <line
          key={`${x}-${y}`}
          x1="16"
          y1="16"
          x2={x}
          y2={y}
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.75"
        />
      ))}
      <circle cx="16" cy="16" r="1.7" fill="currentColor" />
    </svg>
  );
}
