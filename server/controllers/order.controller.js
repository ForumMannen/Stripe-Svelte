const fs = require("fs");
const path = require("path");
const orderData = path.join(__dirname, "../resources/orders.json");
const userData = path.join(__dirname, "../resources/users.json");
const { initStripe } = require("../stripe");
const { log } = require("console");
const stripe = initStripe();

const CLIENT_URL = "http://localhost:5173";

async function createCheckoutSession(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.cartItems.map((item) => {
        return {
          price: item.product.priceId,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/success`,
      cancel_url: CLIENT_URL,
      customer_email: req.body.userData.email,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(400).json("Det gick inte bra...");
  }
}

async function verifyPayment(req, res) {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.body.sessionId,
      {
        expand: ["line_items.data"],
      }
    );

    const line_items = session.line_items && session.line_items.data;

    if (line_items) {
      const products = line_items.map((accessData) => {
        return {
          product: accessData.description,
          pricePerProduct: accessData.price.unit_amount / 100,
          quantity: accessData.quantity,
        };
      });

      if (session.payment_status !== "paid") {
        return res.status(400).json({ verified: false });
      }

      const newOrder = {
        email: session.customer_email,
        name: session.customer_details.name,
        products: products,
        totalDiscount: session.total_details.amount_discount / 100,
        totalPrice: session.amount_total / 100,
        paymentStatus: session.payment_status,
      };

      let existingOrders = [];

      try {
        const existingData = fs.readFileSync(orderData, "utf-8");
        if (existingData) {
          existingOrders = JSON.parse(existingData);
        }
      } catch (error) {
        console.error(error);
      }

      existingOrders.push(newOrder);
      fs.writeFile(
        orderData,
        JSON.stringify(existingOrders, null, 2),
        (err) => {
          if (err) {
            res.status(404).send("Couldn't write order to file!");
          } else {
            console.log("Order saved to file");
          }
        }
      );
    }

    res.status(200).json({ verified: true });
  } catch (error) {
    console.error(error);
  }
}

async function fetchOrders(req, res) {
  try {
    if (!req.session || !req.session.isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const orders = req.orderData;
    const filterOrders = orders.filter(
      (order) => order.email == req.session.user.email
    );
    res.status(200).send(filterOrders);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createCheckoutSession, verifyPayment, fetchOrders };
