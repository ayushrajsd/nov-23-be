const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");
const crypto = require("crypto"); // node based package

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.post("/create-order", async (req, res) => {
  // creating order id
  // saving it in database
  // return order id
});

app.post("/checkout", (req, res) => {
  /**
   * orderDetails = getOrderDetails(orderId)
   */
  //   const orderId = req.body.orderId;
  // make call to databse to get order details
  var options = {
    amount: 10000, // amount in the smallest currency unit
    currency: "INR",
    receipt: shortid.generate(), // order id
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.status(200).json({
      message: "Order created successfully",
      order: order,
    });
  });
});

app.post("/verify", (req, res) => {
  try {
    console.log("web hook called");
    console.log(process.env.WEBHOOK_SECRET); // same secret key which we have used in razorpay dashboard
    const shasum = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
    shasum.update(JSON.stringify(req.body));
    const freshSignature = shasum.digest("hex");
    console.log("server based signature", freshSignature);
    console.log("reh headers", req.headers);
    if (freshSignature === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      res.json({ status: "ok" });
    } else {
      res.status(401).json({ status: "invalid request" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
