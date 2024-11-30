"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import logo from "../../assets/Logo.png";
import dayjs from "dayjs";
import { Blog, blogService } from "@/services/blog.service";
import Spinner from "@/components/Spinner";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BlogPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await blogService.getAllBlogs();
      setBlogs(response.data);
    } catch (err) {
      console.log("Failed to fetch blogs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
    {isLoading ? (<div><Spinner/></div>) : (
    <div className="xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2 xl:px-32 lg:px-24 md:px-16 sm:px-10 px-5 ">
      <div className="flex items-center text-xl font-extrabold text-black sm:text-2xl md:text-3xl lg:text-4xl font-SFPro  justify-items-center justify-center">
        <span className="ml-2">
          <Image
            src={logo}
            alt="Cyber E-commerce Logo"
            width={130}
            height={120}
            className="mx-auto "
          />
        </span>
        <span className="ml-2">Blog</span>
      </div>
      <p className="text-gray-500 text-sm md:text-md lg:text-lg text-center mt-3 font-light font-SFPro">
        Stay updated with the latest in tech trends, product reviews, and tips
        to enhance your digital lifestyle.
      </p>
      
      {!isLoading && blogs.length === 0 && <div>No blogs found</div>}
      {!isLoading && blogs.length > 0 && (
        <div className="grid grid-cols-1 ">
          <Carousel className="w-full mt-8">
            <CarouselContent className="-ml-1">
              {blogs.map((blog) => (
                <CarouselItem
                  key={blog.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                      {blog.imageUrl && (
                        <>
                          <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover opacity-90"
                          />
                        </>
                      )}
                      <div className="p-5">
                        <h2 className="text-lg font-semibold text-black font-SFPro">
                          {blog.title}
                        </h2>
                        <p className="text-sm line-clamp-3 text-gray-500 font-light mt-2 font-SFPro">
                          {blog.content}
                        </p>
                        <p className="text-xs text-gray-400 mt-3 font-SFPro">
                          Published on{" "}
                          {dayjs(blog.createdAt).format("DD/MM/YYYY")}
                        </p>
                        <button onClick={() => router.push(`/blog/${blog.id}`)} className="mt-4 px-4 py-2 border border-gray-800 text-black text-sm font-medium rounded hover:bg-gray-800 transition font-SFPro ">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-black hover:bg-gray-400  text-white" />
            <CarouselNext className="bg-black hover:bg-gray-400  text-white" />
          </Carousel>
        </div>
      )}
    </div>
    )}
    </div>
  );
};

export default BlogPage;
