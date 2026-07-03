import { normalizeSignalRole, type SignalInput } from "./signalStyles";

export interface HeroTraceItem {
  label: string;
  detail?: string;
  signal: SignalInput;
}

export interface HeroTraceProps {
  items: readonly HeroTraceItem[];
  ariaLabel: string;
  className?: string;
}

export function HeroTrace({
  items,
  ariaLabel,
  className = "",
}: HeroTraceProps) {
  return (
    <ol
      className={`hero-trace ${className}`}
      aria-label={ariaLabel}
      data-count={items.length}
    >
      {items.map((item, index) => {
        const role = normalizeSignalRole(item.signal);

        return (
          <li
            key={`${item.label}-${index}`}
            className={`hero-trace-item hero-trace-item-${role}`}
            data-role={role}
          >
            <span className="hero-trace-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}{" "}
            </span>
            <span className="hero-trace-label">{item.label}</span>
            {item.detail ? (
              <span className="hero-trace-detail">{item.detail}</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
