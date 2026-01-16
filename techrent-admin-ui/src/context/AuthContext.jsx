// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ mobileNo, password }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5001/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      const accessToken = data?.body?.access_token;
      const refreshToken = data?.body?.refresh_token;

      if (!accessToken) {
        throw new Error("Access token পাওয়া যায়নি");
      }

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      setToken(accessToken);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
