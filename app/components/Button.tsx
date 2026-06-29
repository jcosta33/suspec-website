import type {
  ButtonHTMLAttributes,
  ReactNode,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";

type BaseButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    asChild?: false;
  };

type ButtonAsChild = BaseButtonProps & {
  asChild: true;
  children: React.ReactElement<AnchorHTMLAttributes<HTMLAnchorElement>>;
};

export type ButtonProps = ButtonAsButton | ButtonAsChild;

export function Button({
  variant = "primary",
  children,
  className = "",
  disabled,
  asChild,
  ...props
}: ButtonProps) {
  const base =
    "btn toggle inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-control)] px-6 py-3 text-center text-base font-semibold leading-snug focus-ring";

  const styles = {
    primary: [
      "group relative overflow-hidden border border-[#9a611c] text-night",
      "shadow-[inset_0_1.5px_0_rgba(255,247,219,0.9),inset_0_-3px_3px_-1px_rgba(74,42,8,0.4),0_10px_26px_-9px_rgba(216,138,36,0.6)]",
      "transition-[box-shadow,border-color,filter,transform] duration-200",
      "hover:border-[#caa23f] hover:brightness-[1.05] hover:shadow-[inset_0_1.5px_0_rgba(255,250,228,1),inset_0_-3px_3px_-1px_rgba(74,42,8,0.34),0_16px_36px_-10px_rgba(224,150,46,0.85)]",
      "active:translate-y-px active:shadow-[inset_0_2px_7px_rgba(46,26,4,0.5)]",
      "disabled:border-panel-border disabled:text-concrete-400 disabled:shadow-none disabled:brightness-100",
    ].join(" "),
    secondary: [
      "border border-panel-border bg-panel-raised text-concrete-100",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.5)]",
      "hover:border-brass hover:text-corpus-yellow",
      "active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.45)]",
      "disabled:border-panel-border disabled:text-concrete-400 disabled:shadow-none",
    ].join(" "),
    ghost: [
      "border border-transparent bg-transparent text-concrete-400",
      "hover:border-panel-border hover:bg-panel hover:text-concrete-100",
      "disabled:text-concrete-400",
    ].join(" "),
  };

  const classes = `${base} ${styles[variant]} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`;

  // Milled gilt control plate: a clean vertical gold gradient with a light catch
  // off the top bezel — no plank edge-banding. Inline so it wins over .btn; the
  // bevel, glow, and hover-brighten live in the Tailwind classes above.
  const primaryStyle =
    variant === "primary" && !disabled
      ? {
          background:
            "radial-gradient(135% 95% at 50% -30%, rgba(255,250,233,0.62), rgba(255,250,233,0) 50%), linear-gradient(180deg, #f8cd80 0%, #e8a942 46%, #c2811f 100%)",
        }
      : undefined;

  if (asChild) {
    const child = children as React.ReactElement<
      AnchorHTMLAttributes<HTMLAnchorElement>
    >;
    const { href, ...childProps } = child.props;
    return (
      <Link
        href={href ?? "/"}
        {...childProps}
        style={primaryStyle}
        className={`${classes} ${child.props.className ?? ""}`}
      >
        {child.props.children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      style={primaryStyle}
      disabled={disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
