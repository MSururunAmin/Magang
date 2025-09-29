"use client";

import { useState, useEffect } from "react";

const DashboardAdministrator = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/requests"
        );
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle reply logic
  const handleReply = async (id) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf, .docx, .doc";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/admin/reply/${id}`,
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();

          if (response.ok) {
            alert("Balasan berhasil dikirim.");
            // Perbarui status permohonan lokal
            const updatedRequests = requests.map((request) =>
              request.id === id
                ? { ...request, reply_file_url: file.name }
                : request
            );
            setRequests(updatedRequests);
          } else {
            alert(`Error: ${result.message}`);
          }
        } catch (error) {
          alert("Terjadi kesalahan saat mengirim balasan.");
        }
      }
    };

    fileInput.click();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{request.name}</td>
                <td className="border px-4 py-2">{request.date}</td>
                <td className="border px-4 py-2">{request.category}</td>
                <td className="border px-4 py-2">{request.status}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    {request.status === "Selesai" && request.reply_file_url ? (
                      <span
                        className="text-green-500 text-lg font-bold"
                        title="Balasan sudah dikirim"
                      >
                        ✔
                      </span>
                    ) : (
                      <button
                        onClick={() => handleReply(request.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        ✉ Kirim Balasan
                      </button>
                    )}
                    {request.proof_file_url && (
                      <a
                        href={request.proof_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                      >
                        Lihat Bukti
                      </a>
                    )}
                  </div>
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
