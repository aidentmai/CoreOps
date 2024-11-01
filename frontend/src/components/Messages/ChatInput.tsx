// ChatInput.tsx
import React, { SyntheticEvent } from "react";

interface ChatInputProps {
  sendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage }) => {
  const [message, setMessage] = React.useState("");
  
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage(""); // Clear the input after submission
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { // Check if Enter is pressed without Shift
      e.preventDefault(); // Prevent new line
      handleSubmit(e); // Call the submit function
    }
  };


  return (
    <div className="flex pt-2">
      <form onSubmit={handleSubmit} className="w-full flex">
        <textarea
          className="w-full border-gray-300 p-2 rounded-l-lg resize-none focus:outline-none"
          placeholder="Type a message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-4"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;