-- ===================================
-- DATABASE
-- ===================================

CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;


-- ===================================
-- USERS
-- ===================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    avatar VARCHAR(255),

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    gender ENUM('male', 'female', 'unkown') DEFAULT 'unkown',

    phone_number INT UNIQUE NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ===================================
-- CATEGORIES
-- ===================================

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL
);


-- ===================================
-- PRODUCTS
-- ===================================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Each Product belongs to ONE Category
    -- Relationship:
    -- categories (1) -------- (N) products
    category_id INT,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    Discount_price DECIMAL(10, 2) DEFAULT 0,

    old_price DECIMAL(10, 2) NOT NULL,

    stock INT DEFAULT 0,

    product_image VARCHAR(255),

    Added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- FK: products.category_id -> categories.id
    --
    -- One Category can have MANY Products
    -- A Product belongs to ONE Category
    --
    -- Relationship:
    -- categories (1) -------- (N) products
    FOREIGN KEY (category_id)
        REFERENCES categories (id)
        ON DELETE SET NULL
);


-- ===================================
-- CREDIT CARD
-- ===================================

CREATE TABLE IF NOT EXISTS credit_card (
    id INT PRIMARY KEY AUTO_INCREMENT,

    -- The Credit Card belongs to a User
    user_id INT NOT NULL,

    card_type ENUM(
        'Visa',
        'Mastercard',
        'American Express'
    ) NOT NULL,

    bank_name VARCHAR(100) NOT NULL,

    last4 CHAR(4) NOT NULL,

    expiry_day TINYINT NOT NULL,

    expiry_month TINYINT NOT NULL,

    expiry_year SMALLINT NOT NULL,

    balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,

    -- FK: credit_card.user_id -> users.id
    --
    -- One User can have MANY Credit Cards
    -- One Credit Card belongs to ONE User
    --
    -- Relationship:
    -- users (1) -------- (N) credit_card
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);


-- ===================================
-- ADDRESSES
-- ===================================

CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- The Address belongs to a User
    user_id INT NOT NULL,

    country VARCHAR(50) NOT NULL,

    city VARCHAR(100) NOT NULL,

    street_number VARCHAR(100) NOT NULL,

    building_number VARCHAR(100) NOT NULL,

    apartement_number VARCHAR(100) NOT NULL,

    -- FK: addresses.user_id -> users.id
    --
    -- One User can have MANY Addresses
    -- One Address belongs to ONE User
    --
    -- Relationship:
    -- users (1) -------- (N) addresses
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ===================================
-- WISHLIST
-- ===================================

DROP TABLE IF EXISTS wishlist;

CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- The User who added the Product to Wishlist
    user_id INT NOT NULL,

    -- The Product added to Wishlist
    product_id INT NOT NULL,

    -- Prevent the same User from adding
    -- the same Product more than once
    UNIQUE (user_id, product_id),

    -- FK: wishlist.user_id -> users.id
    --
    -- One User can have MANY Wishlist Items
    -- One Wishlist Item belongs to ONE User
    --
    -- Relationship:
    -- users (1) -------- (N) wishlist
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    -- FK: wishlist.product_id -> products.id
    --
    -- One Product can exist in MANY Users' Wishlists
    -- One Wishlist Item refers to ONE Product
    --
    -- Relationship:
    -- products (1) -------- (N) wishlist
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
);


-- ===================================
-- CART ITEMS
-- ===================================

CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- The User who owns this Cart Item
    user_id INT NOT NULL,

    -- The Product inside the User's Cart
    product_id INT NOT NULL,

    -- Number of this Product in the Cart
    quantity INT DEFAULT 1,

    -- FK: cart_items.user_id -> users.id
    --
    -- One User can have MANY Cart Items
    -- One Cart Item belongs to ONE User
    --
    -- Relationship:
    -- users (1) -------- (N) cart_items
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    -- FK: cart_items.product_id -> products.id
    --
    -- One Product can exist in MANY Users' Carts
    -- One Cart Item refers to ONE Product
    --
    -- Relationship:
    -- products (1) -------- (N) cart_items
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
);


-- ===================================
-- ORDERS
-- ===================================

CREATE OR REPLACE TABLE   orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- The User who created the Order
    user_id INT NOT NULL,
    -- The Address used for this Order
    address_id INT NOT NULL,
    -- Total price of the complete Order
    total_price DECIMAL(10, 2) NOT NULL,
    -- Current state of the Order
    status ENUM(
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
    ) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FK: orders.user_id -> users.id
    -- One User can create MANY Orders
    -- One Order belongs to ONE User
    -- Relationship:
    -- users (1) -------- (N) orders
    FOREIGN KEY (user_id)
        REFERENCES users (id),
    -- FK: orders.address_id -> addresses.id
    -- One Address can be used by MANY Orders
    -- One Order uses ONE Address
    -- Relationship:
    -- addresses (1) -------- (N) orders
    FOREIGN KEY (address_id)
        REFERENCES addresses (id)
);
ALTER TABLE orders ADD COLUMN arrive_at DATE DEFAULT (CURRENT_DATE);
ALTER TABLE orders ADD COLUMN created_at DATE DEFAULT (CURRENT_DATE);
ALTER TABLE order_items CHANGE COLUMN  total_price price DECIMAL(10,2);
-- ===================================
-- ORDER ITEMS
-- ===================================

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- The Order that contains this item
    order_id INT NOT NULL,

    -- The Product that was purchased
    product_id INT NOT NULL,

    -- Quantity purchased
    quantity INT NOT NULL,

    -- Product price AT THE TIME OF PURCHASE
    --
    -- Important:
    -- We store the price here because the Product's
    -- current price may change in the future.
    price DECIMAL(10, 2) NOT NULL,

    -- FK: order_items.order_id -> orders.id
    --
    -- One Order can contain MANY Order Items
    -- One Order Item belongs to ONE Order
    --
    -- Relationship:
    -- orders (1) -------- (N) order_items
    FOREIGN KEY (order_id)
        REFERENCES orders (id)
        ON DELETE CASCADE,

    -- FK: order_items.product_id -> products.id
    --
    -- One Product can appear in MANY Orders
    -- One Order Item refers to ONE Product
    --
    -- Relationship:
    -- products (1) -------- (N) order_items
    FOREIGN KEY (product_id)
        REFERENCES products (id)
);


-- ===================================
-- PRODUCT REVIEWS
-- ===================================

CREATE TABLE IF NOT EXISTS product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- The User who wrote the Review
    user_id INT NOT NULL,

    -- The Product being reviewed
    product_id INT NOT NULL,

    comment TEXT,

    rating TINYINT NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- FK: product_reviews.user_id -> users.id
    --
    -- One User can write MANY Reviews
    -- One Review belongs to ONE User
    --
    -- Relationship:
    -- users (1) -------- (N) product_reviews
    FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    -- FK: product_reviews.product_id -> products.id
    --
    -- One Product can have MANY Reviews
    -- One Review belongs to ONE Product
    --
    -- Relationship:
    -- products (1) -------- (N) product_reviews
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE,

    -- A User can review the same Product only ONCE
    UNIQUE (user_id, product_id)
);