# Authentication & Product CRUD API

A secure REST API for a small e-commerce platform with complete JWT authentication (access + refresh tokens) and Product CRUD operations, built with a React frontend.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT (access + refresh tokens), bcrypt for password hashing
- **Validation:** express-validator
- **Frontend:** React (Vite), React Router, Axios, Tailwind CSS

## Folder Structure
auth-product-crud/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js # MongoDB connection logic
│ │ ├── controllers/
│ │ │ ├── authController.js # register, login, me, refresh-token, logout logic
│ │ │ └── productController.js # product CRUD logic
│ │ ├── middlewares/
│ │ │ ├── authenticate.js # verifies JWT access token, protects routes
│ │ │ ├── handleValidationErrors.js # formats express-validator errors
│ │ │ └── validators/
│ │ │ ├── authValidators.js
│ │ │ └── productValidators.js
│ │ ├── models/
│ │ │ ├── User.js # user schema (password hashing hook included)
│ │ │ └── Product.js # product schema
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ └── productRoutes.js
│ │ ├── utils/
│ │ │ └── generateTokens.js # JWT sign helpers
│ │ ├── app.js # Express app + middleware setup
│ │ └── server.js # entry point, connects DB and starts server
│ ├── .env # secrets (not committed)
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ └── axiosInstance.js # axios instance + auto token refresh interceptor
│ │ ├── context/
│ │ │ └── AuthContext.jsx # global auth state (user, login, logout)
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ └── ProtectedRoute.jsx # blocks unauthenticated access to routes
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Products.jsx # product listing (public)
│ │ │ └── ProductForm.jsx # add/edit product (protected)
│ │ ├── App.jsx # route definitions
│ │ └── main.jsx # app entry, wraps App with Router + AuthProvider
│ ├── .env # frontend env vars (not committed)
│ └── package.json
│
└── README.md


## Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd auth-product-crud
2. Backend setup
cd backend
npm install
Create a .env file in backend/ with the following:

PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
ACCESS_TOKEN_SECRET=<random secret string>
REFRESH_TOKEN_SECRET=<random secret string>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
Run the backend:

npm run dev
Backend runs on http://localhost:5000.

3. Frontend setup
cd frontend
npm install
Create a .env file in frontend/ with:

VITE_API_URL=http://localhost:5000/api
Run the frontend:

npm run dev
Frontend runs on http://localhost:5173.

API Endpoints
Authentication (/api/auth)
Method	Endpoint	Access	Description
POST	/register	Public	Create a new user account
POST	/login	Public	Authenticate user, issue access + refresh tokens
POST	/refresh-token	Public (valid refresh token required)	Issue a new access token
POST	/logout	Authenticated	Invalidate the refresh token
GET	/me	Authenticated	Return the logged-in user's profile
Products (/api/products)
Method	Endpoint	Access	Description
POST	/	Authenticated	Create a new product
GET	/	Public	List all products (supports ?page=&limit=)
GET	/:id	Public	Get a single product by ID
PUT	/:id	Authenticated	Update a product
DELETE	/:id	Authenticated	Delete a product
Security Features
Passwords hashed with bcrypt (10 salt rounds) before storing
JWT access tokens (short-lived, 15 min) sent in response body
JWT refresh tokens (long-lived, 7 days) sent as httpOnly cookies, persisted in DB for revocation
Refresh token rotation on every refresh call
Generic error messages on login failure (no user enumeration)
All inputs validated with express-validator (field-level 400 errors)
Route param (:id) validated as a valid MongoDB ObjectId before querying
Live Links
Frontend: https://cohort3-0-assignments-d85p.vercel.app
Backend API: https://auth-product-crud-backend.onrender.com
