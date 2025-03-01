import { BsSend } from "react-icons/bs";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const MessageInput = ({ setMessages, messages }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.trim()) return;

    setLoading(true);
    try {
      const message = { message: data };

      const response = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        message
      );

      // Update messages in MessageContainer
      setMessages([...messages, response.data]);

      setData(""); // Clear input
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={data}
          onChange={handleInputChange}
        />
        {data && (
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-green-500"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-t-2 border-r-2 rounded-full border-green-500 animate-spin"></div>
            ) : (
              <BsSend className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
