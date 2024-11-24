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

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  console.log("token", token);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Simply return the response if no issues
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response); // Log the Axios error response

      // Return a user-friendly error message
      return Promise.reject(
        new Error(
          error.response?.data?.message || "An unexpected error occurred"
        )
      );
    }

    console.error("Network error:", error); // Log network-related errors
    return Promise.reject(new Error("A network error occurred"));
  }
);

export default axiosInstance;
