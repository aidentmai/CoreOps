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

interface ChatLayoutProps {}

const ChatLayout: React.FC<ChatLayoutProps> = ({}) => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const[chatRoomId, setChatRoomId] = useState<string>("");
  const [teams, setTeams] = useState<GetTeam[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const { user } = UserAuth();

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
  }, [])

  const joinChatRoom = async (username: string, chatroom: string) => {
    try {
      // initialize connection
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5295/chat")
        .configureLogging(LogLevel.Information)
        .build();

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(connection);
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
            seen: false
          };

          console.log("Sending message:", message);
  
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
        <UserList joinChatRoom={joinChatRoom} username={user?.userName || ""} setSelectedUserId={setSelectedUserId} setSelectedUserName={setSelectedUserName} setChatRoomId={setChatRoomId} teams={teams}/>
      </div>
      <ChatRoom chatRoomId={chatRoomId} sendMessage={sendMessage} connection={connection}/>
    </div>
  );
};

export default ChatLayout;
