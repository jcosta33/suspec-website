import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { SignalRole } from "./signalStyles";

type SectionTag = "section" | "header" | "footer" | "div" | "nav";

export interface SectionProps
  extends Omit<ComponentPropsWithoutRef<"section">, "children" | "className" | "id"> {
  children: ReactNode;
  className?: string;
  as?: SectionTag;
  id?: string;
  register?: string;
  registerTone?: SignalRole;
}

export function Section({
  children,
  className = "",
  as: Tag = "section",
  id,
  register,
  registerTone = "muted",
  ...sectionProps
}: SectionProps) {
  const registerClass = register
    ? `section-register section-register-${registerTone}`
    : "";

  return (
    <Tag
      {...sectionProps}
      id={id}
      data-register={register}
      className={`motion-surface mx-auto w-full max-w-7xl scroll-mt-24 px-6 lg:px-8 ${registerClass} ${className}`}
    >
      {children}
    </Tag>
  );
}
