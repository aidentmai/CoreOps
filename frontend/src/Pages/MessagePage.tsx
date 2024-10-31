import NewChat from "../components/Messages/NewChat";
import Navbar from "../components/Navbar";
import ChatLayout from "../components/Messages/ChatLayout";

const MessagePage = () => {
  const handleNewChat = () => {
    <></>;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[93vh] overflow-hidden">
        <div className="flex justify-between py-8">
          <div className="flex-1 justify-start text-left text-3xl font-bold ml-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 inline-block">
            Messages
          </div>
          <NewChat handleNewChat={handleNewChat} />
        </div>
        <ChatLayout />
      </div>
    </>
  );
};

export default MessagePage;