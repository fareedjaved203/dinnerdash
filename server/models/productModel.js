const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter the Product Name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter the Product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter the Product Price"],
      maxLength: [8, "Price can't exceed 8 characters"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: [
      {
        type: String,
        required: [true, "Please enter Correct Category"],
      },
    ],
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxlength: [4, "Stock can't exceed 4 characters"],
      default: 1,
    },
    numOfOrders: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    restaurant: [
      {
        type: String,
        required: [true, "Please Add A Restaurant"],
      },
    ],
    display: {
      type: Boolean,
      required: [true, "Please Fill the Display Field"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", product);

module.exports = Product;
