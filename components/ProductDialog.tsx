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
import { imageService } from "@/services/image.service";

export function DialogDemo({ fetchdata }: { fetchdata: () => void }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isalertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = async () => {
    console.log(productName, category, price, quantity, description);

    if (
      !productName ||
      !category ||
      !price ||
      !quantity ||
      !description ||
      !brand
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }
    if (images.length > 4) {
      toast.error("Maximum 4 images are allowed");
      return;
    }
    

    try {
      await toast.promise(
        (async () => {
          const response = await productService.createProduct({
            productName,
            category,
            productPrice: price,
            inventory: quantity,
            productBrand: brand,
            productDescription: description,
          });

          console.log("Response:", response);

          if (response.success) {
            const imageRespose = await imageService.addImage({
              productId: response.data.id,
              images: images,
            });
            console.log("Image Response:", imageRespose);
          }

          // Reset form fields after successful creation
          setProductName("");
          setCategory(null);
          setBrand("");
          setPrice(0);
          setQuantity(0);
          setDescription("");
          setImages([]);
          fetchdata();

          return "Product added successfully!";
        })(),
        {
          loading: "Adding product...",
          success: (message) =>   {return <div data-cy="success-toast">{message}</div>;},
          error: (error) =>
            error?.message || "Failed to add product. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsDialogOpen(false);
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
  const handleClose = () => {
    setIsDialogOpen(false);
    setProductName("");
    setCategory(null);
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setImages([]);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          data-cy="add-new-product-btn"
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
              name="productName"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
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
            <Label htmlFor="name" className="text-right">
              Product Brand
            </Label>
            <Input
              name='brandname'
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
              name="productPrice"
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) >= 0) {
                  setPrice(Number(value));
                } else if (value === "") {
                  setPrice(0);
                }
              }}
              id="price"
              placeholder="Enter price"
              type="number"
              min="0"
              className="col-span-3"
              value={price}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              name="quantity"
              onChange={(e) => {
                const value = e.target.value;
                if (Number(value) >= 0) {
                  setQuantity(Number(value));
                } else if (value === "") {
                  setQuantity(0);
                }
              }}
              value={quantity}
              id="quantity"
              placeholder="Enter quantity"
              type="number"
              min="0"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
                    width={100}
                    height={100}
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
              {images.length < 4 && (
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
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <AlertDialogComponent
            open={isalertOpen}
            setOpen={setIsAlertOpen}
            handleOk={handleSubmit}
          />
          <Button data-cy="add-product-button" onClick={handleSubmit}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
