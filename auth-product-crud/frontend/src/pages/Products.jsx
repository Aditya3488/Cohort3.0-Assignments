import { useState, useEffect } from "react";
import { Link } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");
        setProducts(data.products);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

    if (loading) return <p className="text-center text-slate-400 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Products</h2>

      {products.length === 0 && <p className="text-slate-400">No products yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-2 hover:border-indigo-500 transition"
          >
            <h3 className="text-lg font-semibold text-slate-100">{product.name}</h3>
            <p className="text-slate-400 text-sm flex-1">{product.description}</p>
            <div className="flex items-center justify-between text-sm text-slate-300 mt-2">
              <span className="font-medium">₹{product.price}</span>
              <span>Stock: {product.stock}</span>
            </div>

            {user && (
              <div className="flex gap-3 mt-3 pt-3 border-t border-slate-700">
                <Link to={`/products/${product._id}/edit`} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                  Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-300 text-sm font-medium cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;