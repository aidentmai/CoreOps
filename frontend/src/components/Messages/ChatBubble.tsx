const ChatBubble = () => {
  return (
    <>
      <div className="flex items-start gap-2.5">
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 pl-4 pr-4 border-gray-200 bg-gray-200 rounded-e-xl rounded-es-xl">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900">
            That's awesome. I think our users will really appreciate the
            improvements.
          </p>
            <span className="text-sm font-normal pb-2 text-gray-500">
              11:46
            </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 pl-4 pr-4 border-gray-200 bg-blue-500 text-white rounded-l-xl rounded-tr-xl dark:bg-blue-600">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
          </div>
          <p className="text-sm font-normal py-2.5">
            That's awesome. I think our users will really appreciate the
            improvements.
          </p>
          <span className="text-sm font-normal pb-2 text-gray-300">11:46</span>
        </div>
          <span className="text-sm font-normal text-gray-400">Delivered</span>
      </div>
    </>
  );
};

export default ChatBubble;
