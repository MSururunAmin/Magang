"use client";

import { useState, useEffect } from "react";

const TechnicianDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicianRequests = async () => {
      setLoading(true); // Tampilkan loader
      setError(null); // Reset error

      try {
        const response = await fetch(
          "http://192.168.43.47:8000/api/technician/requests",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("HTTP error! Status: ${response.status}");
        }

        const data = await response.json();
        console.log("Data fetched:", data); // Cek data di console
        setRequests(data); // Simpan data ke state
      } catch (err) {
        console.error("Error fetching technician requests:", err);
        setError("Gagal memuat data, silakan coba lagi.");
      } finally {
        setLoading(false); // Sembunyikan loader
      }
    };

    fetchTechnicianRequests();
  }, []);

  const updateStatus = async (identifier, newStatus) => {
    const { id, category } = identifier;

    try {
      const response = await fetch(
        "http://192.168.43.47:8000/api/technician/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, category, status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui status");
      }

      const result = await response.json();
      console.log("Response dari backend:", result);

      // Perbarui status di UI
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id && request.category === category
            ? { ...request, status: newStatus }
            : request
        )
      );

      alert(
        `Permohonan dengan ID ${id} dan kategori ${category} diperbarui menjadi ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const stats = {
    total: requests.length,
    waiting: requests.filter((req) => req.status === "Menunggu").length,
    accepted: requests.filter((req) => req.status === "Diterima").length,
    inProgress: requests.filter((req) => req.status === "Diproses").length,
    completed: requests.filter((req) => req.status === "Selesai").length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6 space-y-6">
        {loading && <p>Memuat data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Statistik Ringkasan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Permohonan"
                value={stats.total}
                subtitle="Jumlah semua permohonan"
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
                    <th className="p-3 border border-gray-200">
                      Nama Pengirim
                    </th>
                    <th className="p-3 border border-gray-200">Tanggal</th>
                    <th className="p-3 border border-gray-200">Kode Form</th>
                    <th className="p-3 border border-gray-200">Keterangan</th>
                    <th className="p-3 border border-gray-200">Bukti</th>
                    <th className="p-3 border border-gray-200">Status</th>
                    <th className="p-3 border border-gray-200">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="text-sm">
                      <td className="p-3 border border-gray-200">
                        {request.id}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {request.name}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {request.date}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {request.unique_code}
                      </td>
                      <td className="p-3 border border-gray-200">
                        {request.description}
                      </td>
                      <td className="p-3 border border-gray-200">
                        <a
                          href={"${request.proof}"}
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
                        {request.status === "Terkirim" && (
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() =>
                                updateStatus(
                                  {
                                    id: request.id,
                                    category: request.category,
                                  },
                                  "Diterima"
                                )
                              }
                              className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                              Terima
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(
                                  {
                                    id: request.id,
                                    category: request.category,
                                  },
                                  "Ditolak"
                                )
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Tolak
                            </button>
                          </div>
                        )}
                        {request.status === "Diterima" && (
                          <button
                            onClick={() =>
                              updateStatus(
                                { id: request.id, category: request.category },
                                "Diproses"
                              )
                            }
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Proses
                          </button>
                        )}
                        {request.status === "Diproses" && (
                          <button
                            onClick={() =>
                              updateStatus(
                                { id: request.id, category: request.category },
                                "Selesai"
                              )
                            }
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
          </>
        )}
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

export default TechnicianDashboard;
