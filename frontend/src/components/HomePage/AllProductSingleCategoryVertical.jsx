import axios from "axios";
import React, { useRef, useState, useEffect, useContext } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../../helper/addToCart.js";
import context from "../../assets/context/context.js";
import MapOfImages from "../../helper/MapOfAllProduct.jsx";

const AllProductSingleCategoryVertical = ({ category, heading }) => {
  const { fetchProductCountInCart } = useContext(context);
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
  }, [category]);

  const nextimg = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const previmg = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchProductCountInCart();
  };

  return (
    <div className="px-4 mt-[40px]  relative">
      <h1 className="text-2xl font-semibold">{heading}:</h1>
      <div
        className=" flex gap-6 overflow-hidden transition-all"
        ref={scrollElement}
      >
        <button
          className="text-white text-2xl bg-slate-300 p-0.5 rounded-full left-0 absolute top-1/2 "
          onClick={previmg}
        >
          <FaArrowLeft />
        </button>
        <button
          className="text-white text-2xl bg-slate-300 p-0.5 rounded-full right-0 absolute top-1/2 "
          onClick={nextimg}
        >
          <FaArrowRight />
        </button>
        <MapOfImages allProduct={data} />
      </div>
    </div>
  );
};

export default AllProductSingleCategoryVertical;
