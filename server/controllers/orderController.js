const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user.id,
    });
    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity, "minus");
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

//get single order
const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get logged in user orders
const myOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

//get all orders (admin)
const getAllOrders = async (req, res, next) => {
  try {
    const order = await Order.find();

    let totalAmount = 0;

    order.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }

    order.orderStatus = req.body.status;

    if (order.orderStatus === "Cancelled") {
      order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity, "add");
      });
      order.finishedAt = Date.now();
    } else {
      if (order.orderStatus === "Completed") {
        order.finishedAt = Date.now();
        order.orderItems.forEach(async (order) => {
          const product = await Product.findById(order.product);
          if (product) {
            product.numOfOrders += 1;
            await product.save({ validateBeforeSave: false });
          }
        });
      }
    }
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

async function updateStock(id, quantity, operation) {
  const product = await Product.findById(id);
  if (operation === "add") {
    product.stock = product.stock + quantity;
  } else {
    product.stock = product.stock - quantity;
  }
  await product.save({ validateBeforeSave: false });
}

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
