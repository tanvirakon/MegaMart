import "dotenv/config";
import express from "express";
import md5 from "md5";
import userRegisterModel from "../models/userRegisterModel.js";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, picture, role } = req.body;
    password = md5(password);
    role = "general";

    const userData = {
      name,
      email,
      password,
      role,
      picture,
    };
    const newUser = await userRegisterModel.create(userData);
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
});

// check user email & pass & create token
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
        {} //for unlimited time
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

// forget pass page e email validation
router.post("/checkEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const data = await userRegisterModel.findOne({ email });
    if (data)
      res.send({
        error: false,
        message: "user found",
        data: "user found",
      });
    else {
      res.send({
        error: true,
        message: "user not found",
        data: "user not found",
      });
    }
  } catch (error) {
    res.send(error.message || error);
  }
});

// forget pass e email validation r pr new pass set
router.post("/setNewPass", async (req, res) => {
  try {
    let { email, password } = req.body;
    password = md5(password);

    const data = await userRegisterModel.findOneAndUpdate(
      { email },
      { $set: { password } }
    );

    if (data)
      res.send({
        error: false,
        message: "new password set",
        data: data,
      });
  } catch (error) {
    res.send(error.message || error);
  }
});

//nodemailer

export default router;
