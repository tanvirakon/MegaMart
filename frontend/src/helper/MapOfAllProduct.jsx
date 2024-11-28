import React, { useContext } from "react";
import { Link } from "react-router-dom";
import addToCart from "./addToCart.js";
import context from "../assets/context/context.js";
import { TbCurrencyTaka } from "react-icons/tb";

const MapOfImages = ({ allProduct }) => {
  const { fetchProductCountInCart } = useContext(context);
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchProductCountInCart();
    // await na dle realtime update hbe na...fetchProductCountInCart() kaj krbe na reload chara
  };
  return allProduct?.map((i, j) => (
    <Link
      to={"/product/" + i?._id} // product r age / na dile ager link r pore giye add hy...wth!!
      className="w-[250px] lg:w-[300px] h-[350px] rounded-lg shadow-md
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
        <p className="text-lg font-semibold line-clamp-1">{i?.productName}</p>
        <p className="text-sm opacity-50">{i?.brandName}</p>
        {/* <p className="flex items-center font-semibold text-red-600">
          <TbCurrencyTaka /> {i?.price}
        </p> */}
        <div className="flex gap-1 mt-3">
          {i?.price != i?.sellingPrice && i.sellingPrice != undefined ? (
            <div className=" flex items-center font-semibold text-red-600">
              <TbCurrencyTaka /> {i?.sellingPrice}
            </div>
          ) : null}

          <div
            className={`flex items-center  ${
              i?.price !== i?.sellingPrice && i?.sellingPrice !== undefined
                ? "text-grey-600 line-through font-thin"
                : "text-red-600 font-semibold "
            }`}
          >
            <TbCurrencyTaka /> {i?.price}
          </div>
        </div>

        {i?.price != i?.sellingPrice && i?.sellingPrice != undefined ? (
          <div className=" ml-0 flex items-center">
            <p className="font-thin text-sm">
              off : {Math.ceil(((i?.price - i?.sellingPrice) * 100) / i?.price)}
              %
            </p>
          </div>
        ) : null}

        <button
          className="mt-2 font-semibold bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
          onClick={(e) => {
            handleAddToCart(e, i?._id);
          }}
        >
          Add to cart
        </button>
      </div>
    </Link>
  ));
};

export default MapOfImages;
