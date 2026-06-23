import type {
  ButtonHTMLAttributes,
  ReactNode,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";

type BaseButtonProps = {
  variant?: "primary" | "secondary";
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
    "btn toggle inline-flex items-center justify-center gap-2 rounded-panel px-6 py-3 text-base font-semibold focus-ring";

  const styles = {
    primary: [
      "border border-panel-border bg-corpus-yellow text-black",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_0_rgba(0,0,0,0.4)]",
      "hover:bg-yellow-300",
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
