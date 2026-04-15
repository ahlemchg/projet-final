import React, { useState, useEffect } from "react";
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
  BiGift,
  BiEnvelope,
  BiTime,
} from "react-icons/bi";
import { userRequest } from "../requestMethods";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await userRequest.get("orders");
        // Sort by date and take the last 5
        const recentOrders = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setNotifications(recentOrders);
        if (recentOrders.length > 0) setHasNew(true);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
    // Refresh every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const navLinks = [
    { to: "/", icon: <BiGridAlt size={18} />, label: "Dashboard" },
    { to: "/products", icon: <BiPackage size={18} />, label: "Products" },
    { to: "/orders", icon: <BiCartAlt size={18} />, label: "Orders" },
    { to: "/users", icon: <BiUser size={18} />, label: "Users" },
    { to: "/analytics", icon: <BiStats size={18} />, label: "Analytics" },
    { to: "/coupons", icon: <BiGift size={18} />, label: "Coupons" },
  ];

  return (
    <nav className="bg-[#001e2b] text-white sticky top-0 z-[100] shadow-xl border-b border-white/5">
      <div className="container mx-auto px-4 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <BiMenu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-4 group-hover:scale-110 transition-transform">
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full opacity-80"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
            </div>
            <span className="text-xl font-extrabold tracking-tight hidden sm:block">
              Admin
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1 text-[13px] font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 hover:bg-white/10 rounded-lg transition-all flex items-center gap-2 group"
              >
                <span className="text-gray-400 group-hover:text-amber-400 transition-colors">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setHasNew(false);
              }}
              className={`relative p-2.5 rounded-full transition-all group ${
                isNotificationsOpen
                  ? "bg-white/10"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <BiBell
                size={20}
                className={
                  isNotificationsOpen
                    ? "text-amber-400"
                    : "text-gray-400 group-hover:text-white"
                }
              />
              {hasNew && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#001e2b] animate-pulse"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute top-full right-0 mt-4 w-[320px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[150]">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#001e2b]">
                    Recent Activity
                  </h3>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md uppercase">
                    New Orders
                  </span>
                </div>
                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((order) => (
                      <Link
                        key={order._id}
                        to="/orders"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                      >
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <BiCartAlt size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-[#001e2b] truncate">
                            New order from {order.address?.firstName}
                          </p>
                          <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                            Order Amount: ${order.amount.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                            <BiTime size={12} />
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                      <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BiBell size={24} />
                      </div>
                      <p className="text-sm font-bold text-gray-400">
                        No new notifications
                      </p>
                    </div>
                  )}
                </div>
                <Link
                  to="/orders"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="block p-4 text-center text-[11px] font-bold text-blue-500 hover:bg-gray-50 border-t border-gray-50 uppercase tracking-widest transition-colors"
                >
                  View all orders
                </Link>
              </div>
            )}
          </div>

          <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>

          <button
            onClick={handleLogout}
            className="hidden md:flex bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg transition-all items-center gap-2 font-bold text-[13px]"
          >
            <BiLogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Content - Drawer Style */}
      <div
        className={`fixed inset-0 z-[200] lg:hidden transition-all duration-300 ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-[280px] bg-[#001e2b] shadow-2xl transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative w-6 h-4">
                  <div className="absolute top-0 left-0 w-4 h-4 bg-blue-500 rounded-full opacity-80"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  Admin
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <BiX size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-2 flex-grow overflow-y-auto no-scrollbar">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-all font-bold text-[14px] text-gray-400 hover:text-white group"
                >
                  <span className="text-amber-400/60 group-hover:text-amber-400 transition-colors">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-white/10 mt-6 pt-6">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-bold text-[14px]"
              >
                <BiLogOut size={20} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
