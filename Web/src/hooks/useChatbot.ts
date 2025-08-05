import APIService from "../api/API.service";
import type {
  Chatbot,
  ChatbotListResponse,
  CreateChatbotDTO,
} from "../api/Api.type";
import type { SendChatMessageDTO } from "../interfaces/ChatbotCardProps";

export const useChatbot = () => {
  const loadChatbots = async (page: number, pageSize: number) => {
    try {
      const chatbotsList = await APIService.findBotsByUserPaginated(
        page,
        pageSize
      );
      if (chatbotsList.data) {
        return chatbotsList.data as ChatbotListResponse;
      }
    } catch (err) {
      console.log("Error while fetching bots - ", err);
    }
  };

  const sendMessage = async ({
    chatbotId,
    userMessage,
  }: SendChatMessageDTO) => {
    try {
      const response = await APIService.sendMessageToChatbot(
        chatbotId,
        userMessage
      );
      if (response.data.reply) return response.data;
      throw Error("Error fetching reply from server");
    } catch (err) {
      console.log(err);
    }
  };

  const updateChatbot = async (chatbot: Chatbot) => {
    try {
      const response = await APIService.updateChatbotInfo(chatbot);
      if (response.data.message === "Chatbot updated.") return true;
      console.log("Could not update chatbot ", JSON.stringify(chatbot));
    } catch (err) {
      console.log("ERROR While updating chatbot", err);
    }
  };

  const createChatbot = async (assistant: CreateChatbotDTO) => {
    try {
      const response = await APIService.createChatbot(assistant);
      if (response?.data.message === "Chatbot created.") return true;
      console.log("Could create chatbot ", JSON.stringify(assistant));
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return {
    loadChatbots,
    sendMessage,
    updateChatbot,
    createChatbot,
  };
};
