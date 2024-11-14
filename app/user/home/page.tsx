"use client";
import React from "react";
import Iphone from "../../assets/sliderimages/Iphone.png";
import Watch from "../../assets/sliderimages/applewatch.png";
import Ipad from "../../assets/sliderimages/Ipad.png";
import Macbook from "../../assets/sliderimages/Macbook.png";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CiMobile4 } from "react-icons/ci";

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

const Home = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div>
      <div className="w-full h-[530px]   bg-custom-dark">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {contentArray.map((content, index) => (
              <CarouselItem key={index}>
                <div className="h-[510px]  xl:px-32 lg:px-32 md:px-18 px-5 mb-4 grid grid-flow-col items-center justify-between">
                  {/* Text content */}
                  <div className="text-left">
                    <h1 className="font-bold text-white opacity-40 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-figtree">
                      {content.title}
                    </h1>
                    
                    <h1 className="font-thin text-white sm:text-[35px] md:text-[40px] lg:text-[70px] xl:text-[75px] text-[30px] font-SFPro">
                      {content.mainText.split(" ").slice(0, -1).join(" ")}{" "}
                      <span className=" font-extrabold">
                        {content.mainText.split(" ").slice(-1)}
                      </span>
                    </h1>
                    <p className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] font-SFPro font-light text-gray-500">
                      {content.description}
                    </p>
                    <div className="text-left xl:pt-6 lg:pt-6 md:pt-4 sm:pt-2 pt-2">
                      <button className="border border-white rounded-md text-white text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-SFPro xl:py-2 xl:px-10 lg:py-2 lg:px-10 md:py-1 md:px-6 sm:py-1 sm:px-4 py-1 px-4">
                        Shop Now
                      </button>
                    </div>
                  </div>
                  {/* Responsive image */}
                  <div className="h-[470px] ml-[200px]  pt-[40px] items-end">
                    <Image
                      src={content.image}
                      alt={content.mainText}
                      className="object-contain h-[300px] sm:h-[350px] md:h-[400px] lg:h-[470px] xl:h-[470px] self-end"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="xl:px-32 lg:px-32 md:px-18 px-5 my-10">
        <h1 className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] font-SFPro font-medium">Browse By Category</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
          <div className="bg-gray-200 rounded-md">
          <CiMobile4 />
            <h1>phones</h1>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
