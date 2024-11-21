// components/Navbar.js
import Link from "next/link";

const Navbar = ({ userRole }) => (
  <nav className="bg-blue-600 text-white p-4">
    <Link href="/">Home</Link>
    {userRole === "Admin" && (
      <Link href="admin/Dashboard" className="ml-4">
        Dashboard
      </Link>
    )}
    <Link href="/request" className="ml-4">
      Permohonan
    </Link>
    {userRole === "TimTeknis" && (
      <Link href="/process" className="ml-4">
        Proses Permintaan
      </Link>
    )}
    {userRole === "Administrasi" && (
      <Link href="/complete" className="ml-4">
        Penyelesaian
      </Link>
    )}
  </nav>
);

export default Navbar;
