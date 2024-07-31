// error
import axios from "axios";
import React, { useState, useEffect } from "react";
import MapOfImages from "../../helper/MapOfAllProduct.jsx";

const RecommemdedProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const allProduct = await axios.get(
      `http://localhost:3000/product/all-product-single-category/${category}`
    );
    setData(allProduct?.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-4 mt-[40px]  relative ">
      <h1 className="text-2xl font-semibold">{heading}:</h1>
      <div className="gap-6 overflow-hidden transition-all grid grid-cols-5">
        <MapOfImages allProduct={data} />
      </div>
    </div>
  );
};

export default RecommemdedProduct;
