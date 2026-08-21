# 🛒 MERN E-Commerce — Project Blueprint

## 1. Project Overview

### Project Type

Full-stack E-Commerce Application

### Technology Stack

**Frontend**

* React
* React Router
* TanStack Query
* Redux Toolkit
* Axios
* Sass / CSS

**Backend**

* Node.js
* Express.js
* MySQL
* JWT Authentication
* REST API

**Architecture**

* Feature-Based Architecture
* Layered Backend Architecture

### Main Objective

Build a production-style e-commerce application based on the provided Figma design, with a scalable architecture suitable for:

* Portfolio presentation
* Freelance projects
* Real-world development practices
* Future feature expansion

---

# 2. Architecture Strategy

The project will use **Feature-Based Architecture**.

Instead of organizing the entire application by technical responsibility:

```text
controllers/
models/
routes/
services/
```

organize the application around business features:

```text
features/
├── auth/
├── products/
├── categories/
├── wishlist/
├── cart/
├── addresses/
├── checkout/
├── orders/
├── reviews/
└── profile/
```

Each feature owns the code required to implement that business functionality.

---

# 3. Backend Architecture

## Server Structure

```text
server/
│
├── src/
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.repository.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.validation.js
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── products/
│   │   │   ├── products.controller.js
│   │   │   ├── products.service.js
│   │   │   ├── products.repository.js
│   │   │   ├── products.routes.js
│   │   │   └── products.validation.js
│   │   │
│   │   ├── categories/
│   │   ├── wishlist/
│   │   ├── cart/
│   │   ├── addresses/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── reviews/
│   │   └── profile/
│   │
│   ├── shared/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── constants/
│   │
│   └── app.js
│
├── server.js
└── package.json
```

---

# 4. Backend Layer Responsibility

Every feature follows this flow:

```text
HTTP Request
     ↓
Route
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
MySQL
```

### Route

Responsible for:

* Defining endpoints
* Connecting middleware
* Calling controllers

### Controller

Responsible for:

* Reading request data
* Calling services
* Returning HTTP responses

### Service

Responsible for:

* Business logic
* Validation of business rules
* Coordinating multiple repositories

### Repository

Responsible for:

* Database queries
* CRUD operations
* Communicating directly with MySQL

### Example

```text
GET /products/5

Products Route
      ↓
Products Controller
      ↓
Products Service
      ↓
Products Repository
      ↓
MySQL
```

---

# 5. Frontend Architecture

## Client Structure

```text
client/
│
├── src/
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── store/
│   │   │
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── reviews/
│   │   └── profile/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── services/
│   │   └── constants/
│   │
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

---

# 6. Feature Definition

The application will contain these core features:

```text
1. Auth
2. Products
3. Categories
4. Wishlist
5. Cart
6. Addresses
7. Checkout
8. Orders
9. Reviews
10. Profile
```

---

# 7. Feature Blueprint

## 7.1 Authentication

### Database

```text
users
```

### Pages

```text
Login
Register
Forgot Password
```

### API

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Responsibilities

* User registration
* Login
* JWT authentication
* Protected routes
* Current user
* Logout
* Password handling

---

# 7.2 Products

### Database

```text
products
```

### Pages

```text
Home
Products
Product Details
Category Products
```

### API

```http
GET /api/products
GET /api/products/:id
GET /api/products/category/:id
```

### Responsibilities

* Product listing
* Product details
* Product filtering
* Product search
* Product categories
* Product images
* Product rating summary

---

# 7.3 Categories

### Database

```text
categories
```

### API

```http
GET /api/categories
GET /api/categories/:id
```

### Responsibilities

* Category listing
* Category products
* Category navigation

---

# 7.4 Wishlist

### Database

```text
wishlist
```

### Page

```text
Wishlist
```

### API

```http
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:id
```

### Responsibilities

* Add product to wishlist
* Remove product
* Display wishlist
* Wishlist count

---

# 7.5 Cart

### Database

```text
cart_items
```

### Page

```text
Cart
```

### API

```http
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

### Responsibilities

* Add product
* Remove product
* Update quantity
* Calculate subtotal
* Calculate total
* Cart count

---

# 7.6 Addresses

### Database

```text
addresses
```

### Page

```text
Address Book
```

### API

```http
GET    /api/addresses
POST   /api/addresses
PUT    /api/addresses/:id
DELETE /api/addresses/:id
```

### Responsibilities

* Add address
* Edit address
* Delete address
* Select default address
* Select checkout address

---

# 7.7 Checkout

### Uses

```text
cart_items
addresses
orders
order_items
```

### Page

```text
Checkout
```

### Flow

```text
Cart
  ↓
Select Address
  ↓
Review Order
  ↓
Create Order
  ↓
Order Success
```

### Responsibilities

* Select shipping address
* Review cart
* Calculate final price
* Create order
* Clear cart after successful order

---

# 7.8 Orders

### Database

```text
orders
order_items
```

### Pages

```text
My Orders
Order Details
```

### API

```http
GET  /api/orders
GET  /api/orders/:id
POST /api/orders
```

### Responsibilities

* Create order
* Display order history
* Display order details
* Track order status

---

# 7.9 Reviews

### Database

```text
product_reviews
```

### Location

```text
Product Details
```

### API

```http
GET    /api/reviews/product/:id
POST   /api/reviews
DELETE /api/reviews/:id
```

### Responsibilities

* Add review
* Delete review
* Display reviews
* Calculate rating
* Update product rating summary

---

# 7.10 Profile

### Database

```text
users
addresses
```

### Pages

```text
Profile
Address Book
My Orders
```

### Responsibilities

* Display user information
* Update profile
* Upload avatar
* Manage addresses
* Access orders

---

# 8. Page Blueprint

The Figma design should be mapped into these application pages:

```text
Public Pages
│
├── Home
├── Products
├── Product Details
├── Login
├── Register
└── 404


Authenticated Pages
│
├── Wishlist
├── Cart
├── Checkout
├── Profile
├── My Orders
├── Order Details
└── Address Book
```

---

# 9. Route Blueprint

Example frontend routes:

```text
/
├── /products
├── /products/:id
├── /categories/:id
│
├── /login
├── /register
│
├── /wishlist
├── /cart
├── /checkout
│
├── /profile
├── /orders
├── /orders/:id
│
└── *
```

Protected routes:

```text
/wishlist
/cart
/checkout
/profile
/orders
/orders/:id
```

---

# 10. State Management Strategy

Use two different tools for two different types of state.

## TanStack Query

Use for **server state**:

```text
Products
Categories
Reviews
Orders
Addresses
Profile
```

Responsibilities:

* Fetching
* Caching
* Refetching
* Loading states
* Error states
* Server synchronization

---

## Redux Toolkit

Use for **global client state**:

```text
Authentication State
Cart Count
Wishlist Count
User UI State
```

Do not put every API response into Redux.

The general rule is:

```text
Server State → TanStack Query

Client State → Redux Toolkit
```

---

# 11. Database Improvements

## 11.1 Product Rating Summary

Instead of calculating the average rating every time products are requested, store a summary on the product.

Add:

```sql
ALTER TABLE products
ADD average_rating DECIMAL(2,1) DEFAULT 0,
ADD reviews_count INT DEFAULT 0;
```

When a review is created/deleted:

```text
Review Created
      ↓
Update Product Rating
      ↓
Update reviews_count
```

---

# 12. Product Images

A single image field is not ideal for an e-commerce product.

### Instead of:

```text
products
└── image_url
```

Use:

```text
products
      │
      │ 1
      │
      ▼
product_images
      │
      ├── Main Image
      ├── Gallery Image 1
      ├── Gallery Image 2
      ├── Gallery Image 3
      └── Gallery Image 4
```

Example:

```sql
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);
```

This structure is much more suitable for the Figma product-details design.

---

# 13. Development Phases

Development should follow the dependency order rather than simply implementing pages randomly.

## Phase 1 — Foundation

### Backend

```text
Project Setup
Database Connection
Environment Variables
Express Setup
Error Handling
Authentication
```

### Frontend

```text
Project Setup
Routing
Global Layout
Navbar
Footer
Authentication UI
```

### Result

```text
User can register
        ↓
User can login
        ↓
User receives authentication
        ↓
Protected routes work
```

---

# Phase 2 — Product System

Implement:

```text
Products
Categories
Product Details
Product Images
Product Search
Product Filtering
```

Pages:

```text
Home
Products
Product Details
Category Products
```

---

# Phase 3 — Shopping System

Implement:

```text
Wishlist
Cart
```

Pages:

```text
Wishlist
Cart
```

Core flow:

```text
Product
   ↓
Add to Wishlist

Product
   ↓
Add to Cart
   ↓
Update Quantity
   ↓
Remove Product
```

---

# Phase 4 — Checkout & Orders

Implement:

```text
Addresses
Checkout
Orders
```

Flow:

```text
Cart
 ↓
Address
 ↓
Order Review
 ↓
Create Order
 ↓
Order Success
 ↓
My Orders
```

---

# Phase 5 — Reviews & Profile

Implement:

```text
Reviews
Profile
Avatar
Address Management
```

Final product-detail flow:

```text
Product
 ↓
Product Details
 ↓
Reviews
 ↓
Rating Summary
```

---

# 14. Complete Development Roadmap

```text
PHASE 1
│
├── Project Setup
├── Database Connection
├── Backend Architecture
├── Frontend Architecture
├── Authentication
├── Routing
├── Navbar
└── Footer

        ↓

PHASE 2
│
├── Products
├── Categories
├── Product Details
├── Product Images
├── Search
└── Filtering

        ↓

PHASE 3
│
├── Wishlist
└── Cart

        ↓

PHASE 4
│
├── Addresses
├── Checkout
├── Orders
└── Order Details

        ↓

PHASE 5
│
├── Reviews
├── Profile
├── Avatar
└── Final UI Integration

        ↓

PHASE 6
│
├── Validation
├── Error Handling
├── Loading States
├── Empty States
├── Responsive Design
├── Security Review
├── Performance Optimization
└── Deployment
```

---

# 15. Definition of Done

A feature is not considered complete simply because its page exists.

Each feature should contain:

```text
Database
   ↓
Repository
   ↓
Service
   ↓
Controller
   ↓
Route
   ↓
API
   ↓
Frontend Service
   ↓
Hook / Query
   ↓
State Management
   ↓
Components
   ↓
Page
   ↓
Loading State
   ↓
Error State
   ↓
Empty State
   ↓
Validation
```

---

# 16. Final Architecture

The final project should conceptually look like this:

```text
                    E-COMMERCE APP
                          │
             ┌────────────┴────────────┐
             │                         │
          FRONTEND                  BACKEND
             │                         │
      Feature-Based              Feature-Based
             │                         │
    ┌────────┴────────┐        ┌───────┴────────┐
    │                 │        │                │
 Features          Shared   Features         Shared
    │                 │        │                │
    │                 │        │                │
    ▼                 ▼        ▼                ▼
 Auth             Components  Auth           Database
 Products         Hooks       Products       Middleware
 Cart              Utils      Cart           Utils
 Wishlist          Layouts    Orders         Constants
 Orders            Services   Reviews
 Reviews                      ...
 ...
```

---

# 17. Core Engineering Rules

### Rule 1 — Feature Ownership

Feature-specific code stays inside its feature.

```text
features/products/
```

owns product-related functionality.

Do not scatter product logic across unrelated folders.

---

### Rule 2 — Shared Means Truly Shared

Put something inside:

```text
shared/
```

only when multiple features genuinely use it.

---

### Rule 3 — Business Logic Belongs in Services

Avoid putting business logic directly inside controllers.

```text
Controller
    ↓
Service
    ↓
Repository
```

---

### Rule 4 — Database Logic Belongs in Repositories

Controllers and services should not contain raw SQL queries whenever possible.

---

### Rule 5 — Server State ≠ Client State

```text
TanStack Query
→ API / Server State

Redux Toolkit
→ Global Client State
```

---

### Rule 6 — Build by Dependency

Follow:

```text
Auth
 ↓
Products
 ↓
Cart / Wishlist
 ↓
Checkout
 ↓
Orders
 ↓
Reviews / Profile
```

rather than implementing pages randomly.

---

# 18. Final Feature Checklist

```text
[ ] Auth
[ ] Products
[ ] Categories
[ ] Wishlist
[ ] Cart
[ ] Addresses
[ ] Checkout
[ ] Orders
[ ] Reviews
[ ] Profile

[ ] Authentication
[ ] Protected Routes
[ ] Product Search
[ ] Product Filtering
[ ] Product Images
[ ] Rating System
[ ] Order System
[ ] Responsive UI
[ ] Error Handling
[ ] Loading States
[ ] Empty States
[ ] Form Validation
[ ] Security
[ ] Performance
[ ] Deployment
```

---

# 🎯 Project Goal

The final application should not be treated as simply:

> "A React e-commerce website."

It should be treated as a **production-style full-stack e-commerce system** with:

```text
Figma Design
      +
Feature-Based Architecture
      +
Layered Backend
      +
REST API
      +
MySQL
      +
TanStack Query
      +
Redux Toolkit
      +
Authentication
      +
Scalable Feature Structure
```

The architecture should make it easy to add future features without restructuring the entire project.
