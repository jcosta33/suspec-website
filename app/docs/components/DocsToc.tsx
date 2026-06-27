"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { DocHeading } from "../lib/render";

// On-this-page rail with scroll-spy. An IntersectionObserver over the heading ids (the same ones the
// anchors target) lights up the section currently near the top of the viewport — matching the
// sidebar's "you are here" vocabulary. The page renders it only once there are enough sections to
// justify the extra rail.
export function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    headings.findIndex((h) => h.id === activeId),
  );
  const activePosition = Math.min(activeIndex + 1, headings.length);
  const progress =
    headings.length > 1
      ? (activeIndex / (headings.length - 1)) * 100
      : headings.length > 0
        ? 100
        : 0;

  const progressStyle = {
    "--docs-toc-progress": `${progress}%`,
  } as CSSProperties;

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // active zone = the top ~30% of the viewport, below the sticky header
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav
      className="docs-toc"
      aria-label="On this page"
      style={progressStyle}
    >
      <div className="docs-toc-head">
        <p className="docs-toc-title">On this page</p>
        <span className="docs-toc-count" aria-hidden="true">
          {String(activePosition).padStart(2, "0")} /{" "}
          {String(headings.length).padStart(2, "0")}
        </span>
        <span className="sr-only">
          Section {activePosition} of {headings.length}.
        </span>
      </div>
      <div className="docs-toc-progress" aria-hidden="true">
        <span />
      </div>
      <ul>
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id} className={h.depth === 3 ? "docs-toc-sub" : undefined}>
              <a
                href={`#${h.id}`}
                className={active ? "is-active" : undefined}
                aria-current={active ? "true" : undefined}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
