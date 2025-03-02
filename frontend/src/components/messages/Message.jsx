import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const user = useSelector((state) => state.user.user);
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );

  const messageFromCurrentUser = message.senderId === user?._id;
  const chatClass = messageFromCurrentUser
    ? "chat chat-end"
    : "chat chat-start";

  const profilePicture = messageFromCurrentUser
    ? user?.profilePicture
    : selectedConversation?.profilePicture;

  const bubbleBgColor = messageFromCurrentUser ? "bg-blue-500" : "";

  // Safely format the date
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

  return (
    <div className={` ${chatClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User profile"
            src={profilePicture || "default-profile.png"}
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
        {message?.message || "No message"}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
