const express = require("express");
const {
  signupHandler,
  loginHandler,
  forgetPassword,
  resetPassword,
  logoutHandler
} = require("../controller/authController");

const  authRouter = express.Router();

/** routes for authentication */

authRouter.post("/signup", signupHandler);
authRouter.post("/login", loginHandler);
authRouter.get('/logout', logoutHandler);
authRouter.post("/forgetPassword", forgetPassword);
authRouter.patch("/resetPassword/:userId", resetPassword);

module.exports = authRouter;