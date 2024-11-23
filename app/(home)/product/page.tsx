"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product, productService } from "@/services/product.service";

const Page = () => {
  const [data, setData] = useState<Product[]>([]); // Ensure `data` is initialized as an empty array.
  const [currentPage, setCurrentPage] = useState<number>(1);
  const Items_Per_Page = 8;

  const fetchData = async () => {
    try {
      const fetchedData = await productService.getAllProducts();
      console.log("Fetched products:", fetchedData);
      setData(fetchedData.data || []); // Fallback to an empty array if no data is returned.
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalItem = data.length; // `data` is guaranteed to be an array.
  const totalPages = Math.ceil(totalItem / Items_Per_Page);
  const startIndex = (currentPage - 1) * Items_Per_Page;
  const currentProducts = data.slice(startIndex, startIndex + Items_Per_Page);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-full p-4 min-h-screen flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {data.length > Items_Per_Page && (
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
        )}
      </div>
    </div>
  );
};

export default Page;
