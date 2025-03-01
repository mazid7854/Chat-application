import { BsSend } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

const MessageInput = () => {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );

  const handleInputChange = (e) => {
    setData(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const message = {
        message: data,
      };

      const response = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        message
      );

      setMessages([...messages, response.data]);
      setData("");
      setLoading(false);
    } catch (error) {
      console.log(error);

      //toast.error(error.response.data.error);
      setLoading(false);
    }
  };
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={data}
          onChange={handleInputChange}
        />
        {data && (
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-green-500 "
            onClick={handleSubmit}
            disabled={data === ""}
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
