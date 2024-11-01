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

  const handleJoinChatRoom = (member: TeamMember) => {
    console.log("Username: ", username);
    console.log("Chatroom: ", member.userName);

    setChatRoomId(member.userId);

    if (username && member.userName) {
      joinChatRoom(username, member.userName);
    }

    setSelectedUserId(member.userId)
    setSelectedUserName(member.userName);
    console.log("Joining chat room");
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
