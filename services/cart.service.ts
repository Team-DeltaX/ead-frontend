import axiosInstance from "./axiosInstance";
import { Product } from "./product.service";
import { User } from "./user.service";

export interface CartItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  product: Product;
}

export interface Cart {
  id: number;
  totalAmount: number;
  items: CartItem[];
}

export const cartService = {

  getCartItems: async () => {
    const response = await axiosInstance.get("/carts/users");  
    return response.data;
  },

  
  updateItemQuantity: async (cartId: number, itemId: number, quantity: number) => {
    const response = await axiosInstance.put(`cartItems/carts/${cartId}/items/${itemId}?quantity=${quantity}`);
    return response.data; 
  },

  removeCartItem: async (cartId: number, itemId: number) => {
    const response = await axiosInstance.delete(`cartItems/carts/${cartId}/items/${itemId}`);
    return response.data;
  },
};
