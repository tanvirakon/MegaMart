import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { mongodbURL, port } from "./config.js";
import basicRouter from "./routes/basicRoutess.js";
import allUserRouter from "./routes/allUser.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./middleware/authToken.js";
import updateUserROleRoute from "./routes/updateUserRole.js";
import ProductRouter from "./routes/product.js";
import addToCartRouter from "./routes/addToCart.js";
import productSearchRouter from "./routes/productSearch.js";

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/secret", auth); //user loggin naki na...login tkle sei data send krbe

app.use("/api", basicRouter);
app.use("/all_user", allUserRouter);
app.use("/update_role", updateUserROleRoute);
app.use("/product", ProductRouter);
app.use("/cart", addToCartRouter);
app.use("/search", productSearchRouter);

mongoose
  .connect(mongodbURL)
  .then(function () {
    console.log("connected with mongoose");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
