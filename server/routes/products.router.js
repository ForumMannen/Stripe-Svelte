const express = require("express");
const { fetchAllProducts } = require("../controllers/products.controller");

const productsRouter = express.Router().get("/products", fetchAllProducts);

module.exports = { productsRouter };
