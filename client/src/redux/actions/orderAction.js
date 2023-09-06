import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import {
  createOrderApi,
  deleteOrderApi,
  getAllOrdersApi,
  getOrderDetailsApi,
  myOrdersApi,
  updateOrderApi,
} from "../../api/order/orderApi";

// Create Order
export const createOrder = (order, alert) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await createOrderApi(order, alert);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = (alert) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await myOrdersApi(alert);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = (alert) => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await getAllOrdersApi(alert);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order, alert) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const { data } = await updateOrderApi(id, order, alert);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await deleteOrderApi(id, alert);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await getOrderDetailsApi(id, alert);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
