import express from "express";
import addToCartModel from "../models/addToCartModel.js";
const router = express.Router();

// add products in cart
router.post("/add_to_cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const isProductAlreadyInDb = await addToCartModel.find({
      productId,
      userId,
    });
    if (isProductAlreadyInDb.length != 0)
      //empty array ase jdi product na thake..so shudu if(isProductAlreadyInDb) dea jbe na..eta empty array hok ba vitre data thakuk -> shbr jnno kaj krbe. tai array r length nye condition dlm
      res.send({
        message: "product already added to cart",
        error: true,
      });
    else {
      const data = { productId, productQuantity: 1, userId };
      const addedToCart = await addToCartModel.create(data);
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

//count no of products for specific user
router.get("/count_product/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const noOfProductsInCart = await addToCartModel.find().count({ userId });
    res.send({
      count: noOfProductsInCart,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

// return cart details for specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = await addToCartModel.find({ userId });
    res.send({
      data: cartData,
    });
  } catch (error) {
    console.log(error.message || error);
    res.send("error--------check console");
  }
});

//update quantity for products in curt
router.patch("/update_quantity/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { productQuantity } = req.body;
    const updatedDetails = await addToCartModel.updateOne(
      { productId },
      { $set: { productQuantity: productQuantity } }
    );
    if (updatedDetails.matchedCount)
      res.send({
        success: true,
      });
    else
      res.send({
        success: false,
      });
  } catch (error) {
    console.log(error.message || error);
    res.send("error--------check console");
  }
});

//delete product from cart for specif user
router.delete("/dltProduct/:productId/:userId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.params;
    const dltFromCart = await addToCartModel.deleteOne({ productId, userId });
    if (dltFromCart.deletedCount) {
      res.send({
        success: true,
      });
    } else
      res.send({
        success: false,
      });
  } catch (error) {
    console.log(error.message || error);
    res.send("error--------check console");
  }
});

export default router;
