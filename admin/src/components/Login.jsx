import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt, BiLockAlt, BiUser } from "react-icons/bi";
import { publicRequest } from "../requestMethods";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await publicRequest.post("auth/login", {
        username,
        password,
      });
      if (res.data.isAdmin) {
        localStorage.setItem("adminToken", res.data.accessToken);
        localStorage.setItem("adminUser", JSON.stringify(res.data));
        navigate("/");
      } else {
        setError("You are not authorized to access the admin panel.");
      }
    } catch (err) {
      setError(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001e2b] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] bg-white rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-12 h-8 mb-4">
            <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500 rounded-full opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
          </div>
          <h1 className="text-2xl font-extrabold text-[#001e2b] tracking-tight">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Username
            </label>
            <div className="relative">
              <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#001e2b] transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#001e2b] text-white font-extrabold rounded-xl hover:bg-[#002b3d] transition-all text-[12px] tracking-widest disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-[#001e2b]/20"
          >
            {isLoading ? (
              <>
                <BiLoaderAlt className="animate-spin" size={18} />
                LOGGING IN...
              </>
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
