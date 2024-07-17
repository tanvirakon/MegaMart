import React from "react";
import { useParams } from "react-router-dom";

const ProductsByCategory = () => {
  const {product} = useParams();
  return <div>
    {product}
  </div>;
};

export default ProductsByCategory;
