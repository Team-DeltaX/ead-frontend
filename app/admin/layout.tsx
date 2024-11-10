import Sidebar from '@/components/AdminSidebar';
import AdminNav from '@/components/AdminSidebar';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="w-full flex flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="w-full h-[90%]">{children}</div>
      </div>
    );
  };

export default layout
