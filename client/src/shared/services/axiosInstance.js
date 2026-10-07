import axios from "axios";

export const serverBaseUrl = `${window.location.protocol}//${window.location.hostname}:5000`;

const axiosInstance = axios.create({
  baseURL: `${serverBaseUrl}/api`,
  withCredentials: true,
});

export default axiosInstance;
