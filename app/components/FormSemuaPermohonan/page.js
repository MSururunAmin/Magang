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
    status: "Menunggu", // Tambahkan status default
  });

  const [file, setFile] = useState(null); // Tambahkan state untuk file
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState(""); // State untuk menampung hasil console
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validasi panjang codeOffice
    if (name === "codeOffice" && value.length > 8) {
      return; // Abaikan jika panjang melebihi 8 karakter
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Menyimpan file yang diunggah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    setConsoleOutput(""); // Reset hasil console

    // Validasi panjang codeOffice sebelum mengirim permohonan
    if (formData.codeOffice.length !== 8) {
      setError("Code Office harus memiliki panjang tepat 8 karakter.");
      setIsSubmitting(false);
      return;
    }

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

    if (!file) {
      setError("File harus diunggah.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("date", formData.date);
      data.append("category", formData.category);
      data.append("codeOffice", formData.codeOffice);
      data.append("description", formData.description);
      data.append("status", formData.status);
      data.append("file", file); // Tambahkan file ke FormData

      const response = await fetch(
        "http://127.0.0.1:8000/api/submit-request",
        {
          method: "POST",
          body: data, // Kirim data sebagai FormData
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
        status: "Menunggu",
      });
      setFile(null); // Reset file

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
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md sm:max-w-sm lg:max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-purple-600">
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

            {/* Unggah File */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="file">
                Unggah Surat (PDF/DOCX):
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
              />
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
        </div>
      </div>
    </>
  );
};

export default FormPage;
