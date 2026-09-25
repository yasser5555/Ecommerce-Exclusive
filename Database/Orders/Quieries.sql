SELECT * FROM orders ; 
UPDATE orders SET status = "pending" WHERE id >= 351;
enum('pending','processing','shipped','delivered','cancelled')

INSERT INTO
    orders (
        user_id,
        address_id,
        total_price,
        status
    )
VALUES (2, 23, 4500, "pending");

SELECT * from user_cart_items;

SELECT user_cart_items.image, user_cart_items.name, user_cart_items.quantity, user_cart_items.price, user_cart_items.sub_total, orders.status, orders.created_at as ordered_at
from user_cart_items
    INNER join orders on user_cart_items.user_cart_id = orders.user_id;

SELECT * from user_cart_items;

SELECT * from order_items;

DESCRIBE order_items;

INSERT into
    order_items (
        order_id,
        product_id,
        quantity,
        price
    )
VALUES (294,);

SELECT
    orders.id as order_id,
    user_cart_items.image,
    user_cart_items.name,
    user_cart_items.price,
    user_cart_items.quantity,
    (quantity * price) as total_price,
    orders.status,
    orders.arrive_at
FROM orders
    INNER join user_cart_items on orders.user_id = user_cart_items.user_cart_id;

SELECT SUM(quantity * price) AS total_payment
FROM orders
    INNER JOIN user_cart_items ON orders.user_id = user_cart_items.user_cart_id;

SELECT * FROM user_order;

SELECT * FROM order_items;

INSERT INTO
    order_items (
        order_id,
        product_id,
        quantity,
        total_price
    )
SELECT user_order.order_id, user_order.product_id, user_order.quantity, user_order.total_price
FROM user_order;

SELECT * FROM order_items;

DESCRIBE orders;

DESCRIBE order_items;

SELECT * from order_items;

SELECT * from order_items;

SELECT * from orders;

SELECT * FROM user_order;

INSERT INTO
    orders (
        user_id,
        address_id,
        total_price,
        status
    )
VALUES (1, 66, 450000, "Pending");

SELECT * from user_order WHERE user_id = 1;
-- ! Changing Price
SELECT * from credit_card;

SELECT * from user_order;

SELECT user_order.user_id, credit_card.user_id, user_order.total_sum, (
        credit_card.balance - user_order.total_sum
    ) as current_balance
from user_order
    inner join credit_card on user_order.user_id = credit_card.user_id;

UPDATE credit_card
INNER JOIN user_order ON user_order.user_id = credit_card.user_id
SET
    credit_card.balance = credit_card.balance - user_order.total_sum
where
    user_order.order_id = 329
    and credit_card.user_id = 1
    and user_order.user_id = 1
    and credit_card.id = 1

;
SELECT * from credit_card WHERE user_id = 1;

-- SELECT * from credit_card where user_id = 1 ;
-- SELECT * from orders where user_id = 1 ;
-- call PayOrder(328,1,220);
-- SELECT * from credit_card where user_id = 1 ;
SELECT * from user_order WHERE order_id = 331;

SELECT * from user_order WHERE products LIKE "%REDMI 10%";

SELECT COUNT(*) FROM order_items;

SELECT * FROM orders;

SELECT *
FROM user_order
WHERE
    user_order.order_id IN (
        SELECT DISTINCT (order_id)
        FROM
            orders
            JOIN order_items ON order_items.order_id = orders.id
            JOIN products p ON p.id = order_items.product_id
        WHERE
            p.title LIKE '%AR32AR2841HDFL%'
    );

-- Search Query For My Orders
SELECT *
FROM user_order
where
    user_order.order_id in (
        SELECT DISTINCT (order_id)
        FROM
            orders
            INNER join order_items on orders.id = order_items.order_id
            inner join products on order_items.product_id = products.id
            WHERE products.title like "%Acer%" 
    );


UPDATE products SET  stock = stock - 1  WHERE products.id = 1;
SELECT * FROM products  WHERE products.id = 1;

SELECT * FROM user_order WHERE products LIKE "%boAt%" ;