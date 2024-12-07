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
import { toast } from "react-hot-toast";
import SelectCategory from "@/components/Categorieselect";
import Image from "next/image";
import { Product } from "@/services/product.service";
import { productService } from "@/services/product.service";
import { Category } from "@/services/category.service";
import { AlertDialogComponent } from "./Alert";
import { ImageInterface, imageService } from "@/services/image.service";

export function UpdateProduct({
  product,
  fetchproduct,
}: {
  product: Product;
  fetchproduct: () => void;
}) {
  const [images, setImages] = useState<File[]>([]);
  const [existImages, setExistImages] = useState<ImageInterface[]>(
    product.images || []
  );
  const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);
  const [productName, setProductName] = useState(product.productName || "");
  const [category, setCategory] = useState<Category | null>(
    product.category || null
  );
  const [price, setPrice] = useState<number>(product.productPrice || 0);
  const [quantity, setQuantity] = useState<number>(product.inventory || 0);
  const [description, setDescription] = useState(
    product.productDescription || ""
  );
  const [brand, setBrand] = useState(product.productBrand || "");
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (
      !productName.trim() ||
      !category ||
      !price ||
      !quantity ||
      !description ||
      !brand
    ) {
      toast.error("Please fill all the fields");
      return false;
    }

    if (images.length === 0 && existImages.length === 0) {
      toast.error("Please add at least one image");
      return false;
    }
    if (images.length+existImages.length > 4) {
      toast.error("You can only add up to 4 images");
      return false;
    }
    

    setIsAlertOpen(true);
    return true;
  };
  const handleSubmit = async () => {
    if (!validateInput()) return;
    setLoading(true);
    try {
      await toast.promise(
        (async () => {
          if (!category) {
            throw new Error("Category is required");
          }
  
          const response = await productService.updateProduct({
            id: product.id,
            productName,
            category,
            productPrice: price,
            inventory: quantity,
            productBrand: brand,
            productDescription: description,
          });
  
          if (response.success) {
            if (images.length > 0) {
              await imageService.addImage({
                productId: response.data.id,
                images: images,
              });
            }
            if (removedImageIds.length > 0) {
              for (const id of removedImageIds) {
                await imageService.removeImage(id);
              }
            }
  
            fetchproduct();
            return "Product updated successfully!";
          } else {
            throw new Error("Failed to update product");
          }
        })(),
        {
          loading: "Updating product...",
          success: (message) => message,
          error: (error) =>
            error?.message || "Failed to update product. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      handleClose();
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    // setIsDialogOpen(false);
    setProductName(product.productName || "");
    setCategory(product.category || null);
    setBrand(product.productBrand || "");
    setPrice(product.productPrice || 0);
    setQuantity(product.inventory || 0);
    setDescription(product.productDescription || "");
    setImages([]);
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

  const removeExistImage = (id: number) => {
    setRemovedImageIds((prev) => [...prev, id]);
    setExistImages((prev) => prev.filter((image) => image.imageId !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          <FaEdit />
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
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              id="name"
              value={productName}
              placeholder="Enter product name"
              className="col-span-3"
              onChange={(e) => setProductName(e.target.value)}
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
            <Label htmlFor="name" className="text-right">
              Product Brand
            </Label>
            <Input
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              id="brand"
              placeholder="Enter brand name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={price}
              placeholder="Enter price"
              type="number"
              className="col-span-3"
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) >= 0) {
                  setPrice(Number(value));
                } else if (value === "") {
                  setPrice(0);
                }
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={quantity}
              placeholder="Enter quantity"
              type="number"
              className="col-span-3"
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) >= 0) {
                  setQuantity(Number(value));
                } else if (value === "") {
                  setQuantity(0);
                }
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              placeholder="Enter product description"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 items-center gap-4">
            <div className="flex gap-4 overflow-x-auto">
              {existImages &&
                existImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded overflow-hidden"
                  >
                    <Image
                      src={image.imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full"
                      width={400}
                      height={500}
                    />
                    <button
                      onClick={() => removeExistImage(image.imageId)}
                      className="absolute top-1 right-1 bg-black text-white p-1 rounded-full hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      <FiTrash2 className="text-xs" />
                    </button>
                  </div>
                ))}
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
                    width={400}
                    height={500}
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
              {(images.length + existImages.length < 4) && (<label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded cursor-pointer">
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
              </label>)}
            </div>
          </div>
        </div>
        <DialogFooter>
          <AlertDialogComponent
            open={isAlertOpen}
            setOpen={setIsAlertOpen}
            handleOk={handleSubmit}
          />

          <Button
            type="submit"
            onClick={validateInput}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProduct;