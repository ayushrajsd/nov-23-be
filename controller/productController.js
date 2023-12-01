const Product = require('../models/productModel')

const checkInput = function (req, res, next) {
    const productDetails = req.body;
    const isEmpty = Object.keys(productDetails).length === 0;
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
  
  async function getProductHandler(req, res) {
    try {
      const productData = await Product.find();
      if (productData.length === 0) {
        throw new Error("No products found");
      } else {
        res.status(200).json({
          message: "success",
          data: productData,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "error",
        data: err.message,
      });
    }
  }
  
  async function createProductHandler(req, res) {
    try {
      const productDetails = req.body;
      const product = await Product.create(productDetails);
      res.status(200).json({
        message: "product was created successfully",
        data: product,
      });
    } catch (err) {
      res.status(500).json({
        message: "error",
        data: err.message,
      });
    }
  }
  
  async function getProductByIdHandler(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("No product found");
      } else {
        res.status(200).json({
          message: "success",
          data: product,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "error",
        data: err.message,
      });
    }
  }
  
  async function updateProductByIdHandler(req, res) {
    try {
      const { id } = req.params;
      const productDetails = req.body;
      const updatedUser = await Product.findByIdAndUpdate(id, productDetails, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error("No product found");
      } else {
        res.status(200).json({
          message: "product was updated successfully",
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
  
  async function deleteProductByIdHandler(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new Error("No product found");
      } else {
        res.status(200).json({
          message: "product was deleted successfully",
          data: deletedProduct,
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
    getProductHandler,
    createProductHandler,
    getProductByIdHandler,
    updateProductByIdHandler,
    deleteProductByIdHandler,
    checkInput,
  };