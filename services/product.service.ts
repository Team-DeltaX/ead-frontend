import axiosInstance from "./axiosInstance";
import { Category } from "./category.service";
import { ImageInterface } from "./image.service";


export interface Images{
  imageId:number,
  imageName:string,
  imageUrl:string,
}
export interface Product {
  id?: number;
  productName: string;
  category: Category;
  productPrice: number;
  inventory: number;
  productDescription: string;
  productBrand: string;
  images?: ImageInterface[];
  createdAt?: string;
}

export interface ProductResponse {
  message: string;
  data: ProductPagination;
  success: boolean;
}

export interface ProductPagination {
  count: number;
  limit: number;
  offset: number;
  orderBy: string;
  sortBy: string;
  products: Product[];
}



export const productService = {
  createProduct: async (product: Product) => {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  },
  // getAllProducts: async () => {
  //   const response = await axiosInstance.get("/products");
  //   return response.data;
  // },
  getAllProducts: async (
    order: string = "asc",
    limit: number = 100,
    offset: number = 0,
    sortBy: string = "id"
  ) => {
    const response = await axiosInstance.get(
      `/products?order=${order}&limit=${limit}&offset=${offset}&sortBy=${sortBy}`
    );
    return response.data as ProductResponse;
  },
  updateProduct: async (product: Product) => {
    const response = await axiosInstance.put(
      `/products/${product.id}`,
      product
    );
    return response.data;
  },
  getProductById: async (id: number) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  getProductsByBrand: async (productBrand: string) => {
    const response = await axiosInstance.get(`/products/brand/${productBrand}`);
    return response.data;
  },

  getProductByCategoryName: async (category: string) => {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data;
  },
};
