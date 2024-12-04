// app/admin/dashboard.js
"use client";

import { useUser } from "@/app/context/UserContext";
import SuperAdminPanel from "@/app/components/SuperAdminPanel";
import AdministratorPanel from "@/app/components/AdministratorPanel";
import TechnicianPanel from "@/app/components/TechnicianPanel";
import ViewerPanel from "@/app/components/ViewerPanel";
import NavbarDashboard from "@/app/components/NavbarDashboard";

const page = () => {
  const { role } = useUser();

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

export default page;
