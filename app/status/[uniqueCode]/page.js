"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarPage from "@/app/navigation/NavbarPage";

const StatusPage = ({ params }) => {
  const router = useRouter();
  const uniqueCode = params.uniqueCode;
  const [statusData, setStatusData] = useState(null); // Data status permohonan
  const [replyFileUrl, setReplyFileUrl] = useState(null); // URL file balasan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatusAndReply = async () => {
      try {
        // Panggil kedua API secara paralel
        const [statusResponse, replyResponse] = await Promise.all([
          fetch(`http://192.168.100.8:8000/api/status/${uniqueCode}`),
          fetch(`http://192.168.100.8:8000/api/reply/${uniqueCode}`),
        ]);

        if (!statusResponse.ok) {
          throw new Error("Gagal mengambil data status. Silakan coba lagi.");
        }
        if (!replyResponse.ok && replyResponse.status !== 404) {
          throw new Error("Gagal mengambil data surat balasan.");
        }

        const statusData = await statusResponse.json();
        const replyData = replyResponse.ok ? await replyResponse.json() : null;

        // Simpan data ke state
        setStatusData(statusData);
        setReplyFileUrl(replyData?.reply_file_url || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusAndReply();
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
    { label: "Terkirim", icon: "🚚💨" },
    { label: "Diterima", icon: "🤲" },
    { label: "Diproses", icon: "⌛" },
    { label: "Selesai", icon: "✅" },
  ];

  const currentStepIndex = statusSteps.findIndex(
    (step) => step.label === statusData.currentStatus
  );
  const isStatusValid = currentStepIndex !== -1;

  if (!isStatusValid) {
    return (
      <div className="text-center text-red-500">
        Status permohonan tidak valid.
        <button
          onClick={() => router.push("/status")}
          className="mt-4 text-blue-500 underline"
        >
          Kembali ke halaman cek status
        </button>
      </div>
    );
  }
  const handleDownload = () => {
    if (statusData.reply_file_url) {
      window.open(statusData.reply_file_url, "_blank", "noopener,noreferrer");
    } else {
      alert("File tidak tersedia");
    }
  };

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
                  index < currentStepIndex
                    ? "text-green-600"
                    : index === currentStepIndex
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
          {statusData.timeline && statusData.timeline.length > 0 ? (
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
          ) : (
            <div className="text-center text-gray-500">
              Timeline belum tersedia untuk permohonan ini.
            </div>
          )}

          {/* Tombol Unduh jika file balasan tersedia */}
          {statusData.reply_file_url && (
            <div className="flex justify-center items-center ">
              <button
                onClick={handleDownload}
                className="flex flex-row bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Unduh Balasan
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatusPage;
