import axiosInstance from "./../../../../shared/services/axiosInstance";
export const getCategoryStatisAPI = async () => {
  try {
    const response = await axiosInstance.get("/Admin/get_category_Page");
    return response.data;
  } catch (error) {
    console.error(`error at Categoreis Api getCategoryStatisAPI ${error}`);
  }
};
export const Update_categoryAPI = async (newName, category_id) => {
  try {
    const response = await axiosInstance.patch("/Admin/Update_category", {
      newName,
      category_id,
    });
    return response.data;
  } catch (error) {
    console.error(`error at Categoreis Api Update_categoryAPI  ${error}`);
  }
};

export const create_categoryAPI = async (name) => {
  try {
    const response = await axiosInstance.post("/Admin/Create_category", {
      name,
    });
    return response.data;
  } catch (error) {
    console.error(`error at Categoreis Api create_categoryAPI ${error}`);
  }
};
export const delete_categoryAPI = async (category_id) => {
  try {
    const response = await axiosInstance.post("/Admin/Delete_category", {
      category_id,
    });
    return response.data;
  } catch (error) {
    console.error(`error at Categoreis Api delete_categoryAPI ${error}`);
  }
};
