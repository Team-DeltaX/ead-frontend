import axiosInstance from "./axiosInstance";
import { User } from "./user.service";


export interface Order {
  id: number;
  totalAmount: number;
  user: User;
  orderDate?: string;
  status: string;
  shippingAddress: string;
  shippingMethod: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export const orderService = {
  getAllOrders: async () => {
    const response = await axiosInstance.get("/orders");
    return response.data;
  },
  getUserOrders: async () => {
    const response = await axiosInstance.get("/orders/user");
    return response.data;
  },
};
