import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";

import SelectCategory from "@/components/Categorieselect";
import BrandSelect from "@/components/Categorieselect";
import { Category } from "@/services/product.service";

export function UpdateProduct() {
  const [images, setImages] = useState<File[]>([]);

  // Handler to add selected images to the state
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  // Handler to remove an image from the list
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
            <FaEdit/>
            Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">Edit Product</DialogTitle>
          <DialogDescription>
          Update the product details below click save to update the product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Product Details Inputs */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Product Name</Label>
            <Input id="name" placeholder="Enter product name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <SelectCategory selectedCategory={null} setSelectedCategory={function (category: Category): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">Brand</Label>
            <BrandSelect />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" placeholder="Enter price" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">Quantity</Label>
            <Input id="quantity" placeholder="Enter quantity" type="number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input id="description" placeholder="Enter product description" className="col-span-3" />
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 items-center gap-4">
            <div className="flex gap-4 overflow-x-auto">
              {/* Image Previews */}
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black text-white p-1 rounded-full hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <FiTrash2 className="text-xs" />
                  </button>
                </div>
              ))}
              {/* Add Image Button */}
              <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <FiPlus className="text-xl text-gray-500" />
                  <span className="text-sm text-gray-500">Add image</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProduct;
