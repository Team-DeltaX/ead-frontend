import axiosInstance from "./axiosInstance";

export interface Image {
  id: number;
  url: string;
}

export const imageService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/images/upload", formData);
    return response.data;
  },
  getImageById: async (id: number) => {
    const response = await axiosInstance.get(`/images/${id}`);
    return response.data;
  },
};
