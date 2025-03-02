import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../redux/socketSlice.js";
import { socket } from "./socket.js";

const SocketManager = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
      console.log("Online users in socketManager:", users);
      dispatch(setOnlineUsers(users));
    });

    return () => {
      console.log("🔄 Cleaning up socket...");
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, [user, dispatch]);

  return null;
};

export default SocketManager;
