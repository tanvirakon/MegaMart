import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const clearCookie = await axios.get("http://localhost:3000/api/logout", {
        withCredentials: "include",
      });
      toast.success(clearCookie.data.message);

      dispatch(setUserDetails(null));
    } catch (error) {
      console.error("Logout error:", error.message || error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 px-2 py-1 rounded-full text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
