"use client";
import React, { useState, useEffect } from "react";
import { AddBlog } from "@/components/AddBlog";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { UpdateBlog } from "@/components/UpdateBlog";
import { blogService } from "@/services/blog.service";
import { Blog } from "@/services/blog.service";
import { AlertDialogComponent } from "@/components/Alert";
import isAuth from "@/components/isAuth";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await blogService.getAllBlogs();
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch blogs. Please try again later. " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async () => {
    try {
      if (id === undefined) return;
      await blogService.deleteBlog(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <div className="flex flex-row justify-between items-center p-3 bg-gray-100">
          <div className="text-2xl ml-2">Blogs</div>
          <div className="flex gap-6">
            <AddBlog fetchdata={fetchBlogs} />
          </div>
        </div>
        <div className="p-4 w-full bg-gray-100">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:border-black shadow-sm"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-y-auto h-[calc(100vh-200px)] border border-gray-300 rounded-xl shadow-lg">
            {isLoading ? (
              <div>
                <div className="text-center pt-4 text-gray-500 font-semibold mb-4">Loading ...</div>
                <div className="flex items-center justify-center min-h-full">
                  <div className="spinner border-t-4 border-b-4 border-gray-900 w-16 h-16 rounded-full animate-spin"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : filteredBlogs.length > 0 ? ( 
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
                  {filteredBlogs.map((blog: Blog) => (
                    <tr key={blog.id} className="border-b">
                      <td className="px-6 py-2">{blog.title}</td>
                      <td className="px-4 py-2">
                        {blog.content.split(" ").slice(0, 10).join(" ")}
                        <span className="text-2xl"> ...</span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <UpdateBlog fetchblog={fetchBlogs} blog={blog} />
                          <AlertDialogComponent
                            handleOkAsync={deleteBlog}
                            open={isAlertOpen}
                            setOpen={setIsAlertOpen}
                          />
                          <button
                            data-cy='deletebutton'
                            onClick={() => {
                              if (blog.id !== undefined) {
                                setIsAlertOpen(true);
                                setId(blog.id);
                              }
                            }}
                            className="flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                          >
                            <FaTrashAlt className="mr-1" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-4">No blogs found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default isAuth(BlogPage, { allowedRoles: ["ADMIN"] });
