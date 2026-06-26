import { PilotLamp } from "./PilotLamp";

export function SignalPulse({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`} aria-hidden="true">
      <PilotLamp color="core" pulse />
    </span>
  );
}
