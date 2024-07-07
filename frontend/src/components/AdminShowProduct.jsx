import React, { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct.jsx";

const ShowProduct = ({ product, fetchAllProduct }) => {
  const [editProduct, showEditProduct] = useState(false);
  return (
    <div className="p-4 bg-white group h-72 w-60 rounded-lg mb-3">
      <img
        className="mx-auto"
        src={product?.productImage[0]}
        alt={product?.productName}
        width={130}
      />
      <p className="mt-2 line-clamp-2">{product?.productName}</p>
      {/* 2 line r pr shb dotted hye jbe */}
      <p className="mt-2 mb-2 flex items-center font-semibold">
        <TbCurrencyTaka /> {product?.price}
      </p>

      <div className="bg-green-300 p-2 text-white rounded-full w-8 ml-auto hidden group-hover:block cursor-pointer">
        <MdEdit onClick={() => showEditProduct(true)} />
      </div>

      {editProduct && (
        <AdminEditProduct
          onclose={() => {
            showEditProduct(false);
          }}
          data={product}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default ShowProduct;
