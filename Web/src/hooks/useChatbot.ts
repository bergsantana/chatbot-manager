import APIService from "../api/API.service";
import type { ChatbotListResponse } from "../api/Api.type";
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

  return {
    loadChatbots,
    sendMessage,
  };
};
