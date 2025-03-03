import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../redux/socketSlice.js";
import { setUserTyping, setUserStoppedTyping } from "../redux/typingSlice.js";
import { socket } from "./socket.js";

const SocketManager = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const conversationId = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );

  useEffect(() => {
    if (!user) return;

    if (!socket.connected) {
      socket.auth = { userId: user._id };
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.connected);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    // Handle online users
    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // Handle typing event
    socket.on("userTyping", ({ senderId }) => {
      dispatch(setUserTyping(senderId));
    });

    // Handle stop typing event
    socket.on("userStoppedTyping", ({ senderId }) => {
      dispatch(setUserStoppedTyping(senderId));
    });

    // handle user disconnected

    return () => {
      console.log("🔄 Cleaning up socket...");
      socket.off("onlineUsers");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
      socket.disconnect();
    };
  }, [user, dispatch]);

  return null;
};

export default SocketManager;
