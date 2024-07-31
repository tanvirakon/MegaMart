import express from "express";
import productsUploadModel from "../models/productsModel.js";
const router = express.Router();

router.get("/:query", async (req, res) => {
  const { query } = req.params;
  const re = new RegExp(query, "gi"); //global & case insensitive
  const allProductsFromDb = await productsUploadModel.find({
    $or: [{ productName: re }, { brandName: re }, { category: re }],
  });
  if (allProductsFromDb.length > 0)
    res.send({
      data: allProductsFromDb,
      success: true,
    });
  else
    res.send({
      success: false,
    });
});

export default router;
