import jsonwebtoken from "jsonwebtoken";
import userRegisterModel from "../models/userRegisterModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // logged out tkle token = undefined
    if (!token) {
      res.json({
        message: "user not logged in.0ky?!huh!!",
        error: true,
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
    res.json({
      message: error.message || error,
      error: true,
    });
  }
};

export default auth;
