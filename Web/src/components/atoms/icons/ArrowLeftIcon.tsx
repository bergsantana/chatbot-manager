type Props = {
  className?: string;
};

export default function ArrowLeftIcon({ className = "" }: Props) {
  return (
    <div
      aria-label="Go back"
      className={`p-2 rounded-full hover:bg-gray-200 transition ${className}`}
    >
      <svg
        className="w-5 h-5 text-gray-800"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
}
