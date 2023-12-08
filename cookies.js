const express = require("express");
const cookieParser = require("cookie-parser"); // parse cookie header and populate req.cookies with an object keyed by the cookie names.
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/userModel");

const SECRET_KEY = "someRandomSecretKey@12345";

const app = express();
app.use(cookieParser());
app.use(express.json());
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then((connection) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// home
// products
// clearCookie

app.get("/", (req, res) => {
  res.cookie("pageVisited", "home", { maxAge: 1000 * 60 * 60, httpOnly: true });
  res.json({
    message: "Welcome to the home page",
  });
});

app.get("/products", (req, res) => {
  res.cookie("produts", "bestSeller", {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    path: "/products",
  });
  console.log(req.cookies);
  const { pageVisited } = req.cookies;
  if (pageVisited) {
    res.json({
      message: "Welcome to the products page",
    });
  } else {
    res.json({
      message: "YOu are visiting for the first time. please login / signup",
    });
  }
});

app.get("/clearCookie", (req, res) => {
  res.clearCookie("pageVisited", { path: "/" });
  res.json({
    message: "cookie cleared",
  });
});

app.get("/signin", (req, res) => {
  const payload = 1234;
  try {
    jwt.sign(
      { data: payload },
      SECRET_KEY,
      { expiresIn: "1h" }, // options
      function (err, token) {
        if (err) {
          throw new Error("Error in generating token");
        }
        res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.json({
          message: "token generated",
          data: token,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/verify", (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({
      message: "token verified",
      data: decoded,
    });
  } catch (err) {
    console.log(err);
  }
});

// signup
// login
// protected routes

app.post("/signup", async (req, res) => {
  // capture the data from the user
  // create the user data on the database
  try {
    const userObject = req.body;
    console.log(req.body);
    const user = await User.create(userObject);
    res.json({
      message: "user created",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  // create the token
  // send the token to the client
  try {
    // capture the data from the user
    const { email, password } = req.body;
    // check the user data on the database
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      res.status(400).json({
        message: "user not found",
      });
    } else {
      // check the password
      console.log(
        "user password",
        user.password,
        "received password",
        password
      );
      if (user.password != password) {
        res.status(400).json({
          message: "invalid credentials",
        });
      } else {
        // create token
        const token = jwt.sign(
          {data: user._id},
          SECRET_KEY
        );
        res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.json({
          message: "user logged in",
          data: user,
          token: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const protectRoute = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        const decoded = jwt.verify(token, SECRET_KEY);
        const user  = await User.findById(decoded.data);
        if(!user){
            res.status(400).json({
                message: "user not found"
            })
        }else {
            req.user = user;
            next();
        }

    }catch(err){
        console.log(err)
    }
}

app.get("/userData", protectRoute, (req, res) => {
    res.json({
        message: "user data",
        data: req.user
    })
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
