"use client";

import { useState } from "react";

const DashboardAdministrator = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      applicant: "John Doe",
      date: "2024-01-20",
      serviceType: "Permohonan Hosting",
      codeOffice: "CO-001",
      status: "Menunggu",
    },
    {
      id: 2,
      applicant: "Jane Smith",
      date: "2024-01-19",
      serviceType: "Permohonan Email",
      codeOffice: "CO-002",
      status: "Diproses",
    },
    {
      id: 3,
      applicant: "Bob Johnson",
      date: "2024-01-18",
      serviceType: "Troubleshoot Jaringan",
      codeOffice: "CO-003",
      status: "Selesai",
    },
  ]);

  const handleReply = (id) => {
    const message = prompt(
      `Masukkan pesan balasan untuk permohonan dengan ID ${id}:`
    );
    if (message) {
      alert(`Balasan telah dikirim: ${message}`);
      // Tambahkan logika pengiriman balasan (misalnya, API call di sini)
    } else {
      alert("Balasan tidak boleh kosong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Statistik */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Permohonan Baru"
          value={requests.filter((req) => req.status === "Menunggu").length}
        />
        <StatCard
          title="Sedang Diproses"
          value={requests.filter((req) => req.status === "Diproses").length}
        />
        <StatCard
          title="Selesai"
          value={requests.filter((req) => req.status === "Selesai").length}
        />
      </div>

      {/* Daftar Permohonan Terbaru */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          Daftar Permohonan Terbaru
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">No</th>
              <th className="border px-4 py-2 text-left">Pemohon</th>
              <th className="border px-4 py-2 text-left">Tanggal</th>
              <th className="border px-4 py-2 text-left">Jenis Layanan</th>
              <th className="border px-4 py-2 text-left">Code Office</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{request.applicant}</td>
                <td className="border px-4 py-2">{request.date}</td>
                <td className="border px-4 py-2">{request.serviceType}</td>
                <td className="border px-4 py-2">{request.codeOffice}</td>
                <td className="border px-4 py-2">{request.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleReply(request.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    ✉️ Balas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white flex items-center justify-center p-4 rounded shadow">
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-800">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </div>
);

export default DashboardAdministrator;
