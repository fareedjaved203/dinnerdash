const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const getAllCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id })
      .populate("user")
      .populate("products.product");
    if (cart.length === 0) {
      res.status(200).json({ success: false, cart });
    } else if (cart) {
      const filteredProducts = cart[0].products.filter(
        (product) => product.product !== null
      );

      if (filteredProducts.length === 0) {
        await Cart.deleteOne({ _id: cart[0]._id });
      } else {
        await Cart.updateOne(
          { _id: cart[0]._id },
          { $set: { products: filteredProducts } }
        );
      }
      if (cart) {
        res.status(200).json({
          success: true,
          cart,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const productsCopy = [...cart.products];
    const productIndex = productsCopy.findIndex((cartItem) => {
      return cartItem.product.toString() === req.params.id.toString();
    });
    if (productIndex !== -1) {
      // const product = await Product.findById(req.params.id);
      // product.stock += cart.products[productIndex].quantity;
      // await Product.updateOne(
      //   { _id: req.params.id },
      //   { $set: { stock: product.stock } }
      // );
      cart.products.splice(productIndex, 1);
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrUpdateCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    const product = await Product.findById(req.params.id);

    // product.stock -= req.body.quantity;

    // await Product.updateOne(
    //   { _id: req.params.id },
    //   { $set: { stock: product.stock } }
    // );

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        products: [
          {
            product: req.params.id,
            quantity: req.body.quantity,
          },
        ],
      });
    } else {
      const productIndex = cart.products.findIndex((cartItem) => {
        return cartItem.product._id.toString() === req.params.id.toString();
      });

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = req.body.quantity;
      } else {
        // Check if all products in the cart are from the same restaurant
        if (cart.products.length > 0) {
          const sameRestaurant = cart.products.every((cartItem) => {
            const resData = product.restaurant.some((restaurant) => {
              const data = cartItem.product.restaurant.includes(restaurant);
              return data;
            });
            return resData;
          });

          if (sameRestaurant) {
            cart.products.push({
              product: req.params.id,
              quantity: req.body.quantity,
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "All items in the cart must be from the same restaurant",
            });
          }
        }
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // If the cart doesn't exist, return an error
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Restore the stock value of all products in the cart
    // for (const cartItem of cart.products) {
    //   // Find the product in the database
    //   const product = await Product.findById(cartItem.product._id);

    //   // Restore the stock value of the product
    //   // product.stock += cartItem.quantity;

    //   // Save the changes to the product document
    //   await Product.updateOne(
    //     { _id: cartItem.product._id },
    //     { $set: { stock: product.stock } }
    //   );
    // }

    // If the cart exists, clear it
    cart.products = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCartItems,
  removeItemFromCart,
  createOrUpdateCart,
  clearCart,
};
