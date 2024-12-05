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
}

export const productService = {
  createProduct: async (product: Product) => {
    const response = await axiosInstance.post("/products", product);
    return response.data;
  },
  getAllProducts: async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
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

  getProductsByBrand: async (productBrand: String) => {
    const response = await axiosInstance.get(`/products/brand/${productBrand}`);
    return response.data;
  },


  getProductByCategoryName: async(category: string) =>{
    const response = await axiosInstance.get(`/category/${category}`)
    return response.data;
  }


};
