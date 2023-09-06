import {
  addItemsToCartApi,
  getAllCartItemsApi,
  removeItemsFromCartApi,
  deleteCartApi,
} from "../../api/cart/cartApi";
import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  ADD_CART_ITEM_REQUEST,
  ADD_CART_ITEM_FAIL,
  ADD_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
} from "../constants/cartConstants";
import axios from "axios";

import { BASE_URL } from "../../api/baseUrl";

export const getCart = (alert) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await getAllCartItemsApi(alert);

    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addItemsToCart = (id, quantity, alert) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CART_ITEM_REQUEST });

    const { data } = await addItemsToCartApi(id, quantity, alert);

    dispatch({
      type: ADD_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const removeItemsFromCart = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_ITEM_REQUEST });

    const { data } = await removeItemsFromCartApi(id, alert);

    dispatch({
      type: DELETE_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCart = (alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_REQUEST });

    const { data } = await deleteCartApi(alert);

    dispatch({
      type: DELETE_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add to Cart
export const addItemsToTempCart =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/product/${id}`);

    dispatch({
      type: ADD_CART_ITEM_SUCCESS,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images.url,
        stock: data.product.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE FROM CART
export const removeItemsFromTempCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_CART_ITEM_SUCCESS,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
