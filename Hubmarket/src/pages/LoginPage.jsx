import React, { useState } from "react";
import { BiChevronRight, BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await publicRequest.post("auth/login", {
        username, // The backend accepts username or email in the 'username' field
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      alert("Login successful!");
      window.location.href = "/account";
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">My account</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600">My account</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 py-6 md:py-10 flex justify-center">
        <div className="w-full max-w-[500px]">
          <h2 className="text-xl font-extrabold text-[#001e2b] mb-6 text-center">
            Login
          </h2>

          <div className="border border-gray-100 rounded-lg p-6 md:p-8 shadow-sm bg-white">
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Username or email address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#001e2b] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#001e2b] transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001e2b]"
                  >
                    {showPassword ? <BiHide size={18} /> : <BiShow size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#001e2b] text-white px-8 py-3 rounded-sm font-extrabold text-[12px] uppercase tracking-widest hover:bg-[#00354d] transition-all disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </button>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded text-[#001e2b] focus:ring-[#001e2b]"
                  />
                  <span className="text-[13px] font-bold text-gray-600 group-hover:text-[#001e2b] transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#"
                  className="text-[12px] font-bold text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Lost your password?
                </a>
                <div className="text-[13px] text-gray-600">
                  New account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-[#001e2b] hover:underline"
                  >
                    Register here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
