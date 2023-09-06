import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Header from "./components/layout/Header/Header.jsx";
import ProductDetails from "./components/product/ProductDetails.jsx";
import Products from "./components/product/Products.jsx";
import LoginSignup from "./components/user/LoginSignup.jsx";
import Account from "./components/user/Account.jsx";
import UpdateProfile from "./components/user/UpdateProfile.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgotPassword from "./components/user/ForgotPassword.jsx";
import ResetPassword from "./components/user/ResetPassword.jsx";
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";
import { useSelector } from "react-redux";
import Dashboard from "./components/admin/Dashboard.jsx";
import NewProduct from "./components/admin/NewProduct.jsx";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import UsersList from "./components/admin/UsersList.jsx";
import RestaurantsList from "./components/admin/RestaurantsList.jsx";
import NewRestaurant from "./components/admin/NewRestaurant.jsx";
import UpdateRestaurant from "./components/admin/UpdateRestaurant.jsx";
import Cart from "./components/cart/Cart.jsx";
import AnonymousCart from "./components/cart/AnonymousCart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import MyOrder from "./components/order/MyOrder.jsx";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import OrderDetails from "./components/order/OrderDetails.jsx";
import OrderSuccess from "./components/cart/OrderSuccess.jsx";
import AdminProtectedRoute from "./components/route/AdminProtectedRoute.jsx";
import NotFound from "./components/error/NotFound.jsx";
import Restaurants from "./components/restaurant/Restaurants.jsx";
import RestaurantDetails from "./components/restaurant/RestaurantDetails.jsx";
import { Categories } from "./components/categories/Categories.jsx";

const ComponentRoutes = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:key" element={<Products />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute role={user?.role}>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute role={user?.role}>
              <ProductList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminProtectedRoute role={user?.role}>
              <Categories />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <AdminProtectedRoute role={user?.role}>
              <NewProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <AdminProtectedRoute role={user?.role}>
              <UpdateProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute role={user?.role}>
              <OrderList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <AdminProtectedRoute role={user?.role}>
              <ProcessOrder />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute role={user?.role}>
              <UsersList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <AdminProtectedRoute role={user?.role}>
              <UpdateUser />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <AdminProtectedRoute role={user?.role}>
              <ProductReviews />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/restaurants"
          element={
            <AdminProtectedRoute role={user?.role}>
              <RestaurantsList />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/restaurant"
          element={
            <AdminProtectedRoute role={user?.role}>
              <NewRestaurant />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/restaurant/:id"
          element={
            <AdminProtectedRoute role={user?.role}>
              <UpdateRestaurant />
            </AdminProtectedRoute>
          }
        />

        {user ? (
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            }
          />
        ) : (
          <Route path="/cart" element={<AnonymousCart />} />
        )}

        <Route
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="/restaurants" element={<Restaurants />} />

        <Route path="/restaurants/:key" element={<Restaurants />} />

        <Route path="/restaurant/:id" element={<RestaurantDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default ComponentRoutes;
