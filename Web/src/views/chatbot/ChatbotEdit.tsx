import { useParams } from "react-router-dom";
import Button from "../../components/atoms/Button";
import Text from "../../components/atoms/Text";
import Input from "../../components/atoms/Input";

export default function EditChatbot() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Chatbot #{id}</h2>
      {/* Pre-fill logic here */}
      <form className="space-y-4">
        
        <Input placeholder="Chatbot Name" type="text" />
        <Text variant="body" > DESCRIPTION </Text>
         <Button >
            Update
        </Button>
      </form>
    </div>
  );
}