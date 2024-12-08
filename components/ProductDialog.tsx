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
import SelectCategory from "@/components/Categorieselect";
import { productService } from "@/services/product.service";
// import { Product } from "@/services/product.service";
import { Category } from "@/services/category.service";
import { AlertDialogComponent } from "./Alert";
import toast from "react-hot-toast";
import Image from "next/image";

export function DialogDemo() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  // const [loading, setLoading] = useState(false);
  const [isalertOpen, setIsAlertOpen] = useState(false);
  // const [error, setError] = useState("");

  const handleSubmit = async () => {
    console.log(productName, category, price, quantity, description);
    if (!productName || !category || !price || !quantity || !description) {
      // setError("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }

    // const formData: Product = {
    //   productName: productName,
    //   category: category,
    //   productPrice: price,
    //   productQuantity: quantity,
    //   productDescription: description,
    // };
    // images.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image);
    // });

    // setLoading(true);
    try {
      const response = await productService.createProduct({
        productName,
        category,
        productPrice: price,
        productQuantity: quantity,
        productDescription: description,
      });

      alert("Product added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setProductName("");
      setCategory(null);
      setPrice(0);
      setQuantity(0);
      setDescription("");
      setImages([]);
      // setLoading(false);
    }
  };

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
          className="font-semibold mt-1 bg-gray-500 hover:bg-gray-600 hover:text-gray-200 text-white py-2 px-4 rounded focus:border-black"
        >
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">Add New Product</DialogTitle>
          <DialogDescription>
            Enter the product details below and click save to add the product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Product Details Inputs */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              onChange={(e) => setProductName(e.target.value)}
              id="name"
              placeholder="Enter product name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <SelectCategory
              selectedCategory={category}
              setSelectedCategory={setCategory}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              onChange={(e) => setPrice(Number(e.target.value))}
              id="price"
              placeholder="Enter price"
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              onChange={(e) => setQuantity(Number(e.target.value))}
              id="quantity"
              placeholder="Enter quantity"
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Enter product description"
              className="col-span-3"
            />
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 items-center gap-4">
            <div className="flex gap-4 overflow-x-auto">
              {/* Image Previews */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <Image
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
              <label className="flex items-center justify-center w-24 h-24 border-2  border-dashed border-gray-400 rounded cursor-pointer">
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
          <AlertDialogComponent open={isalertOpen} setOpen={setIsAlertOpen} handleOk={handleSubmit} />
          <Button onClick={handleSubmit}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
