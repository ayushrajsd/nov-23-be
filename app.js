const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");

// const short = require("short-uuid");
require("dotenv").config();
const mongoose = require("mongoose");
 const cookieParser = require("cookie-parser");
 const cors = require("cors");

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const authRouter = require("./router/authRouter");
const bookingRouter = require("./router/bookingRouter");
const reviewRouter = require("./router/reviewRouter");

app.use(express.json());
app.use(cookieParser());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
});
app.use(limiter);
app.use(mongoSanitize());
app.use(helmet());
// app.use(cors());
// app.use(cors({ origin: "http://localhost:5173", credentials: true}));
const corsConfig = {
  origin: true,
  credentials: true,
};
// this is allowing all the requests
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
// console.log(userData)

/** mongo db connection */
mongoose
  .connect(process.env.DB_URL)
  .then((connection) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
// app.use(checkInput);

/*** Routes */
// get -> "/api/users/1234"
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/reviews", reviewRouter);

app.use("/search", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    message: "success",
    data: req.query,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`listening at ${process.env.PORT}`)
);
