import apiService from "../apiService";

export const registerUserApi = async (userData, alert) => {
  try {
    const data = await apiService.post("/register", userData);
    alert.success("Welcome To Dinner Dash");
    return data;
  } catch (error) {
    alert.error(error.message);
  }
};

export const loginUserApi = async (email, password, alert) => {
  try {
    const data = await apiService.post(`/login`, { email, password });
    alert.success("Welcome To Dinner Dash");
    return data;
  } catch (error) {
    alert.error(error.message);
  }
};

export const loadUserApi = async (alert) => {
  try {
    const data = await apiService.get(`/me`);
    return data;
  } catch (error) {
    alert.error(error.message);
  }
};

export const logoutUserApi = async (alert) => {
  try {
    const data = await apiService.get(`/logout`);
    alert.success("Successfully Logged Out");
    return data;
  } catch (error) {
    alert.error(error.message);
  }
};

export const updateProfileApi = async (userData, alert) => {
  try {
    const { data } = await apiService.put(`/me/update`, userData);
    alert.success("Profile Updated Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const updatePasswordApi = async (passwords, alert) => {
  try {
    const { data } = await apiService.put(`/password/update`, passwords);
    alert.success("Password Updated Successfully");
    return { data };
  } catch (error) {
    alert.error("User Not Found");
  }
};

export const forgotPasswordApi = async (email, alert) => {
  try {
    console.log(email);
    const { data } = await apiService.post(`/password/forgot`, email);
    alert.info(`Please Check Your Email`);
    return { data };
  } catch (error) {
    console.log(error.message);
    alert.error(error);
  }
};

export const resetPasswordApi = async (token, passwords, alert) => {
  try {
    const { data } = await apiService.put(
      `/password/reset/${token}`,
      passwords
    );
    alert.success("Password Reset Successfully");
    return { data };
  } catch (error) {
    alert.error(error);
  }
};

export const getAllUsersApi = async (alert) => {
  try {
    const { data } = await apiService.get(`/admin/users?role=admin`);
    return { data };
  } catch (error) {
    alert.error(error);
  }
};

export const getUserDetailsApi = async (id, alert) => {
  try {
    const { data } = await apiService.get(`/admin/user/${id}?role=admin`);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const updateUserApi = async (id, userData, alert) => {
  try {
    const { data } = await apiService.put(
      `/admin/user/${id}?role=admin`,
      userData
    );
    if (data.success) {
      alert.success("User Updated Successfully");
    }
    return { data };
  } catch (error) {
    console.log(error.message);
    alert.error(error);
  }
};

export const deleteUserApi = async (id, alert) => {
  try {
    const { data } = await apiService.delete(`/admin/user/${id}?role=admin`);
    alert.success("User Deleted Successfully");
    return { data };
  } catch (error) {
    alert.error(error);
  }
};
