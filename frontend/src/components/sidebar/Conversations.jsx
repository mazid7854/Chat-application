import Conversation from "./Conversation";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from "../../redux/conversationsSlice.js"; // Import Redux action

const Conversations = () => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.conversations); // Get from Redux
  const loading = conversations.length === 0; // Assume loading if no conversations

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("/api/users");
        dispatch(setConversations(res.data)); // ✅ Correctly dispatch to Redux
      } catch (err) {
        toast.error(
          err.response?.data?.error || "Failed to fetch conversations"
        );
      }
    };
    fetchConversations();
  }, [dispatch]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <p className="text-center text-xl text-gray-500">
          Loading... please wait!
        </p>
      ) : (
        conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))
      )}
    </div>
  );
};

export default Conversations;
