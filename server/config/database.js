require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");

const uri = process.env.DATABASE;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });
