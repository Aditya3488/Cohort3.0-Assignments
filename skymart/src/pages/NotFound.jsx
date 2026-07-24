import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="px-6 py-20 text-center">
      <h1 className="text-5xl font-bold mb-4 dark:text-gray-100">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Page not found.
      </p>
      <Link
        to="/"
        className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600"
      >
        Go Home
      </Link>
    </div>
  );
}