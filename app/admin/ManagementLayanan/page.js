"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import SuperAdminPanel from "@/app/components/SuperAdminPanel";
import AdministratorPanel from "@/app/components/AdministratorPanel";
import TechnicianPanel from "@/app/components/TechnicianPanel";
import ViewerPanel from "@/app/components/ViewerPanel";
import NavbarDashboard from "@/app/components/NavbarDashboard";

const LayananPage = () => {
  const { role } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!role) {
      // Redirect to login if role is not set
      router.push("/auth/login");
    }
  }, [role, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard />
      <div className="p-6">
        {/* Render fitur berdasarkan role */}
        {role === "Super-admin" && <SuperAdminPanel />}
        {role === "Administrator" && <AdministratorPanel />}
        {role === "Teknisi" && <TechnicianPanel />}
        {role === "Viewer" && <ViewerPanel />}
      </div>
    </div>
  );
};

export default LayananPage;
