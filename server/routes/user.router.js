const express = require("express");
const { createUser, login, logout } = require("../controllers/user.controller");
const { readUsersFile } = require("../middlewares");

const userRouter = express
  .Router()
  .post("/createUser", readUsersFile, createUser)
  .post("/login", readUsersFile, login)
  .post("/logout", logout);

module.exports = { userRouter };
