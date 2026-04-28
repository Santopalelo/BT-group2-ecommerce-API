# BeTechified Group 2 — E-commerce Product Catalog API

A production-ready REST API built with Node.js, Express, and MongoDB Atlas for managing an online store's product inventory. Supports full CRUD operations, pagination, sorting, search, and authentication.

---

## 🚀 Live URL

**Base URL:** https://bt-group2-ecommerce-api.onrender.com

**Products Endpoint:** https://bt-group2-ecommerce-api.onrender.com/api/products

---

## 🛠 Tech Stack

- **Runtime:** Node.js + Express
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) + bcrypt
- **Validation:** Joi
- **Config:** dotenv
- **Hosting:** Render.com

---

## 📁 Project Structure

```
├── controllers/
│   ├── product.controller.js
│   ├── user.controller.js
│   └── admin.controller.js
├── database/
│   └── database.js
├── middleware/
│   ├── requireAuth.js
│   ├── errorHandler.js
│   └── requestLogger.js
├── Validation/
│   └── product.validation.js
├── models/
│   ├── product.model.js
│   ├── user.model.js
│   └── admin.model.js
├── routes/
│   ├── product.route.js
│   ├── user.route.js
│   └── admin.route.js
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- A `.env` file (see below)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Santopalelo/BT-group2-ecommerce-API.git
   cd BT-group2-ecommerce-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

5. The API will be running at `http://localhost:3000`

---

## 🔐 Authentication

All product routes are protected. You must register and log in to get a token, then include it in every request.

### Register a User
```http
POST /api/users/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response includes a token — use it in all product requests:**
```http
Authorization: Bearer <your_token_here>
```

---

## 📦 Product Endpoints

All product endpoints require the `Authorization` header.

### Create a Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "price": 59.99,
  "description": "Noise cancelling over-ear headphones",
  "category": "Electronics",
  "inStock": true
}
```

### Get All Products
```http
GET /api/products
Authorization: Bearer <token>
```

### Get a Single Product
```http
GET /api/products/:id
Authorization: Bearer <token>
```

### Update a Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 49.99,
  "inStock": false
}
```

### Delete a Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

---

## 🔍 Search, Filter, Pagination & Sorting

The `GET /api/products` endpoint supports powerful query parameters.

### Pagination
Use `page` and `limit` to paginate results:
```http
GET /api/products?page=1&limit=10
GET /api/products?page=2&limit=5
```

### Sorting
Use `sort` to sort by any field. Prefix with `-` for descending order:
```http
GET /api/products?sort=price        # Lowest price first
GET /api/products?sort=-price       # Highest price first
GET /api/products?sort=-createdAt   # Newest first
```

### Search by Name
Use `search` for full-text search:
```http
GET /api/products?search=headphones
```

### Filter by Category
```http
GET /api/products?category=Electronics
GET /api/products?category=Clothing
```

### Combined Example
```http
GET /api/products?page=1&limit=10&sort=price&category=Electronics&search=headphones
```

---

## 👤 Admin Endpoints

### Register Admin
```http
POST /api/admin/auth/sign-up
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpassword"
}
```

### Admin Login
```http
POST /api/admin/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminpassword"
}
```

---

## 🛡 Validation

All product create and update requests are validated using **Joi** before hitting the database.

### Create Product Rules
| Field | Rule |
|-------|------|
| `name` | String, min 3, max 100 characters, required |
| `price` | Number, min 0, required |
| `description` | String, optional |
| `category` | String, required |
| `inStock` | Boolean, optional |

### Update Product Rules
Same as above but all fields are optional. At least one field must be provided.

### Validation Error Response
If validation fails, the API returns:
```json
{
  "success": false,
  "errors": [
    "\"name\" is required",
    "\"price\" must be greater than or equal to 0"
  ]
}
```

---

## ✅ HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request / validation error |
| 401 | Unauthorized |
| 404 | Resource not found |
| 500 | Internal server error |

---