"use client";
import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchPage = () => {
  return (
    <>
      <div className="flex justify-center mb-6 px-4 sm:px-6 lg:px-8">
        {/* Added responsive padding */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          {/* Added responsive width */}
          <input
            type="search"
            placeholder="Cari di sini..."
            aria-label="Search"
            className="rounded-lg p-2 text-lg w-full pl-12 text-white font-semibold border border-transparent bg-transparent focus:border-transparent focus:ring-0 transition-all placeholder:text-gray-400" // Added placeholder color for better visibility
          />
          <MagnifyingGlass
            size={24}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
