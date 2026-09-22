import axiosInstance from "../../../shared/services/axiosInstance";
export const getRandomDataApi = async (limit) => {
  try {
    const response = await axiosInstance.get("home/random", {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`error at getRandomData at Home.api ${error}`);
  }
};

export const getBestSellingApi = async () => {
  try {
    const response = await axiosInstance.get("home/best-selling");
    return response.data;
  } catch (error) {
    throw new Error(`error at getBestSelling at Home.api ${error}`);
  }
};
export const getCategoriesApi = async () => {
  try {
    const response = await axiosInstance.get("/home/categories");
    return response.data;
  } catch (error) {
    throw new Error(`error at getBestSelling at Home.api ${error}`);
  }
};

