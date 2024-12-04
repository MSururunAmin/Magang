"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    category: "",
    uploadFile: "",
    description: "",
  });
  const [uploadFile, setUploadFile] = useState(null); // State khusus untuk file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState(""); // State untuk menampung hasil console
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file); // Set file ke state
      console.log("File dipilih:", file.name); // Untuk debugging di console
      setConsoleOutput(`File dipilih: ${file.name}`); // Menyimpan output file yang dipilih
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    setConsoleOutput(""); // Reset hasil console

    if (
      !formData.name ||
      !formData.date ||
      !formData.category ||
      !uploadFile || // Pastikan file sudah ada
      !formData.description
    ) {
      setError("Semua field harus diisi.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Gunakan FormData untuk mengirimkan file
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("uploadFile", uploadFile); // Append file
      formDataToSend.append("description", formData.description);

      const response = await fetch(
        "http://192.168.100.8:8000/api/submit-form",
        {
          method: "POST",
          body: formDataToSend, // Kirim FormData, bukan JSON
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Detail kesalahan:", errorData);
        setConsoleOutput(`Detail kesalahan: ${JSON.stringify(errorData)}`);
        throw new Error(errorData.message || "Gagal mengirim permohonan.");
      }

      const result = await response.json();
      console.log("Permohonan berhasil dikirim:", result);
      setConsoleOutput(
        `Permohonan berhasil dikirim: ${JSON.stringify(result)}`
      );

      setSuccessMessage(
        `Permohonan berhasil dikirim. Kode unik Anda: ${result.unique_code}`
      );
      setFormData({
        name: "",
        date: "",
        category: "",
        uploadFile: "",
        description: "",
      });

      router.push(`/status?uniqueCode=${result.unique_code}`);
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      setError(
        "Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">
          FORMULIR
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Nama:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Asal instansi"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Tanggal */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="date">
              Tanggal:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Kategori */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="category">
              Kategori:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              <option value="jaringan">Jaringan</option>
              <option value="web">Web</option>
              <option value="server">Server</option>
            </select>
          </div>

          {/* Bukti Pengiriman */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="uploadFile">
              Bukti Pengiriman (Foto/Dokumen):
            </label>
            <input
              type="file"
              id="uploadFile"
              name="uploadFile"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>

          {/* Keterangan */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Keterangan:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Keterangan"
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
            ></textarea>
          </div>

          {/* Tombol Kirim */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Mengirim..." : "Kirim Permohonan"}
          </button>
        </form>
        {/* Menampilkan hasil console */}
        {consoleOutput && (
          <div className="mt-6 p-4 bg-gray-200 rounded-md">
            <h2 className="text-lg font-bold mb-2">Hasil Console:</h2>
            <pre className="text-sm">{consoleOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;
