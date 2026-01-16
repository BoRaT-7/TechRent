// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, isAuthenticated } = useAuth();

  // ❌ default value remove
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  // already logged in হলে redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ mobileNo, password });
    if (success) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            placeholder="01XXXXXXXXX"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="username"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
