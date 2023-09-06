const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const {
  viewRestaurant,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/restaurants", getAllRestaurants);
router.get("/restaurant/:id", viewRestaurant);
router.delete(
  "/restaurant/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteRestaurant
);
router.post(
  "/restaurant/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createRestaurant
);
router.put(
  "/restaurant/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateRestaurant
);

module.exports = router;
