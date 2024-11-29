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
      <div className=" justify-items-center items-center bg-white">
        <h1 className=" text-xl font-extrabold text-black sm:text-2xl md:text-3xl lg:text-4xl font-SFPro pb-5">
          Blog My Blog
        </h1>
        <Image src={BlogImg} alt={"title"} width={600} height={300} className="pb-5"/>

        <p className="text-[12px]  sm:text-[12px] md:text-[13px] lg:text-[15px] font-SFPro pb-5 text-center">
          Mobile phones have become an essential part of our lives, evolving
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
          needs. As technology continues to advance, mobile phones are embracing
          groundbreaking features such as foldable displays, augmented reality
          (AR), and biometric security, promising an even more immersive and
          secure user experience. However, choosing the right phone can be
          overwhelming due to the vast number of options available. Factors like
          performance, battery life, camera quality, and price play a crucial
          role in decision-making, making it important for users to prioritize
          their specific requirements. Maintaining a mobile phone involves more
          than just protecting it from physical damage; it also requires regular
          updates, proper storage management, and robust security practices to
          safeguard personal data. With sustainability gaining importance, the
          future of mobile phones is likely to focus on eco-friendly materials
          and practices to minimize environmental impact. In summary, mobile
          phones have evolved into indispensable companions that enhance our
          daily lives, offering convenience and connectivity like never before.
          As new technologies emerge, the potential of these devices continues
          to expand, paving the way for an exciting future in mobile innovation.
        </p>
      </div>
    </div>
  );
};

export default Page;
