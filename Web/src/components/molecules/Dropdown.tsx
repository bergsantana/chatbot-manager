import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Props = {
  label: React.ReactNode;
  items: { label: string; onClick: () => void }[];
  align?: "left" | "right";
  className?: string;
};

export default function Dropdown({
  label,
  items,
  align = "left",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={clsx("relative inline-block", className)} ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-2 py-2 bg-gray-50 rounded hover:bg-gray-200 focus:outline-none"
      >
        {label}
      </button>

      {open && (
        <div
          className={clsx(
            "absolute mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <ul className="py-1">
            {items.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    item.onClick();
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-blue-200 hover:rounded-sm duration-100"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
