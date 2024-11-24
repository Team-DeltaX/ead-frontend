"use client";
import React, { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hovercard";
import { categoryService } from "@/services/category.service";
import { Category } from "@/services/category.service";

const Categorycard = () => {
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
        setError("Failed to fetch categories. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>Category</HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between px-4 py-2 border-b border-gray-200"
                >
                  <div className="text-gray-600 font-semibold">{category.name}</div>
                </div>
              ))
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Categorycard;
