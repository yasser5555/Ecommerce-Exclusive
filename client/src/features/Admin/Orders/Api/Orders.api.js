import axiosInstance from "./../../../../shared/services/axiosInstance";

export const getOrderPageAPI = async () => {
  try {
    const response = await axiosInstance.get("Admin/get_order_Page");
    return response.data;
  } catch (error) {
    console.error(`error at order-Api ${error}`);
    throw error;
  }
};

export const getOrderDetailsAPI = async (orderId) => {
  try {
    const response = await axiosInstance.get(`Admin/get_order_details/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`error at order-details-Api ${error}`);
    throw error;
  }
};
