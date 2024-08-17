import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";
import RecommemdedProduct from "../components/HomePage/RecommemdedProduct.jsx";
import context from "../assets/context/context.js";
import addToCart from "../helper/addToCart.js";

const ProductDetails = () => {
  const { fetchProductCountInCart } = useContext(context);
  const [productData, setProductData] = useState({});
  const [currentImage, setCurrentImage] = useState();
  const { id } = useParams();
  const fetchData = async () => {
    const ProductDetails = await axios.get(
      `http://localhost:3000/product/${id}`
    );
    setProductData(ProductDetails?.data?.data);
    setCurrentImage(ProductDetails?.data?.data.productImage[0]);
  };
  // useEffect(() => {
  //   fetchData();
  //   console.log(productData);
  // }, [productData]);
  // eikhane productData dear 1ta cz ase....product e dhokar pr recommengulay click krle upre endpoint change hoito but vitre content chnage hoito na...mane 1ta rerender pryojon chilo..eikhane productData dea rerender krtese
  useEffect(() => {
    fetchData();
    // console.log(id);
  }, [id]);
  // ok..jdi useffect e productData dle infinite rerender hy..so id r basis e render krbo...jdi id na dei & [] dei only..id change hbe but rerender hbe na..as [] only renders 1 time..
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchProductCountInCart();
  };
  return (
    <div className="mt-4 ml-4 mr-4">
      {/* image */}
      <div className="md:flex">
        <div className="flex gap-1 md:gap-4">
          {/* left all pic */}
          <div className="flex gap-2 flex-col ">
            {productData?.productImage?.map((i, j) => {
              return (
                <div className="bg-slate-200 w-20 md:w-28" key={j}>
                  <img
                    src={i}
                    className="w-full mix-blend-multiply cursor-pointer"
                    onMouseOver={() => {
                      setCurrentImage(i);
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* right big pic */}
          <div className="bg-slate-200 md:h-96 md:w-96">
            <img src={currentImage} className="mix-blend-multiply p-2" />
          </div>
        </div>

        {/* details */}
        <div className="ml-4 w-full mt-10 md:mt-0">
          <p className="bg-red-400 px-3 py-1 rounded-full text-white inline-block">
            {productData?.brandName}
          </p>
          <h1 className="text-2xl mt-3 font-semibold">
            {productData?.productName}
          </h1>
          <h1 className="text-lg text-slate-400">{productData?.category}</h1>
          <p className="flex text-3xl items-center text-red-500 mt-3 font-semibold ">
            <TbCurrencyTaka />
            {productData.price}
          </p>
          <div className="flex w-fit gap-4 mt-4 font-semibold">
            <button className="outline outline-red-600 text-red-600 outline-1 px-3 py-1 rounded hover:bg-red-600 hover:text-white">
              Buy now
            </button>
            <button
              className="bg-red-600 px-3 py-2 rounded text-white hover:bg-white hover:text-red-600 hover:outline outline-1"
              onClick={(e) => {
                handleAddToCart(e, productData?._id);
              }}
            >
              Add to cart
            </button>
          </div>
          <p className="mt-6 text-slate-700">Description :</p>
          <p>{productData?.description}</p>
        </div>
      </div>

      {/* below recommendetion */}
      {productData?.category && (
        <RecommemdedProduct
          category={productData?.category}
          heading={"Recommonded product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
