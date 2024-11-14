import React from 'react'
import NavBar from '@/components/NavBar';
import Footer from '@/components/footer';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <div className="w-full">
        <div><NavBar/></div>
        <div className="w-full h-[90%]">{children}</div>
        <div className=''><Footer/></div>
      </div>
    );
  };

export default layout
