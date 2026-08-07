USE ecommerce;

-- ===================================
-- USERS
-- ===================================
INSERT INTO users (name, email, password, avatar) VALUES
('Mohamed Yasser', 'mohamed@example.com', 'hashed_password_1', 'avatar1.jpg'),
('Ahmed Ali', 'ahmed@example.com', 'hashed_password_2', 'avatar2.jpg'),
('Sara Hassan', 'sara@example.com', 'hashed_password_3', 'avatar3.jpg');

-- ===================================
-- CATEGORIES
-- ===================================
INSERT INTO categories (name) VALUES
('Electronics'),
('Fashion'),
('Books'),
('Home Appliances');

-- ===================================
-- PRODUCTS
-- ===================================
INSERT INTO products (category_id, title, description, price, stock, image_url) VALUES
(1, 'iPhone 15 Pro', 'Latest Apple smartphone', 1199.99, 20, 'iphone15.jpg'),
(1, 'Samsung Galaxy S25', 'Flagship Android smartphone', 1099.99, 15, 'galaxys25.jpg'),
(2, 'Men T-Shirt', 'Comfortable cotton t-shirt', 24.99, 100, 'tshirt.jpg'),
(3, 'Clean Code', 'Software engineering book by Robert C. Martin', 39.99, 50, 'cleancode.jpg'),
(4, 'Air Fryer', 'Healthy cooking appliance', 149.99, 25, 'airfryer.jpg');

-- ===================================
-- WISHLIST
-- ===================================
INSERT INTO wishlist (user_id, product_id) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 5);

-- ===================================
-- CART ITEMS
-- ===================================
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(1, 2, 1),
(1, 3, 2),
(2, 1, 1),
(3, 5, 1);

-- ===================================
-- ADDRESSES
-- ===================================
INSERT INTO addresses (user_id, full_name, phone, city, address_line) VALUES
(1, 'Mohamed Yasser', '01012345678', 'Cairo', 'Nasr City, Street 10'),
(2, 'Ahmed Ali', '01198765432', 'Alexandria', 'Smouha, Building 22'),
(3, 'Sara Hassan', '01255555555', 'Giza', 'Dokki, Street 5');

-- ===================================
-- ORDERS
-- ===================================
INSERT INTO orders (user_id, address_id, total_price, status) VALUES
(1, 1, 1249.98, 'processing'),
(2, 2, 1099.99, 'shipped'),
(3, 3, 149.99, 'delivered');

-- ===================================
-- ORDER ITEMS
-- ===================================
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 1199.99),
(1, 3, 2, 24.99),
(2, 2, 1, 1099.99),
(3, 5, 1, 149.99);

-- ===================================
-- PRODUCT REVIEWS
-- ===================================
INSERT INTO product_reviews (product_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Excellent phone, very fast and reliable.'),
(2, 2, 4, 'Great Android device with amazing camera.'),
(4, 3, 5, 'A must-read book for developers.'),
(5, 1, 4, 'Very useful appliance for healthy cooking.');