import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserAuth } from "./UserAuth";
import { Message } from "yup";
import { toast } from "react-toastify";
import { GetTeamsAPI } from "../Services/TeamService";

interface SignalRContextProps {
    connection: HubConnection | undefined;
    joinChatRoom: (username: string, chatroom: string) => Promise<void>;
    sendMessage: (msg: string, chatRoomId: string, receiverId: string, receiverName: string) => Promise<Message | void>;
  }
  
  export const SignalRContext = createContext<SignalRContextProps | undefined>(undefined);
  
  export const SignalRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [connection, setConnection] = useState<HubConnection | undefined>();
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
            setMessages((prevMessages) => [
              ...prevMessages,
              { ...message, isSender: true },
            ]);
    
            return message;
          } catch (error) {
            console.error("Failed to send message:", error);
          }
        } else {
          console.warn("No connection or user available for sending messages.");
        }
      };
  
    return (
      <SignalRContext.Provider value={{ connection, joinChatRoom, sendMessage }}>
        {children}
      </SignalRContext.Provider>
    );
  };

function setTeams(data: import("../Models/Team").GetTeam[]) {
    throw new Error("Function not implemented.");
}
