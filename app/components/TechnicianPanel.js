"use client";

import { useState } from "react";

const TechnicianDashboard = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      sender: "Ahmad Susanto",
      date: "2024-11-20",
      codeOffice: "DISK-001",
      description: "Permohonan perbaikan jaringan",
      proof: "bukti-perbaikan.jpg",
      status: "Menunggu",
    },
    {
      id: 2,
      sender: "Budi Santoso",
      date: "2024-11-19",
      codeOffice: "DISK-002",
      description: "Permohonan instalasi server",
      proof: "bukti-instalasi.jpg",
      status: "Menunggu",
    },
    {
      id: 3,
      sender: "Siti Aminah",
      date: "2024-11-18",
      codeOffice: "DISK-003",
      description: "Permohonan upgrade perangkat",
      proof: "bukti-upgrade.jpg",
      status: "Diterima",
    },
  ]);

  // Fungsi untuk memperbarui status permohonan
  const updateStatus = (id, newStatus) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    alert(`Permohonan dengan ID ${id} diperbarui menjadi ${newStatus}`);
  };

  // Hitung statistik
  const stats = {
    total: requests.length,
    waiting: requests.filter((req) => req.status === "Menunggu").length,
    accepted: requests.filter((req) => req.status === "Diterima").length,
    inProgress: requests.filter((req) => req.status === "Diproses").length,
    completed: requests.filter((req) => req.status === "Selesai").length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Statistik Ringkasan (Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Permohonan"
            value={stats.total}
            subtitle="Jumlah semua permohonan"
          />
          <StatCard
            title="Menunggu"
            value={stats.waiting}
            subtitle="Permohonan belum ditindaklanjuti"
          />
          <StatCard
            title="Diterima"
            value={stats.accepted}
            subtitle="Permohonan sudah diterima"
          />
          <StatCard
            title="Diproses"
            value={stats.inProgress}
            subtitle="Permohonan sedang diproses"
          />
          <StatCard
            title="Selesai"
            value={stats.completed}
            subtitle="Permohonan telah selesai"
          />
        </div>

        {/* Daftar Permohonan */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Daftar Permohonan</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3 border border-gray-200">ID</th>
                <th className="p-3 border border-gray-200">Nama Pengirim</th>
                <th className="p-3 border border-gray-200">Tanggal</th>
                <th className="p-3 border border-gray-200">Code Office</th>
                <th className="p-3 border border-gray-200">Keterangan</th>
                <th className="p-3 border border-gray-200">Bukti</th>
                <th className="p-3 border border-gray-200">Status</th>
                <th className="p-3 border border-gray-200">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="text-sm">
                  <td className="p-3 border border-gray-200">{request.id}</td>
                  <td className="p-3 border border-gray-200">
                    {request.sender}
                  </td>
                  <td className="p-3 border border-gray-200">{request.date}</td>
                  <td className="p-3 border border-gray-200">
                    {request.codeOffice}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {request.description}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <a
                      href={`/uploads/${request.proof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Lihat Bukti
                    </a>
                  </td>
                  <td className="p-3 border border-gray-200">
                    {request.status}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {request.status === "Menunggu" && (
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => updateStatus(request.id, "Diterima")}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() => updateStatus(request.id, "Ditolak")}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Tolak
                        </button>
                      </div>
                    )}
                    {request.status === "Diterima" && (
                      <button
                        onClick={() => updateStatus(request.id, "Diproses")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Proses
                      </button>
                    )}
                    {request.status === "Diproses" && (
                      <button
                        onClick={() => updateStatus(request.id, "Selesai")}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Selesai
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistik Aktivitas Sistem */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Statistik Aktivitas Sistem
          </h2>
          <div>
            <Chart />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col items-center">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
    <p className="text-xs text-gray-400">{subtitle}</p>
  </div>
);

const Chart = () => {
  // Dummy chart component
  return (
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      <p className="text-sm text-gray-500">Chart Placeholder</p>
    </div>
  );
};

export default TechnicianDashboard;
