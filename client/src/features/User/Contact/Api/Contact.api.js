import axiosInstance from "../../../../shared/services/axiosInstance";

export const sendContactMessage = async (contactData) => {
 try {
     const response = await axiosInstance.post("/contact", contactData);
  return response.data;
 } catch (error) {
    console.error(`error sendContactMessage.api ${error}`)
 }
};