import { useEffect, useState } from "react";
import { useNotifications } from "../../Context/Notification";
import { UserAuth } from "../../Context/UserAuth";
import { GetTeam, TeamMember } from "../../Models/Team";
import { fetchMessagesAPI } from "../../Services/MessageService";
import { handleError } from "../../Helpers/ErrorHandler";

interface UserListProps {
  joinChatRoom: (username: string, chatroom: string) => void;
  username: string;
  setSelectedUserId: (selectedUserId: string) => void;
  setSelectedUserName: (selectedUserName: string) => void;
  setChatRoomId: (chatRoomId: string) => void;
  teams: GetTeam[];
}

const UserList: React.FC<UserListProps> = ({
  joinChatRoom,
  username,
  setSelectedUserId,
  setSelectedUserName,
  setChatRoomId,
  teams,
}) => {
  const [latestMessages, setLatestMessages] = useState<{
    [userId: string]: string;
  }>({});
  const { user } = UserAuth();
  const { unreadMessages } = useNotifications();

  const handleJoinChatRoom = (member: TeamMember) => {
    const groupName =
      (user?.id ?? "") < member.userId
        ? `${user?.id}-${member.userId}`
        : `${member.userId}-${user?.id}`;

    setChatRoomId(groupName);
    setSelectedUserId(member.userId);
    setSelectedUserName(member.userName);

    if (username && member.userName) {
      joinChatRoom(username, groupName);
    }
  };

  useEffect(() => {
    const getLatestMessages = async () => {
      try {
        teams.forEach((team) => {
          team.teamMembers
            .filter((member) => member.userName !== username)
            .forEach(async (member) => {
              const chatId =
                (user?.id ?? "") < member.userId
                  ? `${user?.id}-${member.userId}`
                  : `${member.userId}-${user?.id}`;

              const messages = await fetchMessagesAPI(chatId);

              if (messages && messages.length > 0) {
                const latestMessage = messages[messages.length - 1].message;
                setLatestMessages((prev) => ({
                  ...prev,
                  [member.userId]: latestMessage,
                }));
              }
            });
        });
      } catch (error) {
        handleError(error);
      }
    };

    const interval = setInterval(() => {
      getLatestMessages();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [teams, username]);

  return (
    <div className="flex flex-col gap-6">
      {teams.map((team) =>
        team.teamMembers
          // Filter out the current user
          .filter((member) => member.userName !== username)
          .map((member) => {
            // Get the unread count for each user
            const unreadCount = unreadMessages[member.userId] || 0;
            const latestMessage =
              latestMessages[member.userId] || "No messages yet";
            return (
              <div
                className="flex flex-col p-6 pb-0 cursor-pointer gap-1"
                key={member.userId}
                onClick={() => handleJoinChatRoom(member)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold">{member.userName}</span>
                  {unreadCount > 0 && (
                    <span className="flex items-center justify-center w-6 h-6 bg-orange-400 text-white rounded-full text-xs">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-sm truncate w-full">
                  {latestMessage}
                </span>
              </div>
            );
          })
      )}
    </div>
  );
};

export default UserList;
