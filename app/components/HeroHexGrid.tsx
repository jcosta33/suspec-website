"use client";

import { useId } from "react";

export function HeroHexGrid({ className = "" }: { className?: string }) {
  const id = useId();
  const patternId = `hex-pattern-${id}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full opacity-20"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z"
              fill="none"
              stroke="#FACC15"
              strokeWidth="1"
            />
            <path
              d="M28 50 L56 66 L56 100 L28 116 L0 100 L0 66 Z"
              fill="none"
              stroke="#FACC15"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
