-- ===================================
-- 1. INSERT 20 CATEGORIES
-- ===================================
INSERT INTO categories (name) VALUES
('Electronics'),
('Clothing'),
('Books'),
('Home & Kitchen'),
('Sports & Outdoors'),
('Beauty & Personal Care'),
('Toys & Games'),
('Automotive'),
('Health & Wellness'),
('Office Supplies'),
('Pet Supplies'),
('Garden & Outdoor'),
('Music & Instruments'),
('Art & Crafts'),
('Jewelry & Accessories'),
('Baby Products'),
('Food & Beverages'),
('Shoes & Footwear'),
('Furniture'),
('Industrial & Scientific');

-- ===================================
-- 2. INSERT 20 USERS (password = email)
-- ===================================
INSERT INTO users (first_name, last_name, gender, phone_number, email, password) VALUES
('Ahmed', 'Mohamed', 'male', 1000000001, 'ahmed.mohamed@gmail.com', 'ahmed.mohamed@gmail.com'),
('Sara', 'Ali', 'female', 1000000002, 'sara.ali@yahoo.com', 'sara.ali@yahoo.com'),
('Mohammed', 'Hassan', 'male', 1000000003, 'mohammed.hassan@outlook.com', 'mohammed.hassan@outlook.com'),
('Fatima', 'Saleh', 'female', 1000000004, 'fatima.saleh@gmail.com', 'fatima.saleh@gmail.com'),
('Omar', 'Abdullah', 'male', 1000000005, 'omar.abdullah@hotmail.com', 'omar.abdullah@hotmail.com'),
('Layla', 'Rashid', 'female', 1000000006, 'layla.rashid@gmail.com', 'layla.rashid@gmail.com'),
('Khalid', 'Othman', 'male', 1000000007, 'khalid.othman@yahoo.com', 'khalid.othman@yahoo.com'),
('Nora', 'Sulaiman', 'female', 1000000008, 'nora.sulaiman@gmail.com', 'nora.sulaiman@gmail.com'),
('Faisal', 'Ibrahim', 'male', 1000000009, 'faisal.ibrahim@outlook.com', 'faisal.ibrahim@outlook.com'),
('Huda', 'Abdulrahman', 'female', 1000000010, 'huda.abdulrahman@gmail.com', 'huda.abdulrahman@gmail.com'),
('Sultan', 'Mansour', 'male', 1000000011, 'sultan.mansour@hotmail.com', 'sultan.mansour@hotmail.com'),
('Rania', 'Alfaisal', 'female', 1000000012, 'rania.alfaisal@gmail.com', 'rania.alfaisal@gmail.com'),
('Turki', 'Saud', 'male', 1000000013, 'turki.saud@yahoo.com', 'turki.saud@yahoo.com'),
('Mona', 'Khalifa', 'female', 1000000014, 'mona.khalifa@gmail.com', 'mona.khalifa@gmail.com'),
('Hassan', 'Jaber', 'male', 1000000015, 'hassan.jaber@outlook.com', 'hassan.jaber@outlook.com'),
('Nadia', 'Abdulaziz', 'female', 1000000016, 'nadia.abdulaziz@gmail.com', 'nadia.abdulaziz@gmail.com'),
('Yousef', 'Rashid', 'male', 1000000017, 'yousef.rashid@hotmail.com', 'yousef.rashid@hotmail.com'),
('Amira', 'Saeed', 'female', 1000000018, 'amira.saeed@gmail.com', 'amira.saeed@gmail.com'),
('Mishal', 'Fahad', 'male', 1000000019, 'mishal.fahad@yahoo.com', 'mishal.fahad@yahoo.com'),
('Lamia', 'Tariq', 'female', 1000000020, 'lamia.tariq@gmail.com', 'lamia.tariq@gmail.com');

-- ===================================
-- 3. INSERT 20 PRODUCTS
-- ===================================
INSERT INTO products (category_id, title, description, Discount_price, old_price, stock, product_image) VALUES
(1, 'Apple iPhone 14 Pro Max', 'Latest iPhone with 48MP camera, A16 Bionic chip, and 6.7-inch Super Retina XDR display', 1299.99, 1399.99, 50, 'iphone14promax.jpg'),
(1, 'Samsung 4K Smart TV 65-inch', '65-inch 4K QLED Smart TV with HDR and Alexa built-in', 899.99, 1099.99, 25, 'samsung65tv.jpg'),
(2, 'Premium Leather Jacket', 'Genuine leather jacket with zipper closure and quilted lining', 159.99, 199.99, 30, 'leather_jacket.jpg'),
(2, 'Organic Cotton T-Shirt', 'Comfortable 100% organic cotton t-shirt, available in various colors', 29.99, 39.99, 100, 'cotton_tshirt.jpg'),
(3, 'The Art of War by Sun Tzu', 'Classic military strategy book, deluxe hardcover edition', 19.99, 29.99, 75, 'art_of_war.jpg'),
(3, 'Rich Dad Poor Dad', 'Financial literacy classic by Robert Kiyosaki', 15.99, 24.99, 60, 'rich_dad_poor_dad.jpg'),
(4, 'KitchenAid Stand Mixer', 'Professional 5-quart stand mixer with 10 speeds and stainless steel bowl', 299.99, 449.99, 20, 'kitchenaid_mixer.jpg'),
(4, 'Non-Stick Cookware Set', '10-piece non-stick cookware set with tempered glass lids', 89.99, 149.99, 40, 'cookware_set.jpg'),
(5, 'Professional Yoga Mat', 'Eco-friendly non-slip yoga mat with alignment lines', 39.99, 59.99, 85, 'yoga_mat.jpg'),
(5, 'Mountain Bike Helmet', 'Lightweight and ventilated mountain bike helmet with MIPS technology', 79.99, 99.99, 45, 'bike_helmet.jpg'),
(6, 'Vitamin C Serum', 'Advanced brightening serum with hyaluronic acid and vitamin E', 49.99, 69.99, 90, 'vitamin_c_serum.jpg'),
(6, 'Bamboo Toothbrush Set', 'Eco-friendly bamboo toothbrushes with charcoal bristles (4-pack)', 19.99, 29.99, 120, 'bamboo_toothbrush.jpg'),
(7, 'LEGO Creator Expert', '3-in-1 modular building set with 2000+ pieces', 199.99, 249.99, 35, 'lego_creator.jpg'),
(7, 'Board Game Collection', '5 classic board games in one box, perfect for family night', 29.99, 39.99, 55, 'board_games.jpg'),
(8, 'Car LED Headlights', 'Super bright LED headlight conversion kit, 5000k color temperature', 149.99, 199.99, 60, 'led_headlights.jpg'),
(8, 'Car Phone Holder', 'Universal car phone holder with 360-degree rotation', 19.99, 29.99, 150, 'car_phone_holder.jpg'),
(9, 'Smart Fitness Tracker', 'Advanced fitness tracker with heart rate monitor and GPS', 79.99, 99.99, 70, 'fitness_tracker.jpg'),
(9, 'Essential Oil Diffuser', 'Aromatherapy essential oil diffuser with LED mood light', 34.99, 49.99, 95, 'oil_diffuser.jpg'),
(10, 'Ergonomic Office Chair', 'Adjustable ergonomic office chair with lumbar support', 249.99, 349.99, 15, 'office_chair.jpg'),
(10, 'Wireless Mouse', 'Wireless ergonomic mouse with silent clicks', 24.99, 34.99, 110, 'wireless_mouse.jpg');

-- ===================================
-- 4. INSERT 20 CREDIT CARDS
-- ===================================
INSERT INTO credit_card (user_id, last4, bank_name, expiry_month, expiry_year) VALUES
(1, '1234', 'Riyad Bank', 12, 2025),
(2, '5678', 'Saudi National Bank', 6, 2026),
(3, '9012', 'Al Rajhi Bank', 3, 2024),
(4, '3456', 'Bank AlJazira', 9, 2025),
(5, '7890', 'Riyad Bank', 11, 2026),
(6, '2345', 'Saudi National Bank', 5, 2024),
(7, '6789', 'Al Rajhi Bank', 8, 2025),
(8, '0123', 'Bank AlBilad', 2, 2026),
(9, '4567', 'Riyad Bank', 10, 2024),
(10, '8901', 'Saudi National Bank', 7, 2025),
(11, '3456', 'Al Rajhi Bank', 4, 2026),
(12, '7891', 'Bank AlJazira', 1, 2024),
(13, '2346', 'Riyad Bank', 9, 2025),
(14, '6782', 'Saudi National Bank', 6, 2026),
(15, '0124', 'Al Rajhi Bank', 3, 2024),
(16, '4568', 'Bank AlBilad', 8, 2025),
(17, '8902', 'Riyad Bank', 5, 2026),
(18, '3457', 'Saudi National Bank', 2, 2024),
(19, '7892', 'Al Rajhi Bank', 10, 2025),
(20, '2347', 'Bank AlJazira', 7, 2026);

-- ===================================
-- 5. INSERT 20 ADDRESSES
-- ===================================
INSERT INTO addresses (user_id, country, city, street_number, building_number, apartement_number) VALUES
(1, 'Saudi Arabia', 'Riyadh', 'King Fahd Road', '1234', '5A'),
(2, 'Saudi Arabia', 'Jeddah', 'Al-Madinah Road', '5678', 'B2'),
(3, 'Saudi Arabia', 'Dammam', 'Prince Mohammed Street', '9012', '3C'),
(4, 'Saudi Arabia', 'Makkah', 'Al-Haram Street', '3456', '7D'),
(5, 'Saudi Arabia', 'Madinah', 'King Abdulaziz Road', '7890', '1E'),
(6, 'Saudi Arabia', 'Riyadh', 'Olaya Street', '2345', '8F'),
(7, 'Saudi Arabia', 'Jeddah', 'Corniche Road', '6789', '2G'),
(8, 'Saudi Arabia', 'Dammam', 'King Faisal Road', '0123', '4H'),
(9, 'Saudi Arabia', 'Makkah', 'Al-Noor Street', '4567', '9I'),
(10, 'Saudi Arabia', 'Madinah', 'Sultan Road', '8901', '6J'),
(11, 'Saudi Arabia', 'Riyadh', 'Tahlia Street', '3456', '3K'),
(12, 'Saudi Arabia', 'Jeddah', 'Palestine Street', '7891', '7L'),
(13, 'Saudi Arabia', 'Dammam', 'King Saud Road', '2346', '5M'),
(14, 'Saudi Arabia', 'Makkah', 'Al-Takhasosi Street', '6782', '8N'),
(15, 'Saudi Arabia', 'Madinah', 'Al-Masjid Street', '0124', '2O'),
(16, 'Saudi Arabia', 'Riyadh', 'Northern Ring Road', '4568', '6P'),
(17, 'Saudi Arabia', 'Jeddah', 'Al-Hamra Street', '8902', '9Q'),
(18, 'Saudi Arabia', 'Dammam', 'Al-Khobar Street', '3457', '4R'),
(19, 'Saudi Arabia', 'Makkah', 'Al-Aziziyah Street', '7892', '7S'),
(20, 'Saudi Arabia', 'Madinah', 'Airport Road', '2347', '3T');

-- ===================================
-- 6. INSERT 20 WISHLIST ITEMS
-- ===================================
INSERT INTO wishlist (user_id, product_id) VALUES
(1, 1),
(2, 5),
(3, 10),
(4, 15),
(5, 2),
(6, 8),
(7, 12),
(8, 18),
(9, 3),
(10, 20),
(11, 7),
(12, 14),
(13, 9),
(14, 19),
(15, 4),
(16, 11),
(17, 16),
(18, 6),
(19, 13),
(20, 17);

-- ===================================
-- 7. INSERT 20 CART ITEMS
-- ===================================
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(1, 2, 2),
(1, 5, 1),
(2, 8, 3),
(3, 11, 1),
(4, 1, 1),
(5, 15, 2),
(6, 3, 1),
(7, 19, 1),
(8, 6, 2),
(9, 13, 1),
(10, 7, 1),
(11, 17, 3),
(12, 4, 1),
(13, 20, 2),
(14, 9, 1),
(15, 12, 1),
(16, 18, 2),
(17, 10, 1),
(18, 14, 1),
(19, 16, 2);

-- ===================================
-- 8. INSERT 20 ORDERS
-- ===================================
INSERT INTO orders (user_id, address_id, total_price, status) VALUES
(1, 1, 129.97, 'delivered'),
(2, 2, 89.99, 'shipped'),
(3, 3, 449.99, 'pending'),
(4, 4, 39.99, 'delivered'),
(5, 5, 199.99, 'processing'),
(6, 6, 79.99, 'shipped'),
(7, 7, 199.99, 'delivered'),
(8, 8, 49.99, 'pending'),
(9, 9, 349.99, 'cancelled'),
(10, 10, 29.99, 'delivered'),
(11, 11, 299.99, 'processing'),
(12, 12, 159.99, 'shipped'),
(13, 13, 24.99, 'delivered'),
(14, 14, 249.99, 'pending'),
(15, 15, 39.99, 'delivered'),
(16, 16, 899.99, 'shipped'),
(17, 17, 149.99, 'processing'),
(18, 18, 19.99, 'delivered'),
(19, 19, 79.99, 'shipped'),
(20, 20, 199.99, 'pending');

-- ===================================
-- 9. INSERT 20 ORDER ITEMS
-- ===================================
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 2, 1, 899.99),
(1, 5, 2, 19.99),
(2, 8, 1, 89.99),
(3, 7, 1, 449.99),
(4, 9, 1, 39.99),
(5, 14, 5, 39.99),
(6, 17, 1, 79.99),
(7, 13, 1, 199.99),
(8, 11, 1, 49.99),
(9, 19, 1, 349.99),
(10, 6, 2, 14.99),
(11, 4, 10, 29.99),
(12, 3, 1, 159.99),
(13, 20, 1, 24.99),
(14, 18, 1, 249.99),
(15, 9, 1, 39.99),
(16, 2, 1, 899.99),
(17, 16, 3, 49.99),
(18, 12, 1, 19.99),
(19, 17, 1, 79.99),
(20, 13, 1, 199.99);

-- ===================================
-- 10. INSERT 20 PRODUCT REVIEWS
-- ===================================
INSERT INTO product_reviews (user_id, product_id, comment, rating) VALUES
(1, 1, 'Amazing phone! The camera is incredible.', 5),
(2, 5, 'Great book, very insightful.', 4),
(3, 10, 'Excellent helmet, very comfortable and safe.', 5),
(4, 15, 'Works perfectly, very bright lights.', 4),
(5, 2, 'Best TV I have ever owned.', 5),
(6, 8, 'The cookware is top quality.', 4),
(7, 12, 'Eco-friendly and works great.', 5),
(8, 18, 'Very comfortable chair, highly recommend.', 5),
(9, 3, 'Nice jacket but a bit expensive.', 3),
(10, 20, 'Great mouse for the price.', 4),
(11, 7, 'Mixer is powerful and easy to clean.', 5),
(12, 14, 'Fun board games, great for family.', 4),
(13, 9, 'Very comfortable mat, non-slip works great.', 5),
(14, 19, 'Good chair but assembly was difficult.', 3),
(15, 4, 'Soft fabric, fits perfectly.', 5),
(16, 11, 'My skin looks brighter already!', 5),
(17, 16, 'Good holder, stays in place.', 4),
(18, 6, 'Must-read for financial freedom.', 5),
(19, 13, 'Great LEGO set, very detailed.', 5),
(20, 17, 'Good tracker, accurate measurements.', 4);