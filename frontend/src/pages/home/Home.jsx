import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

import { useSelector } from "react-redux";
import UserProfileSetting from "../../components/user/UserProfileSetting.jsx";

const Home = () => {
  const selectedConversation = useSelector(
    (state) => state.selectedConversation.selectedConversation
  );
  const userProfile = useSelector((state) => state.userProfile.value);

  return (
    <div className="flex h-screen max-h-screen w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-2">
      {/* Sidebar - Always visible on larger screens, toggles on small screens */}
      <div
        className={`w-full sm:w-auto ${
          selectedConversation || userProfile ? "hidden sm:flex" : "flex"
        }`}
      >
        <Sidebar />
      </div>

      {/* Show UserProfile if userProfile is true */}
      <div className={`w-full ${userProfile ? "flex" : "hidden"} sm:hidden`}>
        <UserProfileSetting />
      </div>

      {/* Show MessageContainer if a conversation is selected and userProfile is false */}
      <div
        className={`w-full ${
          selectedConversation && !userProfile ? "flex" : "hidden"
        } sm:flex`}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
