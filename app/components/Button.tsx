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
    "btn toggle rounded-control inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-center text-base font-semibold leading-snug focus-ring";

  const styles = {
    primary: [
      // Matches the terminal Copy control: recessed panel, fine inset bevel, a
      // subtle hover shimmer (the .copy-button class), with a gold CTA accent.
      "copy-button group border border-panel-border bg-panel-recessed/80 text-concrete-100",
      "hover:border-brass hover:text-suspec-yellow",
      "active-shadow-control",
      "disabled:border-panel-border disabled:bg-panel disabled:text-concrete-400 disabled:shadow-none",
    ].join(" "),
    secondary: [
      "border border-panel-border bg-panel-raised text-concrete-100",
      "shadow-panel-bevel",
      "hover:border-brass hover:text-suspec-yellow",
      "active-shadow-control",
      "disabled:border-panel-border disabled:text-concrete-400 disabled:shadow-none",
    ].join(" "),
    ghost: [
      "border border-transparent bg-transparent text-concrete-400",
      "hover:border-panel-border hover:bg-panel hover:text-concrete-100",
      "disabled:text-concrete-400",
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
