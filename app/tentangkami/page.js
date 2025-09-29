"use client";
import Image from "next/image";
import NavbarPage from "../navigation/NavbarPage";

const TentangKami = () => {
  return (
    <>
      <NavbarPage />
      <div className=" min-h-screen py-10">
        <div className="container mx-auto px-6">
          {/* Judul Halaman */}
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
            Tentang Kami
          </h1>

          {/* Gambar Hero */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/diskominfo.jpg" // Ganti dengan path gambar yang benar
              alt="Diskominfo Kab. Semarang"
              width={600}
              height={300}
              className="rounded-lg shadow-lg"
              priority // Ensure this image loads quickly
            />
          </div>

          {/* Konten Tentang Kami */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Dinas Komunikasi dan Informatika Kabupaten Semarang
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Dinas Komunikasi dan Informatika (Diskominfo) Kabupaten Semarang
              bertanggung jawab atas pengelolaan, pengembangan, serta
              pelaksanaan kegiatan di bidang komunikasi, informatika, dan
              statistik di Kabupaten Semarang. Kami berperan dalam memastikan
              penyampaian informasi yang efektif dan transparan kepada
              masyarakat, serta memfasilitasi perkembangan teknologi informasi
              yang bermanfaat bagi seluruh lapisan masyarakat.
            </p>

            <h3 className="text-xl font-semibold text-blue-800 mb-3">Visi</h3>
            <p className="text-gray-700 mb-6">
              &quot;Terwujudnya Tata Kelola Pemerintahan yang Berbasis Teknologi
              Informasi dan Komunikasi untuk Kesejahteraan Masyarakat.&quot;
            </p>

            <h3 className="text-xl font-semibold text-blue-800 mb-3">Misi</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>
                Meningkatkan kualitas pelayanan publik berbasis teknologi
                informasi.
              </li>
              <li>
                Memperkuat keamanan informasi dan jaringan komunikasi pemerintah
                daerah.
              </li>
              <li>
                Mengembangkan infrastruktur teknologi informasi di wilayah
                Kabupaten Semarang.
              </li>
              <li>
                Memfasilitasi penyebaran informasi yang cepat, akurat, dan
                transparan.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              Fungsi dan Tugas
            </h3>
            <p className="text-gray-700 mb-6">
              Diskominfo Kabupaten Semarang berfungsi untuk menyelenggarakan
              urusan pemerintahan di bidang komunikasi dan informatika, meliputi
              pengembangan aplikasi dan infrastruktur teknologi informasi,
              layanan komunikasi publik, serta penyelenggaraan informasi
              statistik daerah.
            </p>

            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              Kontak Kami
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Alamat:</strong> Jl. Diponegoro No.12, Ungaran, Kabupaten
              Semarang, Jawa Tengah
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:diskominfo@kabsemarang.go.id"
                className="text-blue-600 underline"
              >
                diskominfo@kabsemarang.go.id
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Telepon:</strong> (024) 6921234
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TentangKami;
