import express from "express";
import userRegisterModel from "../models/userRegisterModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUser = await userRegisterModel.find();
    res.send({
      data: allUser,
      success: true,
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

export default router;
