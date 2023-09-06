import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import {
  restaurantDetailsReducer,
  addRestaurantReducer,
  restaurantsReducer,
  restaurantReducer,
} from "./reducers/restaurantReducer";

import { cartReducer } from "./reducers/cartReducer";

// Import persistStore and persistReducer from redux-persist
import { persistStore, persistReducer } from "redux-persist";
// Import storage from redux-persist/lib/storage to use local storage as the default storage engine
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  product: productReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  restaurants: restaurantsReducer,
  restaurant: restaurantDetailsReducer,
  addRestaurant: addRestaurantReducer,
  restaurantOperations: restaurantReducer,
});

// Create a persistConfig object with a key of 'root' and the storage engine set to local storage
const persistConfig = {
  key: "root",
  storage,
};

// Create a persistedReducer by calling persistReducer with the persistConfig and the root reducer
const persistedReducer = persistReducer(persistConfig, reducer);

let initialState = {};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Create a persistor by calling persistStore with the store
export const persistor = persistStore(store);
