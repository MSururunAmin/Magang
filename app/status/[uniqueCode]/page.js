"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarPage from "@/app/navigation/NavbarPage";

const StatusPage = ({ params }) => {
  const router = useRouter();
  const uniqueCode = params.uniqueCode; // Ambil uniqueCode dari params
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulasi pengambilan data status permohonan berdasarkan uniqueCode
    const fetchStatusData = async () => {
      try {
        // Ganti ini dengan API atau fungsi yang sesuai
        // Contoh: const response = await fetch(/api/status/${uniqueCode});
        // const data = await response.json();

        // Simulasi data
        const data = {
          status: "terkirim",
          description: "Permohonan Anda telah diterima dan sedang diproses.",
        };

        setStatusData(data);
      } catch (err) {
        setError("Gagal mengambil data status. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatusData();
  }, [uniqueCode]);

  useEffect(() => {
    // Tampilkan alert jika statusData berhasil dimuat
    if (statusData) {
      alert("Permohonan Anda berhasil dikirim!");
    }
  }, [statusData]);

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

  return (
    <>
      <NavbarPage />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-purple-600">
            Status Permohonan
          </h1>
          {statusData && (
            <>
              <p className="text-xl font-semibold text-green-600">
                {statusData.status}
              </p>
              <p className="text-gray-600 mt-2">{statusData.description}</p>
              <div className="mt-6">
                <button
                  onClick={() => router.push("/info")}
                  className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-200"
                >
                  Lihat Info
                </button>
                <button
                  onClick={() => router.push("/history")}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ml-2"
                >
                  Riwayat Permohonan
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StatusPage;
