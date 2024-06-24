import "dotenv/config";
import express from "express";
import md5 from "md5";
import userRegisterModel from "../models/userRegisterModel.js";
import jsonwebtoken from "jsonwebtoken";

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
    if (findUser.password == md5(password)) {
      const token = await jsonwebtoken.sign(
        {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          password: findUser.password,
        },
        process.env.token_secret,
        {}
      );
      res.cookie("token", token).json({
        data: token,
        message: "logged in",
      });
    } else res.send({ message: "password doenst match" });
  } else res.send({ message: "email not found" });
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "logout successfull",
    });
  } catch (error) {
    res.send(error.message || error);
  }
});

export default router;
