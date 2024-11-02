import { useNotifications } from "../../Context/Notification";
import { UserAuth } from "../../Context/UserAuth";
import { GetTeam, TeamMember } from "../../Models/Team";

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
  const { user } = UserAuth();
  const { unreadMessages } = useNotifications();

  const handleJoinChatRoom = (member: TeamMember) => {
    const groupName =
      (user?.id ?? "") < member.userId
        ? `${user?.id}-${member.userId}`
        : `${member.userId}-${user?.id}`;

    console.log("Username: ", username);
    console.log("Chatroom: ", groupName);

    setChatRoomId(groupName);
    setSelectedUserId(member.userId);
    setSelectedUserName(member.userName);

    if (username && member.userName) {
      joinChatRoom(username, groupName);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {teams.map((team) =>
        team.teamMembers
          .filter((member) => member.userName !== username) // Filter out the current user
          .map((member) => {
            const unreadCount = unreadMessages[member.userId] || 0; // Get the unread count for each user
            return (
              <div
                className="flex items-center justify-between p-6 cursor-pointer gap-2 pb-0"
                key={member.userId}
                onClick={() => handleJoinChatRoom(member)}
              >
                <span>{member.userName}</span>
                {unreadCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </div>
            );
          })
      )}
    </div>
  );
};

export default UserList;
