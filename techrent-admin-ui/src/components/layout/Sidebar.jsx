// src/components/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { sidebarItems } from "../../config/sidebarItems";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // token clear
    navigate("/login", { replace: true }); // login পেজে পাঠাবে
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#00A1FF] to-[#0F1F3D] text-white py-6 z-40 transform transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <motion.span
            className="text-2xl font-semibold tracking-wide"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            TechRent
          </motion.span>
        </div>

        {/* Menu Items - scrollable */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item, idx) => {
            const isActive = idx === 0;
            return (
              <button
                key={item.key}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-white text-[#0F1F3D]"
                    : "hover:bg-white/20 text-white/90"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="px-4 mt-4 mb-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "❌" : "☰"}
      </button>
    </>
  );
}

export default Sidebar;
