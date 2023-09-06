import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { CheckCircle as CheckCircleIcon } from "@material-ui/icons";
import { useAlert } from "react-alert";

import { deleteCart } from "../../redux/actions/cartAction";

import "../../styles/cart/orderSuccess.css";

const OrderSuccess = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  // incomplete
  useEffect(() => {
    dispatch(deleteCart(alert));
  }, []);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon style={{ color: "green" }} />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
