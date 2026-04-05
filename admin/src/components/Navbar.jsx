import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiGridAlt,
  BiPackage,
  BiCartAlt,
  BiUser,
  BiStats,
  BiLogOut,
  BiBell,
  BiMenu,
  BiX,
} from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Basic logout logic: clear local storage if any and redirect
    localStorage.removeItem("adminToken");
    // Redirect to home or login (using home for now as login doesn't exist in admin)
    navigate("/");
  };

  return (
    <nav className="bg-[#001e2b] text-white sticky top-0 z-[100] shadow-md">
      <div className="container mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1 hover:text-amber-400 transition-colors"
          >
            {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/hubmarket-logo.svg"
              alt="Hubmarket Logo"
              className="h-5 w-20 brightness-0 invert"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-[13px] font-bold">
            <Link
              to="/"
              className="hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <BiGridAlt size={18} /> Dashboard
            </Link>
            <Link
              to="/products"
              className="hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <BiPackage size={18} /> Products
            </Link>
            <Link
              to="/orders"
              className="hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <BiCartAlt size={18} /> Orders
            </Link>
            <Link
              to="/users"
              className="hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <BiUser size={18} /> Users
            </Link>
            <Link
              to="/analytics"
              className="hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              <BiStats size={18} /> Analytics
            </Link>
          </div>
        </div>

        {/* Right Section: Logout */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <BiBell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border-2 border-[#001e2b]"></span>
          </button>

          <button
            onClick={handleLogout}
            className="hidden md:flex text-red-400 hover:text-red-300 transition-colors items-center gap-2 font-bold text-[13px] border-l border-white/10 pl-6"
          >
            <BiLogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#001e2b] border-t border-white/10 shadow-xl animate-fadeIn">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors font-bold text-[14px]"
            >
              <BiGridAlt size={20} className="text-amber-400" /> Dashboard
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors font-bold text-[14px]"
            >
              <BiPackage size={20} className="text-amber-400" /> Products
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors font-bold text-[14px]"
            >
              <BiCartAlt size={20} className="text-amber-400" /> Orders
            </Link>
            <Link
              to="/users"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors font-bold text-[14px]"
            >
              <BiUser size={20} className="text-amber-400" /> Users
            </Link>
            <Link
              to="/analytics"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors font-bold text-[14px]"
            >
              <BiStats size={20} className="text-amber-400" /> Analytics
            </Link>
            <div className="border-t border-white/10 my-2 pt-2">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors font-bold text-[14px]"
              >
                <BiLogOut size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
