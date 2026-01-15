import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    mobileNo: "01988841891",
    password: "01988841891",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form);
      navigate("/", { replace: true }); // ✅ Dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          name="mobileNo"
          value={form.mobileNo}
          onChange={(e) =>
            setForm({ ...form, mobileNo: e.target.value })
          }
          className="w-full border p-2 rounded"
          placeholder="Mobile Number"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border p-2 rounded"
          placeholder="Password"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
