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

export const getProductByID = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/product/${id}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (title) => {
  try {
    const response = await axiosInstance.get("/products/search", {
      params: {
        title,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

export const GetCatogeries = async () => {
  try {
    const response = await axiosInstance.get("/products/catogeries");

    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
