import type { ChatMessage } from "../../interfaces/ChatbotCardProps";

interface ChatBubbleProps {
  message: ChatMessage;
  className?: string;
}

export default function ChatBubble({ message, className }: ChatBubbleProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={
        `flex ${isUser ? "justify-end" : "justify-start"} ${className}`
      }
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap shadow
          ${isUser ? "bg-blue-500 text-white rounded-br-none" : ""}
          ${isAssistant ? "bg-gray-200 text-gray-900 rounded-bl-none" : ""}
        `}
      >
        {message.content}
      </div>
    </div>
  );
}
