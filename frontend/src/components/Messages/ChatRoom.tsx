import { useEffect, useState, useRef } from "react";
import { handleError } from "../../Helpers/ErrorHandler";
import { fetchMessagesAPI } from "../../Services/MessageService";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { Message } from "../../Models/Message";
import { HubConnection } from "@microsoft/signalr";

interface ChatRoomProps {
  chatRoomId: string;
  sendMessage: (message: string) => Promise<Message | void>;
  connection: HubConnection | undefined;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ chatRoomId, sendMessage, connection }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatMessagesRef = useRef<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const fetchMessages = await fetchMessagesAPI(chatRoomId);
        setChatMessages(fetchMessages || []);
        chatMessagesRef.current = fetchMessages || [];
      } catch (error) {
        handleError(error);
      }
    };

    const markMessagesAsSeen = async () => {
      if (connection) {
        for (const message of chatMessagesRef.current) {
          await connection.invoke("MarkMessageAsSeen", message.messageId);
        }
      }
    };

    if (chatRoomId) {
      getMessages();
      markMessagesAsSeen();
    }

    // Listen for incoming messages
    const handleIncomingMessage = (message: Message) => {
      chatMessagesRef.current = [...chatMessagesRef.current, message];
      setChatMessages([...chatMessagesRef.current]);
    };

    if (connection) {
      connection.on("ReceiveMessage", handleIncomingMessage);
    }

    // Cleanup the connection on component unmount
    return () => {
      if (connection) {
        connection.off("ReceiveMessage", handleIncomingMessage);
      }
    };
  }, [chatRoomId, connection]);

  const handleSendMessage = async (message: string) => {
    const newMessage = await sendMessage(message);
    if (newMessage) {
      chatMessagesRef.current = [...chatMessagesRef.current, newMessage];
      setChatMessages([...chatMessagesRef.current]);
    }
  };

  // Determine latest message
  const latestMessage = chatMessages.length - 1;

  return (
    <div className="w-3/4 p-4 border-t-2 border-gray-300 flex flex-col">
      {/* Chat area */}
      <div className="text-xl font-bold mb-4">User 1</div>
      <div
        className="flex-1 border border-gray-300 p-4 overflow-y-scroll"
        style={{ maxHeight: "calc(70vh - 70px)" }}
      >
        {chatMessages.map((msg, index) => (
          <ChatBubble
            key={`${msg.messageId}-${index}`}
            message={msg}
            isLatestMessage={index === latestMessage}
          />
        ))}
      </div>
      <ChatInput sendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;