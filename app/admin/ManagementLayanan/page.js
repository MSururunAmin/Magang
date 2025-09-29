"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import SuperAdminPanel from "@/app/components/SuperAdminPanel";
import AdministratorPanel from "@/app/components/AdministratorPanel";
import TechnicianPanel from "@/app/components/TechnicianPanel";
import ViewerPanel from "@/app/components/ViewerPanel";
import NavbarDashboard from "@/app/components/NavbarDashboard";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * LayananPage is a Next.js page that handles the rendering of the layanan page based on the user's role.
 *
 * If the user is not logged in (i.e., the role is not set), the page will redirect to the login page.
 *
 * If the user is logged in, the page will render the corresponding component based on the user's role.
 *
 * The supported roles are "Super-admin", "Administrator", "Teknisi", and "Viewer". Each role will render a different component.
/*******  941263a7-92ec-4a2c-b2bc-840c108540fa  *******/
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
