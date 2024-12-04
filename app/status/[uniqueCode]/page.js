"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarPage from "@/app/navigation/NavbarPage";

const StatusPage = ({ params }) => {
  const router = useRouter();
  const uniqueCode = params.uniqueCode;
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.8:8000/api/status/${uniqueCode}`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data status. Silakan coba lagi.");
        }
        const data = await response.json();
        setStatusData(data);
        console.log("Data yang diterima:", data); // Memeriksa data yang diterima
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusData();
  }, [uniqueCode]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
        <button
          onClick={() => router.push("/status")}
          className="mt-4 text-blue-500 underline"
        >
          Kembali ke halaman cek status
        </button>
      </div>
    );
  }

  const statusSteps = [
    { label: "Terkirim", icon: "🚚" },
    { label: "Diterima", icon: "📦" },
    { label: "Diproses", icon: "⚙" },
    { label: "Selesai", icon: "✅" },
  ];

  const currentStepIndex = statusSteps.findIndex(
    (step) => step.label === statusData.currentStatus
  );

  // Cek apakah status layanan sudah selesai dan apakah file surat tersedia
  const isCompleted = statusData.currentStatus === "Selesai";
  const fileUrl = statusData.timeline.find((item) => item.fileUrl)?.fileUrl;

  // Log isCompleted dan fileUrl untuk debugging
  console.log("isCompleted:", isCompleted);
  console.log("fileUrl:", fileUrl); // Memeriksa URL surat

  return (
    <>
      <NavbarPage />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-6 text-purple-600 text-center">
            Status Permohonan
          </h1>

          {/* Status Progress */}
          <div className="flex justify-between items-center mb-6">
            {statusSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= currentStepIndex
                    ? "text-purple-600"
                    : "text-gray-400"
                }`}
              >
                <span className="text-4xl">{step.icon}</span>
                <span className="mt-2 text-sm">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative border-l border-gray-300">
            {statusData.timeline.map((item, index) => (
              <div key={index} className="mb-8 ml-6">
                <div className="absolute -left-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">{index + 1}</span>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-sm font-bold text-gray-700">
                    {item.time} - {item.status}
                  </p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Unduh jika status sudah selesai dan file tersedia */}
          {isCompleted && fileUrl ? (
            <div className="mt-6 text-center">
              <a
                href={fileUrl} // Link untuk mengunduh surat
                download // Atribut untuk mengunduh file
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                Unduh Surat Balasan
              </a>
            </div>
          ) : (
            <div className="mt-6 text-center text-gray-500">
              Surat balasan belum tersedia.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatusPage;
