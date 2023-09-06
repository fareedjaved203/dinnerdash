const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");

const errorMiddleware = require("./middlewares/error");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/cartRoute");
const restaurant = require("./routes/restaurantRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", cart);
app.use("/api/v1", restaurant);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
