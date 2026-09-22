SELECT * FROM products WHERE category_id = 2;
-- ! Server Code
-- * Create a new Product
INSERT into
    products (
        category_id,
        title,
        description,
        old_price,
        stock,
        product_image
    )
VALUES (?, ?, ?, ?, ?, ?);
-- *  Delete Product
DELETE from products WHERE products.id = ?;
--* Get All products
SELECT * FROM products;
-- * update Products

-- ? For Home page
-- ! Total Orders
SELECT count(*) from orders;
-- ! Total users
SELECT count(*) from users;
-- ! Total Products
SELECT count(*) from products;
-- ! Total Revuene
SELECT sum(orders.total_price) from orders;
-- ! Recent orders
SELECT COUNT(*) from orders WHERE status = "pending";

SELECT COUNT(*) from orders WHERE status = "processing";

SELECT COUNT(*) from orders WHERE status = "shipped";

SELECT COUNT(*) from orders WHERE status = "delivered";

SELECT COUNT(*) from orders WHERE status = "cancelled";

SELECT products.id, categories.id, products.product_image, products.title, categories.name as catogery, products.stock
FROM products
    inner join categories on products.category_id = categories.id
where
    stock < 10;

SELECT orders.id, users.first_name, users.first_name, orders.created_at, orders.total_price, orders.status
from orders
    INNER JOIN users on orders.user_id = users.id
    INNER JOIN order_items on orders.id = order_items.order_id   order by RAND() limit 5 ;
    SELECT * FROM orders;
    -- enum('pending','processing','shipped','delivered','cancelled')
