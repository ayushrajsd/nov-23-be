const express = require("express");
const app = express();
// const short = require("short-uuid");
require("dotenv").config();
const mongoose = require("mongoose");
 const cookieParser = require("cookie-parser");

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const authRouter = require("./router/authRouter");
const bookingRouter = require("./router/bookingRouter");
const reviewRouter = require("./router/reviewRouter");

app.use(express.json());
app.use(cookieParser());
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
// get -> "/api/users/1234"
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/reviews", reviewRouter);

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
