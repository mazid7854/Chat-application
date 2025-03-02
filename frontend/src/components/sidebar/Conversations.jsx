import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setConversations } from "../../redux/conversationsSlice.js";
import { setSelectedConversation } from "../../redux/selectedConversationSlice.js";
import { socket } from "../../socket.io/socket.js"; // Import socket instance

const Conversations = ({ input }) => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.conversations);
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );

  const [filteredConversations, setFilteredConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]); // Store online users

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("/api/users");
        dispatch(setConversations(res.data));
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
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter((conversation) =>
        conversation.name.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [input, conversations]);

  useEffect(() => {
    // Listen for online users update
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const selectConversation = (c) => {
    if (selectedConversation?._id === c._id) return;
    dispatch(setSelectedConversation(c));
  };

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No conversations found!
        </p>
      ) : (
        filteredConversations.map((conversation) => (
          <div key={conversation._id}>
            <div
              className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
                selectedConversation?._id === conversation._id
                  ? "bg-sky-500"
                  : ""
              }`}
              onClick={() => selectConversation(conversation)}
            >
              <div
                className={`avatar ${
                  onlineUsers.includes(conversation._id) ? "online" : "offline"
                }`}
              >
                <div className="w-12 rounded-full">
                  <img src={conversation.profilePicture} alt="user avatar" />
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                  <p className="font-bold text-gray-200">{conversation.name}</p>
                </div>
              </div>
            </div>

            <div className="divider my-0 py-0 h-1" />
          </div>
        ))
      )}
    </div>
  );
};

export default Conversations;
