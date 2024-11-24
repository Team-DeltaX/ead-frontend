import axiosInstance from "./axiosInstance";

export interface User {
  id?: number;
  firstname: string;
  email: string;
  password: string;
}

export const userService = {

  getUserById : async () => {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  }

}