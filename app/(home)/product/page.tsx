"use client";

import ProductCard from "@/components/ProductCard";
import { Product, productService } from "@/services/product.service";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await productService.getAllProducts();
      console.log("Fetched data:", response); 
       if (response?.data) {
        setData(response.data); 
      } else {
        setData([]); 
        console.warn("Unexpected data format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Items_Per_Page = 8;
  const totalItem = data.length;
  const totalPages = Math.ceil(totalItem / Items_Per_Page);
  const startIndex = (currentPage - 1) * Items_Per_Page;
  const currentProducts = data.slice(startIndex, startIndex + Items_Per_Page);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-full p-4 lg:mx-28  bg-gradient-to-r from-blue-50 via-white to-blue-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
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
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
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

export default Page;
