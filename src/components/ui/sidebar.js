import React from "react";
export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 bg-gray-800 text-white md:flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Sidebar
      </div>
      <nav className="flex-1 flex flex-col gap-2 p-4">
        <a href="/" className="hover:bg-gray-700 rounded px-3 py-2">Home</a>
        <a href="/" className="hover:bg-gray-700 rounded px-3 py-2">Products</a>
        <a href="/" className="hover:bg-gray-700 rounded px-3 py-2">Settings</a>
      </nav>
    </aside>
  );
}
