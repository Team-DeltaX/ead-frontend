"use client";
import React from "react";
import Image from "next/image";
import Image1 from "../../assets/blogimages/imageblog1.jpg";
import Image2 from "../../assets/blogimages/imageblog2.jpg";
import Image3 from "../../assets/blogimages/imageblog3.jpg";
import Image4 from "../../assets/blogimages/imageblog4.jpg";
import Image5 from "../../assets/blogimages/imageblog5.jpg";
import Image6 from "../../assets/blogimages/imageblog6.jpg";
import logo from "../../assets/Logo.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 5 Gadgets for 2024",
      image: Image1,
      description:
        "Discover the must-have gadgets that will make 2024 an exciting year for tech enthusiasts.",
      date: "November 15, 2024",
    },
    {
      id: 2,
      title: "The Evolution of Smart Home Devices",
      image: Image2,
      description:
        "Explore how smart home devices are revolutionizing the way we live, work, and play.",
      date: "November 10, 2024",
    },
    {
      id: 3,
      title: "How to Choose Best Tech Accessories",
      image: Image3,
      description:
        "A comprehensive guide to finding the perfect tech accessories for your devices.",
      date: "November 5, 2024",
    },
    {
      id: 4,
      title: "AI Innovations for 2024",
      image: Image4,
      description:
        "How artificial intelligence is shaping the future across industries in 2024.",
      date: "October 25, 2024",
    },
    {
      id: 5,
      title: "Wearable Tech Trends",
      image: Image5,
      description:
        "The latest advancements in wearable technology for health and lifestyle.",
      date: "October 15, 2024",
    },
    {
      id: 6,
      title: "The Role of Blockchain in Modern Tech",
      image: Image6,
      description:
        "An in-depth look at how blockchain is transforming various sectors in 2024.",
      date: "October 5, 2024",
    },
  ];

  return (
    
    <div className="xl:mt-8 lg:mt-8 md:mt-5 sm:mt-2 mt-2 xl:pb-8 lg:pb-8 md:pb-5 sm:pb-2 pb-2 xl:px-32 lg:px-24 md:px-16 sm:px-10 px-5">
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
      <div className="grid grid-cols-1 ">
      <Carousel className="w-full mt-8">
        <CarouselContent className="-ml-1">
          {blogs.map((blog) => (
            <CarouselItem key={blog.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover opacity-90"
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-black font-SFPro">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-500 font-light mt-2 font-SFPro">
                      {blog.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-3 font-SFPro">
                      Published on {blog.date}
                    </p>
                    <button className="mt-4 px-4 py-2 border border-gray-800 text-black text-sm font-medium rounded hover:bg-gray-800 transition font-SFPro ">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-black hover:bg-gray-400  text-white"/>
        <CarouselNext className="bg-black hover:bg-gray-400  text-white"/>
      </Carousel>
      </div>
    </div>
  );
};

export default Blog;
