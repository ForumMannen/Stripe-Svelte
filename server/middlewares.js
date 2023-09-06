const fs = require("fs");
const path = require("path");

const filePathForUsers = path.join(__dirname, "./resources/users.json");

function readUsersFile(req, res, next) {
  fs.readFile(filePathForUsers, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server Error");
      return;
    }
    req.userData = JSON.parse(data);
    // console.log("Middleware", req.userData);
    next();
  });
}

module.exports = { readUsersFile };
