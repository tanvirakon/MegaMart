import express from "express";
import md5 from "md5";
import userRegisterModel from "../models/userRegisterModel.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, picture } = req.body;
    password = md5(password);

    const userData = {
      name,
      email,
      password,
      picture,
    };
    const newUser = await userRegisterModel.create(userData);
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});

router.post("/canlogin", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userRegisterModel.findOne({
    email: email,
  });
  if (findUser) {
    if (findUser.password == md5(password))
      res.send({
        data: findUser,
        message: "logged in",
      });
    else res.send({ message: "password doenst match" });
  } else res.send({ message: "email not found" });
});

export default router;
