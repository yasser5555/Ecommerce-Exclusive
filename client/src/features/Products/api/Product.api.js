import React from "react";
import axiosInstance from "../../../shared/services/axiosInstance";
export const getAllProduct = async ({ page, limit }) => {
  try {
    const response = await axiosInstance.get("/products", {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductByID = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/products/product/${product_id}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (title ) => {
  console.log("TITLE SENT TO API:", title);

  try {
    const response = await axiosInstance.get("/products/search", {
      params: {
        title
      },
    });
    console.log("API RESPONSE:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
