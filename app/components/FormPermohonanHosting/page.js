"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarPage from "@/app/navigation/NavbarPage";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    category: "",
    codeOffice: "",
    description: "",
    proof: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    setConsoleOutput("");

    // Validasi panjang codeOffice harus tepat 8 karakter
    if (formData.codeOffice.length !== 8) {
      setError("Code Office harus tepat 8 karakter.");
      setIsSubmitting(false);
      return;
    }

    if (
      !formData.name ||
      !formData.date ||
      !formData.category ||
      !formData.codeOffice
    ) {
      setError("Semua field yang diperlukan harus diisi.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "proof" && !formData[key]) continue;
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(
        "http://192.168.100.8:8000/api/hosting-request",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setConsoleOutput(`Detail kesalahan: ${JSON.stringify(errorData)}`);
        throw new Error(errorData.message || "Gagal mengirim permohonan.");
      }

      const result = await response.json();
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
        codeOffice: "",
        description: "",
        proof: null,
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
                <option value="aplikasi">Aplikasi</option>
                <option value="subdomain">Subdomain</option>
                <option value="deploy">Deploy</option>
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
                maxLength="8" // Membatasi input ke maksimal 8 karakter
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
              />
            </div>

            {/* Keterangan (opsional) */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="description">
                Keterangan (opsional):
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Keterangan"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
              ></textarea>
            </div>

            {/* Upload Bukti (opsional) */}
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="proof">
                Unggah Bukti (opsional):
              </label>
              <input
                type="file"
                id="proof"
                name="proof"
                onChange={handleChange}
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
