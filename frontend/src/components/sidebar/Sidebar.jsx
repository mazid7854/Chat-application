import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useSelector } from "react-redux";
import { IoSettingsSharp } from "react-icons/io5";

const Sidebar = () => {
  const [input, setInput] = useState("");
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );
  return (
    <div
      className={`sm:border-r sm:w-[400px] border-slate-500 pb-4 px-4 flex flex-col transition-all duration-300 ${
        selectedConversation ? "hidden sm:flex" : "w-full h-full"
      } sm:w-auto`}
    >
      <SearchInput input={input} setInput={setInput} />
      <div className="divider px-3"></div>
      <Conversations input={input} />

      <IoSettingsSharp className="w-6 h-6 text-green-500 cursor-pointer fixed bottom-16" />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
