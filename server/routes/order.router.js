const express = require("express");
const {
  createCheckoutSession,
  verifyPayment,
  fetchOrders,
} = require("../controllers/order.controller");
const { readOrdersFile } = require("../middlewares");

const orderRouter = express
  .Router()
  .post("/create-checkout-session", createCheckoutSession)
  .post("/verify-payment", verifyPayment)
  .get("/fetch-orders", readOrdersFile, fetchOrders);

module.exports = { orderRouter };
