import { useContext, useEffect, useState } from "react";
import Text from "../../components/atoms/Text";
import { ChatbotContext } from "../../context/ChatbotsContext";
import { useParams } from "react-router-dom";
import type { Chatbot, ChatbotMessage } from "../../api/Api.type";
import { ChatConversation } from "../../components/organisms/ChatConversation";
import Divider from "../../components/atoms/Divider";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import SendIcon from "../../components/atoms/icons/SendIcon";
import { useChatbot } from "../../hooks/useChatbot";
import Loading from "../../components/atoms/Loading";

export default function ChatbotConversation() {
  const [chat, setChat] = useState<Chatbot | null>(null);
  const [chatInput, setChatInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { loadedChatbots } = useContext(ChatbotContext);
  const params = useParams();

  const { sendMessage } = useChatbot();

  const loadChatbotInfo = () => {
    if (params.id) {
      const found = loadedChatbots?.find((bot) => bot.id === params.id);

      if (found) setChat(found);
    }
  };

  const onSendMessage = async () => {
    setLoading(true)
    if (chatInput && chat?.id) {
      const res = await sendMessage({
        chatbotId: chat.id,
        userMessage: chatInput,
      });

      if (res) {
        const userMessage: ChatbotMessage = {
          role: "user",
          content: chatInput,
        };
        const assistantResponse: ChatbotMessage = {
          role: "assistant",
          content: res.reply,
        };
        const messages = [...chat.messages, userMessage, assistantResponse];
        setChat({
          ...chat,
          messages,
        });

        setChatInput("");
      }
    }
    setLoading(false)
  };

  useEffect(() => loadChatbotInfo, []);

  return (
    <div className="p-1">
      <div className="flex flex-col w-84  ">
        <Text variant="title">Chating with {chat?.name ?? "Chatbot"}</Text>
        <Text className="text-gray-600 self-end italic" variant="label">
          {chat?.description ?? " "}
        </Text>
      </div>
      <Divider className="my-2.5" />

      <div className="max-h-[70vh] md:max-w-[50vw]   mx-auto overflow-scroll">
        {chat ? <ChatConversation messages={chat?.messages ?? []} /> : <></>}

        <form className="flex flex-col p-2">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask something"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSendMessage();
                }}
                className="border-[1px] rounded-sm p-2 border-gray-300"
              />
              <Button
                className="flex flex-row-reverse"
                type="submit"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <SendIcon />
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
