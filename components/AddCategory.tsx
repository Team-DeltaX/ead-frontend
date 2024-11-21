import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Category } from "@/services/product.service"
import { categoryService } from "@/services/product.service"

export function AddCategory() {

  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!categoryName) {
      alert("Please fill all fields!");
      return;
    }
    const formData : Category = {
      name: categoryName
    }
    setLoading(true);
    try {
      const response = await categoryService.createCategory({
        name: categoryName
      });

      alert("Categoy added successfully!");
      console.log("Response:", response.data);

      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  }
    

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
          variant="outline"
          className="font-semibold mt-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:border-black"
        >
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add new Categories here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter a category name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
