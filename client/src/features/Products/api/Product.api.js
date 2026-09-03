import React from "react";
import { useEffect } from "react";
import axiosInstance from "../../../shared/services/axiosInstance";
// import { param } from "express-validator";

export const getAllProduct = async ({ page, limit }) => {
  try {
    const response = await axiosInstance.get("/products", {
      params: {
        page,
        limit,
      },
    });

    console.log("Products API:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductByID = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/products/${product_id}`);

    console.log("AXIOS RESPONSE:", response);
    console.log("AXIOS DATA:");

    return response.data[0];
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);

    throw error;
  }
};
