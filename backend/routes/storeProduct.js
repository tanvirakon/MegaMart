import express from "express";
import productsUploadModel from "../models/productsModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
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

export default router;
