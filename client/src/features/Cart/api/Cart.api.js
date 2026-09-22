import axiosInstance from "../../../shared/services/axiosInstance";
 

export const addToCart = async (data) => {
  try {
    const response = await axiosInstance.post("/cart/add_to_cart", data);

    return response.data;
  } catch (error) {
    console.log(`error at Cart.api addToCart: ${error}`);

    throw new Error(
      error.response?.data?.message || "Failed to add product to cart",
    );
  }
};

export const getCart = async (user_id) => {
  try {
    const response = await axiosInstance.get("/cart/", {
      data: {
        user_id,
      },
    });

    return response.data;
  } catch (error) {
    console.log(`error at Cart.api getCart: ${error}`);

    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};

export const updateCartItem = async (data) => {
  try {
    const response = await axiosInstance.patch("/cart/modify_cart", data);

    return response.data;
  } catch (error) {
    console.log(`error at Cart.api updateCartItem: ${error}`);

    throw new Error(
      error.response?.data?.message || "Failed to update cart quantity",
    );
  }
};

export const deleteCartItem = async (data) => {
  try {
    const response = await axiosInstance.delete("/cart/delete_item", {
      data,
    });

    return response.data;
  } catch (error) {
    console.log(`error at Cart.api deleteCartItem: ${error}`);

    throw new Error(
      error.response?.data?.message || "Failed to delete cart item",
    );
  }
};

export const clearCart = async (user_id) => {
  try {
    const response = await axiosInstance.delete("/cart/clear_cart", {
      data: {
        user_id,
      },
    });

    return response.data;
  } catch (error) {
    console.log(`error at Cart.api clearCart: ${error}`);

    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
};
