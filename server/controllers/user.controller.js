const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../resources/users.json");
const bcrypt = require("bcrypt");
const { initStripe } = require("../stripe");
const stripe = initStripe();
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function getAllUsers(req, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Couldn't get data!");
      return;
    }
    const users = JSON.parse(data);
    res.status(200).send(users);
  });
}

async function createUser(req, res) {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
    });
    const dataInput = req.body;
    const hashedPassword = await bcrypt.hash(dataInput.password, 10);
    // console.log(customer);
    // res.status(200).json({ customer: customer });
    const users = req.userData;
    const user = users.find((user) => user.email == req.params.email);
    if (user) {
      res.status(404).send("Email already exists");
    }

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
    console.log(email);
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
      req.session.user = existingUser;
    }
    res.status(200).json(existingUser);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
}

module.exports = { getAllUsers, createUser, login };
