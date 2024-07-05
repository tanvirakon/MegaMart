import React, { useState } from "react";
import UploadProductModal from "../modals/UploadProductModal.jsx";

function AllProducts() {
  const [upload_productModal, setUpload_productModal] = useState(false);
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
      {upload_productModal && (
        <UploadProductModal onclose={() => setUpload_productModal(false)} />
      )}
    </div>
  );
}

export default AllProducts;
