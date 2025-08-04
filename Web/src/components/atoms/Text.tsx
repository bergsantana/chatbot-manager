 
import React from "react";
import clsx from "clsx";

type Variant = "title" | "subtitle" | "body" | "caption" | "label";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  title: "text-2xl font-bold",
  subtitle: "text-xl font-semibold",
  body: "text-base",
  caption: "text-sm text-gray-500",
  label: "text-sm font-medium",
};

export default function Text({
  children,
  variant = "body",
  className = "",
 }: Props) {
  return (
    <text className={clsx(variantClasses[variant], className)}>
      {children}
    </text>
  );
}
