import axiosInstance from "./axiosInstance";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export const authService = {
  login: async (user: UserLogin) => {
    try {
      const response = await axiosInstance.post("/auth/login", user);
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response.data.message,
      };
    }
  },
  register: async (user: UserRegister) => {
    try {
      const response = await axiosInstance.post("/users", user);
      return {
        success: true,
        data: response.data,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        error: error.response.data.message,
      };
    }
  },
};
