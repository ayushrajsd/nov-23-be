const express = require("express");
const app = express();
const fs = require("fs");
// const short = require("short-uuid");
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
const data = fs.readFileSync("./data.json", "utf-8");
const userData = JSON.parse(data);
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

/** schemas */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Password and confirm password should be same",
    },
  },
});

/** models */
const User = mongoose.model("Person", userSchema);

/** Route handlers */

async function getUserHandler(req, res) {
  try {
    const userData = await User.find();
    if(userData.length === 0){
      throw new Error("No users found")
    } else {
        res.status(200).json({
            message: "success",
            data: userData,
        });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

async function createUserHandler(req, res) {
  try {
    const userDetails = req.body;
    const user = await User.create(userDetails);
    res.status(200).json({
      message: "user was created successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if(!user){
      throw new Error("No user found")
    } else {
        res.status(200).json({
            message: "success",
            data: user,
        });
    }
    
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

/*** Routes */
app.get("/api/users", getUserHandler);

app.post("/api/users", createUserHandler);

app.get("/api/users/:id", getUserByIdHandler);

app.listen(process.env.PORT, () =>
  console.log(`listening at ${process.env.PORT}`)
);
