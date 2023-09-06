const ErrorHandler = require("../utils/errorHandler");
const Restaurant = require("../models/restaurantModel");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");

const createRestaurant = async (req, res, next) => {
  try {
    console.log(req.body.name);
    const restaurantPresent = await Restaurant.findOne({ name: req.body.name });
    if (restaurantPresent?.name === req.body?.name) {
      return next(
        new ErrorHandler("Restaurant Name And Location Must be Unique", 409)
      );
    }

    const restaurant = await Restaurant.create(req.body);
    res.status(201).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant not found", 404));
    }
    await Product.deleteMany({ restaurant: restaurant.name });

    res.status(200).json({
      success: true,
      message: "Restaurant deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant not found", 404));
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const viewRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(new ErrorHandler("Restaurant not found", 404));
    }

    const products = await Product.find({
      restaurant: { $in: [restaurant.name] },
    });

    res.status(200).json({
      success: true,
      restaurant,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const resultPerPage = 4;
    const restaurantsCount = await Restaurant.countDocuments();

    //for query in url inadvanced way from apiFeature.js
    const apiFeature = new ApiFeatures(Restaurant.find(), req.query)
      .search()
      .filter();

    let restaurants = apiFeature.query;
    let filteredRestaurantCount = restaurants.length;
    apiFeature.pagination(resultPerPage);
    restaurants = await apiFeature.query;

    if (restaurants) {
      res.status(200).json({
        success: true,
        restaurants,
        restaurantsCount,
        resultPerPage,
        filteredRestaurantCount,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//admin
const viewAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  viewRestaurant,
  viewAllRestaurants,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
};
