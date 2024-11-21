"use client";
import React from "react";
import {
  FacebookLogo,
  Globe,
  InstagramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

const InformationPage = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="bg-blue-800">
        <h1 className="p-5 bg-blue-900 text-center font-semibold text-white">
          DINAS KOMINFO KAB. SEMARANG
        </h1>
      </div>

      {/* Links Section */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-center gap-4 text-center items-center flex-wrap">
          <Link
            href="https://diskominfo.semarangkab.go.id"
            target="_blank"
            className="flex items-center gap-1 text-sm mb-2" // Add margin bottom for spacing
          >
            <Globe size={20} />
            Diskominfo.semarangkab.go.id
          </Link>

          <Link
            href="https://www.facebook.com/diskominfokabsemarang"
            target="_blank"
            className="flex items-center gap-2 text-sm mb-2" // Add margin bottom for spacing
          >
            <FacebookLogo size={20} />
            Diskominfo Kab. Semarang
          </Link>

          <Link
            href="https://www.youtube.com/results?search_query=kominfo+kabupaten+semarang"
            target="_blank"
            className="flex items-center gap-1 text-sm mb-2" // Add margin bottom for spacing
          >
            <YoutubeLogo size={20} />
            Kominfo Kabupaten Semarang
          </Link>

          <Link
            href="https://www.instagram.com/kominfo.kabsemarang?igsh=MWRieHl5cG5qYWl3cQ=="
            target="_blank"
            className="flex items-center gap-1 text-sm mb-2" // Add margin bottom for spacing
          >
            <InstagramLogo size={20} />
            kominfo.kabsemarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
