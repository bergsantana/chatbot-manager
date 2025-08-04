import { createContext } from "react";
import type { Chatbot } from "../api/Api.type";

interface ChatbotsContext {
  loadedChatbots: Chatbot[] | null;
  setChatbots: (chats: Chatbot[]| null) => void;
}

export const ChatbotContext = createContext<ChatbotsContext>({
  loadedChatbots: null,
  setChatbots: () => {},
});