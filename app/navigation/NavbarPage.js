import Link from "next/link";
import Image from "next/image";

const NavbarPage = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-800 p-3 text-white">
      {/* Bagian logo dan teks di sebelah kiri */}
      <Link href="/" passHref>
        <div className="flex items-center px-5 py-2 cursor-pointer">
          <Image
            src="/images/kominfo.png" // Sesuaikan path gambar
            alt="Logo Kominfo"
            width={40} // Atur lebar gambar
            height={40} // Atur tinggi gambar
            className="mr-2"
          />
          <h1>Layanan Aptika</h1>
        </div>
      </Link>

      {/* Bagian navigasi kanan */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="px-5 py-2 hover:bg-purple-700 rounded">
          Beranda
        </Link>
        <Link
          href="/components/FormStatus"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Informasi Permohonan
        </Link>
        <Link href="/faq" className="px-5 py-2 hover:bg-purple-700 rounded">
          FAQ
        </Link>
        <Link
          href="/tentangkami"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Tentang Kami
        </Link>
        <Link href="/auth/login" className="px-5 py-2 hover:bg-purple-700 rounded">
        Login</Link>
      </div>
    </nav>
  );
};

export default NavbarPage;
