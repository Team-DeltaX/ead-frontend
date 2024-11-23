"use client";
import React, { useState, useEffect } from "react";
import { AddBlog } from "@/components/AddBlog";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { UpdateBlog } from "@/components/UpdateBlog";
import { blogService } from "@/services/blog.service";
import { Blog } from "@/services/blog.service";

const page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getAllBlogs();
        setBlogs(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <div className="flex flex-row justify-between items-center p-3 bg-gray-100">
          <div className="text-2xl ml-2">Blogs</div>
          <div className="flex gap-6">
            <AddBlog />
          </div>
        </div>
        <div className="p-4 w-full bg-gray-100">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-black shadow-sm"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-y-auto h-[calc(100vh-200px)] border border-gray-300 rounded-xl shadow-lg">
            {/* {isLoading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : ( */}
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-gray-200 shadow-sm">
                  <tr>
                    <th className="px-6 py-3 text-gray-600 font-semibold">
                      Title
                    </th>
                    <th className="px-4 py-2 text-gray-600 font-semibold">
                      Content
                    </th>
                    <th className="px-4 py-2 text-gray-600 font-semibold text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <tr key={blog.id} className="border-b">
                        <td className="px-6 py-2">{blog.title}</td>
                        <td className="px-4 py-2">{blog.content}</td>
                        <td className="px-4 py-2 text-right">
                          <div className="flex justify-end space-x-2">
                            <UpdateBlog />
                            <button className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600">
                              <FaTrashAlt className="mr-1" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No blogs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
