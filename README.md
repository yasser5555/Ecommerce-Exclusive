# Execlusive Ecommerce 🛒

A full-stack e-commerce application built as a learning and portfolio project using **React.js, Express.js, Node.js, and MySQL**.

The project focuses on building a complete e-commerce workflow while practicing **Feature-Based Architecture, REST APIs, authentication, database design, state management, SQL queries, pagination, filtering, product reviews, profiles, wishlists, orders, transactions, and admin functionality**.

---

## 🚀 Tech Stack

### Frontend

* React.js
* React Router
* Zustand
* Axios
* Bootstrap
* Lucide React
* AOS

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcrypt
* Multer
* Nodemailer

### Database

* MySQL
* Views
* Stored Procedures
* SQL Joins
* Subqueries
* Transactions
* Aggregation
* Pagination
* Filtering
* Relational Database Design
* Foreign Keys

---

# ✨ Features

## 🔐 Authentication

* User registration
* User login
* Protected routes
* JWT-based authentication
* HTTP-only cookies
* Password hashing with bcrypt
* Forgot password
* Reset password
* Email-based password reset
* Remember Me functionality

Frontend authentication is organized inside the `auth` feature, including API functions, hooks, pages, routes, and Zustand state management.

---

## 🏠 Home Page

The application includes a dedicated Home page that provides the main entry point for customers.

The Home feature includes:

* Featured products
* Product sections
* Product navigation
* Product cards
* Navigation to product details
* Navigation to the shopping experience
* Responsive layout
* AOS animations

The Home page is integrated with the Product feature to display products dynamically from the backend.

---

## 🛍️ Products

Users can:

* Display products
* View product details
* Browse products through pagination
* Search for products
* Filter products
* Filter by category
* Filter by rating
* Filter by price range
* View product ratings
* View review counts
* View wishlist status
* Add products to wishlist
* Add products to cart

The frontend product feature contains dedicated API, hooks, pages, routes, store, and component layers.

---

## 🔎 Live Product Search

The product system supports **Live Search**.

Instead of requiring the user to click a Search button, the search request is triggered automatically while the user types.

Example:

```text
User types:
Redmi
    ↓
Frontend sends search request
    ↓
Express API
    ↓
MySQL
    ↓
Search results
    ↓
Products displayed
```

### Debounce

Debouncing is used to prevent sending a request for every character typed by the user.

The search waits until the user stops typing for a short period before sending the request.

For example:

```text
R
Re
Red
Redm
Redmi
     ↓
Wait 350ms
     ↓
Send request
```

This reduces unnecessary API requests and database queries.

---

## 🔎 Product Search & Pagination

The project implements server-side product pagination using SQL `LIMIT` and `OFFSET`.

Example:

```sql
LIMIT 10 OFFSET 10
```

The product system also includes database procedures for:

* Getting all products
* Getting a product by ID
* Filtering products
* Finding a product's position
* Searching products

Pagination is integrated with the frontend product interface.

When searching for products, the search results can be displayed separately from the normal paginated product list.

---

## ⭐ Product Filtering

The product filtering system supports multiple filters.

### Category Filter

Users can filter products based on their category.

### Rating Filter

Users can filter products based on their minimum rating.

Example:

```text
4 Stars & Up
```

### Price Filter

Users can specify:

```text
Minimum Price
Maximum Price
```

The selected filters are sent to the backend and processed through SQL procedures.

---

## 🟢 Product Active / Inactive Status

Products include an `is_active` field to control whether a product is available in the customer-facing store.

Example:

```text
is_active = 1
    ↓
Product is available
```

```text
is_active = 0
    ↓
Product is inactive
```

This approach prevents products that are referenced by historical orders from being physically deleted from the database.

Inactive products can remain stored for historical and relational integrity while being excluded from customer-facing product results.

---

## 🛒 Shopping Cart

A dedicated **Shopping Cart feature** has been implemented to provide users with a persistent shopping experience and manage products before checkout.

Users can:

* Add products to their cart
* Select the desired product quantity
* View products currently in the cart
* Display product prices and quantities
* Calculate cart-related totals
* Manage cart items through the dedicated Cart interface

The Cart functionality follows the project's **Feature-Based Architecture** and is separated into its own frontend feature.

The frontend Cart feature includes:

* Cart API
* Zustand Cart store
* Cart page
* Cart table
* Cart summary
* Coupon component
* Cart routes

The selected product quantity is handled dynamically through the Cart workflow.

The database implementation includes dedicated Cart queries and a `Cart_Product` view for retrieving cart-related product information.

The Cart feature is integrated with the Product Details workflow, allowing users to move from browsing products to managing their selected products in the shopping cart.

---

## ❤️ Wishlist

Users can:

* Add products to their wishlist
* Remove products from their wishlist
* View their wishlist
* Check whether a product is already in the wishlist

Wishlist functionality is separated into its own frontend and backend feature.

The product system also uses wishlist information to determine whether the current user has already added a product to their wishlist.

---

## ⭐ Product Reviews

Users can:

* View product reviews
* Submit a review
* Rate products
* Display product ratings
* Display the number of reviews

The backend contains a dedicated `Product_Reviews` feature with its own:

* Controller
* Repository
* Service
* Routes

Product ratings are also used by the product filtering system.

---

## 👤 User Profile

The profile section includes:

* Profile information
* Profile editing
* Avatar upload
* Address management
* Saved cards
* Order history
* Profile statistics

The frontend profile feature is divided into:

* Components
* Hooks
* Pages
* Routes
* Store
* API layers

---

# 📦 Orders

The application includes an order workflow connecting the Cart, Checkout, Products, Addresses, Cards, and Database layers.

Users can:

* Create orders
* Select an address
* Select a payment method
* Purchase cart products
* View order history
* View order details
* View products belonging to an order
* View product quantities
* View prices
* View order status

The order system separates order-level information from order-item information.

### Order Structure

```text
Order
 │
 ├── Order Information
 │
 └── Order Items
      ├── Product
      ├── Quantity
      └── Price
```

The database contains dedicated `orders` and `order_items` tables.

---

## 💳 Checkout

The checkout workflow connects:

```text
Cart
 ↓
Billing Details
 ↓
Address
 ↓
Payment Method
 ↓
Order
 ↓
Order Items
```

The checkout system supports address selection and payment-related information.

The order process is connected to the user's saved addresses and cards.

---

## 🔄 Database Transactions

Transactions are used for operations that require multiple database changes to succeed together.

For example, creating an order can involve:

```text
Start Transaction
      ↓
Create Order
      ↓
Create Order Items
      ↓
Decrease Product Stock
      ↓
Commit Transaction
```

If an operation fails:

```text
Rollback
```

This helps prevent partially completed order operations.

Transactions are also used as part of database operations where multiple related changes need to remain consistent.

---

# 🛠️ Admin

The project includes an Admin section for managing the e-commerce application.

The Admin interface is organized separately from the customer-facing application.

### Admin Features

* Admin dashboard
* Product management
* Category management
* Order management
* User management
* Reports
* Settings
* Product activation/deactivation
* Product administration
* Admin navigation sidebar

The Admin layout contains a collapsible sidebar and a main content area.

```text
Admin Layout
│
├── Sidebar
│   ├── Dashboard
│   ├── Products
│   ├── Categories
│   ├── Orders
│   ├── Users
│   ├── Reports
│   └── Settings
│
└── Main Content
```

The Admin interface is built using React and Bootstrap.

---

## 📊 Admin Dashboard

The Admin dashboard provides a central location for accessing administrative functionality.

The dashboard structure is designed to support:

* Product management
* Order management
* User management
* Category management
* Reports
* Administrative settings

The Admin section is separated from the customer-facing pages using protected routing and a dedicated layout.

---

## 📦 Admin Product Management

The Admin product functionality supports managing products in the database.

Product management includes functionality related to:

* Product information
* Product categories
* Product stock
* Product images
* Product activation status
* Product availability

Products that are associated with historical orders can be deactivated instead of physically deleting the database record.

---

# 📩 Contact

The application includes a dedicated Contact feature.

Users can submit:

* Name
* Email
* Telephone
* Subject
* Message

The Contact feature communicates with the backend through a dedicated API.

The backend uses **Nodemailer** to send contact messages through email.

### Contact Architecture

```text
Contact Page
     ↓
Contact Store
     ↓
Contact API
     ↓
Express Route
     ↓
Controller
     ↓
Service
     ↓
Nodemailer
     ↓
Email
```

The Contact feature follows the project's separation of responsibilities.

---

# ℹ️ About Page

The application includes a dedicated About page containing information about the project and its purpose.

The About page is part of the main customer-facing navigation alongside:

* Home
* Shop
* About
* Contact

---

# 🏗️ Project Architecture

The project follows a **Feature-Based Architecture**.

Instead of organizing the application only by technical type, related functionality is grouped together by feature.

## Frontend

```text
client/

└── src/

    ├── features/

    │   ├── auth/
    │   ├── Products/
    │   ├── Profile/
    │   ├── Wishlist/
    │   ├── Cart/
    │   ├── Orders/
    │   ├── Contact/
    │   └── Admin/

    ├── Pages/
    ├── routes/
    └── shared/

        ├── Components/
        ├── Layout/
        ├── services/
        ├── Styles/
        └── Utils/
```

Each major feature contains its own:

```text
feature/

├── api/
├── components/
├── hooks/
├── pages/
├── routes/
├── store/
└── styles/
```

This makes each feature easier to understand, maintain, and extend.

---

# 🖥️ Backend Architecture

The Express server also follows a feature-based structure.

```text
server/

└── src/

    ├── Features/

    │   ├── Auth/
    │   ├── Product/
    │   ├── Product_Reviews/
    │   ├── Profile/
    │   ├── Wishlists/
    │   ├── Cart/
    │   ├── Orders/
    │   ├── Contact/
    │   └── Admin/

    └── shared/

        ├── Database/
        ├── Middleware/
        └── utils/
```

Each backend feature separates responsibilities into:

```text
Feature/

├── controller
├── repository
├── service
└── routes
```

---

# 🔄 Request Flow

```text
Client
  │
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
MySQL
```

## Responsibility of Each Layer

### Route

Defines the API endpoint and connects it to the appropriate controller.

### Controller

Handles the HTTP request and response.

### Service

Contains the application's business logic.

### Repository

Responsible for communicating with the database.

### Database

Stores and retrieves the application's persistent data.

---

# 🗄️ Database

The project uses **MySQL** as its relational database.

The database section contains:

```text
Database/

├── Database-design/
├── DB_Creation.sql
├── Joins.sql
├── Products/
├── Product_reviews/
├── Profile/
├── WishList/
├── Cart/
├── Orders/
├── Contact/
└── Views.sql
```

The database implementation includes:

* Relational database design
* Foreign keys
* SQL joins
* Subqueries
* Views
* Stored procedures
* Transactions
* Filtering
* Pagination
* Aggregation
* Product queries
* Wishlist queries
* Cart queries
* Order queries
* Profile queries
* Product review queries

The project also contains a MySQL Workbench database design file.

---

# 📁 Database Procedures & Views

Some database operations are encapsulated using stored procedures.

Example:

```text
Products/

├── Procedure/

│   ├── Filter_Product.sql
│   ├── get_all_products.sql
│   ├── get_product_by_id.sql
│   └── Get_Product_position.sql
```

Profile procedures include:

```text
Profile/

└── Procedures/

    ├── Add_Card_procedure.sql
    ├── Add_userAddress.sql
    └── Get_Profile_stats.sql
```

Wishlist procedures include:

```text
WishList/

└── Procedure/

    ├── add_to_wishlist.sql
    ├── get_user_wishlist.sql
    └── remove_from_wishlist.sql
```

The database also contains views used to simplify commonly required queries and combine information from multiple related tables.

---

# 🔄 API Communication

The React frontend communicates with the Express backend through Axios.

A shared Axios instance is used to centralize API configuration:

```text
client/src/shared/services/axiosInstance.js
```

Feature-specific API files then communicate with the backend.

For example:

```text
features/

├── auth/
│   └── api/
│       └── auth.Api.js

├── Products/
│   └── api/
│       └── Product.api.js

├── Profile/
│   └── api/
│       └── profile.api.js

├── Cart/
│   └── api/
│       └── Cart.api.js

├── Orders/
│   └── api/
│       └── Order.api.js

└── Contact/
    └── api/
        └── Contact.api.js
```

---

# 🔐 Authentication Flow

The authentication flow is based on JWT.

```text
User
 │
 ▼
Login/Register
 │
 ▼
Express API
 │
 ▼
Auth Service
 │
 ▼
Auth Repository
 │
 ▼
MySQL
 │
 ▼
JWT
 │
 ▼
HTTP-only Cookie
```

Protected endpoints use authentication middleware to verify the authenticated user.

Protected routes are also used for administrative functionality.

---

# 📦 Project Structure

```text
Execlusive_Ecommerce

│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── Products/
│   │   │   ├── Profile/
│   │   │   ├── Wishlist/
│   │   │   ├── Cart/
│   │   │   ├── Orders/
│   │   │   ├── Contact/
│   │   │   └── Admin/
│   │   │
│   │   ├── Pages/
│   │   ├── routes/
│   │   └── shared/
│   │
│   └── package.json
│
├── Database/
│   ├── Database-design/
│   ├── Products/
│   ├── Product_reviews/
│   ├── Profile/
│   ├── WishList/
│   ├── Cart/
│   ├── Orders/
│   ├── Contact/
│   ├── DB_Creation.sql
│   └── Views.sql
│
├── server/
│   ├── src/
│   │   ├── Features/
│   │   │   ├── Auth/
│   │   │   ├── Product/
│   │   │   ├── Product_Reviews/
│   │   │   ├── Profile/
│   │   │   ├── Wishlists/
│   │   │   ├── Cart/
│   │   │   ├── Orders/
│   │   │   ├── Contact/
│   │   │   └── Admin/
│   │   │
│   │   └── shared/
│   │
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

The current repository structure reflects separate frontend, backend, and database responsibilities.

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone <repository-url>

cd Execlusive_Ecommerce
```

## 2. Install root dependencies

```bash
npm install
```

## 3. Install client dependencies

```bash
cd client

npm install
```

## 4. Install server dependencies

```bash
cd ../server

npm install
```

---

# 🗄️ Database Setup

Make sure MySQL is installed and running.

Create the database using:

```text
Database/DB_Creation.sql
```

Then execute the required SQL files for:

* Tables
* Relationships
* Views
* Procedures
* Transactions
* Seed data

Configure the database connection in the server environment variables.

---

# 🔑 Environment Variables

Create an environment file for the backend and configure the required values.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> Do not commit `.env` files or other secrets to GitHub.

---

# ▶️ Running the Project

## Start the backend

```bash
cd server

npm start
```

## Start the frontend

Open another terminal:

```bash
cd client

npm start
```

The frontend and backend can then run independently during development.

---

# 🧠 Main Concepts Practiced

This project was built to practice several full-stack development concepts.

## Frontend

* React components
* React Hooks
* Custom Hooks
* React Router
* Protected Routes
* Zustand
* Axios
* Feature-Based Architecture
* API integration
* Form handling
* State management
* Responsive UI
* Live Search
* Debouncing
* Pagination
* Filtering
* Reusable components
* Admin interfaces

## Backend

* Express.js
* REST API design
* Middleware
* Controllers
* Services
* Repositories
* Authentication
* Authorization
* JWT
* Password hashing
* File uploads
* Email services
* Nodemailer
* Error handling
* Feature-Based Architecture
* Order processing
* Transactions

## Database

* MySQL
* SQL joins
* Subqueries
* Views
* Stored procedures
* Transactions
* Foreign keys
* Filtering
* Pagination
* Aggregation
* Relational database design
* Product lifecycle management
* Order and order-item relationships

---

# 📌 Current Project Status

The project is actively being developed and improved as a full-stack learning and portfolio project.

Current major areas include:

* Authentication
* Home page
* About page
* Contact
* Products
* Product details
* Live product search
* Search debouncing
* Product filtering
* Category filtering
* Rating filtering
* Price filtering
* Pagination
* Product reviews
* User profiles
* Addresses
* Saved cards
* Shopping cart
* Wishlist
* Checkout
* Orders
* Order history
* Order details
* Admin dashboard
* Admin product management
* Product active/inactive status
* Database transactions

Some parts of the application may still be under development or subject to architectural improvements.

---

# 🎯 Project Goals

The main goals of this project are to:

1. Build a complete full-stack e-commerce application.
2. Practice React and modern frontend architecture.
3. Build REST APIs using Express.js.
4. Improve MySQL and SQL skills.
5. Understand the relationship between frontend, backend, and database layers.
6. Practice clean separation of responsibilities.
7. Apply Feature-Based Architecture to a real project.
8. Build reusable components and hooks.
9. Gain practical experience with authentication and authorization.
10. Practice database transactions and relational database design.
11. Understand server-side pagination and filtering.
12. Implement real-world e-commerce workflows.
13. Create a portfolio project that demonstrates full-stack development skills.

---

# 👨‍💻 About the Project

**Execlusive Ecommerce** is a personal learning and portfolio project developed while studying **Computer & Software Engineering**.

The project is primarily focused on learning through implementation: designing the database, building the backend API, connecting it to a React frontend, debugging real application problems, implementing e-commerce workflows, and continuously improving the architecture.

---

# 📚 Project Documentation

Additional project notes and documentation are maintained inside the repository, including:

* Project blueprint
* Current project state
* Problems and solutions
* Zustand notes
* GitHub workflow notes
* React UI library references
* Database notes
* SQL procedures
* Architecture notes

---

# 📄 License

This project is currently intended for educational and portfolio purposes.
