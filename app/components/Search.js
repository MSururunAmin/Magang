"use client";
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation"; // Import useRouter

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Inisialisasi router

  const handleSearch = async () => {
    if (!query.trim()) return; // Jangan lakukan pencarian jika query kosong

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://192.168.100.8:8000/api/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 1) {
        // Jika hanya ada satu hasil, langsung arahkan ke halaman status
        router.push(`/status/${data[0].unique_code}`);
      } else {
        setResults(data); // Simpan hasil pencarian jika lebih dari satu hasil
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("Gagal memuat hasil pencarian.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-full max-w-lg mb-4">
        <input
          type="search"
          placeholder="Cek Status Permohonan Anda..."
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Cari saat tekan Enter
          className="rounded-lg p-2 text-lg w-full pl-12 text-white font-semibold border border-transparent bg-transparent focus:border-transparent focus:ring-0 transition-all placeholder:text-gray-400"
        />
        <MagnifyingGlass
          size={24}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
          onClick={handleSearch} // Cari saat ikon diklik
        />
      </div>

      {loading && <p>Memuat hasil pencarian...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-3xl">
        {results.map((result) => (
          <div
            key={`${result.category}-${result.id}`}
            className="bg-white p-4 rounded shadow mb-4 cursor-pointer"
            onClick={() => router.push(`/status/${result.unique_code}`)} // Navigasi ke status
          >
            <p className="text-lg font-bold">{result.name}</p>
            <p className="text-sm text-gray-500">Kategori: {result.category}</p>
            <p className="text-sm text-gray-500">Kode: {result.unique_code}</p>
            <p>{result.description}</p>
            <p className="text-sm text-gray-500">Status: {result.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
