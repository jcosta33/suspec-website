import {
  normalizeSignalRole,
  type SignalInput,
  type SignalRole,
} from "./signalStyles";

type LegacyLampColor = "amber" | "green" | "red" | "olive";

export interface PilotLampProps {
  color?: SignalInput | LegacyLampColor | "off";
  pulse?: boolean;
  className?: string;
  label?: string;
}

function normalizeLampColor(
  color: SignalInput | LegacyLampColor | "off",
): SignalRole | "off" {
  if (color === "off") {
    return "off";
  }

  if (color === "amber") {
    return "core";
  }

  if (color === "red") {
    return "change";
  }

  if (color === "green") {
    return "evidence";
  }

  return normalizeSignalRole(color);
}

export function PilotLamp({
  color = "off",
  pulse = false,
  className = "",
  label,
}: PilotLampProps) {
  const lampColor = normalizeLampColor(color);

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title={label}>
      <span
        className={`pilot-lamp pilot-lamp-${lampColor} ${pulse ? "pilot-lamp-pulse" : ""}`}
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
