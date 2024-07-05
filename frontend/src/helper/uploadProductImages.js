import axios from "axios";

const uploadProductImages = async (img) => {
  const url = `https://api.cloudinary.com/v1_1/dpsmg39d7/image/upload`;
  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", "mern_products");
  const dataResponse = await axios.post(url, formData);
  return dataResponse;
};

export default uploadProductImages;
