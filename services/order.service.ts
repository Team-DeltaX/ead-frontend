import axiosInstance from "./axiosInstance";

export interface Order {
  id: number;
  totalAmount: number;
  orderDate: Date;
  status: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Recipient {
  name: string;
  email: string;
  address: string;
}

export const orderService = {
  getAllOrders: async () => {
    const response = await axiosInstance.get("/orders");
    return response.data;
  },
};
