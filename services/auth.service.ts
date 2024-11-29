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
  role?: string;
}

export const authService = {
  login: async (user: UserLogin) => {
    const response = await axiosInstance.post("/auth/login", user);
    return response.data;
  },
  register: async (user: UserRegister) => {
    const response = await axiosInstance.post("/auth/register", user);
    return response.data;
  },
  sentOtp: async (email: string) => {
    const response = await axiosInstance.post(`/auth/otp/${email}`);
    return response.data;
  },
  validateOtp: async (email: string, otp: string) => {
    const response = await axiosInstance.post(`/auth/otp/${email}`,{
      otp
    });
    return response.data;
  },
  changePassword: async (email: string, password: string) => {
    const response = await axiosInstance.put(`/auth/otp/${email}`,{
      password
    });
    return response.data;
  }
};
