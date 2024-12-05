import axiosInstance from "./axiosInstance";

export interface AddImage {
  productId: number;
  images: File[];
}

export interface ImageInterface {
  imageId: number;
  imageName: string;
  imageUrl: string;
}

export const imageService = {
  addImage: async (image: AddImage) => {
    const formData = new FormData();
    formData.append("productId", String(image.productId));
    image.images.forEach((file) => formData.append("files", file));

    const response = await axiosInstance.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  removeImage: async (imageId: number) => {
    const response = await axiosInstance.delete(`/images/${imageId}`);
    return response.data;
  },
};