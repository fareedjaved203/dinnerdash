import apiService from "../apiService";

export const getAdminProductApi = async (alert) => {
  try {
    const { data } = await apiService.get(`/admin/products?role=admin`);
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const createProductApi = async (productData, alert) => {
  try {
    const { data } = await apiService.post(
      `/admin/product/new?role=admin`,
      productData
    );
    alert.success("Product Added Successfully");
    return { data };
  } catch (error) {
    console.log(error.message);
    alert.error("Validation Error");
  }
};

export const updateProductApi = async (id, productData, alert) => {
  try {
    const { data } = await apiService.put(
      `/admin/product/${id}?role=admin`,
      productData
    );
    alert.success("Product Updated Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const deleteProductApi = async (id, alert) => {
  try {
    const { data } = await apiService.delete(`/admin/product/${id}?role=admin`);
    alert.success("Product Deleted Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const getProductDetailsApi = async (id, alert, navigate) => {
  try {
    const { data } = await apiService.get(`/product/${id}`);

    return { data };
  } catch (error) {
    alert.error("Product Not Found");
    navigate("/");
  }
};

export const newReviewApi = async (reviewData, alert) => {
  try {
    const { data } = await apiService.put(`/review`, reviewData);
    alert.success("Review Added Successfully");
    return { data };
  } catch (error) {
    alert.error("You Can Give Review Only Once!");
  }
};

export const getAllReviewsApi = async (id, alert) => {
  try {
    const { data } = await apiService.get(`/reviews?id=${id}`);

    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};

export const deleteReviewsApi = async (reviewId, productId, alert) => {
  try {
    const { data } = await apiService.delete(
      `/reviews?id=${reviewId}&productId=${productId}`
    );
    alert.success("Review Deleted Successfully");
    return { data };
  } catch (error) {
    alert.error(error.message);
  }
};
