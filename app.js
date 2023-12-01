const express = require("express");
const app = express();
const fs = require("fs");
// const short = require("short-uuid");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const {
  getUserHandler,
  createUserHandler,
  getUserByIdHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
  checkInput
} = require("./controller/userController");

const {getProductHandler, createProductHandler} = require("./controller/productController");

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
app.get("/api/users", getUserHandler);

app.post("/api/users", checkInput, createUserHandler);

app.get("/api/users/:id", getUserByIdHandler);

app.patch("/api/users/:id", updateUserByIdHandler);

app.delete("/api/users/:id", deleteUserByIdHandler);

/** routes for prosducts */
app.get("/api/products", getProductHandler);
app.post("/api/products", createProductHandler);

app.listen(process.env.PORT, () =>
  console.log(`listening at ${process.env.PORT}`)
);
