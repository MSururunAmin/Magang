"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="p-4 md:p-20">
      <div className="flex flex-wrap justify-center gap-12 md:gap-16 lg:gap-20">
        {" "}
        {/* Updated gap values */}
        {/* Aplikasi */}
        <div className="relative flex flex-col items-center">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("aplikasi")}
          >
            <div
              className={`bg-white p-2 rounded-full transition-all duration-300 ${
                activeSection === "aplikasi" ? "shadow-2xl shadow-blue-500" : ""
              }`}
              style={{ width: "110px", height: "110px" }}
            >
              <Image
                src="/images/aplication.png"
                width={80}
                height={80}
                alt="Aplikasi"
                className="object-contain"
              />
            </div>
            <span
              className={`text-base md:text-xl font-semibold block mt-2 md:mt-3 transition-colors ${
                activeSection === "aplikasi" ? "text-blue-500" : "text-white"
              }`}
            >
              Aplikasi
            </span>
          </div>
          {activeSection === "aplikasi" && (
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-4 bg-gray-100 shadow-lg rounded-lg border border-gray-300 z-10">
              {[
                "Permohonan Hosting",
                "Permohonan Fasilitas Email",
                "Permohonan Rekomendasi TIK",
                "Permohonan Reset Akun",
                "Permohonan Hak Akses",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition"
                >
                  <Link href={`/components/Form${item.replace(" ", "")}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Jaringan */}
        <div className="relative flex flex-col items-center">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("jaringan")}
          >
            <div
              className={`bg-white p-3 rounded-full transition-all duration-300 ${
                activeSection === "jaringan" ? "shadow-2xl shadow-blue-500" : ""
              }`}
              style={{ width: "110px", height: "110px" }}
            >
              <Image
                src="/images/network.png"
                width={80}
                height={80}
                alt="Jaringan"
                className="object-contain"
              />
            </div>
            <span
              className={`text-base md:text-xl font-semibold block mt-2 md:mt-3 transition-colors ${
                activeSection === "jaringan" ? "text-blue-500" : "text-white"
              }`}
            >
              Jaringan
            </span>
          </div>
          {activeSection === "jaringan" && (
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-4 bg-gray-100 shadow-lg rounded-lg border border-gray-300 z-10">
              {[
                "Permohonan Zoom",
                "Permohonan Colocation",
                "Peminjaman Alat Jaringan",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition"
                >
                  <Link href={`/components/Form${item.replace(" ", "")}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Troubleshoot */}
        <div className="relative flex flex-col items-center">
          <div
            className="cursor-pointer"
            onClick={() => toggleSection("troubleshoot")}
          >
            <div
              className={`bg-white p-3 rounded-full transition-all duration-300 ${
                activeSection === "troubleshoot"
                  ? "shadow-2xl shadow-blue-500"
                  : ""
              }`}
              style={{ width: "110px", height: "110px" }}
            >
              <Image
                src="/images/troubleshooting.png"
                width={80}
                height={80}
                alt="Troubleshoot"
                className="object-contain"
              />
            </div>
            <span
              className={`text-base md:text-xl font-semibold block mt-2 md:mt-3 transition-colors ${
                activeSection === "troubleshoot"
                  ? "text-blue-500"
                  : "text-white"
              }`}
            >
              Troubleshoot
            </span>
          </div>
          {activeSection === "troubleshoot" && (
            <ul className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-4 bg-gray-100 shadow-lg rounded-lg border border-gray-300 z-10">
              {["Jaringan", "Web", "Server"].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition"
                >
                  <Link href={`/troubleshoot-${item.toLowerCase()}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Laman DISKOMINFO */}
      <div
        className={`text-center items-center mb-5 transition-all duration-300 ${
          activeSection ? "mt-40" : "mt-10"
        }`}
      >
        <Link
          href="https://diskominfo.semarangkab.go.id/"
          className="text-white font-semibold border border-white rounded-lg px-4 py-3 hover:bg-white hover:text-blue-500 focus:bg-blue-500 focus:text-white transition-all inline-block"
        >
          Laman DISKOMINFO
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
