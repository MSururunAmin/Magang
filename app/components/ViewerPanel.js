"use client";

import { useEffect, useState } from "react";

const ViewerDashboard = () => {
  const [data, setData] = useState({
    totalPermohonan: 127,
    dalamProses: 45,
    selesai: 72,
    ditolak: 10,
    permohonanTerkini: [
      {
        id: "P123",
        title: "Pengajuan Maintenance Server",
        status: "Dalam Proses",
      },
      { id: "P124", title: "Permohonan Bandwidth Tambahan", status: "Selesai" },
      {
        id: "P125",
        title: "Penggantian Perangkat Jaringan",
        status: "Menunggu",
      },
    ],
    logAktivitas: [
      "Permohonan #123 sedang diproses oleh Tim A",
      "Permohonan #124 selesai",
      "Permohonan #125 diterima dan menunggu respon teknisi",
    ],
    statistik: [50, 60, 45, 70, 90, 80, 72], // Data dummy statistik penyelesaian permohonan
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        {/* Statistik Panel */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Permohonan" value={data.totalPermohonan} />
          <StatCard title="Dalam Proses" value={data.dalamProses} />
          <StatCard title="Selesai" value={data.selesai} />
          <StatCard title="Ditolak" value={data.ditolak} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Permohonan Terkini */}
          <div className="col-span-2 bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Permohonan Terkini</h2>
            {data.permohonanTerkini.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">Permohonan #{item.id}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Menunggu"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Log Aktivitas */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Log Aktivitas</h2>
            <ul className="space-y-3">
              {data.logAktivitas.map((log, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 border-b pb-2 last:border-b-0"
                >
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistik Penyelesaian */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Statistik Penyelesaian Permohonan
          </h2>
          <div>
            <Chart data={data.statistik} />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col items-center">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

const Chart = ({ data }) => {
  // Dummy chart component
  return (
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      <p className="text-sm text-gray-500">Chart Placeholder</p>
    </div>
  );
};

export default ViewerDashboard;
