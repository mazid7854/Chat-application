import { useEffect } from "react";

import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useState } from "react";

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

const MessageContainer = () => {
  const user = useSelector((state) => state.user.user);
  const selectedConversation = useSelector(
    (state) => state.conversations.selectedConversation
  );
  const [online, setOnline] = useState(false);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {/* Header */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
          {selectedConversation ? (
            <div className="flex justify-between items-center">
              <div className="chat-image avatar flex items-center gap-2">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      selectedConversation?.profilePicture ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
                <span className="text-gray-900 font-bold flex flex-col">
                  {selectedConversation?.name || "Select a chat"}
                  {online ? (
                    <span className="text-green-500 text-xs ml-1">online</span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-300">
                      last seen : 12:00
                    </span>
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-gray-200 font-semibold">Messages</p>
            </div>
          )}
        </div>

        {selectedConversation ? (
          <>
            {/* Messages */}
            <Messages />
            {/* Input */}
            <MessageInput />
          </>
        ) : (
          <NoChatSelected />
        )}
      </>
    </div>
  );
};
export default MessageContainer;
