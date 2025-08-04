import clsx from "clsx";

type Props = {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export default function Divider({
  label,
  orientation = "horizontal",
  className = "",
}: Props) {
  if (orientation === "vertical") {
    return (
      <div className={clsx("h-full flex items-center", className)}>
        <div className="w-px bg-gray-300 h-full" />
      </div>
    );
  }

  return (
    <div className={clsx("flex items-center text-gray-500 text-sm", className)}>
      <div className="flex-grow border-t border-gray-300" />
      {label && <span className="px-3">{label}</span>}
      <div className="flex-grow border-t border-gray-300" />
    </div>
  );
}