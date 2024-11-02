import { useEffect, useState, useRef } from "react";
import { handleError } from "../../Helpers/ErrorHandler";
import { fetchMessagesAPI } from "../../Services/MessageService";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { Message } from "../../Models/Message";
import { HubConnection } from "@microsoft/signalr";
import { UserAuth } from "../../Context/UserAuth";

interface ChatRoomProps {
  chatRoomId: string;
  selectedUserName: string;
  sendMessage: (message: string) => Promise<Message | void>;
  connection: HubConnection | undefined;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
  chatRoomId,
  selectedUserName,
  sendMessage,
  connection,
}) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatMessagesRef = useRef<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = UserAuth();

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const fetchMessages = await fetchMessagesAPI(chatRoomId);
        setChatMessages(fetchMessages || []);
        scrollToBottom();
        chatMessagesRef.current = fetchMessages || [];

        // Mark unseen messages as seen if receiver is the current user
        if (connection && fetchMessages) {
          const unseenMessages = fetchMessages.filter(
            (msg) => !msg.seen && msg.receiverId === user?.id
          );
          if (unseenMessages.length > 0) {
            await markMessagesAsSeen(unseenMessages);
          }
        }

      } catch (error) {
        handleError(error);
      }
    };

    const markMessagesAsSeen = async (messages: Message[]) => {
      if (connection) {
        for (const message of messages) {
          if (message.receiverId === user?.id && !message.seen) {
            await connection.invoke("MarkMessageAsSeen", message.messageId);
          }
        }
      }
    };

    if (chatRoomId) {
      getMessages();
    }

    // Listen for incoming messages
    const handleIncomingMessage = (message: Message) => {
      chatMessagesRef.current = [...chatMessagesRef.current, message];
      setChatMessages([...chatMessagesRef.current]);
      markMessagesAsSeen([message]);
      getMessages();
      scrollToBottom();
    };

    if (connection) {
      connection.on("ReceiveMessage", handleIncomingMessage);
      connection.on("MarkMessageAsSeen", (messageId: number) => {
        setTimeout(() => {
          chatMessagesRef.current = chatMessagesRef.current.map((msg) =>
            msg.messageId === messageId ? { ...msg, seen: true } : msg
          );
          setChatMessages([...chatMessagesRef.current]);
        }, 1100);
      });
    }

    // Cleanup the connection on component unmount
    return () => {
      if (connection) {
        connection.off("ReceiveMessage", handleIncomingMessage);
        connection.off("MarkMessageAsSeen");
      }
    };
  }, [chatRoomId, connection]);

  const handleSendMessage = async (message: string) => {
    const newMessage = await sendMessage(message);
    if (newMessage) {
      chatMessagesRef.current = [...chatMessagesRef.current, newMessage];
      setChatMessages([...chatMessagesRef.current]);
      scrollToBottom();
    }
  };

  // Determine latest message
  const latestMessage = chatMessages.length - 1;

  return (
    <div className="w-3/4 p-4 border-t-2 border-gray-300 flex flex-col">
      {/* Chat area */}
      <div className="text-xl font-bold mb-4">{selectedUserName}</div>
      <div
        ref={chatContainerRef}
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
        <div ref={chatContainerRef}></div>
      </div>
      <ChatInput sendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
