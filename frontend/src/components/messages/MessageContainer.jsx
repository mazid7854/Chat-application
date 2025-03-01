import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/selectedConversationSlice.js";

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
    (state) => state.selectedConversation.selectedConversation
  );
  const [online, setOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {/* Header */}
      <div className="bg-slate-500 px-4 py-2 mb-2">
        {selectedConversation ? (
          <div className="flex justify-between items-center">
            <div className="chat-image avatar flex items-center gap-2">
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
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
                    last seen: 12:00
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
          {/* Show loader while fetching */}
          {loading ? (
            <p className="text-center text-gray-400">Loading messages...</p>
          ) : (
            <Messages messages={messages} />
          )}
          {/* Input */}
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};
export default MessageContainer;
