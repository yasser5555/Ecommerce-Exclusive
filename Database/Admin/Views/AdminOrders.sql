drop VIEW if EXISTS AdminOrdersPage;
CREATE OR REPLACE VIEW AdminOrdersPage AS
SELECT
    orders.id AS order_id,

    users.avatar,
    users.first_name,
    users.last_name,
    users.email,
    users.id AS user_id,
    users.created_at AS user_created_at,
    users.phone_number,

    orders.total_price,
    orders.status,
    orders.created_at AS ordered_at,
    orders.arrive_at,

    addresses.street_number,
    addresses.city,
    addresses.country,

    user_order.products

FROM orders

INNER JOIN users
    ON orders.user_id = users.id

INNER JOIN addresses
    ON orders.address_id = addresses.id

INNER JOIN user_order
    ON orders.id = user_order.order_id;
    SELECT * FROM AdminOrdersPage  ;
    DESCRIBE user_order;