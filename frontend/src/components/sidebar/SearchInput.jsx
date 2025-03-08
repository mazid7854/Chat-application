import { FcSearch } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { setUserProfile } from "../../redux/userProfileSlice";
import { setSelectedConversation } from "../../redux/selectedConversationSlice";

const SearchInput = ({ input, setInput }) => {
  const user = useSelector((state) => state.user.user);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      {/* Header for small screens */}
      <div className="flex justify-between items-center bg-slate-400 p-2 mb-2 rounded-md transition-all duration-300 ease-in-out w-full sm:w-[300px]">
        {/* User Profile */}
        <div
          className="chat-image avatar flex items-center gap-2 cursor-pointer "
          onClick={() => {
            dispatch(setUserProfile(true));
            dispatch(setSelectedConversation(null));
          }}
        >
          <div className="w-10 h-10 rounded-full">
            <img
              alt="User Profile"
              src={
                user?.profilePicture ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <span className="text-gray-900 font-bold flex flex-col">
            <span className="text-md text-black">{user.name}</span>
          </span>
        </div>

        {/* Search Section */}
        <div className="relative flex items-center w-auto">
          {/* Expanding Search Input */}
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: showInput ? "150px" : "0px",
              opacity: showInput ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            type="search"
            className="ml-2 px-2 py-1 border border-gray-300 rounded-md bg-white outline-none transition-all duration-300"
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ display: showInput ? "block" : "none" }} // Fix visibility issue
          />

          {/* Search Icon */}
          <button
            onClick={() => setShowInput(!showInput)}
            className="ml-2 flex items-center justify-center"
          >
            <FcSearch className="w-8 h-8 cursor-pointer transition-transform duration-300" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
