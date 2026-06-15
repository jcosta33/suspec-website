export interface PilotLampProps {
  color?: "amber" | "green" | "red" | "off";
  pulse?: boolean;
  className?: string;
  label?: string;
}

export function PilotLamp({ color = "off", pulse = false, className = "", label }: PilotLampProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title={label}>
      <span
        className={`pilot-lamp pilot-lamp-${color} ${pulse ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
      {label && <span className="text-xs font-mono uppercase tracking-wide text-concrete-500">{label}</span>}
    </span>
  );
}
