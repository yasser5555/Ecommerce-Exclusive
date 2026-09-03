import axiosInstance from "../../../shared/services/axiosInstance";

export const getProfileRequest = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updateProfileRequest = async (payload) => {
  try {
    const response = await axiosInstance.put("/profile", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updataAvatarRequest = async (formData) => {
  try {
    const response = await axiosInstance.put(
      "/profile/updateAvatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const uploadAvatarRequest = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/profile/uploadAvatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetProfileData = async (data) => {
  try {
    const response = await axiosInstance.get("/profile/profileData", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserCards = async (data) => {
  try {
    const response = await axiosInstance.get("/profile/user_cards", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUserCards = async (data) => {
  try {
    const response = await axiosInstance.post("/profile/add_user_card", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUserCards = async (data) => {
  try {
    const response = await axiosInstance.delete("/profile/del_card", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const GetUserAddress = async (data) => {
  try {
    const response = await axiosInstance.get("/profile/user_address", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUserAddress = async (data) => {
  try {
    const response = await axiosInstance.post("/profile/add_address", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const GetUserOrders = async (data) => {
  try {
    const response = await axiosInstance.get("/profile/get_user_orders", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
