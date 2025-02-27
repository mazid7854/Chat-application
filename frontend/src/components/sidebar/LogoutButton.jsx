import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice.js";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };
  return (
    <div className="mt-auto">
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
};
export default LogoutButton;
