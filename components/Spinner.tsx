import React from "react";

const Spinner = () => {
  return (
    <div className="flex space-x-2 justify-center items-center ">
      <div className="bg-gray-700 md:h-[10px] md:w-[10px] h-[8px] w-[8px] animate-blink-1 rounded-full"></div>
      <div className="bg-gray-700 md:h-[10px] md:w-[10px] h-[8px] w-[8px] animate-blink-2 rounded-full"></div>
      <div className="bg-gray-700 md:h-[10px] md:w-[10px] h-[8px] w-[8px] animate-blink-3 rounded-full"></div>
      <div className="bg-gray-700 md:h-[10px] md:w-[10px] h-[8px] w-[8px] animate-blink-4 rounded-full"></div>
    </div>
  );
};

export default Spinner;
