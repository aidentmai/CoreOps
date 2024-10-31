import React from "react";

interface NewChatProps {
  handleNewChat: () => void;
}

const NewChat: React.FC<NewChatProps> = ({ handleNewChat }) => {
  return (
    <div className="flex-1 flex ">
      <button
        className="font-medium rounded-lg text-sm px-3 py-3 w-24 -ml-12 text-center me-2 mb-2 bg-blue-400 inline-block"
        onClick={handleNewChat}
      >
        New Chat
      </button>
    </div>
  );
};

export default NewChat;
