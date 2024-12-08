import type { Metadata } from "next";
import Sidebar from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel",
};

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="w-full h-[90%]">{children}</div>
    </div>
  );
};

export default AdminLayout;
