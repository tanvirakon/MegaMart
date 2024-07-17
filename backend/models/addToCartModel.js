import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addtocart", addToCartSchema);

export default addToCartModel;
