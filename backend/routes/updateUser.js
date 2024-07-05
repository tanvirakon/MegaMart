import express from "express";
import userRegisterModel from "../models/userRegisterModel.js";
const router = express.Router();

router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const findUser = await userRegisterModel.findOneAndUpdate(
      { email: email },
      { $set: { role: req.body.userRole } }
    );
    if (!findUser) {
      res.status(400).send({
        message: "error occured",
      });
    } else
      res.status(200).send({
        data: findUser,
        message: "role updated",
      });
  } catch (error) {
    res.send(error.message || error);
  }
});

export default router;
