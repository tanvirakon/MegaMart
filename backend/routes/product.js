import express from "express";
import productsUploadModel from "../models/productsModel.js";
const router = express.Router();

// store product in db
router.post("/upload", async (req, res) => {
  try {
    const newProduct = await productsUploadModel.create(req.body);
    res.status(200).send({
      data: newProduct,
      success: true,
      message: "product uploaded",
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

//get all product from db
router.get("/get_all_products", async (req, res) => {
  try {
    const allProduct = await productsUploadModel.find();
    res.status(200).send({
      data: allProduct,
      success: true,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

// update product
router.put("/update_product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const editProduct = await productsUploadModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
      // update krr porer conditon dekhabe
    );
    res.status(200).send({
      data: editProduct,
      success: true,
      message: "product details edit successfull",
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

//get single product of all category for home pge
router.get("/find-all-category", async (req, res) => {
  try {
    const allProductCategory = await productsUploadModel.distinct("category");
    // only ki ki category ase ta return krbe
    let allCategoryFirstProduct = [];
    // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
    for (const category of allProductCategory) {
      const product = await productsUploadModel.findOne({ category });
      allCategoryFirstProduct.push(product);
    }
    res.send({
      data: allCategoryFirstProduct,
      success: true,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

//get all product of a category for home pge
router.get("/all-product-single-category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const product = await productsUploadModel.find({ category });
    res.send({
      data: product,
      success: true,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

// get single product details by its id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsUploadModel.findById(id);
    res.send({
      data: product,
      success: true,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

// get products for the categories sent by checkbox
router.get("/product_by_anyCategories/:category", async (req, res) => {
  try {
    const { category } = req.params; //string
    const categoryArray = category.split(","); //string -> array
    const data = await productsUploadModel
      .find({
        category: { $in: categoryArray },
      })
      .sort({ price: 1 });
    res.send({
      data: data,
      success: true,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

export default router;
