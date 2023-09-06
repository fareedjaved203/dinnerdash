import "../../styles/cart/Cart.css";
import AnonymousCartItemCard from "./AnonymousCartItemCard";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useState, useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || {
      products: [],
    }
  );

  const updateCartItems = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {}, [cart]);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    const updatedCart = {
      products: cart.products.map((item) =>
        item.product === id ? { ...item, quantity: newQty } : item
      ),
    };
    updateCartItems(updatedCart);
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    const updatedCart = {
      products: cart.products.map((item) =>
        item.product === id ? { ...item, quantity: newQty } : item
      ),
    };
    updateCartItems(updatedCart);
  };

  const deleteCartItems = (id) => {
    const updatedCart = {
      products: cart.products.filter((item) => item.product !== id),
    };
    updateCartItems(updatedCart);
  };

  const checkoutHandler = () => {
    alert.info("Please Login To Continue");
    const currentUrl = window.location.pathname;
    localStorage.setItem("redirectUrl", currentUrl);
    navigate("/login");
  };

  return (
    <>
      {cart?.products?.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cart?.products?.map((item) => (
              <div className="cartContainer" key={item.product}>
                <AnonymousCartItemCard
                  item={item}
                  deleteCartItems={deleteCartItems}
                />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  {item?.quantity}
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">{`Rs.${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`Rs.${cart?.products?.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
