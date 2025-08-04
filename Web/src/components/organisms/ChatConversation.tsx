import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../interfaces/ChatbotCardProps";
import Text from "../atoms/Text";
import ChatBubble from "../molecules/ChatBubble";

export function ChatConversation({ messages }: { messages: ChatMessage[] }) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      {messages.length ? (
        messages.map((msg) => (
          <ChatBubble
            className="my-1.5"
            message={msg}
            key={`idx_${messages.indexOf(msg)}`}
          />
        ))
      ) : (
        <Text>{`Write something to start your chat :)`} </Text>
      )}
      <div ref={messageEndRef} />
    </div>
  );
}
