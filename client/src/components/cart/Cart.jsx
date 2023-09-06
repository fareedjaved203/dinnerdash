import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { RemoveShoppingCart as RemoveShoppingCartIcon } from "@material-ui/icons";

import CartItemCard from "./CartItemCard";

import { addItemsToCart, getCart } from "../../redux/actions/cartAction";

import "../../styles/cart/Cart.css";
import LoadingScreen from "../layout/Loader/Loader";
import {
  addItemsToCartApi,
  deleteCartApi,
  getAllCartItemsApi,
  removeItemsFromCartApi,
} from "../../api/cart/cartApi";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [cartData, setCartData] = useState([]);

  const alert = useAlert();

  useEffect(() => {
    dispatch(getCart(alert));
    getData();
  }, []);

  const getData = async () => {
    const { data } = await getAllCartItemsApi(alert);
    setCartData(data?.cart[0]?.products);
  };

  const increaseQuantity = async (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    const index = cartData.findIndex((item) => item.product._id === id);
    if (index !== -1) {
      const newCartData = [...cartData];
      newCartData[index].quantity += 1;
      setCartData(newCartData);
    }
    await addItemsToCartApi(id, newQty, alert);
  };

  const deleteCartItems = async (id) => {
    const data = cartData.filter((item) => item.product._id !== id);
    setCartData(data);
    await removeItemsFromCartApi(id, alert);
    // dispatch(removeItemsFromCart(id, alert));
  };

  const decreaseQuantity = async (id, quantity) => {
    if (user) {
      const newQty = quantity - 1;
      if (1 >= quantity) {
        return;
      } else {
        const index = cartData.findIndex((item) => item.product._id === id);
        if (index !== -1) {
          const newCartData = [...cartData];
          newCartData[index].quantity -= 1;
          setCartData(newCartData);
        }
        await addItemsToCart(id, newQty, alert);
      }

      // dispatch(addItemsToCart(id, newQty, alert));
    }
  };

  const removeCart = async () => {
    if (user) {
      setCartData([]);
      await deleteCartApi(alert);
      // dispatch(deleteCart());
    }
  };

  const userVerification = () => {
    if (user?.role) {
      navigate("/shipping", { replace: true });
    } else {
      alert.info("Please Login To Continue");
      const currentUrl = window.location.pathname;
      localStorage.setItem("redirectUrl", currentUrl);
      navigate("/login");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {cartData?.length === undefined ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />

              <Typography>No Products in Your Cart</Typography>
              <Link to="/products">View Products</Link>
            </div>
          ) : (
            <>
              {/* {cartItems.cart[0]?.products?.length > 0 &&} */}
              <div className="cartPage">
                <div className="cartHeader">
                  <p>Product</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>

                {cartData &&
                  cartData?.map((item) => (
                    <div className="cartContainer" key={item?.product?._id}>
                      <CartItemCard
                        item={item}
                        deleteCartItems={deleteCartItems}
                      />
                      <div className="cartInput">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.product._id, item.quantity)
                          }
                        >
                          -
                        </button>
                        {item.quantity}
                        <input type="text" value={item.quantity} readOnly />
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product._id,
                              item.quantity,
                              item.product.stock
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="cartSubtotal">{`Rs.${
                        item.product?.price * item.quantity
                      }`}</p>
                    </div>
                  ))}

                {cartData?.length >= 1 ? (
                  <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                      <p>Gross Total</p>
                      <p>{`Rs.${cartData.reduce(
                        (acc, item) =>
                          acc + item?.quantity * item.product?.price,
                        0
                      )}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                      <button onClick={userVerification}>Check Out</button>
                    </div>
                    <div className="deleteBtn">
                      <button onClick={removeCart}>Delete Cart</button>
                    </div>
                  </div>
                ) : (
                  <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Products in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
