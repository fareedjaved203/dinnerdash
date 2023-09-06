const mongoose = require("mongoose");

const restaurant = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the restaurant Name"],
      trim: true,
      unique: [true, "Please Enter A unique name"],
    },
    location: {
      type: String,
      required: [true, "Please Enter the restaurant location"],
    },
    branch: {
      type: String,
      required: [true, "Please Enter the restaurant branch"],
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurant);

module.exports = Restaurant;
