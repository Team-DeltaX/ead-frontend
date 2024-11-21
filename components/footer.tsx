"use client";
import React from "react";
import logo from "../app/assets/Logo2.png";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa6";

const footer = () => {
  return (
    <div className="w-full bg-black h-[full] xl:px-32 lg:px-32 md:px-18 px-5 ">
      <div className="grid grid-cols-5  text-gray-400 font-SFPro  py-10 ">
        {/* text column1 */}
        <div className=" justify-items-start ">
          <div>
            <Image src={logo} alt="Description of the image" height={24} />
          </div>
          <div>

          </div>
        </div>
        {/* text column2 */}
        <div className="hidden sm:hidden md:hidden lg:grid xl:grid grid-cols-1 xl:w-full font-semibold px-4 ">
          <div className="text-[14px] ">
            <h1>5123 Market St. #22B</h1>
            <h1>Charlottesville, California 44635</h1>
          </div>
          <div className="pt-20 text-[12px]">
            <h1>Phone: (123) 456-7890</h1>
            <h1>Email: Cyber@gmail.com</h1>
          </div>
        </div>

        {/* text column3 */}
        <div className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px]  justify-items-center">
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Blog</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* text column4 */}
        <div className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px ] justify-items-center">
          <h1>Follow Us</h1>
          <h1>Facebook</h1>
          <h1>Twitter</h1>
          <h1>Instagram</h1>
        </div>

        {/* text column5 */}
        <div className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px]  justify-items-end">
          <button className="bg-white rounded-full   flex justify-center items-center w-8 h-8"
           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaArrowUp className="text-black"/>
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default footer;
