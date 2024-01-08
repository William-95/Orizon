require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");
const orderRouter = require("./routes/order.router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);

const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log("server running" + "http://127.0.0.1:" + port);
});

module.exports = app;
