import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { mongodbURL, port } from "./config.js";
import router from "./routes/routess.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./middleware/authToken.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.get("/secret", auth, (req, res) => {
  res.send("Secret Information");
});
app.use("/api", router);

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
