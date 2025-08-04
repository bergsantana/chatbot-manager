type Props = {
  className?: string;
};

export default function SendIcon({ className = "" }: Props) {
  return (
    <div
      className={`p-2 rounded-full hover:bg-blue-100 transition ${className}`}
      aria-label="Send message"
    >
      <svg
        className="w-5 h-5 "
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 2L15 22L11 13L2 9L22 2Z"
        />
      </svg>
    </div>
  );
}
