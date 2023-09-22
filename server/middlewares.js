const fs = require("fs");
const path = require("path");

const filePathForUsers = path.join(__dirname, "./resources/users.json");
const filePathForOrders = path.join(__dirname, "./resources/orders.json");

function readUsersFile(req, res, next) {
  fs.readFile(filePathForUsers, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }
    req.userData = JSON.parse(data);
    next();
  });
}

function readOrdersFile(req, res, next) {
  fs.readFile(filePathForOrders, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }
    req.orderData = JSON.parse(data);
    next();
  });
}

module.exports = { readUsersFile, readOrdersFile };
