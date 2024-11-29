"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiShoppingBasket2Line,
  RiShoppingCartLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { TbLayersDifference } from "react-icons/tb";
import Image from "next/image";
import logo from "@/app/assets/Logo.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();

  const { dispatch } = useAuthContext();

  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Helper function to check if the link is active
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  };

  return (
    <div className="h-screen w-64 shadow-lg">
      <div className="m-3  p-3 bg-gray-200">
        <div className="flex flex-row ">
          <Image
            src={logo}
            alt="Logo"
            className="opacity-50 "
            width={100}
            height={100}
          />
          <h1 className="pt- text-2xl text-gray-600 font-semibold ml-2">
            Admin
          </h1>
        </div>
      </div>
      <nav>
        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/admin"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin")
                  ? "bg-gray-200 font-semibold"
                  : "hover:font-semibold"
              }`}
            >
              <RiDashboardLine />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/product"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/product")
                  ? "bg-gray-200 font-semibold"
                  : "hover:font-semibold"
              }`}
            >
              <RiShoppingBasket2Line />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/order"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/order")
                  ? "bg-gray-200 font-semibold"
                  : " hover:font-semibold"
              }`}
            >
              <RiShoppingCartLine />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/blog"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/blog")
                  ? "bg-gray-200 font-semibold"
                  : " hover:font-semibold"
              }`}
            >
              <TbLayersDifference />
              <span>Blogs</span>
            </Link>
          </li>

          <li>
            <button
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/logout")
                  ? "!bg-gray-200 font-semibold"
                  : " hover:font-semibold"
              }`}
              onClick={() => setIsAlertOpen(true)}
            >
              <RiLogoutBoxLine />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
      
    </div>
  );
};

export default Sidebar;
