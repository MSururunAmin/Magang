"use client";

import NavbarDashboard from "@/app/components/NavbarDashboard";
import { useEffect, useState } from "react";

const page = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://192.168.100.8:8000/api/daftar-permohonan"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRequests();
  }, []);

  const generateUniqueCode = (kodeUnik) => kodeUnik || "Tidak ada kode unik";

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
            {requests.map((request, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1} {/* Gunakan indeks untuk ID yang berurutan */}
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
                  {generateUniqueCode(request.kodeUnik)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={`https://e-office.semarangkab.go.id/verifikasi_surat/id/${request.kodeUnik}`}
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
