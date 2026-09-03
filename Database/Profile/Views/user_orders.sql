CREATE VIEW user_orders AS
SELECT users.id, products.title, order_items.quantity, orders.total_price, orders.status
FROM
    users
    INNER JOIN orders ON users.id = orders.user_id
    INNER JOIN order_items ON order_items.order_id = orders.id
    INNER JOIN products ON order_items.product_id = products.id;

SELECT * FROM user_orders WHERE id = 14;