import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const [input, setInput] = useState("");

  return (
    <div className="border-r border-slate-500 pb-4 px-4 flex flex-col">
      <SearchInput input={input} setInput={setInput} />
      <div className="divider px-3"></div>
      <Conversations input={input} />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
