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
  SHIPPING_INFO_REQUEST,
  SHIPPING_INFO_SUCCESS,
  SHIPPING_INFO_FAIL,
  CLEAR_ERRORS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case GET_CART_REQUEST:
    case DELETE_CART_ITEM_REQUEST:
    case ADD_CART_ITEM_REQUEST:
    case SHIPPING_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
        shippingInfo: action.payload,
      };
    case ADD_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    case GET_CART_FAIL:
    case ADD_CART_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_CART_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingInfo: action.payload,
      };
    case SHIPPING_INFO_FAIL:
      return {
        ...state,
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
