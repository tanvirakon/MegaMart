import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userRegisterModel = mongoose.model("signup", userSchema);

export default userRegisterModel;

