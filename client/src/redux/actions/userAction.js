import {
  registerUserApi,
  loginUserApi,
  loadUserApi,
  logoutUserApi,
  updateProfileApi,
  updatePasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
  getAllUsersApi,
  getUserDetailsApi,
  updateUserApi,
  deleteUserApi,
} from "../../api/user/userApi";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";

export const login = (email, password, alert) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await loginUserApi(email, password, alert);

    document.cookie = `token=${data.token};max-age=31536000;path=/`;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData, alert) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await registerUserApi(userData, alert);

    document.cookie = `token=${data.token};max-age=31536000;path=/`;

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = (alert) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await loadUserApi(alert);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const logout = (alert) => async (dispatch) => {
  try {
    await logoutUserApi(alert);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("shippingInfo");
    localStorage.removeItem("cartItems");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData, alert) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await updateProfileApi(userData, alert);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data?.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data?.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords, alert) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await updatePasswordApi(passwords, alert);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email, alert) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await forgotPasswordApi(email, alert);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    alert.error("User Not Found");
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords, alert) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await resetPasswordApi(token, passwords, alert);

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users (Admin)
export const getAllUsers = (alert) => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await getAllUsersApi(alert);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details (Admin)
export const getUserDetails = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await getUserDetailsApi(id, alert);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User (Admin)
export const updateUser = (id, userData, alert) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await updateUserApi(id, userData, alert);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User (Admin)
export const deleteUser = (id, alert) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await deleteUserApi(id, alert);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
