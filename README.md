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

The project includes a dedicated Admin section for managing the e-commerce application.

The Admin interface is separated from the customer-facing application and provides administrative tools for managing products and monitoring the store.

The Admin frontend is built using **React, Zustand, Bootstrap, and Axios**, while the backend follows the project's **Controller → Service → Repository → MySQL** architecture.

---

## 📊 Admin Dashboard

The Admin Dashboard provides an overview of the store and acts as the main entry point for administrative functionality.

The dashboard includes administrative statistics and information related to the store.

The Admin Dashboard is connected to the backend through dedicated API endpoints and retrieves data dynamically from MySQL.

The Admin area is structured around:

```text
Admin
│
├── Dashboard
│
├── Products
│
├── Categories
│
├── Orders
│
├── Users
│
├── Reports
│
└── Settings
```

Some administrative sections are still under development.

---

## 📦 Admin Product Management

The Admin Product Management feature allows administrators to manage products from a dedicated product management interface.

The current implementation includes:

* Displaying products in an admin table
* Product statistics
* Product search
* Debounced product search
* Product pagination
* Stock filtering
* Low-stock products
* Out-of-stock products
* Product creation
* Product category selection
* Product image upload
* Product title management
* Product description management
* Product price management
* Product stock management
* Product editing
* Product deactivation
* Product status display
* Product deletion/deactivation confirmation
* Product rating and review count display

The admin product table displays information such as:

```text
Product
Category
Price
Stock
Rating
Reviews
Status
Actions
```

---

## ➕ Admin Product Creation

Administrators can create new products through a dedicated product creation interface.

The product creation form supports:

* Product category
* Product title
* Product description
* Product price
* Product stock
* Product image

The product image is uploaded using **Multer** and stored on the backend.

The creation workflow follows:

```text
Admin Product Form
        ↓
FormData
        ↓
Axios
        ↓
Express Route
        ↓
Multer
        ↓
Controller
        ↓
Service
        ↓
Repository
        ↓
MySQL
```

The image path is stored with the product information in the database.

---

## 🔎 Admin Product Search

The Admin Product Management interface includes live product searching.

The search request is triggered while the administrator types instead of requiring a separate search button.

Example:

```text
Admin types:

Redmi

   ↓

Wait for debounce period

   ↓

Search API

   ↓

Express

   ↓

MySQL

   ↓

Matching products
```

Debouncing is used to reduce unnecessary API requests while the administrator is typing.

---

## 📦 Admin Stock Management

The Admin Product Management interface provides stock-based filtering.

Administrators can view products based on their stock status.

Current stock categories include:

```text
All Products
     │
     ├── In Stock
     │
     ├── Low Stock
     │
     └── Out of Stock
```

Products with low stock and products with no available stock can be displayed separately.

The interface also displays the current stock status of each product.

Example:

```text
Stock > 5
    ↓
In Stock

1 - 5
    ↓
Low Stock

0
    ↓
Out of Stock
```

---

## ✏️ Admin Product Editing

Administrators can edit product information directly from the product management interface.

The current editing functionality supports updating:

* Product title
* Product price
* Product stock

The frontend detects which values were changed and sends the required updates to the backend.

The update flow is:

```text
Admin
  ↓
Edit Product
  ↓
Detect Changed Fields
  ↓
Update API
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

---

## 🗑️ Product Deactivation

Products are not physically deleted from the database.

Instead, the project uses the `is_active` field to control product availability.

Example:

```text
is_active = 1
      ↓
Active Product
      ↓
Available to customers
```

```text
is_active = 0
      ↓
Inactive Product
      ↓
Removed from active product results
```

This approach preserves products that may already be referenced by historical orders.

The Admin Product Management interface provides a deletion/deactivation action that changes the product's active state instead of removing the database record.

---

## 🏷️ Admin Category Integration

The product creation interface retrieves available categories from the backend.

Administrators select a category by its displayed name while the corresponding category ID is stored and sent to the backend.

Example:

```text
Category Dropdown

Smartphones
Laptops
Accessories
Audio

        ↓

Selected Category

        ↓

category_id

        ↓

MySQL
```

This keeps the product-category relationship based on the relational database design.

---

## 🧠 Admin Product State Management

The Admin Product feature uses **Zustand** for frontend state management.

The Admin Product store manages data such as:

```text
Products
Search Results
Product Page Data
Categories
Loading State
```

The store also provides actions for:

```text
Fetch Products
Search Products
Fetch Categories
Get Low Stock Products
Get Out of Stock Products
Create Product
Update Product
Delete / Deactivate Product
```

This keeps API communication and product state management separated from the UI components.

---

# 🔄 Admin Product Request Flow

The Admin Product feature follows the same layered architecture used throughout the backend.

```text
React Admin Product Page
          ↓
Zustand Store
          ↓
Product API
          ↓
Express Route
          ↓
Controller
          ↓
Service
          ↓
Repository
          ↓
MySQL
```

For product image uploads, the request additionally passes through Multer:

```text
React
  ↓
FormData
  ↓
Axios
  ↓
Express
  ↓
Multer
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MySQL
```

---

# 🧩 Admin Product UI

The Admin Product interface is built using **React and Bootstrap**.

The interface includes:

* Responsive product table
* Product statistics
* Search interface
* Stock filters
* Product creation modal
* Product editing modal
* Product deletion/deactivation confirmation
* Product image preview
* Category dropdown
* Product status badges
* Product rating display
* Review count display
* Loading states
* Toast notifications

The interface uses Bootstrap for layout and styling and Lucide React for interface icons.


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

## Current major areas

### Customer Features

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
* Avatar upload
* Addresses
* Saved cards
* Shopping cart
* Wishlist
* Checkout
* Orders
* Order history
* Order details

### Admin Features

* Admin dashboard
* Admin layout
* Admin sidebar/navigation
* Admin product management
* Product statistics
* Product listing
* Product creation
* Product image upload
* Product category selection
* Product search
* Debounced admin product search
* Product pagination
* Stock filtering
* Low-stock products
* Out-of-stock products
* Product editing
* Product title updates
* Product price updates
* Product stock updates
* Product activation/deactivation
* Product status indicators
* Product rating and review information
* Product deletion/deactivation confirmation
* Admin product state management with Zustand
* Toast notifications
* Responsive Bootstrap-based admin UI

### Database & Backend

* MySQL relational database
* Foreign keys
* SQL joins
* Subqueries
* Views
* Stored procedures
* Transactions
* Aggregation
* Pagination
* Filtering
* Product lifecycle management
* Order and order-item relationships
* File uploads using Multer
* Email communication using Nodemailer
* JWT authentication
* Protected routes
* Controller / Service / Repository architecture
* Feature-Based Architecture

Some Admin sections such as advanced user management, reports, settings, category administration, and full order administration are still under development.

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
