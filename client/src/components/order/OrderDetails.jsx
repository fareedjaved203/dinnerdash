import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import MetaData from "../layout/MetaData";

import { clearErrors, getOrderDetails } from "../../redux/actions/orderAction";

import "../../styles/order/orderDetails.css";
import LoadingScreen from "../layout/Loader/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id, alert));
    console.log(order);
  }, [dispatch, alert, error, id]);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order?._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order?.user && order?.user?.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order?.shippingInfo && order?.shippingInfo?.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order?.shippingInfo &&
                      `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}`}
                  </span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.orderStatus && order?.orderStatus === "Completed"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{order?.orderStatus && order?.orderStatus}</b>
                  </p>
                </div>
                {order?.orderStatus && order?.orderStatus === "Ordered" && (
                  <div>
                    <b>Created At:</b> {order.createdAt}
                  </div>
                )}
                {order?.orderStatus &&
                  (order?.orderStatus === "Completed" ||
                    order?.orderStatus === "Cancelled") && (
                    <>
                      <div style={{ color: "brown" }}>
                        <b style={{ color: "black" }}> Created At:</b>{" "}
                        {order.createdAt}
                      </div>
                      <div style={{ color: "blueviolet" }}>
                        <b style={{ color: "black" }}> Finished At:</b>{" "}
                        {order.finishedAt}
                      </div>
                    </>
                  )}
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems &&
                  order?.orderItems.map((item) => (
                    <div key={item._id}>
                      <img src={item.images} alt="Product" />
                      <Link to={`/product/${item._id}`}>{item.name}</Link>{" "}
                      <span>
                        {item.quantity} X Rs.{item.price} ={" "}
                        <b>Rs.{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
