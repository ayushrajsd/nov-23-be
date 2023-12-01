const User = require("../models/userModel");

const checkInput = function (req, res, next) {
  const userDetails = req.body;
  const isEmpty = Object.keys(userDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      message: "error",
      data: "Input fields cannot be empty",
    });
  } else {
    next();
  }
};

/** Route handlers */

async function getUserHandler(req, res) {
  try {
    const userData = await User.find();
    if (userData.length === 0) {
      throw new Error("No users found");
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
    if (!user) {
      throw new Error("No user found");
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

async function updateUserByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const userDetails = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, userDetails, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("No user found");
    } else {
      res.status(200).json({
        message: "user was updated successfully",
        data: updatedUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

async function deleteUserByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("No user found");
    } else {
      res.status(200).json({
        message: "user was deleted successfully",
        data: deletedUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

module.exports = {
  getUserHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  checkInput,
};
