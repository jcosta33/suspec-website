import {
  Inbox,
  FileText,
  ListChecks,
  Terminal,
  ScanEye,
  BookMarked,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { SignalPulse } from "./SignalPulse";

const steps = [
  {
    number: "01",
    label: "Intent",
    icon: Inbox,
    descriptor: "capture the ask",
    summary: "Name the work before it mutates.",
    description:
      "Every change starts here — often one sentence folded inline. Capture the ask verbatim only when the original is worth preserving.",
  },
  {
    number: "02",
    label: "Spec",
    icon: FileText,
    descriptor: "define requirements",
    summary: "Set the bar and how to check it.",
    description:
      "The form intent graduates into: verifiable requirements, one per id, each with a Verify with: line. A trivial fix gets one inline line, no file.",
  },
  {
    number: "03",
    label: "Implement",
    icon: Terminal,
    descriptor: "run the change",
    summary: "Do the work. Keep the receipts.",
    description:
      "Your agent writes the code, runs every verify command, and pastes the real output beside each requirement.",
  },
  {
    number: "04",
    label: "Review",
    icon: ScanEye,
    descriptor: "compare evidence",
    summary: "Compare the result with the bar.",
    description:
      "An independent reviewer — never the implementer — reconciles the evidence against the spec. Empty evidence is Unverified, never Pass.",
  },
  {
    number: "05",
    label: "Check",
    icon: ListChecks,
    descriptor: "report facts",
    summary: "Lint the paperwork. No verdicts.",
    description:
      "Pulled in when the work earns it: suspec check reports the facts a lazy review cannot fake. Exit codes are the API; it never renders a verdict.",
  },
  {
    number: "06",
    label: "Findings",
    icon: BookMarked,
    descriptor: "keep lessons",
    summary: "Keep the lesson. Bin the rest.",
    description:
      "Keep what the pass taught. Durable lessons become native harness memories, decisions become ADRs, behavior becomes tests.",
  },
] as const;

export function LoopDiagram({
  linkSteps = false,
  compact = false,
}: {
  linkSteps?: boolean;
  compact?: boolean;
}) {
  const sealPoints = steps.map((step, index) => {
    const angle = -90 + index * 60;
    const rad = (angle * Math.PI) / 180;
    return {
      ...step,
      x: 50 + Math.cos(rad) * 33,
      y: 50 + Math.sin(rad) * 33,
    };
  });
  const sealPath = sealPoints.map((point) => `${point.x},${point.y}`).join(" ");
  // The inscribed triangle, read out of the hexagon's alternate vertices. It stands
  // for the three keys — spec · review · findings.
  const keysSeal = [sealPoints[1], sealPoints[3], sealPoints[5]]
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const tickPoints = Array.from({ length: 12 }, (_, index) => {
    const angle = -90 + index * 30;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: 50 + Math.cos(rad) * 38,
      y1: 50 + Math.sin(rad) * 38,
      x2: 50 + Math.cos(rad) * 43,
      y2: 50 + Math.sin(rad) * 43,
    };
  });

  return (
    <div className="loop-diagram reveal flex min-w-0 flex-col gap-8">
      <div className="loop-diagram-summary panel-raised grid min-w-0 max-w-full gap-8 p-5 md:grid-cols-[18rem_1fr] md:items-center">
        <div className="loop-diagram-seal relative mx-auto aspect-square w-full max-w-[18rem]">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            aria-label="Suspec seal: the six-step loop hexagon with the inscribed triangle of the three keys — spec, review, findings"
            role="img"
          >
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="var(--color-panel-border)"
              strokeWidth="0.8"
            />
            <g className="seal-ticks animate-rotate-slow" aria-hidden="true">
              {tickPoints.map((tick, index) => (
                <line
                  key={`tick-${index}`}
                  x1={tick.x1}
                  y1={tick.y1}
                  x2={tick.x2}
                  y2={tick.y2}
                  stroke="rgba(216,138,36,0.44)"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                />
              ))}
            </g>
            <circle
              cx="50"
              cy="50"
              r="31"
              fill="none"
              stroke="rgba(216,138,36,0.26)"
              strokeWidth="0.8"
            />
            <polygon
              points={sealPath}
              fill="none"
              stroke="var(--color-aurum)"
              strokeWidth="0.72"
              strokeLinejoin="round"
              opacity="0.38"
            />
            {sealPoints.map((point) => (
              <line
                key={`spoke-${point.label}`}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                stroke="var(--color-aurum)"
                strokeWidth="0.28"
                opacity="0.16"
              />
            ))}
            <polygon
              points={keysSeal}
              fill="var(--color-aurum)"
              fillOpacity="0.09"
              stroke="var(--color-aurum)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="50" r="2.2" fill="var(--color-aurum)" />
            {sealPoints.map((point, index) => {
              // The triangle's corners sit on the alternate vertices — indices 1, 3, 5.
              const isTriangleVertex = index % 2 === 1;

              return (
                <g key={point.label} opacity={isTriangleVertex ? 1 : 0.48}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isTriangleVertex ? "4.2" : "3.8"}
                    fill="var(--color-night)"
                    stroke="var(--color-aurum)"
                    strokeWidth={isTriangleVertex ? "1" : "0.68"}
                  />
                  <text
                    x={point.x}
                    y={point.y + 1.2}
                    textAnchor="middle"
                    className="fill-aurum font-mono text-[4px] font-semibold"
                  >
                    {point.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="loop-diagram-copy min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-brass">
            workflow / six steps
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-concrete-100">
            The loop at a glance.
          </h2>
          <p className="mt-3 max-w-full text-sm leading-relaxed text-concrete-400 sm:max-w-2xl">
            Six steps around the hexagon; the inscribed triangle is the three
            keys — spec, review, findings: present on virtually every change,
            at whatever weight it earns. Spec set, evidence
            reconciled, lessons kept.
          </p>
        </div>
      </div>
      <ol
        className={`loop-step-grid grid grid-cols-1 gap-5 md:grid-cols-2 ${
          compact ? "loop-step-grid-linked" : "xl:grid-cols-3"
        }`}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const showConnector = index < steps.length - 1 && index % 3 !== 2;
          const cardClassName =
            `loop-step-card loop-step-card-workflow ${
              compact ? "loop-step-card-linked" : "min-h-[13rem]"
            } focus-ring hover-shadow-step group relative flex h-full flex-col gap-3 p-4 panel-raised rivet-row transition-[border-color,box-shadow,background-color] duration-150`;
          const content = (
            <>
              <div className="flex items-center justify-between">
                <span className="loop-step-index font-mono text-xs font-medium">
                  {step.number}
                </span>
                <SignalPulse
                  color="core"
                  className="opacity-60 group-hover:opacity-100"
                />
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  className="loop-step-icon h-5 w-5"
                  aria-hidden="true"
                />
                <span className="loop-step-label font-heading text-lg font-bold uppercase tracking-tight text-concrete-100">
                  {step.label}
                </span>
                {step.descriptor && (
                  <span className="loop-step-optional font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brass">
                    {step.descriptor}
                  </span>
                )}
              </div>
              <p className="loop-step-summary text-sm leading-relaxed text-concrete-400">
                {compact ? step.summary : step.description}
              </p>
              {showConnector && (
                <div
                  className="loop-step-connector absolute -right-3 top-1/2 hidden h-1 w-6 -translate-y-1/2 xl:block"
                  aria-hidden="true"
                />
              )}
            </>
          );

          return (
            <li key={step.label}>
              {linkSteps ? (
                <Link
                  href={`/the-loop/${step.label.toLowerCase()}/`}
                  aria-label={`Read the ${step.label} step`}
                  className={cardClassName}
                >
                  {content}
                </Link>
              ) : (
                <div className={cardClassName}>{content}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-concrete-100">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Findings feed the next spec — the loop closes
      </p>
    </div>
  );
}
