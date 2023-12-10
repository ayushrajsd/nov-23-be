const User = require("../models/userModel");
const {
  checkInput,
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  deleteElementByIdFactory,
  updateElementByIdFactory,
} = require("../utils/crudFactory");
const { emailBuilder } = require("../nodemailer");

/** Route handlers */

const getUserHandler = getAllFactory(User);

const createUserHandler = createFactory(User);

const getUserByIdHandler = getElementByIdFactory(User);

const updateUserByIdHandler = updateElementByIdFactory(User);

const deleteUserByIdHandler = deleteElementByIdFactory(User);

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const forgetPassword = async (req, res) => {
  // 2. find user by email
  // 3. generate a random token
  // 4. save token in database
  // 5. save expiry time in database
  // 5. send email to user with token
  try {
    // 1. get email from req.body
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    } else {
      const token = otpGenerator();
      console.log("token", token);
      user.token = token;
      user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
      console.log("updated user", user);
      await user.save();
      // send email to user
      emailBuilder(user.email, "Reset Password", `Your OTP is ${token}`)
        .then(() => {
          console.log("email sent successfully");
          res.status(200).json({
            status: "success",
            message: "email sent successfully",
            data: user,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    // 1. get token from req.body
    // 2. get password from req.body
    const { token, password, email } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    } else {
      // 3. verify the validity of token
      if (user.token !== token) {
        return res.status(400).json({
          status: "fail",
          message: "invalid token",
        });
      } else {
        // check expiry time of the token
        if (user.otpExpiry < Date.now()) {
          return res.status(400).json({
            status: "fail",
            message: "token expired",
          });
        } else {
          // 4. update password in database
          user.password = password;
          user.token = undefined;
          user.otpExpiry = undefined;
          await user.save();
          res.status(200).json({
            status: "success",
            message: "password updated successfully",
            data: user,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  checkInput,
  forgetPassword,
  resetPassword,
};
