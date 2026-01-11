// src/components/layout/Header.jsx
import React from "react";

function Header({ setSidebarOpen }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white shadow-sm">
      {/* Left: mobile toggle + title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          ☰
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-slate-1000">Dashboard</h1>
          
        </div>
      </div>

      {/* Center: search */}
      <div className="flex-1 max-w-lg mx-4 hidden md:flex">
        <div className="flex items-center w-full bg-slate-100 rounded-full px-4 py-2 gap-2">
          <span className="text-slate-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent flex-1 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        <button className="p-2 rounded-full hover:bg-slate-100 transition">
          <span className="text-lg">⚙️</span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
            A
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-medium text-slate-800">
              Ahsan Hossain
            </span>
            <span className="text-xs text-slate-400">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
