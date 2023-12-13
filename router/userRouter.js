const express = require("express");
const {
  getUserByIdHandler,
  getUserHandler,
  deleteUserByIdHandler,
  updateUserByIdHandler,
} = require("../controller/userController");
const {
  isAdmin,
  protectRoute
} = require("../controller/authController");

const userRouter = express.Router();
userRouter.use(protectRoute); // adding authentication middleware for all user routes

userRouter.get("/allUsers", isAdmin, getUserHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.patch("/:id", updateUserByIdHandler);
userRouter.delete("/:id", deleteUserByIdHandler);

module.exports = userRouter;
