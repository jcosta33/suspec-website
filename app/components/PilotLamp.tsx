export interface PilotLampProps {
  color?: "amber" | "green" | "red" | "olive" | "off";
  pulse?: boolean;
  className?: string;
  label?: string;
}

export function PilotLamp({
  color = "off",
  pulse = false,
  className = "",
  label,
}: PilotLampProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title={label}>
      <span
        className={`pilot-lamp pilot-lamp-${color} ${pulse ? "pilot-lamp-pulse" : ""}`}
        aria-hidden="true"
      />
      {label && (
        <span className="text-xs font-mono uppercase tracking-wide text-concrete-400">
          {label}
        </span>
      )}
    </span>
  );
}
