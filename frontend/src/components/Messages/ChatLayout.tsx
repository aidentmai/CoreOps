import { SyntheticEvent } from "react";
import ChatBubble from "./ChatBubble";
import UserList from "./UserList";
import ChatInput from "./ChatInput";

interface ChatLayoutProps {}

const ChatLayout: React.FC<ChatLayoutProps> = ({}) => {
  const handleChatSubmit = async (e: SyntheticEvent, message: string) => {
    e.preventDefault();

    console.log("Chat submitted", message);
  };

  return (
    <div className="flex flex-1 h-full">
      <div className="w-1/4 p-4 border-r-2 border-t-2 border-gray-300 overflow-y-scroll">
        {/* User list */}
        <UserList />
      </div>
      <div className="w-3/4 p-4 border-t-2 border-gray-300 flex flex-col">
        {/* Chat area */}
        <div className="text-xl font-bold mb-4">User 1</div>
        <div
          className="flex-1 border border-gray-300 p-4 overflow-y-scroll"
          style={{ maxHeight: "calc(70vh - 70px)" }}
        >
          <ChatBubble />
        </div>
        <ChatInput onSubmit={handleChatSubmit}/>
      </div>
    </div>
  );
};

export default ChatLayout;
