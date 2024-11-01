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

  const handleJoinChatRoom = (member: TeamMember) => {
    const groupName =
          (user?.id ?? "") < member.userId
            ? `${user?.id}-${member.userId}`
            : `${member.userId}-${user?.id}`;
    
    console.log("Username: ", username);
    console.log("Chatroom: ", groupName);
    
    setChatRoomId(member.userId);
    setSelectedUserId(member.userId)
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
          .map((member) => (
            <div
              className="flex flex-col p-6 cursor-pointer gap-2 pb-0"
              key={member.userId}
            >
              <span onClick={() => handleJoinChatRoom(member)}>
                {member.userName}
              </span>
              <p className="text-sm text-gray-400">
                Lorem ipsum dolor sit amet...
              </p>
            </div>
          ))
      )}
    </div>
  );
};


export default UserList;
