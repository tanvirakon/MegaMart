import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { mongodbURL, port } from "./config.js";
import router from "./routes/routess.js";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("moshi moshi");
});

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
