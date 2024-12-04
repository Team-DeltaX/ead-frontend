import { getAuthToken } from "@/lib/encrypt";
import axios from "axios";
import toast from "react-hot-toast";

const BaseUrl = process.env.BASE_URL || "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error or no response received:", error.message);
      return Promise.reject(
        new Error("Network error. Please try again later.")
      );
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        toast.error(data?.message || "Invalid request.");
        break;
      case 401:
        toast.error(data?.message || "Authentication required.");
        setTimeout(() => {
          sessionStorage.clear(); // Clear session storage
          window.location.href = "/"; // Redirect to home
        }, 2000);
        break;
      case 403:
        toast.error(data?.message || "Access denied.");
        break;
      case 404:
        toast.error(data?.message || "The requested resource was not found.");
        break;
      case 500:
        toast.error(data?.message || "An error occurred on the server.");
        break;
      default:
        toast.error(data?.message || "An unexpected error occurred.");
    }

    return Promise.reject(
      new Error(data?.message || "An error occurred. Please try again.")
    );
  }
);

export default axiosInstance;
