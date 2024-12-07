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

export interface CreateOrder {
  totalAmount: number;
  shippingAddress: string;
  shippingMethod: string;
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
  addOrder: async (order: CreateOrder) => {
    const response = await axiosInstance.post("/orders", order);
    return response.data;
  },
  updateOrder: async (orderId: number, status: string) => {
    const response = await axiosInstance.put(`/orders/${orderId}`, {
      orderStatus: status,
    });
    return response.data;
  },
};
