import { Link } from "react-router";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useCartDrawer } from "../context/CartDrawerContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { openDrawer } = useCartDrawer();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Added to cart!");
    openDrawer();
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex flex-col bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
        {product.rating?.rate >= 4.5 && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            BESTSELLER
          </span>
        )}
      </div>

      <h3 className="text-sm font-medium line-clamp-2 text-gray-900 dark:text-gray-100 mb-1">
        {product.title}
      </h3>

      {product.rating && (
        <div className="flex items-center gap-1 mb-2">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          ${product.price}
        </span>
        <button
          onClick={handleAdd}
          className="text-sm bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 transition font-medium"
        >
          Add
        </button>
      </div>
    </Link>
  );
}