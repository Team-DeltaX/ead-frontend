import axiosInstance from "./axiosInstance";

export interface Blog {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
}

export const blogService = {
  createBlog: async (blog: Blog) => {
    try {
      const response = await axiosInstance.post("/blogs", blog);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  getAllBlogs: async () => {
    try {
      const response = await axiosInstance.get("/blogs");
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
  updateBlog: async (blog: Blog) => {
    try {
      const response = await axiosInstance.put(`/blogs/${blog.id}`, blog);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  },
  
  deleteBlog: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
