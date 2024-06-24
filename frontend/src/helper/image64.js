const imageTobase64 = async (img) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
  return data;
};
export default imageTobase64;
