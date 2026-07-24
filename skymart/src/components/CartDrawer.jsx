import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCartDrawer } from "../context/CartDrawerContext";

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const { cart, removeFromCart, updateQty, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeDrawer();
    if (user) {
      navigate("/checkout");
    } else {
      toast.error("Please login to checkout.");
      navigate("/login", { state: { from: "/checkout" } });
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-800">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            Your Cart ({cart.length})
          </h2>
          <button
            onClick={closeDrawer}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll px-5 py-4">
          {cart.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Your cart is empty
              </p>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate("/products");
                }}
                className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 border-b dark:border-gray-800 pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain bg-gray-50 dark:bg-gray-800 rounded-lg p-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-amber-500 font-semibold text-sm mt-1">
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateQty(item.id, Math.max(1, Number(e.target.value)))
                        }
                        className="w-14 border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t dark:border-gray-800 px-5 py-4">
            <div className="flex justify-between mb-4 font-semibold text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-amber-500 text-white font-semibold py-3 rounded-lg hover:bg-amber-600 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}