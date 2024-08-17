// url e endpoint change krle page kaj kre...bt oita searcch box e thake na
import axios, { all } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import addToCart from "../helper/addToCart.js";
import context from "../assets/context/context.js";
import MapOfImages from "../helper/MapOfAllProduct.jsx";

const SearchPage = () => {
  const { fetchProductCountInCart } = useContext(context);
  const { category } = useParams();
  const [allProduct, setAllProduct] = useState([]);
  const se = async () => {
    const a = await axios.get(`http://localhost:3000/search/${category}`);
    console.log("a---", a.data.data);
    if (a.data.success) setAllProduct(a.data.data);
    else setAllProduct([]);
  };
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchProductCountInCart();
  };
  useEffect(() => {
    se();
  }, [category]);
  return (
    <div className="mx-4">
      <p className="mt-2">matches found: {allProduct.length}</p>
      {allProduct?.length == 0 && (
        <div className="flex justify-center mt-52">
          <h1 className="text-2xl">no matches found</h1>
        </div>
      )}
      {allProduct?.length > 0 && (
        <div className="gap-6 overflow-hidden transition-all grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <MapOfImages allProduct={allProduct} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
