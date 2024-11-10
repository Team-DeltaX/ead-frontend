import Link from "next/link";
import { RiDashboardLine, RiShoppingBasket2Line, RiShoppingCartLine, RiLogoutBoxLine   } from "react-icons/ri";
import { TbLayersDifference } from "react-icons/tb";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 shadow-xl">
      <div className="text-2xl font-semibold ml-2 mt-3 p-3">Shop Admin</div>
      <nav>
        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/admin"
              className="flex items-center p-2 hover:bg-gray-200 rounded hover:font-semibold gap-3"
            >
              <RiDashboardLine />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/product"
              className="flex items-center p-2 hover:bg-gray-200 rounded hover:font-semibold gap-3"
            >
              <RiShoppingBasket2Line />
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/admin/category"
              className="flex items-center p-2 hover:bg-gray-200 rounded hover:font-semibold gap-3"
            >
              <TbLayersDifference />
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/admin/order"
              className="flex items-center p-2 hover:bg-gray-200 rounded hover:font-semibold gap-3"
            >
              <RiShoppingCartLine />
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/admin/logout"
              className="flex items-center p-2 hover:bg-gray-200 rounded hover:font-semibold gap-3"
            >
              <RiLogoutBoxLine />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
