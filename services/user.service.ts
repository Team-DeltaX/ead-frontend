import axiosInstance from "./axiosInstance";
import { Order } from "./order.service";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  orders: Order[];
  role: string;
}

export const userService = {

  getUserById : async () => {
    const response = await axiosInstance.get(`/users`);
    return response.data
  }

}