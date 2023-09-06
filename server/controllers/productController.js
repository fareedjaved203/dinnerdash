const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const Restaurant = require("../models/restaurantModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create product --admin
const createProduct = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, price, description, category, stock, restaurant, display } =
      req.body;
    const tempRestaurant = restaurant.split(",");
    const tempCategory = category.split(",");
    const findRestaurant = await Restaurant.findOne({
      name: { $in: tempRestaurant },
    });
    if (findRestaurant) {
      const user = await Product.create({
        name,
        price,
        description,
        category: tempCategory,
        stock,
        images: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        restaurant: tempRestaurant,
        user: req.user.id,
        display,
      });
    }
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sort();

    let products = apiFeature.query;
    let filteredProductCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query;

    if (products) {
      res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product ID Not Found", 404));
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    console.log(req.body.display);

    const newProductData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category.split(","),
      restaurant: req.body.restaurant.split(","),
      stock: req.body.stock,
      user: req.user.id,
      display: req.body.display,
    };
    newProductData.images = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      newProductData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      updateProduct,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Internal Server Error", 500));
    }
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//create/update review
const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => {
      rev.user.toString() === req.user._id.toString();
    });
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          (rev.rating = rating), (rev.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ success: true, message: "Review Added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all reviews of a product
const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id).populate({
      path: "reviews.user",
      select: "name avatar",
    });

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID", 500));
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviewIndex = product.reviews.findIndex(
      (rev) => rev._id.toString() === req.query.id.toString()
    );
    console.log(reviewIndex);
    if (reviewIndex === -1) {
      return next(new ErrorHandler("Review Not Found", 404));
    }

    product.reviews.splice(reviewIndex, 1);

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += Number(rev.rating);
    });
    console.log(product);
    const ratings = avg / product.reviews?.length;
    const numOfReviews = product.reviews?.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews: product.reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 404));
  }
};

// Get All Product (Admin)
const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
};
