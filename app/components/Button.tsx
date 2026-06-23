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
      "border border-gold-deep bg-corpus-yellow text-night",
      "shadow-[inset_0_1px_0_rgba(255,224,176,0.55),inset_0_-2px_0_rgba(0,0,0,0.35)]",
      "hover:bg-gold-bright",
      "active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.45)]",
      "disabled:bg-concrete-500 disabled:text-black disabled:shadow-none",
    ].join(" "),
    secondary: [
      "border border-panel-border bg-panel-raised text-concrete-100",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-2px_0_rgba(0,0,0,0.5)]",
      "hover:border-brass hover:text-brass",
      "active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.45)]",
      "disabled:border-panel-border disabled:text-concrete-500 disabled:shadow-none",
    ].join(" "),
    ghost: [
      "border border-transparent bg-transparent text-concrete-400",
      "hover:border-panel-border hover:bg-panel hover:text-concrete-100",
      "active:translate-y-px",
      "disabled:text-concrete-500",
    ].join(" "),
  };

  const classes = `${base} ${styles[variant]} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`;

  if (asChild) {
    const child = children as React.ReactElement<
      AnchorHTMLAttributes<HTMLAnchorElement>
    >;
    const { href, ...childProps } = child.props;
    return (
      <Link
        href={href ?? "/"}
        {...childProps}
        className={`${classes} ${child.props.className ?? ""}`}
      >
        {child.props.children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
