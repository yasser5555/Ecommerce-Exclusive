import React from "react";
import { useEffect } from "react";
import axiosInstance from "../../../shared/services/axiosInstance";

export const getAllProduct = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error(`Error::${error}`);
  }
};
export const getProductByID = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/products/${product_id}`);

    console.log("AXIOS RESPONSE:", response);
    console.log("AXIOS DATA:", );

    return response.data[0];
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);

    throw error;
  }
};
