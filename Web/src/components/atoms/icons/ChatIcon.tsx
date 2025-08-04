type Props = {
  className?: string;
};

export default function ChatIcon({ className = "" }: Props) {
  return (
    <button
      className={`p-1.5 rounded-full hover:bg-gray-100 transition ${className}`}
      aria-label="Chat"
    >
      <svg
        className="w-5 h-5 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.43 0-2.77-.297-3.93-.824L3 20l1.255-3.25C3.45 15.4 3 13.75 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>
  );
}
