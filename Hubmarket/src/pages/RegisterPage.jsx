import React, { useState } from "react";
import { BiChevronRight, BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethods";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await publicRequest.post("auth/register", {
        name,
        email,
        password,
        username: email.split("@")[0], // Fallback username
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data?.message || error.response?.data || "Registration failed";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-[#001e2b]">Register</h1>
          <nav className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
            <Link to="/" className="hover:text-[#001e2b]">
              Home
            </Link>
            <BiChevronRight />
            <span className="text-gray-600">Register</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-10 py-6 md:py-10 flex justify-center">
        <div className="w-full max-w-[500px]">
          <h2 className="text-xl font-extrabold text-[#001e2b] mb-6 text-center">
            Create an account
          </h2>

          <div className="border border-gray-100 rounded-lg p-6 md:p-8 shadow-sm bg-white">
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#001e2b] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className="relative">
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#001e2b] transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001e2b]"
                  >
                    {showConfirmPassword ? (
                      <BiHide size={18} />
                    ) : (
                      <BiShow size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#001e2b] text-white px-8 py-3 rounded-sm font-extrabold text-[12px] uppercase tracking-widest hover:bg-[#00354d] transition-all disabled:opacity-50"
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>

              <div className="pt-2">
                <div className="text-[13px] text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#001e2b] hover:underline"
                  >
                    Login here
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

export default RegisterPage;
