import moment from "moment-timezone";
import { UserAuth } from "../../Context/UserAuth";
import { Message } from "../../Models/Message";

interface ChatBubbleProps {
  message: Message;
  isLatestMessage: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isLatestMessage,
}) => {
  const { user } = UserAuth();
  const isSender = message.senderId === user?.id;

  console.log("received timestamp", message.timeStamp);

  const formatTimeStamp = (timestamp: string) => {
    console.log(moment(timestamp).tz("America/Los_Angeles").format("h:mm A"));
    return moment.utc(timestamp).tz("America/Los_Angeles").format("h:mm A");
  };

  return (
    <div
      className={`flex ${
        isSender ? "flex-col items-end" : "flex-col items-start"
      } mb-3`}
    >
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 pl-4 pr-4 border-gray-200 ${
          isSender
            ? "bg-blue-500 text-white py-2.5 rounded-l-xl rounded-tr-xl"
            : "bg-gray-200 text-black rounded-r-xl rounded-bl-xl"
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Additional info can go here, like avatars or usernames */}
        </div>
        {message.message}
        <span className="text-xs font-normal text-gray-300">
          {formatTimeStamp(message.timeStamp)}
        </span>
      </div>
      {isSender && isLatestMessage && (
        <span className="text-sm font-normal text-gray-400">Delivered</span>
      )}
    </div>
  );
};

export default ChatBubble;
