"use client";

import ProductCard from "@/components/ProductCard";
import { Product, productService } from "@/services/product.service";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { CgUnavailable } from "react-icons/cg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const Page = () => {
  const [data, setData] = useState<Product[]>([]);
  const [originalData, setOriginalData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAllProducts();
      console.log("Fetched data:", response);
      if (response?.success) {
        setData(response.data.products);
        setOriginalData(response.data.products);
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

  //filter base on category
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(originalData.map((item) => item.category.name))
    );
    setCategories(uniqueCategories);
  }, [originalData]);

  const handleFilterCategory = (category: string) => {
    if (category == "All") {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(
        (item) => item.category.name === category
      );
      setData(filteredData);
    }
  };

  // Filter products based on price
  const filteredProducts = data.filter((product) => {
    if (priceFilter === null) {
      return true;
    }
    return product.productPrice <= priceFilter;
  });

  // search products based on productName
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = originalData.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex xl:px-32 lg:px-32 md:px-18 px-5 font-SFPro">
      <div className="w-full">
        <div className="flex flex-wrap gap-4 lg:gap-0 justify-center lg:justify-normal  lg:flex-nowrap  my-5 opacity-50  ">
          <Select onValueChange={(value) => handleFilterCategory(value)}>
            <SelectTrigger className="w-full sm:w-[180px] py-1 border border-gray-500 rounded-sm focus:outline-none focus-visible:outline-none focus:ring-0 mr-0 sm:mr-10">
              <SelectValue
                placeholder="Filter By Category"
                className="text-center"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem value={category} key={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              if (value === "all") {
                setPriceFilter(null);
              } else {
                setPriceFilter(parseInt(value));
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px] py-1 border border-gray-500 rounded-sm focus:outline-none focus-visible:outline-none focus:ring-0 mr-0 sm:mr-10">
              <SelectValue
                placeholder="Filter By Price"
                className="text-center"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="500">Under $500</SelectItem>
                <SelectItem value="1000">Under $1000</SelectItem>
                <SelectItem value="1500">Under $1500</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex justify-center lg:justify-end lg:ml-auto w-full sm:w-auto">
            <div className="ml-0 sm:ml-auto relative W-full sm:w-40 md:w-64">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <CiSearch className="lg:text-[14px] md:text-[12px] sm:text-[10px] text-[10px] text-gray-400" />
                </span>
                <Input
                  type="search"
                  placeholder="Search by Product Name"
                  className="pl-10 border border-gray-500 bg-gray-100 rounded-sm h-10"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen">
          {isLoading ? (
            <div className="flex items-center justify-center  md:min-h-[450px]">
              <Spinner />
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-7">
              {filteredProducts
                .slice(startIndex, startIndex + Items_Per_Page)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center md:min-h-[500px]">
              <div className="flex justify-center items-center mb-1">
                <CgUnavailable className="text-[15px] sm:text-[15px] md:text-[18px] lg:text-[20px] text-gray-500" />
              </div>
              <div>
                <h2 className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-gray-500 font-SFPro">
                  Product not found
                </h2>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-end my-10 text-[14px]">
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
