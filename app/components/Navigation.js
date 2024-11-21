import Link from "next/link";
import { useUser } from "@/app/context/UserContext"; // Mengambil role dari UserContext
import { useRouter } from "next/navigation";
import { User } from "@phosphor-icons/react";

const Navigation = () => {
  const { role, setRole } = useUser(); // Menambahkan `role` ke context
  const router = useRouter();

  const handleLogout = () => {
    setRole(null); // Menghapus role pengguna
    router.push("/auth/login"); // Mengarahkan kembali ke halaman login
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Bagian Kiri: Link ke Dashboard */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/dashboard" className="text-lg font-semibold">
          Dashboard
        </Link>
      </div>

      {/* Bagian Kanan: Role dan Tombol Logout */}
      <div className="flex items-center space-x-4">
        {/* Menampilkan role pengguna */}
        <span className="font-semibold capitalize">{role}</span>
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

export default Navigation;
