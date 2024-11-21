"use client";

import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { FaFilter } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    brand: "Samsung",
    storage: "128GB",
    batteryCapacity: "5000mAh",
    description: "The pinnacle of Samsung innovation with stunning features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeSoJWzJ7Mu85-gpfgV7hHqNiKE0dQnQq5A&s",
  },
  {
    id: 3,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    brand: "Samsung",
    storage: "128GB",
    batteryCapacity: "5000mAh",
    description: "The pinnacle of Samsung innovation with stunning features.",
    image: "https://s.alicdn.com/@sc04/kf/H4467cbfe96cb42639c74d4aa9aa5b199f.jpg_300x300.jpg",
  },
  {
    id: 4,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
  },
  {
    id: 5,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
  },
  {
    id: 6,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
  },
];

const Product = () => {
  
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
  });

  const [brands, setBrands] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];
    setBrands(uniqueBrands);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleBrandFilterChange = (e) => {
  //   const value = e.target.value;
  //   setFilters((prev) => ({
  //     ...prev,
  //     brand: value,
  //   }));
  // };

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.brand || product.brand === filters.brand) &&
      (!filters.price || product.price <= parseInt(filters.price))
    );
  });

  const Items_Per_Page = 8;
  const totalItem = filteredProducts.length;
  const totalPages = Math.ceil(totalItem / Items_Per_Page);
  const startIndex = (currentPage - 1) * Items_Per_Page;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + Items_Per_Page);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <div className={`w-full md:w-1/4 bg-gray-50 p-4 mt-4 border rounded-lg border-gray-200 ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        <label className="block mb-4">
          <span className="text-gray-700 text-lg font-semibold mb-4">Brand:</span>
          <div className="mt-1 block w-full border-gray-300 rounded-md p-4">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mt-1">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={(e) => handleFilterChange(e)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={brand} className="ml-2 text-gray-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 text-lg font-semibold mb-4">Price Level:</span>
          <div className="mt-1 block w-full border-gray-300 rounded-md p-4">
            {[
              { label: "All", value: "" },
              { label: "Under $500", value: "500" },
              { label: "Under $1000", value: "1000" },
              { label: "Under $1500", value: "1500" },
            ].map((option) => (
              <div key={option.value} className="flex items-center mt-1">
                <input
                  type="radio"
                  id={option.value}
                  name="price"
                  value={option.value}
                  onChange={handleFilterChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={option.value} className="ml-2 text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </label>
      </div>

      {/* Toggle Button for Small Screens */}
      <button
        className="md:hidden p-2 fixed top-4 left-4 bg-blue-500 text-white rounded-full"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <FaFilter />
      </button>

      {/* Products */}
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* pagination  */}
        <div className="flex justify-center items-center mt-4">
          <button
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${currentPage === index + 1
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-700"
                } rounded`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default Product;

