DROP PROCEDURE IF EXISTS GetAdminDashboard;
DELIMITER //
CREATE PROCEDURE GetAdminDashboard()
BEGIN
    -- Total Orders
    SELECT COUNT(*) AS total_orders
    FROM orders;

    -- Total Users
    SELECT COUNT(*) AS total_users
    FROM users;

    -- Total Products
    SELECT COUNT(*) AS total_products
    FROM products;

    -- Total Revenue
    SELECT COALESCE(SUM(total_price), 0) AS total_revenue
    FROM orders WHERE status ="delivered";
    -- Orders By Status
    SELECT
        SUM(status = 'pending') AS pending,
        SUM(status = 'processing') AS processing,
        SUM(status = 'shipped') AS shipped,
        SUM(status = 'delivered') AS delivered,
        SUM(status = 'cancelled') AS cancelled
    FROM orders;
    SELECT orders.id, users.first_name, users.first_name, orders.created_at, orders.total_price, orders.status
from orders
    INNER JOIN users on orders.user_id = users.id
    INNER JOIN order_items on orders.id = order_items.order_id  order by RAND() limit 5;

SELECT products.id, categories.id, products.product_image, products.title, categories.name as catogery, products.stock
FROM products
    inner join categories on products.category_id = categories.id
where
    stock < 10;
END 
DELIMITER;

call GetAdminDashboard ();