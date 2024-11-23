import axiosInstance from "./axiosInstance";
import { Category } from "./category.service";

export interface Image {
  id: number;
  url: string;
}

export interface Product {
  id?: number;
  productName: string;
  category: Category;
  brand?:string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  images?: Image[];
}

export const productService = {
  createProduct: async (product: Product) => {
    try {
      const response = await axiosInstance.post("/products/add", product);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get("/products/all");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  updateProduct: async (product: Product) => {
    try {
      const response = await axiosInstance.put(
        `/products/${product.id}`,
        product
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};


