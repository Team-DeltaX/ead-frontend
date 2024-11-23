"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine, RiShoppingBasket2Line, RiShoppingCartLine, RiLogoutBoxLine } from "react-icons/ri";
import { TbLayersDifference } from "react-icons/tb";

const Sidebar = () => {
  const pathname = usePathname();

  // Helper function to check if the link is active
  const isActive = (path : string) => pathname === path;

  return (
    <div className="h-screen w-64 shadow-lg">
      <div className="text-2xl font-semibold ml-2 mt-3 p-3">Shop Admin</div>
      <nav>
        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/admin"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin") ? "bg-gray-200 font-semibold" : "hover:font-semibold"
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
                isActive("/admin/product") ? "bg-gray-200 font-semibold" : "hover:font-semibold"
              }`}
            >
              <RiShoppingBasket2Line />
              <span>Products</span>
            </Link>
          </li>
          {/* <li>
            <Link
              href="/admin/category"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/category") ? "bg-gray-200 font-semibold" : " hover:font-semibold"
              }`}
            >
              <TbLayersDifference />
              <span>Categories</span>
            </Link>
          </li> */}
          <li>
            <Link
              href="/admin/order"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/order") ? "bg-gray-200 font-semibold" : " hover:font-semibold"
              }`}
            >
              <RiShoppingCartLine />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/logout"
              className={`flex items-center p-2 rounded gap-3 ${
                isActive("/admin/logout") ? "bg-gray-200 font-semibold" : " hover:font-semibold"
              }`}
            >
              <RiLogoutBoxLine />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
