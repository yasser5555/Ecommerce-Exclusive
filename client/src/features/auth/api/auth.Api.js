import axiosInstance from "../../../shared/services/axiosInstance";
export const registerRequest = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

 
export const loginRequest = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};


export const forgotPasswordRequest = async (
  email
) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

export const resetPasswordRequest = async (
  token,
  password
) => {
  const response = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    { password }
  );

  return response.data;
};