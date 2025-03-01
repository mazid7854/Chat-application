import { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto h-full">
      {messages.length > 0 ? (
        messages.map((msg) => <Message key={msg._id} message={msg} />)
      ) : (
        <p className="text-gray-400 text-center">No messages yet.</p>
      )}
      {/* Invisible div to trigger scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
