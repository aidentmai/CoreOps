import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import ChatRoom from "./ChatRoom";
import UserList from "./UserList";
import { UserAuth } from "../../Context/UserAuth";
import { GetTeam } from "../../Models/Team";
import { GetTeamsAPI } from "../../Services/TeamService";
import { toast } from "react-toastify";
import { Message } from "../../Models/Message";
import { useNotifications } from "../../Context/Notification";

interface ChatLayoutProps {}

const ChatLayout: React.FC<ChatLayoutProps> = ({}) => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const [chatRoomId, setChatRoomId] = useState<string>("");
  const [teams, setTeams] = useState<GetTeam[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { user } = UserAuth();
  const { updateUnreadMessages } = useNotifications();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await GetTeamsAPI();
        if (response && response.data) {
          setTeams(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch teams");
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    updateUnreadMessages();

    const interval = setInterval(() => {
      updateUnreadMessages();
    }, 100);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const joinChatRoom = async (username: string, chatroom: string) => {
    try {
      if (!connection) {
        // Initialize connection if not already done
        const newConnection = new HubConnectionBuilder()
          .withUrl("http://localhost:5295/chat")
          .configureLogging(LogLevel.Information)
          .build();

        newConnection.on("ReceiveMessage", (message: Message) => {
          setMessages((prevMessages) => [...prevMessages, { ...message }]);
        });

        newConnection.on(
          "JoinSpecificChatRoom",
          (username: string, msg: string) => {
            console.log("username", username);
            console.log("msg", msg);
          }
        );

        await newConnection.start();
        console.log("Connected!");
        setConnection(newConnection);

        // Join the chat room
        await newConnection.invoke("JoinSpecificChatRoom", {
          userName: username,
          ChatRoom: chatroom,
        });
      } else {
        // Join the chat room with existing connection
        await connection.invoke("JoinSpecificChatRoom", {
          userName: username,
          ChatRoom: chatroom,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (msg: string): Promise<Message | void> => {
    if (connection && connection.connectionId && user) {
      try {
        const timestamp = new Date().toISOString();
        
        const message: Message = {
          messageId: 0,
          senderId: user?.id,
          receiverId: selectedUserId,
          message: msg,
          chatRoomId: chatRoomId,
          timeStamp: timestamp,
          sender: user?.userName,
          receiver: selectedUserName,
          seen: false,
        };

        await connection.invoke("SendMessage", message);

        return message;
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      console.warn("No connection or user available for sending messages.");
    }
  };

  return (
    <div className="flex flex-1 h-full">
      <div className="w-1/4 p-4 border-r-2 border-t-2 border-gray-300 overflow-y-scroll">
        {/* User list */}
        <UserList
          joinChatRoom={joinChatRoom}
          username={user?.userName || ""}
          setSelectedUserId={setSelectedUserId}
          setSelectedUserName={setSelectedUserName}
          setChatRoomId={setChatRoomId}
          teams={teams}
        />
      </div>
      {connection && chatRoomId ? (
        <ChatRoom
          chatRoomId={chatRoomId}
          selectedUserName={selectedUserName}
          sendMessage={sendMessage}
          connection={connection}
        />
      ) : (
        <div className="w-3/4 p-4 border-t-2 border-gray-300 flex flex-col">
          <div className="flex justify-center items-center h-full">
            {/* Chat area */}
            <h1 className="text-3xl font-medium">
              Select a user to start chat
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
