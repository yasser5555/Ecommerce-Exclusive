DROP PROCEDURE IF EXISTS SearchForOrder;
DELIMITER $$
CREATE PROCEDURE SearchForOrder(
    IN p_title VARCHAR(255),
    IN p_user_id INT
)
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

    WHERE orders.user_id = p_user_id
      AND EXISTS (
          SELECT 1
          FROM order_items AS matching_items
          INNER JOIN products AS matching_products
              ON matching_items.product_id = matching_products.id
          WHERE matching_items.order_id = orders.id
            AND matching_products.title LIKE CONCAT('%', p_title, '%')
      )

    GROUP BY
        orders.id,
        orders.user_id,
        orders.status,
        orders.created_at,
        orders.arrive_at;
END $$
DELIMITER ;
CALL SearchForOrder('REDMI', 1);