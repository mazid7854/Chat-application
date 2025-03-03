import { BsFillSendFill, BsEmojiSmile } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { socket } from "../../socket.io/socket.js";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const MessageInput = ({ setMessages, messages, setTypingUser }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const typingTimeout = useRef(null); // Track typing state

  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );
  const user = useSelector((state) => state.user.user);

  const handleInputChange = (e) => {
    setInput(e.target.value);

    // Emit "userTyping" event
    socket.emit("userTyping", {
      senderId: user._id,
      conversationId: selectedConversation._id,
    });

    // Clear the previous timeout before setting a new one
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set a new timeout to emit "userStoppedTyping"
    typingTimeout.current = setTimeout(() => {
      socket.emit("userStoppedTyping", {
        senderId: user._id,
        conversationId: selectedConversation._id,
      });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const message = { senderId: user._id, message: input };

      const response = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        message
      );

      const newMessage = response.data;

      socket.emit("sendMessage", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInput("");
      setShowEmojiPicker(false);

      // Emit "stopTyping" when message is sent
      socket.emit("stopTyping", {
        senderId: user._id,
        recipientId: selectedConversation._id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setIsMultiline(textareaRef.current.scrollHeight > 40);
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e);
      }
    }
  };

  const insertEmoji = (emoji) => {
    setInput((prev) => prev + emoji.native);
    setTimeout(() => textareaRef.current.focus(), 0); // Keep focus on textarea
  };

  return (
    <div className="relative">
      <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="relative w-full flex items-center">
          <textarea
            ref={textareaRef}
            className="border text-sm rounded-lg block w-full p-2.5 pl-11 pr-12 bg-gray-700 border-gray-600 text-white resize-none overflow-hidden min-h-[40px] max-h-40"
            placeholder="Send a message"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <button
            type="button"
            className="absolute left-3 text-yellow-400"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <BsEmojiSmile className="w-6 h-6" />
          </button>

          {input && (
            <button
              type="submit"
              className={`absolute right-3 ${
                isMultiline ? "bottom-2" : "top-1/2 -translate-y-1/2"
              } flex items-center text-green-500`}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-t-2 border-r-2 rounded-full border-green-500 animate-spin"></div>
              ) : (
                <BsFillSendFill className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-14 left-2 bg-gray-800 p-2 rounded-lg shadow-lg max-w-xs">
            <Picker data={data} onEmojiSelect={insertEmoji} />
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
