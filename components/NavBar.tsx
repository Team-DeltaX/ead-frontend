"use client";
import React, { useState } from "react";
import logo from "../app/assets/Logo.png";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FiUser, FiMenu } from "react-icons/fi";
import Link from "next/link";
import LoginDialog from "@/components/LoginDialog";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "@/components/ui/button";
import { AlertDialogComponent } from "@/components/Alert";

const NavBar = () => {
  const { state } = useAuthContext();
  const { isLoggedIn } = state;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  // const isLogging = true;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    setOpen(false);
  };

  return (
    <div className="h-16 flex  items-center xl:px-32 lg:px-32 md:px-18 px-5 justify-items-center">
      <div>
        <Image
          src={logo}
          alt="Logo"
          className="opacity-50 "
          width={100}
          height={100}
        />
      </div>

      <div className="ml-auto  hidden lg:flex">
        <nav>
          <ul className=" flex opacity-50 gap-10 font-SFPro">
            <li>
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link href="/product">Product</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contactus">Contact Us</Link>
            </li>

            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="ml-auto flex mr-4">
        {isLoggedIn ? (
          <nav>
            <ul className=" flex opacity-50 md:gap-6 gap-5 items-center justify-center ">
              <li>
                <Link href="/cart">
                  <IoCartOutline className="md:h-[24px] md:w-[24px] h-[20px] w-[20px]" />
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  <FiUser className="md:h-[20px] md:w-[20px] h-[16px] w-[16px]" />
                </Link>
              </li>
              <li className="flex justify-center items-center">
                <button onClick={() => setOpen(true)}>
                  <FiLogOut className="md:h-[20px] md:w-[20px] h-[16px] w-[16px]" />
                </button>
              </li>
            </ul>
          </nav>
        ) : (
          <Button
            className="bg-black hover:bg-gray-700 text-white py-1.5 px-8 rounded focus:border-black font-SFPro"
            onClick={() => setIsDialogOpen(true)}
          >
            LOGIN
          </Button>
        )}
      </div>
      <button className="block lg:hidden z-50 ml-4" onClick={toggleMenu}>
        <FiMenu className="opacity-50" />
      </button>

      {isMenuOpen && (
        <nav className="absolute left-0 w-full bg-white top-14 lg:hidden z-40">
          <ul className="flex flex-col items-center font-medium text-[14px] space-y-2">
            <li>
              <Link href="/home" className="p-4 w-full text-center block ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="p-4 w-full text-center block">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contactus"
                className="p-4 w-full text-center block"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="p-4 w-full text-center block">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <LoginDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      <AlertDialogComponent
        title="Confirm Logout"
        description="Your session will be closed, and you will be redirected to the Home page. Do you wish to continue?"
        open={open}
        setOpen={setOpen}
        handleOk={handleLogout}
      />
    </div>
  );
};

export default NavBar;
