import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ChatbotContext } from "../../context/ChatbotsContext";
import type { Chatbot } from "../../api/Api.type";
import Form, { type FormFieldType } from "../../components/organisms/Form";
import { useChatbot } from "../../hooks/useChatbot";

export default function EditChatbot() {
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [fields, setFields] = useState<FormFieldType[]>([]);
  const { id } = useParams();
  const { loadedChatbots } = useContext(ChatbotContext);

  const { updateChatbot } = useChatbot();
  const navigate = useNavigate();

  const loadChatbotInfo = () => {
    if (id) {
      const found = loadedChatbots?.find((bot) => bot.id === id);

      if (found) setChatbot(found);
    }
  };

  const loadFields = () => {
    if (chatbot)
      setFields([
        {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: chatbot.name,
        },
        {
          label: "Description",
          name: "description",
          type: "text",
          placeholder: chatbot.description,
        },
      ]);
  };

  const submitEdition = async (chatbotInput: Record<string, string>) => {
    const parsedChatbot = chatbotInput as unknown as Chatbot;
    console.log("parsed?", parsedChatbot);
    if (parsedChatbot && chatbot) {
      console.log("true all");
      const res = await updateChatbot({
        id: chatbot.id,
        description: parsedChatbot.description || chatbot.description,
        name: parsedChatbot.name || chatbot.description,
        owner: chatbot.owner,
        messages: chatbot.messages,
      });
      console.log("true res?", res);
      if (res) navigate("/chatbot/list");
    }
  };

  useEffect(() => loadChatbotInfo(), []);
  useEffect(() => loadFields(), [chatbot]);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Chatbot "{chatbot?.name}"</h2>
      <Form
        fields={fields}
        buttonLabel="Submit editions"
        onSubmit={(e) => submitEdition(e)}
      ></Form>
    </div>
  );
}
