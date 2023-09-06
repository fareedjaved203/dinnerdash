import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import {
  ArcElement,
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

import MetaData from "../layout/MetaData.jsx";
import Sidebar from "./Sidebar";

import { getAdminProduct } from "../../redux/actions/productAction.js";
import { getAllOrders } from "../../redux/actions/orderAction.js";
import { getAllUsers } from "../../redux/actions/userAction.js";
import { getAllRestaurants } from "../../redux/actions/restaurantAction.js";

import "../../styles/admin/dashboard.css";
import { initialCalculations } from "../../helpers/admin/dashboard/initialCalculations.js";

Chart.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [totalAmount, setTotalAmount] = useState(0);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const { restaurants } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getAdminProduct(alert));
    dispatch(getAllOrders(alert));
    dispatch(getAllUsers(alert));
    dispatch(getAllRestaurants(alert));
  }, [dispatch]);

  useEffect(() => {
    setTotalAmount(initialCalculations(orders));
  }, [orders]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs.{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders?.order?.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
            <Link to="/admin/restaurants">
              <p>Restaurants</p>
              <p>{restaurants && restaurants?.restaurants?.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
