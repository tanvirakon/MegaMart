import axios from "axios";
import React, { useState, useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import addToCart from "../../helper/addToCart.js";

const RecommemdedProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const allProduct = await axios.get(
      `http://localhost:3000/product/all-product-single-category/${category}`
    );
    setData(allProduct.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);


  return (
    <div className="px-4 mt-[40px]  relative ">
      <h1 className="text-2xl font-semibold">{heading}:</h1>
      <div
        className="  gap-6 overflow-hidden transition-all grid grid-cols-5"
      >
        {data.map((i, j) => (
          <Link
            to={"product/" + i?._id}
            className="w-[300px] h-[350px] rounded-lg shadow-md
             flex-shrink-0 flex flex-col
              bg-white overflow-hidden mt-3"
            key={j}
          >
            <div className="h-1/2 bg-slate-200 flex items-center justify-center">
              <img
                src={i?.productImage[0]}
                alt={i?.productName}
                className="h-full w-auto mix-blend-multiply transition-all hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-1/2">
              <p className="text-lg font-semibold line-clamp-1">
                {i?.productName}
              </p>
              <p className="text-sm opacity-50">{i?.brandName}</p>
              <p className="flex items-center font-semibold text-red-600">
                <TbCurrencyTaka /> {i?.price}
              </p>
              <button
                className="mt-2 font-semibold bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                onClick={(e) => {
                  addToCart(e, i?._id);
                }}
              >
                Add to cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommemdedProduct;
