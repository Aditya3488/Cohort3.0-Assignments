import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors([{ field: "", message: error.response.data.message }]);
      } else {
        setErrors([{ field: "", message: "Something went wrong" }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 px-6">
      <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
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
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-md py-2 font-medium transition cursor-pointer"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {errors.length > 0 && (
        <ul className="text-red-400 text-sm mt-3 space-y-1">
          {errors.map((err, idx) => (
            <li key={idx}>{err.field ? `${err.field}: ` : ""}{err.message}</li>
          ))}
        </ul>
      )}

      <p className="text-slate-400 text-sm mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;