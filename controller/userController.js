const User = require("../models/userModel");
const {
  checkInput,
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  deleteElementByIdFactory,
  updateElementByIdFactory,
} = require("../utils/crudFactory");

/** Route handlers */

const getUserHandler = getAllFactory(User);

const createUserHandler = createFactory(User);

const getUserByIdHandler = getElementByIdFactory(User);

const updateUserByIdHandler = updateElementByIdFactory(User);

const deleteUserByIdHandler = deleteElementByIdFactory(User);

module.exports = {
  getUserHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  checkInput,
};
