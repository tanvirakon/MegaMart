import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import context from "../assets/context/context.js";

const AddToCartPage = () => {
  const { fetchProductCountInCart, noOfProductInCart } = useContext(context);
  const [productQuantity, setProductQuantity] = useState(1); //button tiple quantity jeno increase hy real time
  const { userId } = useParams();
  const [cartData, setCartData] = useState([]);
  let [allProductDetailsInCart, setAllProductDetailsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const fetchCartDetails = async () => {
    const user = await axios.get("http://localhost:3000/secret", {
      withCredentials: true,
    });
    if (!user?.data.error) {
      // suppeded to work only when user is logged in, but doesnt -> will fix in authToken.js
      const cartDetailsOfUser = await axios.get(
        `http://localhost:3000/cart/user/${userId}`
      );
      setCartData(cartDetailsOfUser?.data?.data);
      const array = cartDetailsOfUser?.data?.data;
      // didint understand
      const productDetailsPromises = array.map(
        async (item) =>
          await axios.get(`http://localhost:3000/product/${item.productId}`)
      );
      const productDetails = await Promise.all(productDetailsPromises);
      const productDetailsData = productDetails.map(
        (details) => details.data.data
      );
      setAllProductDetailsInCart(productDetailsData);

      // why it doesnt work
      // array.map(async (i, j) => {
      //   await axios
      //     .get(`http://localhost:3000/product/${i.productId}`)
      //     .then((details) => {
      //       setAllProductDetailsInCart(() => {
      //         allProductDetailsInCart = [
      //           ...allProductDetailsInCart,
      //           details?.data?.data,
      //         ];
      //       });
      //     });
      // });
    }
  };

  const totalPriceOfProducts = () => {
    let sum = 0;
    allProductDetailsInCart?.map((i, j) => {
      sum += i.price * cartData[j]?.productQuantity;
    });
    setTotalPrice(sum);
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  useEffect(() => {
    totalPriceOfProducts();
  }, [totalPriceOfProducts]);

  const quantityUpdate = async (productId, productQuantity) => {
    productQuantity = productQuantity < 1 ? 1 : productQuantity;
    setProductQuantity(productQuantity);
    const updated = await axios.patch(
      `http://localhost:3000/cart/update_quantity/${productId}`,
      { productQuantity: productQuantity }
    );
  };

  const netCostOfProduct = (productQuantity, price) => {
    return productQuantity * price;
  };

  const dltProductFromCart = async (productId, userId) => {
    const dlt = await axios.delete(
      `http://localhost:3000/cart/dltProduct/${productId}/${userId}`
    );
    if (dlt.data.success) {
      fetchProductCountInCart();
      fetchCartDetails();
      toast.success("product deleted");
    }
  };

  return (
    <div className="mx-16">
      {cartData.length === 0 && (
        <div className="flex justify-center mt-52">
          <h1 className="text-2xl">cart empty</h1>
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-between mt-5">
          <div className="flex flex-col gap-2 w-[1000px]">
            {allProductDetailsInCart?.map((i, j) => {
              return (
                <div
                  key={j}
                  className="h-36 my-1 bg-white border border-slate-200 flex gap-5"
                >
                  <div className="w-32 bg-slate-200 h-full">
                    <img
                      src={i?.productImage[0]}
                      className="mix-blend-multiply"
                    />
                  </div>
                  <div className="w-full relative">
                    <p className="text-xl mt-2">{i?.productName}</p>
                    <p className="text-small font-light">{i?.category}</p>
                    <p className="mt-2 mb-2 flex items-center font-semibold text-red-600">
                      <TbCurrencyTaka /> {i?.price}
                    </p>
                    <div className="gap-2 flex">
                      <button
                        className="border border-red-500 px-2 hover:bg-red-500 hover:text-white rounded"
                        onClick={() =>
                          quantityUpdate(
                            cartData[j]?.productId,
                            --cartData[j].productQuantity
                          )
                        }
                      >
                        -
                      </button>
                      <span>{cartData[j]?.productQuantity}</span>
                      <button
                        className="border border-red-500 px-2 hover:bg-red-500 hover:text-white rounded"
                        onClick={() =>
                          quantityUpdate(
                            cartData[j]?.productId,
                            ++cartData[j].productQuantity
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="absolute top-5 right-5">
                      <MdDelete
                        className="text-red-500 cursor-pointer content-end absolute right-0 text-xl  hover:text-red-700 "
                        onClick={() =>
                          dltProductFromCart(
                            cartData[j]?.productId,
                            cartData[j]?.userId
                          )
                        }
                      />
                      <p className="mt-5 flex items-center font-semibold text-red-600">
                        <TbCurrencyTaka />
                        {netCostOfProduct(
                          cartData[j]?.productQuantity,
                          i?.price
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white h-36 w-[400px] mt-2 rounded sticky top-4">
            <div className="bg-blue-500 text-white p-2 text-xl">summary</div>
            <div className="flex justify-between mx-2 mt-2">
              <p>Quantity</p>
              <p>{cartData?.length}</p>
            </div>
            <div className="flex justify-between mx-2 mt-2">
              <p>Total Price</p>
              <p>{totalPrice}</p>
            </div>
            <div className="bg-red-500 text-white p-2 text-xl mt-2 text-center">
              <button>pay now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddToCartPage;
