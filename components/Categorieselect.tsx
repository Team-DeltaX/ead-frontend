import React, { useState, useEffect } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/services/category.service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCategory = ({
  selectedCategory,
  setSelectedCategory,
}:{
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category ) => void;
}) => {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await categoryService.getAllCategories();
        setCategories(response.data); // Assuming response.data is the array of categories
        setError(null);
      } catch (err) {
        setError("Failed to fetch categories. Please try again later. "+err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Select value={selectedCategory && selectedCategory.id ? selectedCategory.id.toString() : ""} onValueChange={
      (value) => {
        const category = categories.find((category) => category?.id?.toString() === value);
        if (category && category.id) {
          setSelectedCategory(category);
        }
      }
    }>
      <SelectTrigger data-cy="category-select-trigger" className="w-[180px]">
        <SelectValue placeholder={isLoading ? "Loading..." : "Select a category"} />
      </SelectTrigger>
      <SelectContent>
        {error ? (
          <SelectGroup>
            <SelectItem value="error" disabled>
              {error}
            </SelectItem>
          </SelectGroup>
        ) : (
          <SelectGroup>
            {categories.map((category) => (
              <SelectItem key={category?.id} value={category?.id?.toString() || ""}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;


