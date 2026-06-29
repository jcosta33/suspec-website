import {
  Inbox,
  FileText,
  ListChecks,
  Terminal,
  ScanEye,
  GitMerge,
  RotateCcw,
} from "lucide-react";
import { SignalPulse } from "./SignalPulse";

const steps = [
  {
    number: "01",
    label: "Pull",
    icon: Inbox,
    description: "Capture the ticket and intent in an intake file.",
  },
  {
    number: "02",
    label: "Spec",
    icon: FileText,
    description: "Write requirements, each with a verification method.",
  },
  {
    number: "03",
    label: "Task",
    icon: ListChecks,
    description:
      "Hand the agent a bounded packet: scope, do-not-change, verify.",
  },
  {
    number: "04",
    label: "Run",
    icon: Terminal,
    description: "The agent implements and pastes real evidence.",
  },
  {
    number: "05",
    label: "Review",
    icon: ScanEye,
    description:
      "Check evidence per requirement; human attention where needed.",
  },
  {
    number: "06",
    label: "Close",
    icon: GitMerge,
    description: "Merge, save findings, update the board.",
  },
] as const;

export function LoopDiagram({ linkSteps = false }: { linkSteps?: boolean }) {
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
            aria-label="Six-point Corpus loop seal"
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
              stroke="rgba(216,138,36,0.36)"
              strokeWidth="0.8"
            />
            <polygon
              points={sealPath}
              fill="none"
              stroke="var(--color-aurum)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {sealPoints.map((point) => (
              <line
                key={`spoke-${point.label}`}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                stroke="var(--color-aurum)"
                strokeWidth="0.55"
                opacity="0.72"
              />
            ))}
            <circle cx="50" cy="50" r="2.2" fill="var(--color-aurum)" />
            {sealPoints.map((point) => (
              <g key={point.label}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4.1"
                  fill="var(--color-night)"
                  stroke="var(--color-aurum)"
                  strokeWidth="0.9"
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
            ))}
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
            The mark maps to Pull, Spec, Task, Run, Review, and Close. Each
            pass leaves a file the next step can use.
          </p>
        </div>
      </div>
      <ol
        className={`loop-step-grid grid grid-cols-1 gap-5 md:grid-cols-2 ${
          linkSteps ? "loop-step-grid-linked" : "xl:grid-cols-3"
        }`}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const showConnector = index < steps.length - 1 && index % 3 !== 2;
          const cardClassName =
            `loop-step-card loop-step-card-workflow ${
              linkSteps ? "loop-step-card-linked" : ""
            } focus-ring group relative flex min-h-[13rem] flex-col gap-3 p-4 panel-raised rivet-row transition-[border-color,box-shadow,background-color] duration-150 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.5)]`;
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
              </div>
              <p className="text-sm leading-relaxed text-concrete-400">
                {step.description}
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
                <a
                  href={`#${step.label.toLowerCase()}`}
                  aria-label={`Jump to ${step.label} example`}
                  className={cardClassName}
                >
                  {content}
                </a>
              ) : (
                <div className={cardClassName}>{content}</div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-concrete-100">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Close feeds the next Pull — the loop closes
      </p>
    </div>
  );
}
