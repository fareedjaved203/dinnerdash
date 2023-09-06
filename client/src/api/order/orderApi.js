import apiService from "../apiService";

export const updateOrderApi = async (id, order, alert) => {
  try {
    const { data } = await apiService.put(
      `/admin/order/${id}?role=admin`,
      order
    );
    alert.success("Order Updated Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const getAllOrdersApi = async (alert) => {
  try {
    const { data } = await apiService.get(`/admin/orders?role=admin`);

    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const myOrdersApi = async (alert) => {
  try {
    const { data } = await apiService.get(`/orders/me`);

    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const createOrderApi = async (order, alert) => {
  try {
    const { data } = await apiService.post(`/order/new`, order);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const deleteOrderApi = async (id, alert) => {
  try {
    const { data } = await apiService.delete(`/admin/order/${id}?role=admin`);
    alert.success("Order Deleted Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const getOrderDetailsApi = async (id, alert) => {
  try {
    const { data } = await apiService.get(`/order/${id}`);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};
