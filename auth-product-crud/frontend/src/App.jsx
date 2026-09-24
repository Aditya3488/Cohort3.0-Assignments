import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductForm from "./pages/ProductForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;