import apiService from "../apiService";

export const getAllRestaurantsApi = async (alert) => {
  try {
    const { data } = await apiService.get(`/restaurants`);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const getRestaurantDetailsApi = async (id, alert) => {
  try {
    const { data } = await apiService.get(`/restaurant/${id}`);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const addRestaurantApi = async (restaurantData, alert) => {
  try {
    const { data } = await apiService.post(
      `/restaurant/new?role=admin`,
      restaurantData
    );
    alert.success("Restaurant Added Successfully");
    return { data };
  } catch (error) {
    console.log(error.message);
    alert.error("restaurant Name And Location Must Be Unique");
  }
};

export const deleteRestaurantApi = async (id, alert) => {
  try {
    const { data } = await apiService.delete(`/restaurant/${id}?role=admin`);
    alert.success("Restaurant Deleted Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const updateRestaurantApi = async (id, restaurantData, alert) => {
  try {
    const { data } = await apiService.put(
      `/restaurant/${id}?role=admin`,
      restaurantData
    );
    alert.success("Restaurant Updated Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};
