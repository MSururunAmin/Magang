"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi
import NavbarPage from "@/app/navigation/NavbarPage";

const StatusCheckPage = () => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Gunakan router untuk redirect

  const handleInputChange = (e) => {
    setUniqueCode(e.target.value);
  };

  const handleCheckStatus = (e) => {
    e.preventDefault();
    setError(null);

    if (!uniqueCode) {
      setError("Kode unik harus diisi.");
      return;
    }

    // Redirect ke halaman status dengan kode unik sebagai parameter di URL
    router.push(`/status/${uniqueCode}`);
  };

  return (
    <>
      <NavbarPage />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-purple-600">
      Informasi surat
          </h1>

          <form onSubmit={handleCheckStatus} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="uniqueCode">
                Masukkan Kode Unik Anda:
              </label>
              <input
                type="text"
                id="uniqueCode"
                value={uniqueCode}
                onChange={handleInputChange}
                placeholder="Masukkan kode unik"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition duration-200`}
            >
              Cek Status
            </button>
          </form>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default StatusCheckPage;
