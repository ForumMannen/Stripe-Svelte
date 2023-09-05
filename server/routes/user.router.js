const express = require("express");
const { getAllUsers, createUser } = require("../controllers/user.controller");

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/createUser", createUser);

module.exports = { userRouter };
