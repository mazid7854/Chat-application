import React from "react";
import { useSelector, useDispatch } from "react-redux";

const useListenMessages = () => {
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);
  console.log("onlineUsers", onlineUsers);
};

export default useListenMessages;
