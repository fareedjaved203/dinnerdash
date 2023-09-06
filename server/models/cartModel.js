const mongoose = require("mongoose");
const Product = require("./productModel");

const cart = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

cart.pre("save", async function (next) {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (const item of this.products) {
    const product = await Product.findById(item.product);
    totalPrice += product.price * item.quantity;
    totalQuantity += item.quantity;
  }

  this.totalPrice = totalPrice;
  this.totalQuantity = totalQuantity;

  next();
});

const Cart = mongoose.model("Cart", cart);

module.exports = Cart;
