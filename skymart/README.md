# 🚀 SkyMart — Project Summary

A short overview of how the SkyMart e-commerce project is built and what each file does.

---

## 📁 Structure

```
src/
  api/productApi.js        → Fetches data from FakeStoreAPI
  context/                 → Global state (Context API)
  components/               → Reusable UI pieces
  pages/                    → Page for each route
  App.jsx                  → Routing setup
  main.jsx                 → App entry point
```

---

## Entry Point

**`main.jsx`** — Mounts the app and wraps it in all the Providers (Theme, Auth, Cart, CartDrawer), so their data is accessible anywhere in the app. `<Toaster />` is also mounted here (for notifications).

**`App.jsx`** — Routing is set up here. On `/`, login status is checked (logged in → Home, otherwise → Login). Pages like Products/Cart/Checkout are wrapped in `PrivateRoute` — they can't be accessed without logging in.

---

## Context (State Management)

- **`AuthContext`** — Handles register/login/logout. User data and session are saved in `localStorage`.
- **`CartContext`** — Cart items, add/remove/update quantity, total — all persisted in `localStorage`.
- **`ThemeContext`** — Dark/light mode toggle, adds/removes the `dark` class on the HTML element.
- **`CartDrawerContext`** — Tracks whether the cart's slide-in panel is open or closed.

Context is used so that data (login, cart, theme) can be accessed from any component without passing props manually.

---

## Components

- **Navbar** — logo, links, cart icon (opens the drawer), theme toggle, login/logout
- **ProductCard** — product image, rating, price, "Add" button (adds to cart + shows toast + opens drawer, all at once)
- **CartDrawer** — slide-in cart panel from the right, closes when clicking outside
- **PrivateRoute** — checks login status, redirects to `/login` if not logged in

---

## Pages

- **Home** — featured products
- **ProductList** — all products, search + category filter
- **ProductDetail** — single product page, select quantity and add to cart
- **Login/Register** — forms, success/error messages via toast
- **Checkout** — protected page, places the order
- **NotFound** — 404 page

---

## Data Flow (Short Example)

**When "Add to Cart" is clicked:**
`addToCart()` runs → cart state updates → auto-saved to `localStorage` → toast shows → drawer opens → navbar badge updates

All of this happens automatically because the same Context data is used in multiple places.

---

## Tech Stack

React + Vite 7 + React Router v7 + Context API + Tailwind CSS + FakeStoreAPI + react-hot-toast + localStorage (for data persistence, since there's no real backend)

---

Let me know if you'd like a diagram for any specific part (like the Auth or Cart flow).