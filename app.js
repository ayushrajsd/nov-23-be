const express = require("express");
const app = express();
// const short = require("short-uuid");
require("dotenv").config();
const mongoose = require("mongoose");

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

app.use(express.json());
// console.log(userData)

/** mongo db connection */
mongoose
  .connect(process.env.DB_URL)
  .then((connection) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
// app.use(checkInput);

/*** Routes */

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/search", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    message: "success",
    data: req.query,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`listening at ${process.env.PORT}`)
);
