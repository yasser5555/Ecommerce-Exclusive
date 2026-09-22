DELIMITER $$
CREATE PROCEDURE SearchForOrder(IN p_title VARCHAR(255))
BEGIN

    SELECT
        orders.id AS order_id,
        orders.user_id,
        orders.status,
        orders.created_at,
        orders.arrive_at,

        SUM(
            order_items.quantity * order_items.price
        ) AS total_sum,

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

    WHERE orders.id IN (
        SELECT DISTINCT order_items.order_id

        FROM order_items

        INNER JOIN products
            ON order_items.product_id = products.id

        WHERE products.title LIKE CONCAT('%', p_title, '%')
    )

    AND products.title LIKE CONCAT('%', p_title, '%')

    GROUP BY
        orders.id,
        orders.user_id,
        orders.status,
        orders.created_at,
        orders.arrive_at;
END $$
DELIMITER ;
CALL SearchForOrder('REDMI');