// choto pic tip dle boro dekhay seta baki rkc 6:43
// pic map hye div e dekhate time lge..oi time ty spinner dekhabo
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helper/productCategory.js";
import { ImCloudUpload } from "react-icons/im";
import uploadProductImages from "../helper/uploadProductImages.js";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UploadProductModal = ({ onclose, fetchAllProduct }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    description: "",
    productImage: [],
    category: "",
    price: "",
    sellingPrice: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const UploadProductPic = async (e) => {
    const file = e.target.files[0];
    const uploadInCloudinary = await uploadProductImages(file);
    setProductData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadInCloudinary.data.url],
      };
    });
  };
  const dltPic = (index) => {
    console.log(index);
    const newImageArray = productData.productImage;
    newImageArray.splice(index, 1);
    setProductData((prev) => {
      return {
        ...prev,
        productImage: [newImageArray],
      };
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.role == "admin") {
      await axios
        .post("http://localhost:3000/product/upload", productData)
        .then((res) => {
          toast.success(res.data.message);
          fetchAllProduct();
        })
        .catch((err) => {
          console.log(err);
          toast.error("error occured. check console!!");
        });
    } else toast.error("you are not admin");
    onclose();
  };
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current == e.target) onclose();
  };
  return (
    <div
      className="bg-black fixed bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center text-left items-center"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="w-[750px] max-w-full bg-white rounded-xl p-4 flex flex-col relative gap-4 overflow-y-scroll  h-[550px]">
        <IoMdClose
          className="absolute right-6 text-red-400 cursor-pointer"
          onClick={onclose}
        />
        <h1 className="text-2xl font-semibold">Upload item</h1>
        <form action="" className="flex flex-col gap-2" onSubmit={formSubmit}>
          <label htmlFor="productName">Product name : </label>
          <input
            value={productData.productName}
            onChange={handleChange}
            name="productName"
            type="text"
            placeholder="Enter product name"
            className="border p-2 bg-slate-50 rounded"
            id="productName"
          />
          {/* htmlfor r id dile label e tip dle input focus hye jbe */}
          <label htmlFor="brandName" className="mt-3">
            Brand name :
          </label>
          <input
            value={productData.brandName}
            onChange={handleChange}
            name="brandName"
            type="text"
            placeholder="Enter brand name"
            className="border p-2 bg-slate-50 rounded"
            id="brandName"
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>

          <select
            name="category"
            id="category"
            className="border p-2 bg-slate-50 rounded"
            onChange={handleChange}
          >
            <option>select a category</option>
            {productCategory.map((value, id) => (
              <option value={value.value} key={id}>
                {value.label}
              </option>
            ))}
          </select>

          <label className="mt-3">Upload Images :</label>
          <label htmlFor="productImage">
            {/* icon r lekhay click krlei hbe ekn as htmlfor r id dc */}
            <div className=" bg-slate-100 h-40 w-full rounded flex justify-center items-center">
              <div className="flex flex-col items-center">
                <ImCloudUpload className="text-4xl text-slate-500" />
                <p className=" text-slate-500">Upload product pictures</p>
                <input
                  type="file"
                  name="productImage"
                  id="productImage"
                  className="hidden"
                  onChange={UploadProductPic}
                />
              </div>
            </div>
          </label>

          {/* pic show */}
          <div className="flex gap-1 ">
            {productData.productImage[0] ? (
              productData.productImage.map((i, j) => {
                return (
                  <div key={j} className="relative group">
                    <img src={i} alt="" className="bg-slate-300 w-24 h-24" />
                    <MdDelete
                      className="absolute text-white p-1 bg-red-700 rounded-full cursor-pointer bottom-0 right-0 text-2xl hidden group-hover:block"
                      onClick={() => dltPic(j)}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-red-600">*upload product</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            price :
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="border p-2 bg-slate-50 rounded"
            placeholder="0"
            value={productData.price}
            onChange={handleChange}
          />

          <label htmlFor="sellingPrice" className="mt-3">
            selling price :
          </label>
          <input
            type="number"
            name="sellingPrice"
            id="sellingPrice"
            className="border p-2 bg-slate-50 rounded"
            placeholder="0"
            value={productData.sellingPrice}
            onChange={handleChange}
          />

          <label htmlFor="description" className="mt-3">
            description :
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            className="border p-2 bg-slate-50 rounded resize-none"
            value={productData.description}
            onChange={handleChange}
            placeholder="enter product discription"
          ></textarea>

          <button className=" bg-red-400 p-2 rounded-md text-white mt-3">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProductModal;
