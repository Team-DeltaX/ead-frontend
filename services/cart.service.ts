import axiosInstance from "./axiosInstance";
import { Product } from "./product.service";

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
  // updateCartQuanity: async (productId: number, quantity: number) => {
  //     const response = await axiosInstance.post("/cart", {
  //         productId,
  //         quantity,
  //     });
  //     return response.data;
  // },
  // updateCartItem: async (cartItemId: number, quantity: number) => {
  //     const response = await axiosInstance.put(`/cart/${cartItemId}`, {
  //         quantity,
  //     });
  //     return response.data;
  // },
  // removeCartItem: async (cartItemId: number) => {
  //     const response = await axiosInstance.delete(`/cart/${cartItemId}`);
  //     return response.data;
  // },
  // checkout: async () => {
  //     const response = await axiosInstance.post("/cart/checkout");
  //     return response.data;
  // },
  addToCart: async (productId: number) => {
    const response = await axiosInstance.post(`cartItems`, null, {
      params: {
        productId,
      },
    });
    return response.data;
  },
  getCartItems: async () => {
    const response = await axiosInstance.get("/carts/users");
    return response.data;
  },

  updateItemQuantity: async (itemId: number, quantity: number) => {
    const response = await axiosInstance.put(`cartItems`, null, {
      params: {
        productId: itemId,
        quantity,
      },
    });
    return response.data;
  },

  removeCartItem: async (cartId: number, itemId: number) => {
    const response = await axiosInstance.delete(`cartItems`, {
      params: {
        cartId,
        itemId,
      },
    });
    return response.data;
  },
};
