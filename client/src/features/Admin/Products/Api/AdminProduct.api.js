import axiosInstance from "../../../../shared/services/axiosInstance";
export const getProductPageDataAPI = async () => {
  try {
    const response = await axiosInstance.get("/Admin/product_page/");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.getHomeData ${error}`);
  }
};
export const getProductAllAPI = async () => {
  try {
    const response = await axiosInstance.get("/Admin/all_product/");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.getHomeData ${error}`);
  }
};
export const SearchProductAPI = async (title) => {
  try {
    const response = await axiosInstance.post("/Admin/search_product/", {
      title: title,
    });
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.getHomeData ${error}`);
  }
};
