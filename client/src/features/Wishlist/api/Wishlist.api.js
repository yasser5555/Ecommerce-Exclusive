import axiosInstance from "../../../shared/services/axiosInstance";

const getWishlist = async () => {
  try {
    const response = await axiosInstance.get("/wishlist");

    return response.data;
  } catch (error) {
    console.log(
      "4. Wishlist API: error while fetching wishlist:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

const addToWishlist = async (product_id) => {
  try {
    const response = await axiosInstance.post(`/wishlist`, {
      product_id,
    });

    return response.data;
  } catch (error) {
    console.log(
      `4. Wishlist API: error while adding product ${product_id}:`,
      error.response?.data || error.message,
    );

    throw error;
  }
};

const removeFromWishlist = async (product_id) => {
  try {
    const response = await axiosInstance.delete(`/wishlist/${product_id}`);
    return response.data;
  } catch (error) {
    console.log(
      `4. Wishlist API: error while removing product ${product_id}:`,
      error.response?.data || error.message,
    );
    throw error;
  }
};

export { getWishlist, addToWishlist, removeFromWishlist };
