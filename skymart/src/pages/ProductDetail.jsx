import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const { openDrawer } = useCartDrawer();

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    getProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="px-6 py-10 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="px-6 py-10 text-red-500">{error}</p>;
  if (!product) return null;

const handleAddToCart = () => {
  addToCart(product, qty);
  toast.success("Added to cart!");
  openDrawer();
};

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-amber-500 dark:text-amber-400 mb-6"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-full object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold mb-2 dark:text-gray-100">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-4">
            {product.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-amber-500 dark:text-amber-400 mb-6">
            ${product.price}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <label className="dark:text-gray-200">Qty:</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="border rounded px-3 py-1 w-20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
          >
            Add to Cart
          </button>

          {added && (
            <p className="text-green-600 dark:text-green-400 mt-3">
              ✅ Added to cart!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}