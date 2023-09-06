import apiService from "../apiService";

export const getAllCartItemsApi = async (alert) => {
  try {
    const { data } = await apiService.get(`/cart`);
    return { data };
  } catch (error) {
    alert.error("Can't Process Your Request");
  }
};

export const addItemsToCartApi = async (id, quantity, alert) => {
  try {
    const { data } = await apiService.post(`/cart/${id}`, { quantity });
    if (data) {
      // alert.success("Cart Updated");
    }
    return { data };
  } catch (error) {
    console.log(error.message);
    alert.error("Item Cannot Be Added From A Different Restaurant");
  }
};

export const removeItemsFromCartApi = async (id, alert) => {
  try {
    const { data } = await apiService.delete(`/cart/${id}`);
    console.log(data);
    // alert.success("Item Removed");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const deleteCartApi = async (alert) => {
  try {
    const { data } = await apiService.delete(`/cart`);
    alert.success("Cart Deleted Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const saveShippingInfoApi = async (userData, alert) => {
  try {
    const { data } = await apiService.post(`/shipping`, userData);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};
