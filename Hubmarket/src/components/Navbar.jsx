import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiHeart,
  BiCartAlt,
  BiGridAlt,
  BiMenu,
  BiX,
  BiChevronDown,
  BiChevronRight,
  BiSearch,
  BiUser,
} from "react-icons/bi";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isStickyCategoriesOpen, setIsStickyCategoriesOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Computers", hasSubmenu: true, path: "/computers" },
    { name: "Cell Phones", hasSubmenu: true, path: "/cell-phones" },
    { name: "Entertainment", hasSubmenu: true, path: "#" },
    { name: "Home Teather", hasSubmenu: true, path: "/home-theater" },
    { name: "Audio & Headphones", hasSubmenu: false, path: "#" },
    { name: "Car Electronics", hasSubmenu: false, path: "#" },
    { name: "Video Games & Console", hasSubmenu: true, path: "#" },
    { name: "Software & Gift Cards", hasSubmenu: false, path: "#" },
  ];

  return (
    <nav className="bg-[#002b3d] text-white relative">
      <div className="hidden lg:flex container mx-auto px-4 lg:px-10 py-3 items-center justify-between gap-4 xl:gap-10 relative">
        <Link
          to="/"
          className="flex items-center gap-2 text-base lg:text-lg xl:text-xl font-extrabold flex-shrink-0"
        >
          <div className="relative w-6 h-4">
            <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
          </div>
          <span className="tracking-tight">Hubmarket</span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex-grow max-w-2xl relative group"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 px-6 pr-12 text-sm focus:outline-none focus:bg-white focus:text-gray-900 transition-all placeholder:text-white/50 focus:placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-gray-400 hover:text-[#ffb400] transition-colors"
          >
            <BiSearch size={20} />
          </button>
        </form>

        <div className="flex items-center gap-4 xl:gap-6 text-[12px] font-bold whitespace-nowrap">
          <Link
            to="/wishlist"
            className="flex items-center gap-1.5 cursor-pointer hover:text-amber-400 transition-colors group relative"
          >
            <BiHeart size={20} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ffb400] text-[#001e2b] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1.5 cursor-pointer hover:text-amber-400 transition-colors group relative"
          >
            <BiCartAlt size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ffb400] text-[#001e2b] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to={userInfo ? "/account" : "/login"}
            className="flex items-center gap-1.5 cursor-pointer hover:text-amber-400 transition-colors"
          >
            <BiUser size={20} />
            <span>{userInfo ? userInfo.username : "Account"}</span>
          </Link>

          {userInfo?.isAdmin && (
            <Link
              to="/admin/messages"
              className="flex items-center gap-1.5 bg-[#ffb400] text-[#001e2b] px-3 py-1.5 rounded-full hover:bg-white transition-all animate-pulse shadow-lg font-black text-[10px] uppercase tracking-tighter"
            >
              <BiEnvelope size={16} />
              <span>Admin: Messages</span>
            </Link>
          )}
        </div>
      </div>

      {isSticky && <div className="hidden lg:block h-[42px]"></div>}

      <div
        className={`hidden lg:block w-full bg-[#002b3d] border-t border-white/10 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 z-[100] shadow-xl py-0.5 animate-fadeIn"
            : ""
        }`}
      >
        <div className="container mx-auto px-4 lg:px-10 py-1.5 flex items-center justify-between relative">
          <div className="flex items-center gap-6">
            {isSticky && (
              <Link
                to="/"
                className="flex items-center gap-2 text-base font-bold mr-4 animate-fadeIn"
              >
                <div className="relative w-4 h-2.5">
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full opacity-70"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-400 rounded-full opacity-70"></div>
                </div>
                <span className="text-base">Hubmarket</span>
              </Link>
            )}

            <div
              className="relative group py-1.5"
              onMouseEnter={() => setIsStickyCategoriesOpen(true)}
              onMouseLeave={() => setIsStickyCategoriesOpen(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer hover:text-amber-400 transition-colors font-semibold border-r border-white/20 pr-6 text-[13px]">
                <BiGridAlt size={16} />
                <span>All Categories</span>
                <BiChevronDown className="w-3.5 h-3.5 ml-1" />
              </div>
              <div
                className={`absolute top-full left-0 w-[260px] bg-white text-gray-800 shadow-xl border border-gray-100 py-2 z-[110] transition-all duration-300 transform origin-top ${
                  isStickyCategoriesOpen
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0 pointer-events-none"
                }`}
              >
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="flex items-center justify-between px-6 py-2.5 hover:bg-gray-50 cursor-pointer group/item border-b border-gray-50 last:border-0"
                  >
                    <span className="text-[13px] font-medium text-gray-700 group-hover/item:text-[#004a99] transition-colors">
                      {category.name}
                    </span>
                    {category.hasSubmenu && (
                      <BiChevronRight
                        size={16}
                        className="text-gray-400 group-hover/item:translate-x-1 transition-transform"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-[12px] font-medium">
              <div className="py-4">
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </div>

              <div className="py-4">
                <Link
                  to="/shop"
                  className="hover:text-amber-400 transition-colors"
                >
                  Shop
                </Link>
              </div>

              <div className="py-4 relative group">
                <Link
                  to="/help-center"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  FAQ
                  <BiChevronDown className="w-3 h-3" />
                </Link>
                <div className="absolute top-full left-0 w-[200px] bg-white text-gray-800 shadow-xl border border-gray-100 py-2 z-[110] transition-all duration-300 transform origin-top opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100">
                  <Link
                    to="/help-center"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Help Center
                  </Link>
                  <Link
                    to="/shipping-policy"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Shipping Policy
                  </Link>
                  <Link
                    to="/return-policy"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Return Policy
                  </Link>
                </div>
              </div>

              <div className="py-4 relative group">
                <Link
                  to="/about"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  About
                  <BiChevronDown className="w-3 h-3" />
                </Link>
                <div className="absolute top-full left-0 w-[200px] bg-white text-gray-800 shadow-xl border border-gray-100 py-2 z-[110] transition-all duration-300 transform origin-top opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100">
                  <Link
                    to="/our-story"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/our-team"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/contact-us"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/careers"
                    className="block px-5 py-2 text-[12px] hover:bg-gray-50 hover:text-[#004a99] transition-colors"
                  >
                    Careers
                  </Link>
                  {userInfo?.isAdmin && (
                    <Link
                      to="/admin/messages"
                      className="block px-5 py-2 text-[12px] bg-blue-50 text-[#004a99] hover:bg-blue-100 font-bold transition-colors border-t border-blue-100"
                    >
                      Admin: Messages
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isSticky && <div className="lg:hidden h-[46px]"></div>}

      <div
        className={`lg:hidden flex items-center justify-between px-3 sm:px-4 py-2 bg-white text-gray-900 shadow-sm transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 w-full z-[100]" : ""
        }`}
      >
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
          {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-bold"
        >
          <div className="relative w-4 h-2.5">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-400 rounded-full opacity-70"></div>
          </div>
          <span>Hubmarket</span>
        </Link>
        <Link to="/cart" className="relative p-1 text-[#001e2b]">
          <BiCartAlt size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ffb400] text-[#001e2b] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[52px] bg-white z-[90] overflow-y-auto transition-all duration-300 ease-in-out">
          <div className="flex flex-col">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
            >
              Shop
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-800 font-medium">My account</span>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-800 font-medium">Wishlist</span>
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-800 font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#ffb400] text-[#001e2b] text-[10px] font-extrabold min-w-5 h-5 rounded-full px-1.5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gray-800 font-medium">
                  {category.name}
                </span>
                {category.hasSubmenu && (
                  <div className="bg-gray-100 p-1 rounded-md">
                    <BiChevronDown size={18} className="text-gray-500" />
                  </div>
                )}
              </Link>
            ))}
            <Link
              to="/help-center"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
            >
              FAQ
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
            >
              About
            </Link>
            <Link
              to="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
            >
              Careers
            </Link>
            {userInfo?.isAdmin && (
              <Link
                to="/admin/messages"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-4 border-b border-gray-100 bg-[#ffb400]/20 hover:bg-[#ffb400]/30 cursor-pointer text-[#001e2b] font-black flex items-center justify-between"
              >
                <span>ADMIN: MESSAGES</span>
                <div className="bg-[#ffb400] text-[#001e2b] px-2 py-0.5 rounded text-[10px]">
                  New
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
