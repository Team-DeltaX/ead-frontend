import AdminNav from '@/components/AdminSidebar';
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="w-full">
        <AdminNav />
        <div className="w-full h-[90%]">{children}</div>
      </div>
    );
  };

export default layout
