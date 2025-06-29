import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice.js";
import toast from "react-hot-toast";
import axios from "axios";
import { setSelectedConversation } from "../../redux/selectedConversationSlice.js";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    axios
      .post("api/auth/logout")
      .then(() => {
        dispatch(logout());
        toast.success("Logged out successfully!");
        // empty selected conversation state
        dispatch(setSelectedConversation(null));
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Logout failed");
      });
  };
  return (
    <div className="mt-auto">
      <BiLogOut
        className="w-6 h-6 text-green-500 cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
};
export default LogoutButton;
