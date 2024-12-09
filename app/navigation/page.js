"use client";
import { useState } from "react";
import Link from "next/link";
import { House, ListChecks, Question, User, X } from "@phosphor-icons/react";

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <nav className="h-full w-16 sm:w-20 lg:w-24 bg-transparent">
        <div className="flex flex-col justify-between h-full">
          <div className="mt-1 flex justify-center">
            {" "}
            {/* Mengurangi margin atas */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleMenu}
              ></div>

              <div className="fixed left-0 top-0 h-full w-64 bg-blue-800 text-white flex flex-col justify-between z-20 sm:w-72 md:w-80 transition-transform duration-300 transform translate-x-0">
                <div className="flex justify-end p-4">
                  <button
                    onClick={toggleMenu}
                    className="text-white hover:text-gray-400 focus:outline-none"
                  >
                    <X size={25} />
                  </button>
                </div>

                <div className="flex flex-col space-y-4 pl-4 mb-4">
                  <Link
                    href="/"
                    className="flex items-center px-4 py-2 hover:bg-purple-700 gap-3"
                  >
                    <House size={32} />
                    <span>Beranda</span>
                  </Link>
                  <Link
                    href="/components/FormStatus"
                    className="flex items-center px-4 py-2 hover:bg-purple-700 gap-3"
                  >
                    <ListChecks size={32} />
                    <span>Informasi Permohonan</span>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center px-4 py-2 hover:bg-purple-700 gap-3"
                  >
                    <Question size={32} />
                    <span>FAQ</span>
                  </Link>
                  <Link
                    href="/tentangkami"
                    className="flex items-center px-4 py-2 hover:bg-purple-700 gap-3"
                  >
                    <User size={32} />
                    <span>Tentang Kami</span>
                  </Link>
                </div>

                <div className="flex flex-col items-center mb-40"></div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
