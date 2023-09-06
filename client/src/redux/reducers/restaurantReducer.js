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
  DELETE_RESTAURANT_RESET,
  UPDATE_RESTAURANT_FAIL,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_RESET,
  UPDATE_RESTAURANT_SUCCESS,
  CLEAR_ERRORS,
  ADD_RESTAURANT_RESET,
} from "../constants/restaurantConstants";

export const restaurantsReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case ALL_RESTAURANT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_RESTAURANT_SUCCESS:
      return {
        loading: false,
        restaurants: action.payload,
      };
    case ALL_RESTAURANT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const restaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_RESTAURANT_FAIL:
    case UPDATE_RESTAURANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_RESTAURANT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_RESTAURANT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const restaurantDetailsReducer = (
  state = { restaurant: {} },
  action
) => {
  switch (action.type) {
    case RESTAURANT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case RESTAURANT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        restaurant: action.payload,
      };
    case RESTAURANT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addRestaurantReducer = (state = { restaurant: {} }, action) => {
  switch (action.type) {
    case ADD_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_RESTAURANT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        restaurant: action.payload,
      };
    case ADD_RESTAURANT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_RESTAURANT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
