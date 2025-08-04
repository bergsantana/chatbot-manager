type Props = {
  className?: string;
 
};

export default function TrashIcon({ className = "",   }: Props) {
  return (
    <button
     
      className={`p-2 rounded-full hover:bg-red-100 transition ${className}`}
      aria-label="Delete"
    >
      <svg
        className="w-5 h-5 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
        />
      </svg>
    </button>
  );
}