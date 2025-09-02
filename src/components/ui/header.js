import React from "react";
import logo from "../../image.png";
export default function Header() {
  return (
    <header className="w-full bg-gray-800 text-white shadow px-6 py-3 flex items-center justify-between ">
      <div className="font-bold text-lg md:text-xl flex items-center">
        <img src={logo} alt="Logo" className="h-5 w-5 md:h-10 md:w-10 rounded-md mr-4" />
        Product Dashboard
        </div>

      <nav className="hidden md:flex gap-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/" className="hover:underline">Products</a>
        <a href="/" className="hover:underline">Profile</a>
      </nav>
    </header>
  );
}
