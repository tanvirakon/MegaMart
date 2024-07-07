import express from "express";
import productsUploadModel from "../models/productsModel.js";
const router = express.Router();

// store product
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

//get product
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

export default router;
