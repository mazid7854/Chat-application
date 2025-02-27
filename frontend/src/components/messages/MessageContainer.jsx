import { useEffect } from "react";

import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

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
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {/* Header */}
        <div className="bg-slate-500 px-4 py-2 mb-2">
          <div className="flex justify-between items-center">
            <div className="chat-image avatar flex items-center gap-2">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
              <span className="text-gray-900 font-bold">John doe</span>
            </div>
            <span className="text-sm">last seen : 12:00</span>
          </div>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
