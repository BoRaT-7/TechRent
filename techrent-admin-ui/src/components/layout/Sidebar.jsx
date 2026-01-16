// src/components/Sidebar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { sidebarItems } from "../../config/sidebarItems";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  // ❌ LOGOUT LOGIC NOT CHANGED
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#00A1FF] to-[#0F1F3D] text-white z-40 transform transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="px-6 py-6 text-2xl font-bold tracking-wide">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            TechRent
          </motion.span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;

            // WITH SUB MENU
            if (item.children) {
              const isOpen = openMenu === item.key;

              return (
                <div key={item.key}>
                  <button
                    onClick={() =>
                      setOpenMenu(isOpen ? null : item.key)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span>{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {isOpen && (
                    <div className="ml-10 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.key}
                          onClick={() => navigate(child.path)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                            location.pathname === child.path
                              ? "bg-white text-[#0F1F3D]"
                              : "hover:bg-white/20"
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // NORMAL ITEM
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-[#0F1F3D]"
                    : "hover:bg-white/20"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            ⏻ Logout
          </button>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow lg:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "❌" : "☰"}
      </button>
    </>
  );
}

export default Sidebar;
