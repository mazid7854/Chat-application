import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationsSlice.js"; // ✅ Import action

const Conversation = ({ conversation }) => {
  const dispatch = useDispatch();

  const selectConversation = () => {
    dispatch(setSelectedConversation(conversation)); // ✅ Store selected conversation in Redux
  };

  return (
    <>
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        onClick={selectConversation} // ✅ Click updates global state
      >
        <div className="avatar online">
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
    </>
  );
};
export default Conversation;
