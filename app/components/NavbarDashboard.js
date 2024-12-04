import Link from "next/link";
import { useUser } from "@/app/context/UserContext"; // Mengambil role dari UserContext
import { useRouter } from "next/navigation";
import { User } from "@phosphor-icons/react";

const NavbarDashboard = () => {
  const { role, setRole } = useUser(); // Menambahkan `role` ke context
  const router = useRouter();

  const handleLogout = () => {
    setRole(null); // Menghapus role pengguna
    router.push("/auth/login"); // Mengarahkan kembali ke halaman login
  };

  return (
    <nav className="flex justify-between items-center bg-blue-800 p-3 text-white">
      {/* Logo atau Judul */}
      <div className="text-lg font-bold">
        <Link href="/admin/dashboard">Dashboard Admin</Link>
      </div>

      {/* Navigasi Tengah */}
      <div className="flex-1 flex justify-center space-x-8">
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
          Riwayat Permohonan
        </Link>
      </div>

      {/* Info Role dan Logout */}
      <div className="flex items-center space-x-4">
        <span>{role}</span>
        <button
          onClick={handleLogout}
          className="text-white font-semibold py-0 px-2 rounded"
        >
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
