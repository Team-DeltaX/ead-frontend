import React from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="ml-auto relative w-40 md:w-64">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <CiSearch className="lg:text-[14px] md:text-[12px] sm:text-[10px] text-[10px] text-gray-400" />
        </span>
        <Input
          type="search"
          placeholder="Search"
          className="pl-10 border border-gray-500 bg-gray-100 w-full rounded-sm h-8 md:h-8 lg:h-10 font-SFPro lg:text-[14px] md:text-[12px] sm:text-[10px] text-[10px]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
