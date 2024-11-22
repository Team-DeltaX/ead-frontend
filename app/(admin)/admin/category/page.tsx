"use client";
import { AddBrand } from "@/components/AddBrand";
import { AddCategory } from "@/components/AddCategory";
import React, { useState } from "react";

type Brand = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  brands: Brand[];
};

const categories: Category[] = [
  {
    id: 1,
    name: "Smartphones",
    brands: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Samsung" },
      { id: 3, name: "Xiaomi" },
    ],
  },
  {
    id: 2,
    name: "Laptops",
    brands: [
      { id: 4, name: "Apple" },
      { id: 5, name: "Dell" },
      { id: 6, name: "ASUS" },
    ],
  },
  {
    id: 3,
    name: "Headphones",
    brands: [
      { id: 7, name: "Sony" },
      { id: 8, name: "Bose" },
      { id: 9, name: "JBL" },
    ],
  },
  {
    id: 4,
    name: "Cameras",
    brands: [
      { id: 10, name: "Canon" },
      { id: 11, name: "Sony" },
      { id: 12, name: "Nikon" },
    ],
  },
  {
    id: 5,
    name: "Tablets",
    brands: [
      { id: 13, name: "Apple" },
      { id: 14, name: "Samsung" },
      { id: 15, name: "Microsoft" },
      { id: 16, name: "Lenovo" },
      { id: 17, name: "Huawei" },
    ],
  },
  {
    id: 6,
    name: "Smartwatches",
    brands: [],
  },
];

const CategoriesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBrandClick = (brand: Brand) => {
    alert(`You clicked on the brand: ${brand.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <h1 className="text-2xl mb-4">Categories</h1>
      <div className="mb-4">
        <AddCategory />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Categories */}
        <div className="bg-white rounded-lg shadow p-4 h-auto md:h-[400px] overflow-y-auto">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedCategory?.id === category.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex flex-row mb-2">
            <h2 className="text-lg font-semibold mb-4">
              {selectedCategory
                ? `Brands in ${selectedCategory.name}`
                : "Select a category to view brands"}
            </h2>
            {selectedCategory && (
              <div className="ml-auto">
                <AddBrand />
              </div>
            )}
          </div>
          {selectedCategory ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedCategory.brands.map((brand) => (
                <li
                  key={brand.id}
                  onClick={() => handleBrandClick(brand)}
                  className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-center"
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No category selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
