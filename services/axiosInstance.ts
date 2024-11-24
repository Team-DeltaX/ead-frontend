import axios from "axios";

const BaseUrl = process.env.BASE_URL || "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(new Error("A network error occurred"));
  }
);

export default axiosInstance;
