import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="max-w-sm mx-auto mt-16 px-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md py-2 font-medium transition cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}

      <p className="text-slate-400 text-sm mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;