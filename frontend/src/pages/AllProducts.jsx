import React, { useEffect, useState } from "react";
import UploadProductModal from "../modals/UploadProductModal.jsx";
import axios from "axios";
import AdminShowProduct from "../components/AdminShowProduct.jsx";

function AllProducts() {
  const [upload_productModal, setUpload_productModal] = useState(false);
  const [productArray, setProductArray] = useState([]);
  const fetchAllProduct = async () => {
    const products = await axios.get(
      "http://localhost:3000/product/get_all_products"
    );
    setProductArray(products?.data.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white p-2 flex justify-between">
        <p className="text-2xl">All Products</p>
        <button
          className="bg-red-500 px-3 py-2 rounded-xl text-white"
          onClick={() => setUpload_productModal(true)}
        >
          upload_products
        </button>
      </div>

      {/* showing all product  */}
      <div className="grid grid-cols-5 gap-5 mt-4 h-[620px] overflow-y-scroll ">
        {/* h dc..ekhn only card scroll hbe..full pge na */}
        {/*  5ta item r pr nicher line e asbe as grid dc*/}
        {productArray.map((product, index) => (
          <AdminShowProduct
            product={product}
            key={index}
            fetchAllProduct={fetchAllProduct}
          />
        ))}
      </div>

      {/* new peoduct upload */}
      {upload_productModal && (
        <UploadProductModal
          onclose={() => setUpload_productModal(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
}

export default AllProducts;
