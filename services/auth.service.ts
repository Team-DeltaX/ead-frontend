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
    const response = await axiosInstance.post("/auth/login", user);
    return response.data;
  },
  register: async (user: UserRegister) => {
    const response = await axiosInstance.post("/auth/register", user);
    return response.data;
  },
};
