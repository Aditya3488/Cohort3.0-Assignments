import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    // Simulate order placement
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="px-6 py-20 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">
          🎉 Order Placed!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thanks, {user.name}. Your order is on its way.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-lg mb-4 dark:text-gray-200">
          Your cart is empty. Nothing to check out.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-semibold mb-4 dark:text-gray-100">
            Order Summary
          </h2>
          <div className="flex flex-col gap-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm dark:text-gray-300"
              >
                <span className="line-clamp-1 pr-2">
                  {item.title} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 dark:border-gray-700 font-bold dark:text-gray-100">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
          <h2 className="font-semibold dark:text-gray-100">Delivery Details</h2>

          <input
            type="text"
            value={user.name}
            disabled
            className="border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-300"
          />

          <textarea
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
