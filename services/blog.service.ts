import axiosInstance from "./axiosInstance";

export interface Blog {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt?: string;
}

export const blogService = {
  createBlog: async (blog: Blog) => {
    const response = await axiosInstance.post("/blogs", blog);
    return response.data;
  },
  getAllBlogs: async () => {
    const response = await axiosInstance.get("/blogs");
    return response.data;
  },
  updateBlog: async (blog: Blog) => {
    const response = await axiosInstance.put(`/blogs/${blog.id}`, blog);
    return response.data;
  },
  deleteBlog: async (id: number) => {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response.data;
  },

  getBlogById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};
