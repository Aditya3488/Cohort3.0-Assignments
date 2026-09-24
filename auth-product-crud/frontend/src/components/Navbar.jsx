import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-slate-100">
      <Link to="/" className="text-lg font-bold text-indigo-400 hover:text-indigo-300">
        ShopEase
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-slate-300 text-sm">Hi, {user.name}</span>
            <Link
              to="/products/new"
              className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
            >
              Add Product
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-sm font-medium transition cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium hover:text-indigo-400 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;