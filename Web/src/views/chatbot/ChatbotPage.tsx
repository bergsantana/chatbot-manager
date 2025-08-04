import { useCallback, useContext, useEffect, useState } from "react";
import ChatbotCard from "../../components/organisms/ChatbotCard";
import ChatLayout from "../../components/templates/ChatLayout";
import { useChatbot } from "../../hooks/useChatbot";
import type ChatbotCardProps from "../../interfaces/ChatbotCardProps";
import Loading from "../../components/atoms/Loading";
import NumberInput from "../../components/atoms/NumberInput";
import Text from "../../components/atoms/Text";
import { useNavigate } from "react-router-dom";
import { ChatbotContext } from "../../context/ChatbotsContext";

export default function ChatbotPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [chatbotsList, setChatbotList] = useState<ChatbotCardProps[]>([]);
  const [loadingChatbots, setLoadingChatbots] = useState<boolean>(false);

  const { loadChatbots } = useChatbot();
  const { setChatbots: setChatbotsContext } = useContext(ChatbotContext)

  const navigate = useNavigate();

  const goToEdit = (id: string) => navigate(`/chatbot/edit/${id}`);
  const goToChat = (id: string) => navigate(`/chatbot/chat/${id}`);



  const fetchChatbots = useCallback(async () => {
    setLoadingChatbots(true);
   
    const res = await loadChatbots(page, pageSize);
    
    if (res) {
      setChatbotList(res.items);
      setChatbotsContext(res.items)
    }
    
    setTimeout(() => {
      setLoadingChatbots(false);
    }, 500);
  }, [page, pageSize]);

  useEffect(() => {
    fetchChatbots();
  }, [page, pageSize]);

  return (
    <ChatLayout>
      <h2 className="text-xl font-bold mb-4">My Chatbots</h2>
      <div>
        <NumberInput
          label="Page"
          numInput={page}
          onChange={(num: number) => setPage(num)}
          disabled={loadingChatbots}
        />
        <NumberInput
          label="Size"
          numInput={pageSize}
          onChange={(num: number) => setPageSize(num)}
          disabled={loadingChatbots}
        />
      </div>
      <div className="space-y-2">
        {!loadingChatbots ? (
          chatbotsList.length ? (
            chatbotsList.map((bot) => (
              <ChatbotCard
                key={bot.id}
                {...bot}
                onClickChat={() => goToChat(bot.id)}
                onClickEdit={() => goToEdit(bot.id)}
              />
            ))
          ) : (
            <Text variant="subtitle">No chatbots for your parameters </Text>
          )
        ) : (
          <Loading />
        )}
      </div>
    </ChatLayout>
  );
}
