import React from "react";
import AllCategorySingleProduct from "../components/HomePage/AllCategorySingleProduct.jsx";
import Carosoul from "../components/Carosoul.jsx";
import AllProductSingleCategoryHorizontal from "../components/HomePage/AllProductSingleCategoryHorizontal.jsx";
import AllProductSingleCategoryVertical from "../components/HomePage/AllProductSingleCategoryVertical.jsx";

function Home() {
  return (
    <div className="mt-8 ">
      <Carosoul />
      <AllCategorySingleProduct />
      <AllProductSingleCategoryHorizontal category={"airpodes"} heading={"Top airpods"} />
      <AllProductSingleCategoryHorizontal
        category={"camera"}
        heading={"Popular camera"}
      />
      <AllProductSingleCategoryVertical
        category={"earphones"}
        heading={"Best earphones"}
      />
      <AllProductSingleCategoryVertical
        category={"mobiles"}
        heading={"Mobiles"}
      />
      <AllProductSingleCategoryVertical
        category={"Mouse"}
        heading={"Mouse"}
      />
      <AllProductSingleCategoryVertical
        category={"printers"}
        heading={"Printers"}
      />
      <AllProductSingleCategoryVertical
        category={"processor"}
        heading={"Processor"}
      />
      <AllProductSingleCategoryVertical
        category={"refrigerator"}
        heading={"Refrigerator"}
      />
    </div>
  );
}

export default Home;
