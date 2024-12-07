"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Blog, blogService } from "@/services/blog.service";
import BlogImg from "@/app/assets/blogimages/imageblog1.jpg";
import dayjs from "dayjs";

type Params = {
  blogId: string;
};
const Page = () => {
  const params = useParams() as Params;
  const { blogId } = params;

  const parsedBlogId = parseInt(blogId, 10);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parsedBlogId) return;

    const fetchBlogById = async () => {
      try {
        const response = await blogService.getBlogById(parsedBlogId);
        setBlog(response.data);
      } catch (error) {
        console.error("Failed to fetch Blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogById();
  }, [parsedBlogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div
      data-cy="blog-details"
      className="xl:px-32 lg:px-24 md:px-16 sm:px-10 px-5 xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2 "
    >
      <div className=" grid grid-cols-2 gap-10 bg-white px-8 py-5 rounded-lg">
        <div className="py-5">
          <h1 className=" text-xl font-black text-black sm:text-2xl md:text-3xl lg:text-4xl font-SFPro pb-5 text-center">
            {blog.title}
          </h1>
          <div className="flex flex-col gap-0">
            <Image
              src={blog.imageUrl || BlogImg}
              alt={"title"}
              width={600}
              height={300}
              className=" rounded-md"
            />
            <div className="flex flex-row">
              <p className="text-[12px]  sm:text-[12px] md:text-[12px] lg:text-[14px] font-SF pb-5  py-5 text-gray-600 first-line:w-7">
                Published Date : &nbsp;
              </p>
              <p className="text-[12px]  sm:text-[12px] md:text-[12px] lg:text-[14px] font-SF pb-5  py-5 text-gray-600 first-line:w-7">
                {dayjs(blog.createdAt).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>

        <p className="text-[12px]  sm:text-[12px] md:text-[14px] lg:text-[16px] font-SF pb-5  py-5 text-gray-600 first-line:w-7">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default Page;
