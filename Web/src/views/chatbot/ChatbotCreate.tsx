import { useNavigate } from "react-router-dom";
import type { CreateChatbotDTO } from "../../api/Api.type";
import Text from "../../components/atoms/Text";
import Form, { type FormFieldType } from "../../components/organisms/Form";
import { useChatbot } from "../../hooks/useChatbot";
import { useContext, useState } from "react";
import Loading from "../../components/atoms/Loading";
import { AuthContext } from "../../context/AuthContext";

export default function CreateChatbot() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { createChatbot } = useChatbot();
  const navigate = useNavigate();

  const fields: FormFieldType[] = [
    {
      name: "name",
      label: "Enter chat bot name",
      type: "text",
      placeholder: "Helpful History Professor",
    },

    {
      name: "description",
      label: "Enter the descriptiojn",
      type: "text",
      placeholder: "A old professor who gives succints answers ",
    },
  ];

  const onSubmitChatbot = async (data: Record<string, string>) => {
    setLoading(true);
    const chatbot = data as unknown as CreateChatbotDTO;
    if (chatbot?.description && chatbot?.name && user?.email) {
      await createChatbot({
        owner: user?.email,
        description: chatbot.description,
        name: chatbot.name,
      });
      navigate("/chatbot/list");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Text variant="title"> Create Chatbot</Text>
      <Form
        fields={fields}
        buttonLabel="Submit Chatbot"
        onSubmit={(e) => onSubmitChatbot(e)}
      ></Form>
      {loading && <Loading />}
    </div>
  );
}
