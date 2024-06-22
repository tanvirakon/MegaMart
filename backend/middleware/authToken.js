import jsonwebtoken from "jsonwebtoken";
import userRegisterModel from "../models/userRegisterModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        message: "user not logged in.0ky?!huh!!",
      });
    } else {
      jsonwebtoken.verify(
        token,
        process.env.token_secret,
        async function (err, decoded) {
          if (err) {
            console.log("err", err);
          } else {
            const user = await userRegisterModel.findById(decoded.id);
            res.json(user);
          }
        }
      );
    }
    // next();
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
    });
  }
};

export default auth;
