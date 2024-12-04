"use client";

import NavbarDashboard from "@/app/components/NavbarDashboard";
import { useEffect, useState } from "react";

const page = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests([
      {
        id: 1,
        nama: "John Doe",
        tanggal: "2024-12-03",
        kategori: "Hosting",
        fileBukti: "https://via.placeholder.com/100",
        keterangan: "Permohonan hosting website desa",
        status: "Disetujui",
      },
      {
        id: 2,
        nama: "Jane Smith",
        tanggal: "2024-12-02",
        kategori: "Zoom Meeting",
        fileBukti: "https://via.placeholder.com/100",
        keterangan: "Permohonan penggunaan Zoom",
        status: "Menunggu Persetujuan",
      },
    ]);
  }, []);

  const generateUniqueCode = (id) => {
    return `REQ-${id.toString().padStart(4, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 px-0">
      <NavbarDashboard />
      <div className="bg-white p-6 mx-auto w-screen">
        <h2 className="text-xl font-bold mb-6">Daftar Permohonan Layanan</h2>

        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Tanggal</th>
              <th className="border border-gray-300 px-4 py-2">Kategori</th>
              <th className="border border-gray-300 px-4 py-2">Kode Unik</th>
              <th className="border border-gray-300 px-4 py-2">File Bukti</th>
              <th className="border border-gray-300 px-4 py-2">Keterangan</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {request.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.nama}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.tanggal}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.kategori}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {generateUniqueCode(request.id)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={request.fileBukti}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Lihat Bukti
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.keterangan}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
