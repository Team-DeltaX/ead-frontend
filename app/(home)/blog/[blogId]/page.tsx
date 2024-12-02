"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Blog, blogService } from "@/services/blog.service";
import BlogImg from "@/app/assets/blogimages/imageblog1.jpg";

type Params = {
  blogId: string;
};
const Page = () => {
  const params = useParams() as Params;
  const { blogId } = params;

  const parsedBlogId = parseInt(blogId, 10);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!parsedBlogId) return;

  //   const fetchBlogById = async () => {
  //     try {
  //       const response = await blogService.getBlogById(parsedBlogId);
  //       setBlog(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch Blog:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogById();
  // }, [parsedBlogId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!blog) {
  //   return <div>Blog not found</div>;
  // }
  return (
    <div className="xl:px-32 lg:px-24 md:px-16 sm:px-10 px-5 xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2 ">
      <div className=" grid grid-cols-2 gap-10 bg-white px-8 py-5 rounded-lg">
        <div className="py-5">
          <h1 className=" text-xl font-black text-black sm:text-2xl md:text-3xl lg:text-4xl font-SFPro pb-5 text-center">
            Blog My Blog
          </h1>
          <Image
            src={BlogImg}
            alt={"title"}
            width={600}
            height={300}
            className=" rounded-md"
          />
        </div>

        <p className="text-[12px]  sm:text-[12px] md:text-[12px] lg:text-[14px] font-SF pb-5  py-5 text-gray-600 first-line:w-7">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile phones have become an essential part of our lives, evolving
          from simple devices used for communication into powerful tools that
          influence nearly every aspect of modern living. Over the years, these
          devices have undergone remarkable transformations, beginning with the
          invention of the first mobile phone and progressing to today’s highly
          sophisticated smartphones. This evolution has not only revolutionized
          communication but also changed how we work, learn, and entertain
          ourselves. Modern smartphones are equipped with advanced technologies
          such as high-resolution cameras, AI-powered virtual assistants, and 5G
          connectivity, enabling users to capture stunning images, automate
          tasks, and enjoy blazing-fast internet speeds. Beyond hardware, the
          seamless integration of applications has transformed mobile phones
          into versatile tools for productivity, creativity, and entertainment.
          Whether it’s managing schedules, editing videos, or streaming
          high-definition content, smartphones cater to a diverse range of
          needs.
          sophisticated smartphones. This evolution has not only revolutionized
          communication but also changed how we work, learn, and entertain
          ourselves. Modern smartphones are equipped with advanced technologies
          such as high-resolution cameras, AI-powered virtual assistants, and 5G
          connectivity, enabling users to capture stunning images, automate
          tasks, and enjoy blazing-fast internet speeds. 
          </p>
      </div>
    </div>
  );
};

export default Page;
