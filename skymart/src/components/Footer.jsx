export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 dark:text-gray-300 text-center py-6 mt-10">
      <p className="text-sm">© {new Date().getFullYear()} SkyMart. All rights reserved.</p>
    </footer>
  );
}