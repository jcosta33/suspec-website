import { PilotLamp } from "./PilotLamp";

export function SignalPulse({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`} aria-hidden="true">
      <PilotLamp color="amber" pulse />
    </span>
  );
}
