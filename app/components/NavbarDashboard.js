import Link from "next/link";

const NavbarDashboard = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-800 p-3 text-white">
      {/* Logo atau Judul */}
      <div className="text-lg font-bold">
        <Link href="/admin/dashboard">Dashboard Admin</Link>
      </div>

      {/* Navigasi */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/dashboard"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Statistik
        </Link>
        <Link
          href="/admin/ManagementLayanan"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Pengelolaan Layanan
        </Link>
        <Link
          href="/admin/ManagementRequest"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Permohonan
        </Link>
        <Link
          href="/admin/schedule"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Jadwal
        </Link>
        <Link
          href="/admin/Settings"
          className="px-5 py-2 hover:bg-purple-700 rounded"
        >
          Pengaturan
        </Link>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
