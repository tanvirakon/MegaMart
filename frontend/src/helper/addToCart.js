import axios from "axios";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.preventDefault();
  const res = await axios.get("http://localhost:3000/secret", {
    withCredentials: true,
  });
  if (res.data.error) toast.error(res.data.message); // user loggedin na
  else {
    const response = await axios.post(
      `http://localhost:3000/add_to_cart/${id}`,
      { userId: res.data._id }
    );
    console.log("RESponse-----", response.data);
    if (response.data.error) toast.error(response.data.message);
    else toast.success(response.data.message);
  }
};

export default addToCart;
