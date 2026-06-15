import { DroneIcon } from "./DroneIcon";
import { SignalPulse } from "./SignalPulse";

const steps = [
  { number: "01", label: "Pull", description: "Capture the ticket and intent in an intake file." },
  { number: "02", label: "Spec", description: "Write requirements, each with a verification method." },
  { number: "03", label: "Task", description: "Hand the agent a bounded packet: scope, do-not-change, verify." },
  { number: "04", label: "Run", description: "The agent implements and pastes real evidence." },
  { number: "05", label: "Review", description: "Check evidence per requirement; human attention where needed." },
  { number: "06", label: "Close", description: "Merge, save findings, update the board." },
];

export function LoopDiagram() {
  return (
    <ol className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {steps.map((step, index) => (
        <li
          key={step.label}
          className="group relative flex flex-col gap-3 p-4 panel-raised rivet-row transition-all duration-150 hover:translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_3px_0_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-brass">{step.number}</span>
            <SignalPulse className="opacity-60 group-hover:opacity-100" />
          </div>
          <div className="flex items-center gap-2">
            <DroneIcon className="h-5 w-5 text-swarm-yellow" />
            <span className="font-heading text-lg font-bold uppercase tracking-tight text-concrete-100">
              {step.label}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-concrete-400">{step.description}</p>
          {index < steps.length - 1 && (
            <div
              className="absolute -right-4 top-1/2 hidden h-1 w-8 -translate-y-1/2 border-y border-panel-border bg-panel-edge xl:block"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
