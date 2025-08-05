type Props = {
  className?: string;
  size?: number;
};

export default function PlusIcon({ className = "", size = 20 }: Props) {
  return (
    <div
      aria-label="Add"
      className={`p-2 rounded-full hover:bg-gray-200 transition ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="text-gray-800"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </div>
  );
}
