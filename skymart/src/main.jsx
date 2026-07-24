import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CartDrawerProvider } from "./context/CartDrawerContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <CartDrawerProvider>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#1e293b",
                    color: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "14px",
                    borderRadius: "10px",
                  },
                  success: { iconTheme: { primary: "#f59e0b", secondary: "#fff" } },
                  error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
                }}
              />
            </CartDrawerProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
);