import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import {
  createOrder,
  clearErrors,
  myOrders,
} from "../../redux/actions/orderAction";

import "../../styles/cart/ConfirmOrder.css";

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [shippingInfo, setShippingInfo] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders(alert));
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (!orders?.order[0]) {
      const shippingData = JSON.parse(localStorage.getItem("shippingInfo"));
      console.log(shippingData);
      setAddress(shippingData?.address);
      setCity(shippingData?.city);
      setPhoneNo(shippingData?.phoneNo);
      setShippingInfo(shippingData);
    } else {
      setAddress(orders?.order[0]?.shippingInfo?.address);
      setCity(orders?.order[0]?.shippingInfo?.city);
      setPhoneNo(orders?.order[0]?.shippingInfo?.phoneNo);
      setShippingInfo(orders?.order[0]?.shippingInfo);
    }
  }, [orders]);
  const subtotal = cartItems.cart[0]?.products.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = Math.round(subtotal * 0.18);

  const totalPrice = subtotal + tax + shippingCharges;

  const confirmOrder = () => {
    const order = {
      shippingInfo,
      orderItems: cartItems.cart[0]?.products.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        images: item.product.images.url,
        product: item.product._id,
      })),
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCharges,
      totalPrice: totalPrice,
    };
    console.log(shippingInfo);
    dispatch(createOrder(order, alert));

    navigate("/success", { replace: true });
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{`${address}, ${city}`}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.cart[0]?.products.map((item) => (
                  <div key={item.product._id}>
                    <img src={item.product.images.url} alt="Product" />
                    <Link to={`/product/${item.product._id}`}>
                      {item.product.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs.{item.product.price} ={" "}
                      <b>Rs.{item.product.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs. {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs. {shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs. {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs. {totalPrice}</span>
            </div>

            <button onClick={confirmOrder}>Confirm Order</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
