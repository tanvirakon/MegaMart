import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../../helper/addToCart.js";

const AllProductSingleCategoryHorizontal = ({ category, heading }) => {
  const scrollElement = useRef();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const allProduct = await axios.get(
      `http://localhost:3000/product/all-product-single-category/${category}`
    );
    setData(allProduct.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const nextimg = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const previmg = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className=" px-4 mt-[30px] relative">
      <h1 className="text-2xl font-semibold">{heading}:</h1>
      <div
        className="flex gap-6 overflow-hidden transition-all"
        ref={scrollElement}
      >
        <button
          className="text-white text-2xl  bg-slate-300 p-0.5 rounded-full left-0 absolute top-[120px]"
          onClick={previmg}
        >
          <FaArrowLeft />
        </button>
        <button
          className="text-white text-2xl bg-slate-300 p-0.5 rounded-full right-0 absolute top-[120px]"
          onClick={nextimg}
        >
          <FaArrowRight />
        </button>
        {data.map((i, j) => {
          return (
            <Link
              to={"product/" + i?._id}
              className="w-[450px]  h-[180px] rounded-lg shadow-md flex mt-3"
              key={j}
            >
              <div className="h-full bg-slate-200 w-[200px] flex items-center justify-center">
                <img
                  src={i?.productImage[0]}
                  alt=""
                  className="mix-blend-multiply hover:scale-105 hover:transition-all"
                />
              </div>
              <div className="h-full bg-white w-[350px] ">
                <p className="line-clamp-1 ml-4 mt-3 text-lg">
                  {i?.productName}
                </p>
                <p className="ml-4 mt-3 opacity-50">{i?.brandName}</p>
                <p className="mt-3 ml-4 flex items-center font-semibold text-red-600">
                  <TbCurrencyTaka /> {i?.price}
                </p>
                <button
                  className="mt-6 ml-4  font-semibold bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                  onClick={(e) => {
                    addToCart(e, i?._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllProductSingleCategoryHorizontal;
