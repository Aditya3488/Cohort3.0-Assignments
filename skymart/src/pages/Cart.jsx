import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-lg mb-4 dark:text-gray-200">Your cart is empty.</p>
        <Link
          to="/products"
          className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Your Cart</h1>

      <div className="flex flex-col gap-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 object-contain"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium dark:text-gray-100 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-amber-500 dark:text-amber-400 font-semibold">
                ${item.price}
              </p>
            </div>

            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                updateQty(item.id, Math.max(1, Number(e.target.value)))
              }
              className="border rounded px-2 py-1 w-16 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            />

            <p className="w-20 text-right font-semibold dark:text-gray-100">
              ${(item.price * item.qty).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-6 dark:border-gray-700">
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400"
        >
          Clear Cart
        </button>

        <div className="text-right">
          <p className="text-lg font-bold dark:text-gray-100 mb-3">
            Total: ${total.toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}