const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middlewares
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const imageRouter = require("./routes/image");
// const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");
// const path = require("path");

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/images", imageRouter);
// app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Database connected`);
    app.listen(PORT, () => {
      console.log(`Backend server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
