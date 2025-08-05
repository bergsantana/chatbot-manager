import { useEffect } from "react";

type Props = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; // auto-dismiss in ms
  onClose: () => void;
};

const typeClasses = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

export default function Notification({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 border px-4 py-3 rounded shadow-md transition-opacity ${typeClasses[type]}`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold text-sm text-current hover:underline"
      >
        ×
      </button>
    </div>
  );
}