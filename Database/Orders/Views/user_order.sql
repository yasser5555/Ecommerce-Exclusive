-- ! Delete Current Orders_table
DESCRIBE orders;

DELETE FROM orders;

CREATE OR REPLACE VIEW user_order AS
SELECT
    orders.id AS order_id,
    orders.user_id,
    orders.status,
    orders.created_at,
    orders.arrive_at,

    SUM(order_items.quantity * order_items.price) AS total_sum,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_id', order_items.product_id,
            'image', products.product_image,
            'name', products.title,
            'old_price', products.old_price,
            'quantity', order_items.quantity,
            'price', order_items.price
        )
    ) AS products

FROM orders

INNER JOIN order_items
    ON orders.id = order_items.order_id

INNER JOIN products
    ON order_items.product_id = products.id

GROUP BY
    orders.id,
    orders.user_id,
    orders.status,
    orders.created_at,
    orders.arrive_at;
-- Test View
SELECT * from user_order WHERE user_id = 1;

delete from user_order WHERE user_id = 1;

SELECT * from orders;

SELECT * FROM order_items

INSERT into
    orders (
        user_id,
        address_id,
        total_price,
        status
    )
VALUES (2, 23, 9500, "pending");
-- ! 1.Create Order
-- INSERT into orders ( user_id, address_id, total_price, status) VALUES (?, ?, ?, ?);
-- ! 2.Create OrderHistory
-- INSERT into order_items ( user_id, address_id, total_price, status) VALUES (?, ?, ?, ?);
-- ! 3.Read Order Info:
-- SELECT * from user_order WHERE user_id = 2;
--  ! 4.Get Total price for all Order:
SELECT SUM(
        order_items.quantity * order_items.total_price
    )
FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
WHERE
    orders.id = ?
    AND orders.user_id = ?;

SELECT * FROM user_order WHERE user_id = 1;