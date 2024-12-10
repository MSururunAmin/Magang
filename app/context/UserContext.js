"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState("");

  // Load role from localStorage when the component mounts
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Update role in localStorage whenever it changes
  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  return (
    <UserContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
