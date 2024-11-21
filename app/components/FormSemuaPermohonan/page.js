"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import NavbarPage from "@/app/navigation/NavbarPage";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    category: "",
    codeOffice: "",
    description: "",
  });

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
      !formData.codeOffice ||
      !formData.description
    ) {
      setError("Semua field harus diisi.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.68.136:8000/api/submit-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Detail kesalahan:", errorData);
        setConsoleOutput(`Detail kesalahan: ${JSON.stringify(errorData)}`); // Simpan hasil console
        throw new Error(errorData.message || "Gagal mengirim permohonan.");
      }

      const result = await response.json();
      setConsoleOutput(
        `Permohonan berhasil dikirim: ${JSON.stringify(result)}`
      ); // Simpan hasil console

      // Set pesan sukses dengan kode unik
      setSuccessMessage(
        `Permohonan berhasil dikirim. Kode unik Anda: ${result.unique_code}`
      );

      // Reset form
      setFormData({
        name: "",
        date: "",
        category: "",
        codeOffice: "",
        description: "",
      });

      // Arahkan ke halaman StatusPage dengan kode unik sebagai parameter
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
    <>
      <NavbarPage />
      <div className="flex items-center justify-center min-h-screen p-8">
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
                <option value="aplikasi">Fasilitas Email</option>
                <option value="subdomain">Rekomendasi TIK</option>
                <option value="deploy">Reset akun</option>
                <option value="aplikasi">Hak Akses</option>
                <option value="deploy">Peminjaman Colocation</option>
                <option value="deploy">Peminjaman Alat Jaringan</option>
              </select>
            </div>

            {/* Code Office */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="codeOffice">
                Code Office:
              </label>
              <input
                type="text"
                id="codeOffice"
                name="codeOffice"
                value={formData.codeOffice}
                onChange={handleChange}
                required
                placeholder="Code Office"
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
    </>
  );
};

export default FormPage;
