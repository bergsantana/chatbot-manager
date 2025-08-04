import React from "react";
import { cn } from "../../utils/utils";
 

type LoadingProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Loading({ text = "Loading...", size = "md", className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-8 h-8 border-4",
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent border-blue-500",
          sizeClasses[size]
        )}
      />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
}
