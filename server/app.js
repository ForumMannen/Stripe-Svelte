const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { userRouter } = require("./routes/user.router");

const app = express();
require("dotenv").config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["myK3yiStH3MostS3cur3"],
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

app.use("/api", userRouter);

module.exports = { app };
