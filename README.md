# Execlusive Ecommerce 🛒

A full-stack e-commerce application built as a learning and portfolio project using **React.js, Express.js, Node.js, and MySQL**.

The project focuses on building a complete e-commerce workflow while practicing **Feature-Based Architecture, REST APIs, authentication, database design, state management, SQL queries, pagination, filtering, product reviews, profiles, and wishlists**.

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
* Pagination
* Filtering
* Relational Database Design

---

## ✨ Features

### 🔐 Authentication

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

### 🛍️ Products

* Display products
* Product details
* Product pagination
* Product search
* Product filtering
* Category filtering
* Rating filtering
* Price filtering
* Product wishlist status
* Product cards
* Product reviews

The frontend product feature contains dedicated API, hooks, pages, routes, store, and component layers.

---

### 🔎 Product Search & Pagination

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

These database operations are organized under the Products database module.

---

### ❤️ Wishlist

Users can:

* Add products to their wishlist
* Remove products from their wishlist
* View their wishlist
* Check whether a product is already in the wishlist

## Wishlist functionality is separated into its own frontend and backend feature.

### ⭐ Product Reviews

Users can:

* View product reviews
* Submit a review
* Rate products
* Display product ratings

The backend contains a dedicated `Product_Reviews` feature with its own controller, repository, service, and routes.

---

### 👤 User Profile

The profile section includes:

* Profile information
* Profile editing
* Avatar upload
* Address management
* Saved cards
* Order history
* Profile statistics

The frontend profile feature is divided into components, hooks, pages, routes, store, and API layers.

---

## 🏗️ Project Architecture

The project follows a **Feature-Based Architecture**.

Instead of organizing the application only by technical type, related functionality is grouped together by feature.

### Frontend

```text
client/
└── src/
    ├── features/
    │   ├── auth/
    │   ├── Products/
    │   ├── Profile/
    │   └── Wishlist/
    │
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

## 🖥️ Backend Architecture

The Express server also follows a feature-based structure.

```text
server/
└── src/
    ├── Features/
    │   ├── Auth/
    │   ├── Product/
    │   ├── Product_Reviews/
    │   ├── Profile/
    │   └── Wishlists/
    │
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

### Request Flow

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

### Responsibility of Each Layer

**Route**

Defines the API endpoint and connects it to the appropriate controller.

**Controller**

Handles the HTTP request and response.

**Service**

Contains the application's business logic.

**Repository**

Responsible for communicating with the database.

**Database**

Stores and retrieves the application's persistent data.

---

## 🗄️ Database

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
└── Views.sql
```

The database implementation includes:

* Relational database design
* Foreign keys
* SQL joins
* Views
* Stored procedures
* Filtering
* Pagination
* Product queries
* Wishlist queries
* Profile queries
* Product review queries

The project also contains a MySQL Workbench database design file.

---

## 📁 Database Procedures & Views

Some database operations are encapsulated using stored procedures.

Examples include:

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

---

## 🔄 API Communication

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
│
├── Products/
│   └── api/
│       └── Product.api.js
│
└── Profile/
    └── api/
        └── profile.api.js
```

---

## 🔐 Authentication Flow

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

---

## 📦 Project Structure

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
│   │   │   └── Wishlist/
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
│   │   │   └── Wishlists/
│   │   │
│   │   └── shared/
│   │
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

## The current repository structure reflects separate frontend, backend, and database responsibilities.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Execlusive_Ecommerce
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install client dependencies

```bash
cd client
npm install
```

### 4. Install server dependencies

```bash
cd ../server
npm install
```

---

## 🗄️ Database Setup

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
* Seed data

Configure the database connection in the server environment variables.

---

## 🔑 Environment Variables

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


---

## ▶️ Running the Project

### Start the backend

```bash
cd server
npm start
```

### Start the frontend

Open another terminal:

```bash
cd client
npm start
```

The frontend and backend can then run independently during development.

---

## 🧠 Main Concepts Practiced

This project was built to practice several full-stack development concepts:

### Frontend

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

### Backend

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
* Error handling

### Database

* MySQL
* SQL joins
* Subqueries
* Views
* Stored procedures
* Foreign keys
* Filtering
* Pagination
* Aggregation
* Relational database design

---

## 📌 Current Project Status

The project is actively being developed and improved as a full-stack learning and portfolio project.

Current major areas include:

* Authentication
* Products
* Product details
* Product search
* Product filtering
* Pagination
* Product reviews
* User profiles
* Addresses
* Cards
* Order history
* Wishlist

Some parts of the application may still be under development or subject to architectural improvements.

---

## 🎯 Project Goals

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
10. Create a portfolio project that demonstrates full-stack development skills.

---

## 👨‍💻 About the Project

**Execlusive Ecommerce** is a personal learning and portfolio project developed while studying **Computer & Software Engineering**.

The project is primarily focused on learning through implementation: designing the database, building the backend API, connecting it to a React frontend, debugging real application problems, and continuously improving the architecture.

---

## 📚 Project Documentation

Additional project notes and documentation are maintained inside the repository, including:

* Project blueprint
* Current project state
* Problems and solutions
* Zustand notes
* GitHub workflow notes
* React UI library references

---

## 📄 License

This project is currently intended for educational and portfolio purposes.
