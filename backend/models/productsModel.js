import mongoose from "mongoose";

const productUploadSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productImage: {
      //   type: Array,
      // emneo likha jbe , but prer ta more specific
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const productsUploadModel = mongoose.model("product", productUploadSchema);

export default productsUploadModel;
