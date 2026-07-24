import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import { ShoppingCart, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { openDrawer } = useCartDrawer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-amber-500">
        SkyMart
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/products" className="hover:text-amber-500 dark:text-gray-200 font-medium">
          Products
        </Link>

        <button onClick={openDrawer} className="relative hover:text-amber-500 dark:text-gray-200">
          <ShoppingCart size={22} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>

        <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
              Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}