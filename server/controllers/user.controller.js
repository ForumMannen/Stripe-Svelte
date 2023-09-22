const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../resources/users.json");
const bcrypt = require("bcrypt");
const { initStripe } = require("../stripe");
const stripe = initStripe();

async function createUser(req, res) {
  try {
    const dataInput = req.body;
    const hashedPassword = await bcrypt.hash(dataInput.password, 10);
    const users = req.userData;
    const userWithEmail = users.find((user) => user.email === req.body.email);
    if (userWithEmail) {
      res.status(404).send("Email already exists");
      return;
    }
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
    });
    const newUser = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      password: hashedPassword,
    };
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        res.status(404).send("Couldn't write to file!");
      }
      res.status(201).send(users);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const users = req.userData;
    const existingUser = users.find((user) => user && user.email == email);
    if (!existingUser) {
      return res.status(400).json("Wrong email or password");
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json("Wrong email or password");
    }
    if (req.session) {
      const { password, ...userWithoutPassword } = existingUser;
      req.session.isAuthenticated = true;
      req.session.user = userWithoutPassword;
      res.status(200).json(userWithoutPassword);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
}

async function logout(req, res) {
  if (req.session) {
    req.session.isAuthenticated = false;
    req.session.user = null;
    req.session.orders = null;
    res.status(200).json({ message: "Successful Logout!" });
  } else {
    res.status(400).json({ message: "Session not found" });
  }
}

module.exports = { createUser, login, logout };
