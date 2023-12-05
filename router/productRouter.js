const express = require("express");
const Product = require("../models/productModel");

const {
  getProductHandler,
  createProductHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
} = require("../controller/productController");
const { checkInput } = require("../utils/crudFactory");

const productRouter = express.Router();

productRouter.get("/", getAllProduts);
productRouter.post("/", checkInput, createProductHandler);
productRouter.get("/:id", getProductByIdHandler);
productRouter.patch("/:id", updateProductByIdHandler);
productRouter.delete("/:id", deleteProductByIdHandler);

async function getAllProduts(req, res) {
  console.log(req.query);
  const { sort, select } = req.query;
  let queryPromise = Product.find();
  console.log("sort", sort);
  if (sort) {
    const [sortParam, order] = sort.split(" ");
    if (order === "asc") {
      queryPromise = queryPromise.sort(sortParam);
    } else {
      queryPromise = queryPromise.sort(`-${sortParam}`);
    }
  }
  if(select){
    queryPromise = queryPromise.select(select)
  }
  const result = await queryPromise;
  res.status(200).json({
    message: "success",
    data: result,
  });
}

module.exports = productRouter;
