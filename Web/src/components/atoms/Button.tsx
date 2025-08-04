import clsx from "clsx";
import React from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "ghost";

type Props = {
  children: React.ReactNode;
  size?: Size;
  variant?: Variant;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 border-white  border-[1px] text-white hover:bg-blue-700",
  ghost: "bg-transparent text-blue-600 hover:underline",
};

export default function Button({
  children,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "rounded-md transition-colors duration-200",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}