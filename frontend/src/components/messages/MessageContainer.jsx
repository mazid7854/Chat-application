import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import SocketManager from "../../socket.io/SocketManager.js"; // Import SocketManager
import { socket } from "../../socket.io/socket.js";
import { setNewMessageNotification } from "../../redux/newMessageNotificationSlice.js";
import { useLastSeenOfUser } from "../../hooks/lastSeenOFUser.js";
const MessageContainer = () => {
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );
  //console.log("selectedConversation", selectedConversation);

  //const socket = useSelector((state) => state.socket.socket); // Get socket from Redux
  const user = useSelector((state) => state.user.user); // Logged-in user

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]); // Store online users
  const [userDisconnected, setUserDisconnected] = useState(false);

  const [typingUser, setTypingUser] = useState(null);

  const dispatch = useDispatch();

  const handleNewMessage = (newMessage) => {
    dispatch(setNewMessageNotification(true));
    setMessages((prevMessages) => [...prevMessages, newMessage.message]);
  };
  useEffect(() => {
    socket.on("receiveMessageFromServer", (receiveMessage) => {
      handleNewMessage(receiveMessage);
    });
  }, []);

  useEffect(() => {
    if (!user || !socket) return;

    // Notify server that user is online
    socket.emit("userConnected", user._id);

    // Function to update online users
    const updateOnlineUsers = (users) => {
      console.log("Updated Online Users:", users);
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", updateOnlineUsers);

    return () => {
      socket.off("onlineUsers", updateOnlineUsers);
    };
  }, [user, socket]);

  // track last seen of user

  const lastSeen = useLastSeenOfUser(selectedConversation, onlineUsers);

  // handle typing event

  useEffect(() => {
    socket.on("userTyping", ({ senderId }) => {
      setTypingUser(senderId);
    });

    socket.on("userStoppedTyping", ({ senderId }) => {
      setTypingUser(null);
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [setTypingUser]);

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
  }, [selectedConversation, setMessages]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {/* Inject SocketManager to manage socket connection */}
      <SocketManager onNewMessage={handleNewMessage} />

      <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center">
        {selectedConversation ? (
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
              <span className="text-sm text-gray-700">
                {onlineUsers.includes(selectedConversation?._id)
                  ? typingUser === selectedConversation._id
                    ? "Typing..."
                    : "🟢 Online"
                  : lastSeen}
              </span>
            </span>
          </div>
        ) : (
          <p className="text-gray-200 font-semibold">Messages</p>
        )}
      </div>

      {selectedConversation ? (
        <>
          {loading ? (
            <p className="text-center text-gray-400">Loading messages...</p>
          ) : (
            <Messages messages={messages} />
          )}
          <MessageInput
            setMessages={setMessages}
            messages={messages}
            setTypingUser={setTypingUser}
          />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome <span className="text-green-500 italic">{user.name}</span> 👋{" "}
        </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
