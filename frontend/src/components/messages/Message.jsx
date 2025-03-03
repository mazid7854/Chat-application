import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import notificationSound from "../../assets/sounds/notification.mp3";
import { socket } from "../../socket.io/socket.js";

const Message = ({ message, newMessage }) => {
  const user = useSelector((state) => state.user.user);
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );
  const newMessageNotification = useSelector(
    (state) => state.newMessageNotification.newMessageNotification
  );
  const messageFromCurrentUser = message.senderId === user?._id;
  const chatClass = messageFromCurrentUser
    ? "chat chat-end"
    : "chat chat-start";

  const profilePicture = messageFromCurrentUser
    ? user?.profilePicture
    : selectedConversation?.profilePicture;

  const bubbleBgColor = messageFromCurrentUser ? "bg-blue-500" : "";

  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Only shake if the message is received (not sent by the current user)
    if (!messageFromCurrentUser) {
      setIsShaking(true);
      const sound = new Audio(notificationSound);
      sound.play();
    }
  }, [newMessageNotification]);

  let formattedTime = "Invalid Date";
  if (message?.createdAt) {
    const date = new Date(message.createdAt);
    if (!isNaN(date.getTime())) {
      formattedTime = new Intl.DateTimeFormat(undefined, {
        timeStyle: "short",
        hourCycle: "h12",
      }).format(date);
    }
  }

  const shake = newMessageNotification ? "shake" : "";

  return (
    <div className={`${chatClass} break-words ${isShaking ? "shake" : ""}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User profile"
            src={profilePicture || "default-profile.png"}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} pb-2 break-words max-w-full w-fit`}
      >
        {message?.message || "No message"}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
