import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then((data) => setFeatured(data.slice(0, 8)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-amber-500 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkyMart</h1>
        <p className="mb-6">Everything you need, delivered fast.</p>
        <Link
          to="/products"
          className="bg-white text-amber-500 px-6 py-2 rounded font-semibold hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </section>

      <section className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 dark:text-gray-100">Featured Products</h2>

        {loading && <p className="dark:text-gray-300">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}