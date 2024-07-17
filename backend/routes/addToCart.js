import express from "express";
import addToCartModel from "../models/addToCartModel.js";
const router = express.Router();

router.post("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const isProductAlreadyInDb = await addToCartModel.find({ productId });
    if (isProductAlreadyInDb.length != 0)
      res.send({
        message: "product already added to cart",
        error: true,
      });
    else {
      const data = { productId, productQuantity: 1, userId };
      const addedToCart = await addToCartModel.create(data);
      console.log("addedToCart", addedToCart);
      res.send({
        data: addedToCart,
        message: "product added to cart",
        error: false,
      });
    }
  } catch (error) {
    res.send(error.message || error);
  }
});

export default router;
