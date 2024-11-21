"use client";

import NavbarPage from "../navigation/NavbarPage";

const InfoPage = () => {
  return (
    <>
      <NavbarPage />
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-purple-600">
            Informasi Permohonan
          </h1>

          <h2 className="text-xl font-semibold mt-4">Deskripsi Proses</h2>
          <p className="text-gray-700 mt-2">
            Proses permohonan melibatkan beberapa langkah, mulai dari pengajuan
            hingga persetujuan. Biasanya, permohonan akan diproses dalam waktu
            3-5 hari kerja.
          </p>

          <h2 className="text-xl font-semibold mt-4">Persyaratan</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>Surat Permohonan</li>
            <li>Dokumen pendukung lainnya</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4">Kontak untuk Dukungan</h2>
          <p className="text-gray-700 mt-2">
            Untuk pertanyaan lebih lanjut, silakan hubungi:
          </p>
          <p className="text-gray-700">Email: kominfo@semarangkab.go</p>
          <p className="text-gray-700">Telepon: (024) 76901553</p>

          <h2 className="text-xl font-semibold mt-4">FAQ</h2>
          <p className="text-gray-700 mt-2">
            <strong>Q:</strong> Apa yang harus dilakukan jika permohonan saya
            ditolak?
          </p>
          <p className="text-gray-700">
            <strong>A:</strong> Anda dapat mengajukan banding dengan melengkapi
            dokumen yang diperlukan.
          </p>

          <h2 className="text-xl font-semibold mt-4">Kebijakan Privasi</h2>
          <p className="text-gray-700 mt-2">
            Data Anda akan digunakan hanya untuk tujuan pemrosesan permohonan
            dan akan dilindungi sesuai dengan kebijakan privasi kami.
          </p>

          <div className="mt-6"></div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
