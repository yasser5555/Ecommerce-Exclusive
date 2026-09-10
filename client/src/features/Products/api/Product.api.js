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
export const filterData = async ({ Catogery, rating, minprice, maxprice }) => {
  try {
    const response = await axiosInstance.get("/products/filterData", {
      params: {
        catogeries: Catogery,
        rating: rating,
        min: minprice,
        max: maxprice,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching filterData:", error);
    throw error;
  }
};

export const getProductReviewsRequest = async (productId) => {
  try {
    const url = `/reviews/product/${productId}`;

    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);
    throw error;
  }
};
export const createProductReviewRequest = async (
  productId,
  comment,
  rating,
) => {
  try {
    const response = await axiosInstance.post(`/reviews/product/${productId}`, {
      comment,
      rating,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating Review Request:", error);
    throw error;
  }
};
