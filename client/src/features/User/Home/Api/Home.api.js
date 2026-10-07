import axiosInstance from "../../../../shared/services/axiosInstance";

const pendingRandomDataRequests = new Map();

export const getRandomDataApi = async (limit) => {
  const pendingRequest = pendingRandomDataRequests.get(limit);
  if (pendingRequest) {
    return pendingRequest;
  }

  const request = axiosInstance
    .get("home/random", {
      params: {
        limit,
      },
    })
    .then((response) => response.data)
    .finally(() => pendingRandomDataRequests.delete(limit));

  pendingRandomDataRequests.set(limit, request);

  try {
    return await request;
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
