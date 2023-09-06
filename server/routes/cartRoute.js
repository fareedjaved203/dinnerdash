const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");

const {
  getAllCartItems,
  createOrUpdateCart,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.get("/cart", isAuthenticatedUser, getAllCartItems);

router.delete("/cart/:id", isAuthenticatedUser, removeItemFromCart);

router.delete("/cart", isAuthenticatedUser, clearCart);

router.post("/cart/:id", isAuthenticatedUser, createOrUpdateCart);

module.exports = router;
