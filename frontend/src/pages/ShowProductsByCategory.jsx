import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productCategory from "../helper/productCategory.js";
import axios from "axios";
import MapOfAllProduct from "../helper/MapOfAllProduct.jsx";

const ProductsByCategory = () => {
  //
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  //
  const { product } = useParams();
  const [data, setData] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([product]);
  const fetchData = async (product) => {
    const products = await axios.get(
      `http://localhost:3000/product/product_by_anyCategories/${product}`
    );
    setData(products?.data?.data);
  };

  const handleSelectCategory = (e) => {
    const { checked, id } = e.target; //id te category asbe
    if (checked) {
      if (id != product)
        //alreday jeta ase..double jno na duke
        setCheckedProducts([...checkedProducts, id]); //check box
    }
    if (!checked) {
      //uncheck box
      const newArrayData = checkedProducts;
      const index = newArrayData.indexOf(id);
      newArrayData.splice(index, 1);
      setCheckedProducts([...newArrayData]);
    }
  };
  useEffect(() => {
    fetchData(product);
  }, []);
  useEffect(() => {
    fetchData(checkedProducts);
  }, [checkedProducts]);

  const sorting = (e) => {
    const sortingMethod = e.target.id; //input 2 , input 1
    if (data) {
      const newData = [...data]; //creates a new array that is a shallow copy of data. Now, newData and data do not reference the same array, and sorting newData does not directly alter data. tai setData() kaj krbe
      if (sortingMethod == "input1") newData.sort((a, b) => a.price - b.price);
      else if (sortingMethod == "input2")
        newData.sort((a, b) => b.price - a.price);
      setData(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const minPriceNumber = Number(minPrice); //number e convert
    const maxPriceNumber = Number(maxPrice);

    const filteredData = data.filter(
      (item) =>
        (!minPriceNumber || item.price >= minPriceNumber) &&
        (!maxPriceNumber || item.price <= maxPriceNumber)
    );
    console.log("data", data);
    console.log("filteredData", filteredData);

    setData(filteredData);
  };

  return (
    <div className="mx-4 mt-4 flex gap-2">
      {/* left */}
      <div className="w-36 md:w-48 bg-white h-[750px] p-2">
        <div className="">
          <h3 className="text-2xl font-normal mb-2 border-b-2 border-gray-300">
            sort by
          </h3>
          <form>
            <div className="flex gap-2">
              <input
                type="radio"
                name="radio-btn" //name diye radio input grp banay...naile 1ta select e baki gula deselect hbe na
                id="input1"
                defaultChecked
                onChange={sorting}
              />
              <label htmlFor="input1"> price low to high</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="radio-btn"
                id="input2"
                onChange={sorting}
              />
              <label htmlFor="input2"> price high to low</label>
            </div>
          </form>

          {/* hasi mam work ---- price range*/}
          {/* <div>
            <h3 className="text-2xl font-normal mb-2 border-b-2 border-gray-300">
              Price Range
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="minPrice">Min:</label>
                <input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border rounded px-2 py-1 mx-2"
                />
              </div>
              <div>
                <label htmlFor="maxPrice">Max:</label>
                <input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border rounded px-2 py-1 mx-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Apply
              </button>
            </form>
          </div> */}

          <h3 className="text-2xl font-normal mb-2 border-b-2 border-gray-300 mt-4">
            category
          </h3>
          <form>
            {productCategory?.map((i, j) => {
              return (
                <div key={j} className="flex gap-2">
                  <input
                    type="checkbox"
                    id={i?.value}
                    className="cursor-pointer"
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={i?.value}>{i?.label}</label>
                </div>
              );
            })}
          </form>
        </div>
      </div>
      {/* right */}
      <div className="grid md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-5  h-[750px] p-2 overflow-y-scroll">
        {data == undefined && <p className="text-2xl m-4">empty</p>}
        <MapOfAllProduct allProduct={data} />
      </div>
    </div>
  );
};

export default ProductsByCategory;
