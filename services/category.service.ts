import axiosInstance from "./axiosInstance";

export interface Category {
  id?: number;
  name: string;
}

export const categoryService = {
    createCategory: async (category: Category) => {
        try {
        const response = await axiosInstance.post("/categories/add", category);
        return response.data;
        } catch (error: any) {
        throw new Error(error.response.data.message);
        }
    },
    getAllCategories: async () => {
        try {
        const response = await axiosInstance.get("/categories/all");
        return response.data;
        } catch (error: any) {
        throw new Error(error.response.data.message);
        }
    },
    };