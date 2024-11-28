import { getAuthToken } from "@/lib/encrypt";
import axios from "axios";

const BaseUrl = process.env.BASE_URL || "http://localhost:8080/api/v1";

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// add token to the header only in authenticated routes
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  console.log("Token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       // Redirect to login page
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
