import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, Typography } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../redux/actions/orderAction";

import { UPDATE_ORDER_RESET } from "../../redux/constants/orderConstants";

import "../../styles/admin/processOrder.css";
import LoadingScreen from "../layout/Loader/Loader";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm, alert));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id, alert));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <LoadingScreen />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order?.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
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
                          order.orderStatus && order.orderStatus === "Completed"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        <b>{order?.orderStatus && order?.orderStatus}</b>
                        <p style={{ color: "brown" }}>
                          <b style={{ color: "black" }}>Created At:</b>{" "}
                          {order?.createdAt}
                        </p>
                        <p style={{ color: "blueviolet" }}>
                          <b style={{ color: "black" }}>Completed At:</b>{" "}
                          {order?.finishedAt}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order?.orderItems &&
                      order?.orderItems?.map((item) => (
                        <div key={item?.product}>
                          <img src={item.images} alt="Product" />
                          <Link to={`/product/${item?.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item?.quantity} X Rs.{item?.price} ={" "}
                            <b>Rs.{item?.price * item?.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display:
                    order?.orderStatus === "Completed" ||
                    order?.orderStatus === "Cancelled"
                      ? "none"
                      : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order?.orderStatus === "Ordered" && (
                        <option value="Paid">Paid</option>
                      )}
                      {order?.orderStatus === "Paid" && (
                        <>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    // disabled={
                    //   loading ? true : false || status === "" ? true : false
                    // }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
