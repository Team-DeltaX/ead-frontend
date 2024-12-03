"use client";

import ProductCard from "@/components/ProductCard";
import { Product, productService } from "@/services/product.service";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import SearchBar from "@/components/SearchBar";
import FilterSelect from "@/components/FilterSelect";
import { CgUnavailable } from "react-icons/cg";

const Page = () => {
  const [data, setData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      </div>
  
    <div className="flex xl:px-32 lg:px-32 md:px-18 px-5 font-SFPro">
      <div className="w-full sm:w-2/3 md:w-3/4 lg:w-full p-4 ">
        <div className="flex my-5 opacity-50">
          
          <FilterSelect />
          <FilterSelect />

          {/* <div className="flex items-center px-2 py-1 border border-gray-500 rounded-sm ml-">
            <h1 className="text-[16px] mr-1">Filter by Category</h1>
            <IoMdArrowDropdown className="text-[20px]" />
          </div> */}
          <div className="justify-end ml-auto">
            <SearchBar />
          </div>
        </div>
        <div className="min-h-screen">
          {isLoading ? (
            <div className="flex items-center justify-center  md:min-h-[450px] ">
              <Spinner />
            </div>
          ) : data && totalItem > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center md:min-h-[500px]">
        <div className="flex justify-center items-center mb-1">
          <CgUnavailable className=" text-[15px] sm:text-[15px] md:text-[18px] lg:text-[20px] text-gray-500" />
        </div>
        <div>
          <h2 className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-gray-500 font-SFPro">
            Products Data not available
          </h2>
        </div>
      </div>
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-end my-10 text-[14px] ">
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
    </div>
  );
};

export default Page;
