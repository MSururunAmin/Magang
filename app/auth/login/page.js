"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setRole } = useUser();
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      setRole("Super-admin");
    } else if (username === "teknisi" && password === "password") {
      setRole("Teknisi");
    } else if (username === "administrator" && password === "password") {
      setRole("Administrator");
    } else if (username === "viewer" && password === "password") {
      setRole("Viewer");
    } else {
      alert("Username atau Password salah!");
      return;
    }

    localStorage.setItem("username", username);

    router.push("/admin/dashboard");
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    localStorage.setItem("username", value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center background">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white/20 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1 bg-white/10 text-white placeholder-gray-300"
              placeholder="Masukkan username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1 bg-white/10 text-white placeholder-gray-300"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500/50 text-white p-2 rounded hover:bg-blue-600/70"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
