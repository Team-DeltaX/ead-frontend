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
import { Category } from "@/services/product.service";
import { categoryService } from "@/services/product.service";
import { toast } from "react-hot-toast";

export function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state

  // Validation logic
  const validateInput = () => {
    if (!categoryName.trim()) {
      setError("Category name is required.");
      return false;
    }
    if (categoryName.length < 3) {
      setError("Category name must be at least 3 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return; // Stop if validation fails

    const formData: Category = {
      name: categoryName,
    };
    setLoading(true);
    try {
      const response = await categoryService.createCategory(formData);

      toast.success("Category added successfully!");

      setCategoryName("");
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      toast.error("Error adding category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <div className="col-span-3">
              <Input
                id="name"
                value={categoryName}
                className={`w-full ${error ? "border-red-500" : ""}`}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter a category name"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
