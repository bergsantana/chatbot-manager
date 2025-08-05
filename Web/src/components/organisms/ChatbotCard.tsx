import Button from "../atoms/Button";
import ChatIcon from "../atoms/icons/ChatIcon";
import GearIcon from "../atoms/icons/GearIcon";
import TrashIcon from "../atoms/icons/TrashcanIcon";
import Tooltip from "../molecules/Tooltip";

type Props = {
  name: string;
  description: string;
  onClickEdit: () => void;
  onClickChat: () => void;
};

export default function ChatbotCard({
  name,
  description,
  onClickChat,
  onClickEdit,
}: Props) {
  return (
    <div className="p-4 border rounded w-80 self-center  border-indigo-800 hover:bg-gray-50 cursor-pointer">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <Tooltip content="Chat with this assistant">
        <Button variant="ghost" className="p-1 " onClick={onClickChat}>
          <ChatIcon className="bg-indigo-500 p-3" />
        </Button>
      </Tooltip>
      <Tooltip content="Edit this assistant information">
        <Button variant="ghost" className="p-1" onClick={onClickEdit}>
          <GearIcon className="bg-indigo-500 p-3" width="20px" />
        </Button>
      </Tooltip>
      <Tooltip content="Delete this assistant">
        <Button variant="ghost" className="p-1" onClick={onClickEdit}>
          <TrashIcon className="bg-indigo-500 p-3" />
        </Button>
      </Tooltip>
    </div>
  );
}
