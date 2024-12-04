"use client";

import { useState, useEffect } from "react";

const DashboardAdministrator = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  // Ambil data dari API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://192.168.100.8:8000/api/admin/requests"
        );
        const data = await response.json();
        setRequests(data); // Simpan data ke state
        setLoading(false); // Matikan loading
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
        // Balasan otomatis
        const predefinedMessages = [
          "Permohonan Anda sedang diproses.",
          "Dokumen telah diterima, kami akan segera menindaklanjuti.",
          "Permohonan Anda disetujui. Silakan cek detail lebih lanjut.",
          "Mohon lengkapi dokumen yang kurang.",
        ];

        // Pilihan balasan otomatis
        const selectedMessage = await new Promise((resolve) => {
          const select = document.createElement("select");
          select.style.margin = "10px 0";
          select.innerHTML = predefinedMessages
            .map((msg) => `<option value="${msg}">${msg}</option>`)
            .join("");

          const confirmButton = document.createElement("button");
          confirmButton.textContent = "Kirim Balasan";
          confirmButton.style.marginLeft = "10px";
          confirmButton.onclick = () => resolve(select.value);

          document.body.appendChild(select);
          document.body.appendChild(confirmButton);
        });

        if (selectedMessage) {
          const formData = new FormData();
          formData.append("message", selectedMessage);
          formData.append("file", file);

          try {
            const response = await fetch(
              `http://192.168.100.8:8000/api/admin/reply/${id}`,
              {
                method: "POST",
                body: formData,
              }
            );

            const result = await response.json();

            if (response.ok) {
              alert(`Balasan berhasil dikirim: ${result.message}`);
            } else {
              alert(`Error: ${result.message}`);
            }
          } catch (error) {
            alert("Terjadi kesalahan saat mengirim balasan");
          }
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
                  <button
                    onClick={() => handleReply(request.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    ✉ Balas
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
