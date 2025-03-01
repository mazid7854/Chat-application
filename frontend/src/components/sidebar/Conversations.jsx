import Conversation from "./Conversation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from "../../redux/conversationsSlice.js"; // Import Redux action

const Conversations = ({ input }) => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.conversations); // Get from Redux
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("/api/users");
        dispatch(setConversations(res.data)); // ✅ Store in Redux
      } catch (err) {
        toast.error(
          err.response?.data?.error || "Failed to fetch conversations"
        );
      }
    };
    fetchConversations();
  }, [dispatch]);

  useEffect(() => {
    if (!input.trim()) {
      setFilteredConversations(conversations); // Show all when input is empty
    } else {
      const filtered = conversations.filter((conversation) =>
        conversation.name.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [input, conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No conversations found!
        </p>
      ) : (
        filteredConversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))
      )}
    </div>
  );
};

export default Conversations;
