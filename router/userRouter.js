const express = require("express");
const { getUserByIdHandler, getUserHandler, createUserHandler, deleteUserByIdHandler, updateUserByIdHandler } = require("../controller/userController");
const { checkInput } = require("../utils/crudFactory");

const userRouter = express.Router();



userRouter.get('/', getUserHandler)
userRouter.post('/', checkInput, createUserHandler)
userRouter.get('/:id', getUserByIdHandler)
userRouter.patch('/:id', updateUserByIdHandler)
userRouter.delete('/:id', deleteUserByIdHandler)

module.exports = userRouter;