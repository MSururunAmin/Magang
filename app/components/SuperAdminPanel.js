"use client";

import { useState } from "react";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmad Susanto",
      email: "ahmad.susanto@diskominfo.id",
      role: "Kepala Bidang",
      lastActive: "2 jam yang lalu",
      active: true,
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi.santoso@diskominfo.id",
      role: "Staff",
      lastActive: "30 menit yang lalu",
      active: true,
    },
    {
      id: 3,
      name: "Ratna Dewi",
      email: "ratna.dewi@diskominfo.id",
      role: "Admin",
      lastActive: "1 jam yang lalu",
      active: true,
    },
  ]);

  const [logs] = useState([
    "Pengguna baru ditambahkan: Maria Putri",
    "Perubahan role Budi Santoso (Staff → Kepala Bidang)",
    "Backup sistem berhasil dilakukan",
    "Pembaruan sistem ke versi 2.1.0",
  ]);

  const handleDeactivateUser = (id) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, active: false } : user))
    );
    alert(`Pengguna dengan ID ${id} dinonaktifkan`);
  };

  const handleEditUser = (id) => {
    const newName = prompt("Masukkan nama baru:");
    if (newName) {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, name: newName } : user
        )
      );
      alert(`Nama pengguna dengan ID ${id} telah diubah menjadi ${newName}`);
    }
  };

  const handleAddUser = () => {
    const name = prompt("Masukkan nama pengguna:");
    const email = prompt("Masukkan email pengguna:");
    const role = prompt("Masukkan role pengguna:");
    if (name && email && role) {
      const newUser = {
        id: users.length + 1,
        name,
        email,
        role,
        lastActive: "baru saja",
        active: true,
      };
      setUsers([...users, newUser]);
      alert(`Pengguna baru ${name} telah ditambahkan`);
    } else {
      alert("Semua data pengguna harus diisi!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-6">
        {/* Statistik Panel */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Pengguna"
            value={users.length}
            subtitle="Jumlah pengguna yang terdaftar"
          />
          <StatCard
            title="Admin"
            value={users.filter((user) => user.role === "Admin").length}
            subtitle="Jumlah admin"
          />
          <StatCard
            title="Kepala Bidang"
            value={users.filter((user) => user.role === "Kepala Bidang").length}
            subtitle="Jumlah kepala bidang"
          />
          <StatCard
            title="Staff"
            value={users.filter((user) => user.role === "Staff").length}
            subtitle="Jumlah staff"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Manajemen Pengguna */}
          <div className="col-span-2 bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Manajemen Pengguna</h2>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                + Tambah Pengguna
              </button>
            </div>
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex justify-between items-center border-b py-3 last:border-b-0 ${
                  user.active ? "" : "bg-gray-100"
                }`}
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400">
                    Terakhir aktif: {user.lastActive}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="text-sm bg-gray-200 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeactivateUser(user.id)}
                    className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded"
                  >
                    {user.active ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Log Sistem */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Log Sistem</h2>
            <ul className="space-y-3">
              {logs.map((log, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 border-b pb-2 last:border-b-0"
                >
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistik Aktivitas Sistem */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Statistik Aktivitas Sistem
          </h2>
          <div>
            <Chart />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col items-center">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
    <p className="text-xs text-gray-400">{subtitle}</p>
  </div>
);

const Chart = () => {
  // Dummy chart component
  return (
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      <p className="text-sm text-gray-500">Chart Placeholder</p>
    </div>
  );
};

export default SuperAdminDashboard;
