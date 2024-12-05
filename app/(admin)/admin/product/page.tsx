"use client";
import React, { useState, useEffect } from "react";
import { DialogDemo } from "@/components/ProductDialog";
import { FaSearch } from "react-icons/fa";
import UpdateProduct from "@/components/UpdateProduct";
import { AddCategory } from "@/components/AddCategory";
import { productService } from "@/services/product.service";
import Categorycard from "@/components/Categorycard";
import { Product } from "@/services/product.service";
import isAuth from "@/components/isAuth";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data);
      console.log(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products. Please try again later. " + err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-row justify-between items-center p-3 bg-gray-100">
        <div className="text-2xl ml-2">Products</div>
        <div className="flex gap-6">
          <DialogDemo fetchdata={fetchProducts} />
          <AddCategory />
        </div>
      </div>
      <div className="p-4 w-full bg-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-black shadow-sm"
            // Disabled since search functionality is removed
          />
        </div>
      </div>
      <div className="p-4">
        <div className="overflow-y-auto h-[calc(100vh-200px)] border border-gray-300 rounded-xl shadow-lg">
          {isLoading ? (
            <div>
              <div className="text-center pt-4 text-gray-500 font-semibold mb-4">
                Loading ...
              </div>
              <div className="flex items-center justify-center min-h-full">
                <div className="spinner border-t-4 border-b-4 border-gray-900 w-16 h-16 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-gray-200 shadow-sm">
                <tr>
                  <th className="px-6 py-3 text-gray-600 font-semibold">
                    Product Name
                  </th>
                  <th className="px-4 py-2 text-gray-600 font-semibold">
                    <Categorycard />
                  </th>
                  <th className="px-4 py-2 text-gray-600 font-semibold">
                    Price / Rs.
                  </th>
                  <th className="px-4 py-2 text-gray-600 font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-gray-600 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-6 py-2">{product.productName}</td>
                      <td className="px-4 py-2">{product.category.name}</td>
                      <td className="px-4 py-2 ">{product.productPrice}</td>
                      <td className="px-6 py-2 ">{product.inventory}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <UpdateProduct />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default isAuth(Products, { allowedRoles: ["ADMIN"] });
