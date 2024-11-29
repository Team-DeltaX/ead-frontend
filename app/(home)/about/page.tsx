import React from "react";
import logo from "../../assets/Logo.png";
import Image from "next/image";

const About = () => {
  return (
    <div className="xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2 xl:px-32 lg:px-32 md:px-18 px-5  ">
      <div className="grid grid-cols-1 items-center justify-center text-center">
        <div>
          <div className="flex items-center text-xl font-extrabold text-black sm:text-2xl md:text-3xl lg:text-4xl font-SFPro pb-5 justify-items-center justify-center">
            Welcome to
            <span className="ml-2">
              <Image
                src={logo}
                alt="Cyber E-commerce Logo"
                width={130}
                height={120}
                className="mx-auto "
              />
            </span>
          </div>

          <p className="text-[11px] sm:text-[12px] md:text-[15px] lg:text-[16px] font-SFPro font-light opacity-60 py-2">
            At Cyber, we redefine online shopping by offering a diverse range of
            cutting-edge tech products, from gadgets to accessories, all crafted
            to enhance your digital lifestyle.Our passion for technology drives us to provide innovative solutions
            that meet your needs. With a focus on quality and customer
            satisfaction, Cyber is your go-to destination for all things tech.
          </p>
          
        </div>
      </div>
      <div className="grid grid-cols-1 items-start justify-center  mt-7 ">
        <div className="grid md:grid-cols-4 grid-cols-1  xl:gap-8 lg:gap-6 md:gap-3 sm:gap-3 gap-3">
          <div className="mb-8 bg-gray-200 py-5 px-8 rounded-md">
            <h2 className="text-[12px] sm:text-[12px] md:text-[15px] lg:text-[16px] font-semibold text-black font-SFPro">
              Our Mission
            </h2>
            <p className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-light text-gray-500 font-SFPro">
              To provide tech enthusiasts with the latest and most innovative
              products, combining performance, design, and affordability.
            </p>
          </div>
          <div className="mb-8 bg-gray-200 py-5 px-8 rounded-md">
            <h2 className="text-[12px] sm:text-[12px] md:text-[15px] lg:text-[16px] font-semibold text-black font-SFPro">
              Why Choose Us?
            </h2>
            <p className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-light text-gray-500 font-SFPro">
              At Cyber, we value your trust. Our curated selection and
              personalized services ensure that you find exactly what you need
              with ease.
            </p>
          </div>
          <div className="mb-8 bg-gray-200 py-5 px-8 rounded-md">
            <h2 className="text-[12px] sm:text-[12px] md:text-[15px] lg:text-[16px] font-semibold text-black font-SFPro">
              Quality Assurance
            </h2>
            <p className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-light text-gray-500 font-SFPro">
              Each product we offer undergoes strict quality checks to ensure
              reliability, durability, and performance you can count on.
            </p>
          </div>
          <div className="mb-8 bg-gray-200 py-5 px-8 rounded-md">
            <h2 className="text-[12px] sm:text-[12px] md:text-[15px] lg:text-[16px] font-semibold text-black font-SFPro">
              Stay Connected
            </h2>
            <p className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-light text-gray-500 font-SFPro">
              Follow us on social media @cyberecom for the latest product
              launches, exclusive discounts, and tech tips!
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
