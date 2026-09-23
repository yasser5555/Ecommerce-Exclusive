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
export const getLowStockApi = async () => {
  try {
    const response = await axiosInstance.get("/Admin/low_stock/");

    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.getLowStockApi ${error}`);
  }
};

export const getOutOfStockApi = async () => {
  try {
    const response = await axiosInstance.get("/Admin/out_of_stock/");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.getOutOfStockApi ${error}`);
  }
};

export const deleteProductApi = async (product_id) => {
  try {
    const response = await axiosInstance.post("/Admin/delete_product/", {
      product_id,
    });
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.deleteProductApi ${error}`);
  }
};
export const update_ProductApi = async (column, New_value, product_id) => {
  try {
    const response = await axiosInstance.patch("/Admin/", {
      column,
      New_value,
      product_id,
    });
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.update_ProductApi ${error}`);
  }
};

export const getCatogeriesAPI = async () => {
  try {
    const response = await axiosInstance.get("/Admin/get_catogeries/");
    return response.data;
  } catch (error) {
    console.error(`error at Admin.api.getHomeData ${error}`);
  }
};

export const createProductApi = async (
  category_id,
  title,
  description,
  old_price,
  stock,
  product_image,
) => {
  try {
    const formData = new FormData();

    formData.append("category_id", category_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("old_price", old_price);
    formData.append("stock", stock);
    formData.append("product_image", product_image);

    const response = await axiosInstance.post(
      "/Admin/create_product",
      formData,
    );

    console.log("API Response:", response.data);

    return response.data;
  } catch (error) {
    console.log(`error at Admin.api.createProductApi`, error);

    throw error;
  }
};
