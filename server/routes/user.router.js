const express = require("express");
const {
  getAllUsers,
  createUser,
  login,
} = require("../controllers/user.controller");
const { readUsersFile } = require("../middlewares");

const userRouter = express
  .Router()
  .get("/users", getAllUsers)
  .post("/createUser", readUsersFile, createUser)
  .post("/login", readUsersFile, login);

module.exports = { userRouter };
