"use client";
import React, { useState } from "react";
import logo from "../app/assets/Logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FiUser, FiMenu } from "react-icons/fi";
import Link from "next/link";


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="h-16 flex  items-center xl:px-32 lg:px-32 md:px-18 px-5 justify-items-center">
      <div>
        <Image src={logo} alt="Logo"  className="opacity-50 " width={100}
                height={100}/>
      </div>
      <div className="ml-auto relative w-40 md:w-64">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <CiSearch className="lg:text-[14px] md:text-[12px] sm:text-[10px] text-[10px] text-gray-400" />
          </span>
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 border-none bg-gray-200 w-full rounded-lg h-8 md:h-8 lg:h-10 font-SFPro lg:text-[14px] md:text-[12px] sm:text-[10px] text-[10px]"
          />
        </div>
      </div>

      <div className="ml-auto  hidden lg:flex">
        <nav>
          <ul className=" flex opacity-50 gap-10 font-SFPro">
            <li >
              <Link href="/user/home" className="">Home</Link>
            </li>
            <li>
              <Link href="/user/about">About</Link>
            </li>
            <li>
              <Link href="/user/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/user/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="ml-auto flex">
        <nav>
          <ul className=" flex opacity-50 md:gap-10 gap-5 items-center">
            <li>
              <button>
                <IoCartOutline className="md:h-[24px] md:w-[24px] h-[20px] w-[20px]" />
              </button>
            </li>
            <li>
              <button>
                <FiUser className="md:h-[20px] md:w-[20px] h-[16px] w-[16px]" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button className="block lg:hidden z-50 ml-4" onClick={toggleMenu}>
        <FiMenu  className="opacity-50"/>
      </button>

      {isMenuOpen && (
        <nav className="absolute left-0 w-full bg-white top-14 lg:hidden z-40">
          <ul className="flex flex-col items-center font-medium text-[14px] space-y-2">
            <li>
              <Link href="/user/home" className="p-4 w-full text-center block ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/user/about" className="p-4 w-full text-center block">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/user/contact"
                className="p-4 w-full text-center block"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/user/blog" className="p-4 w-full text-center block">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
