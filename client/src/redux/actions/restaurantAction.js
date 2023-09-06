import {
  ALL_RESTAURANT_REQUEST,
  ALL_RESTAURANT_SUCCESS,
  ALL_RESTAURANT_FAIL,
  ADD_RESTAURANT_REQUEST,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAIL,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_FAIL,
  DELETE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAIL,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/restaurantConstants";

import {
  getAllRestaurantsApi,
  getRestaurantDetailsApi,
  addRestaurantApi,
  updateRestaurantApi,
  deleteRestaurantApi,
} from "../../api/restaurant/restaurantApi";

import axios from "axios";

export const getRestaurant =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RESTAURANT_REQUEST });
      let link = `http://localhost:8000/api/v1/restaurants?keyword=${keyword}&page=${currentPage}`;
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_RESTAURANT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_RESTAURANT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllRestaurants = (alert) => async (dispatch) => {
  try {
    dispatch({ type: ALL_RESTAURANT_REQUEST });

    const { data } = await getAllRestaurantsApi(alert);

    console.log(data);

    dispatch({
      type: ALL_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getRestaurantDetails = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: RESTAURANT_DETAILS_REQUEST });

    const { data } = await getRestaurantDetailsApi(id, alert);
    console.log(data);

    dispatch({
      type: RESTAURANT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESTAURANT_DETAILS_FAIL,
      payload: error.response?.data?.message,
    });
  }
};

export const addRestaurant = (restaurantData, alert) => async (dispatch) => {
  try {
    dispatch({ type: ADD_RESTAURANT_REQUEST });

    const { data } = await addRestaurantApi(restaurantData, alert);

    console.log(data);

    dispatch({
      type: ADD_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Restaurant
export const updateRestaurant =
  (id, RestaurantData, alert) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_RESTAURANT_REQUEST });

      const { data } = await updateRestaurantApi(id, RestaurantData, alert);

      dispatch({
        type: UPDATE_RESTAURANT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_RESTAURANT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Restaurant
export const deleteRestaurant = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    const { data } = await deleteRestaurantApi(id, alert);

    dispatch({
      type: DELETE_RESTAURANT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
