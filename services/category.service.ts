import axiosInstance from "./axiosInstance";

export interface Category {
  id?: number;
  name: string;
}

export const categoryService = {
  createCategory: async (category: Category) => {
    const response = await axiosInstance.post("/categories/add", category);
    return response.data;
  },
  getAllCategories: async () => {
    const response = await axiosInstance.get("/categories/all");
    return response.data;
  },
};
