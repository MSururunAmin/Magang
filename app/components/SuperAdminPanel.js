"use client";

import { useEffect, useState } from "react";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch users from API
    fetch("http://192.168.100.67:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const addLog = (message) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      `[${new Date().toLocaleString()}] ${message}`,
    ]);
  };

  const handleAddUser = async () => {
    const name = prompt("Masukkan nama pengguna:");
    const email = prompt("Masukkan email pengguna:");
    const role = prompt("Masukkan role pengguna:");
    if (name && email && role) {
      try {
        const response = await fetch("http://192.168.100.67:8000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, role }),
        });
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        addLog(`Pengguna baru ditambahkan: ${name} (${role})`);
        alert(`Pengguna baru ${name} telah ditambahkan`);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    } else {
      alert("Semua data pengguna harus diisi!");
    }
  };

  const handleEditUser = async (id) => {
    const newName = prompt("Masukkan nama baru:");
    if (newName) {
      try {
        const response = await fetch(
          "http://192.168.100.67:8000/api/users/${id}",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName }),
          }
        );
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          )
        );
        addLog(`Nama pengguna dengan ID ${id} diubah menjadi ${newName}`);
        alert(`Nama pengguna dengan ID ${id} telah diubah menjadi ${newName}`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleDeactivateUser = async (id, isActive) => {
    try {
      const action = isActive ? "deactivate" : "reactivate"; // Tentukan tindakan berdasarkan status aktif
      const response = await fetch(
        "http://192.168.100.67:8000/api/users/${id}/${action}",
        {
          method: "PATCH",
        }
      );
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, active: updatedUser.active } : user
        )
      );
      const status = isActive ? "dinonaktifkan" : "diaktifkan kembali";
      addLog(`Pengguna dengan ID ${id} telah ${status}`);
      alert(`Pengguna dengan ID ${id} ${status}`);
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
                    Terakhir aktif: {user.lastActive || "Tidak diketahui"}
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
                    onClick={() => handleDeactivateUser(user.id, user.active)}
                    className={`text-sm px-3 py-1 rounded ${
                      user.active
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.active ? "Nonaktifkan" : "Aktifkan Kembali"}
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

export default SuperAdminDashboard;
