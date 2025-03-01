import { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.length > 0 ? (
        messages.map((msg) => <Message key={msg._id} message={msg} />)
      ) : (
        <p className="text-gray-400 text-center">No messages yet.</p>
      )}
    </div>
  );
};

export default Messages;
