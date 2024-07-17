// spinner lagabo
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ShowProductByCategory from "../../pages/ShowProductsByCategory.jsx";
import { Link } from "react-router-dom";

const AllCategorySingleProduct = () => {
  const [productByCategory, setProductByCategory] = useState([]);
  const fetchProductByCategory = async () => {
    const productResponse = await axios.get(
      "http://localhost:3000/product/find-all-category"
    );
    setProductByCategory(productResponse.data.data);
    // object chilo...but map object r jnno na...array rklm
  };
  useEffect(() => {
    fetchProductByCategory();
  }, []);
  return (
    <div className=" ml-12 mr-12 mt-10 ">
      <div className="flex gap-6 justify-between">
        {productByCategory?.map((product, index) => {
          return (
            // kno pge e jte chaile Link, modal dekhaite chaile div + onclick dye kra jy
            <Link
              to={"product_by_category/" + product?.category}
              key={index}
              className="cursor-pointer "
            >
              <div className="w-[100px] rounded-full  bg-slate-200 hover:scale-110 hover:transition-all ">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="rounded-full p-2 mix-blend-multiply "
                  //   bg white gulo rmeove kre dlm
                />
              </div>
              <p className="text-center mt-2 capitalize">{product?.category}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategorySingleProduct;
