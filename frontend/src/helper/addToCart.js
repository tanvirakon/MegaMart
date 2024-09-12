import axios from "axios";
import { toast } from "react-toastify";

const addToCart = async (e, id, setShowLoginModal) => {
  e?.preventDefault();
  const res = await axios.get("http://localhost:3000/secret", {
    withCredentials: true,
  });
  if (res?.data?.error) setShowLoginModal(true); // user loggedin na
  else {
    const response = await axios.post(
      `http://localhost:3000/cart/add_to_cart/${id}`,
      { userId: res.data._id }
    );
    if (response.data.error) toast.error(response.data.message);
    else toast.success(response.data.message);
  }
};

export default addToCart;
