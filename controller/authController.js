const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { emailBuilder } = require("../nodemailer");
const User = require("../models/userModel");

const { SECRET } = process.env;
/** authentication related handlers */

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const signupHandler = async function (req, res) {
  try {
    // add it to the db
    const userObject = req.body;
    //   data -> req.body
    let newUser = await UserModel.create(userObject);
    // send a response
    res.status(201).json({
      message: "user created successfully",
      user: newUser,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "success",
    });
  }
};

const loginHandler = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      let areEqual = password == user.password;
      if (areEqual) {
        // user is authenticated
        /* 2. Sending the token -> people remember them
         * */
        // payload : id of that user
        jwt.sign(
          { id: user["_id"] },
          SECRET,
          { expiresIn: "1h" },
          function (err, data) {
            if (err) {
              throw new Error(err.message);
            }
            res.cookie("token", data, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              httpOnly: true,
            });
            res.status(200).json({ status: "success", message: data, user: user });
          }
        );
      } else {
        console.log("err", err);
        res.status(404).json({
          status: "failure",
          message: "email or password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        status: "failure",
        message: "user not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
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

const protectRoute = async (req, res, next) => {
  // get token from cookies
  // verify token
  // get user from database
  // if user exists then call next
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, SECRET);
    if (decoded) {
      const userId = decoded.id;
      req.userId = userId;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  // get userId from req.userId
  // authorise user to see the user data
  // get user from database
  // if user.role === "admin" then call next
  const userId = req.userId;
  const user = await User.findById(userId);
  if (user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      status: "failure",
      message: "only admins can perform this action",
    });
  }
};

const isAuthorized = (allowedRoles) => {
   // return function which will be called by express
   // get userId from req.userId
    // get user from database
    // if user's roles fall in the allowedRoles then call next 
    return async function (req, res, next){
        const userId = req.userId;
        console.log(userId);
        const user = await User.findById(userId);    
        console.log(user);
        if(allowedRoles.includes(user.role)){
            next();
        }else {
            res.status(401).json({
                status:"failure",
                message:"you are not authorized to perform this action"
            
            })
        }

    }

}

const logoutHandler = async (req, res) => {
   res.clearCookie("token");
   res.status(200).json({
     status: "success",
     message: "logged out successfully",
   }); 
}

module.exports = {
  signupHandler,
  loginHandler,
  forgetPassword,
  resetPassword,
  protectRoute,
  isAdmin,
  isAuthorized,
  logoutHandler
};