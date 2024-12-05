import axiosInstance from "./axiosInstance";
import { Product } from "./product.service";
import { User } from "./user.service";

export interface CartItem{
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
        console.log(response.data);
        return response.data;
    },
    addToCart: async (productId: number, quantity: number) => {
        const response = await axiosInstance.post("/cart", {
            productId,
            quantity,
        });
        return response.data;
    },
    updateCartItem: async (cartItemId: number, quantity: number) => {
        const response = await axiosInstance.put(`/cart/${cartItemId}`, {
            quantity,
        });
        return response.data;
    },
    removeCartItem: async (cartItemId: number) => {
        const response = await axiosInstance.delete(`/cart/${cartItemId}`);
        return response.data;
    },
    checkout: async () => {
        const response = await axiosInstance.post("/cart/checkout");
        return response.data;
    },
    increaseCartItem: async (productId: number) => {
        const response = await axiosInstance.put(`cartItems/increse?productId=${productId}`);
        return response.data; 
      }
};