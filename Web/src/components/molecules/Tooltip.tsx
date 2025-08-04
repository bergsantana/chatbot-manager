import { useState, type ReactNode } from "react";

type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const [show, setShow] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      default: // top
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-800 rounded shadow-md whitespace-nowrap ${getPositionClasses()}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
