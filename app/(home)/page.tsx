"use client";
import React from "react";
import Iphone from "@/app/assets/sliderimages/Iphone.png";
import Watch from "@/app/assets/sliderimages/applewatch.png";
import Ipad from "@/app/assets/sliderimages/Ipad.png";
import Macbook from "@/app/assets/sliderimages/Macbook.png";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CiMobile4, CiLaptop, CiCamera, CiHeadphones } from "react-icons/ci";
import { BsSmartwatch } from "react-icons/bs";

const contentArray = [
  {
    title: "Pro.Max.Experience",
    mainText: "iPhone 14 Pro",
    description: "Revolutionizing mobile technology. Built to excel.",
    image: Iphone,
  },
  {
    title: "Elevated.Health.",
    mainText: "Apple Watch S8",
    description: "Personalized health insights, right on your wrist.",
    image: Watch,
  },
  {
    title: "Redefine.Engagement.",
    mainText: "iPad Pro M2",
    description: "Enhanced performance, endless possibilities.",
    image: Ipad,
  },
  {
    title: "Create.Unleashed.",
    mainText: "MacBook M2",
    description: "A powerhouse to bring your ideas to life.",
    image: Macbook,
  },
];

const categoryArray = [
  {
    title: "Phones",
    icon: CiMobile4,
  },
  {
    title: "Laptops",
    icon: CiLaptop,
  },
  {
    title: "Cameras",
    icon: CiCamera,
  },
  {
    title: "Watches",
    icon: BsSmartwatch,
  },
  {
    title: "Headphones",
    icon: CiHeadphones,
  },
];

const Home = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div>
      <div className="w-full lg:h-[530px] md:h-[430px] sm:h-[330px] h-[230px]  bg-custom-dark">
        <Carousel
          data-testid="carousel container"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {contentArray.map((content, index) => (
              <CarouselItem data-testid="carousel-item" key={index}>
                <div className="lg:h-[510px] md:h-[410px] sm:h-[310px] h-[230px]  xl:px-32 lg:px-32 md:px-18 px-5 mb-4 grid grid-flow-col items-center justify-between">
                  {/* Text content */}
                  <div className="text-left">
                    <h1 data-testid="carousel-item-title" className="font-bold text-white opacity-40 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-figtree">
                      {content.title}
                    </h1>

                    <h1 data-testid="carousel-item-maintext" className="font-thin text-white sm:text-[30px] md:text-[40px] lg:text-[70px] xl:text-[75px] text-[25px] font-SFPro">
                      {content.mainText.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className=" font-extrabold">
                        {content.mainText.split(" ").slice(-1)}
                      </span>
                    </h1>
                    <p data-testid="carousel-item-description" className="text-[10px] sm:text-[14px] md:text-[14px] lg:text-[16px] font-SFPro font-light text-gray-500">
                      {content.description}
                    </p>
                    <div className="text-left xl:pt-6 lg:pt-6 md:pt-4 sm:pt-2 pt-2">
                      <button className="border border-white rounded-md text-white text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-SFPro xl:py-2 xl:px-10 lg:py-2 lg:px-10 md:py-1 md:px-6 sm:py-1 sm:px-4 py-1 px-4">
                        Shop Now
                      </button>
                    </div>
                  </div>
                  {/* Responsive image */}
                  <div className="lg:h-[470px] md:h-[370px] sm:h-[270px] h-[190px] md:ml-[200px] ml-[10px] md:pt-[40px] pt-1 items-end">
                    <Image
                      src={content.image}
                      alt={content.mainText}
                      className="object-contain h-[200px] sm:h-[350px] md:h-[400px] lg:h-[470px] xl:h-[470px] self-end"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="xl:px-32 lg:px-32 md:px-18 px-5 my-10">
        {/* <h1 className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] font-SFPro font-bold text-black">
          Browse By Category
        </h1> */}
        <div className="text-center grid ">
          <h1 className="font-normal text-black text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[35px] font-SFPro">
            Browse By Category
          </h1>
          <h1 className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] font-SFPro font-light text-gray-500">
            Explore items by category and find your favorites
          </h1>
        </div>
        <div className="grid grid-cols-5  justify-between gap-5 mt-6">
          {categoryArray.map((category, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-md text-center md:py-6 sm:py-4 py-3 "
            >
              <category.icon className="text-center justify-self-center md:text-[48px] sm:text-[40px] text-[25px] mb-2" />
              <h1 className="font-medium text-[8px] sm:text-[10px] md:text-[12px] lg:text-[16px] font-SFPro text-black">
                {category.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="xl:px-32 lg:px-32 md:px-18 px-5 my-10">
        <div className="text-center grid ">
          <h1 className="font-normal text-black text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[35px] font-SFPro">
            New Arrivals
          </h1>
          <h1 className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] font-SFPro font-light text-gray-500">
            Say hello to our newest collection
          </h1>
        </div>
        <div className="grid grid-cols-5  justify-between gap-5 mt-6">
          {categoryArray.map((category, index) => (
            <div
              data-testid='categoryitem'
              key={index}
              className="bg-gray-200 rounded-md text-center md:py-6 sm:py-4 py-3 "
            >
              <category.icon className="text-center justify-self-center md:text-[48px] sm:text-[40px] text-[25px] mb-2" />
              <h1 className="font-medium text-[8px] sm:text-[10px] md:text-[12px] lg:text-[16px] font-SFPro text-black">
                {category.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
