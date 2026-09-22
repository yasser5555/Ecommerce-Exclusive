-- Active: 1784927809131@@127.0.0.1@3306@ecommerce
SELECT id from credit_card ORDER BY id DESC; 
use ecommerce;

DROP PROCEDURE IF EXISTS create_order;

DELIMITER $$
SELECT * FROM credit_card ORDER BY user_id DESC;
CREATE PROCEDURE create_order (
    IN p_user_id INT,
    IN p_address_id INT,
    IN p_status VARCHAR(20),
    IN p_products JSON,
    IN p_card_id INT
)
BEGIN

    DECLARE v_order_id INT;
    DECLARE v_total_price DECIMAL(10,2) DEFAULT 0;

    START TRANSACTION;

    /*
      Calculate total price
      from all products
    */
    SELECT COALESCE(
        SUM(
            jt.quantity * jt.price
        ),
        0
    )
    INTO v_total_price
    FROM JSON_TABLE(
        p_products,
        '$[*]'
        COLUMNS (
            product_id INT PATH '$.product_id',
            quantity INT PATH '$.quantity',
            price DECIMAL(10,2) PATH '$.price'
        )
    ) AS jt;


    /*
      Create Order
    */
    INSERT INTO orders
    (
        user_id,
        address_id,
        total_price,
        status
    )
    VALUES
    (
        p_user_id,
        p_address_id,
        v_total_price,
        p_status
    );

    SET v_order_id = LAST_INSERT_ID();


    /*
      Create Order Items
    */
    INSERT INTO order_items
    (
        order_id,
        product_id,
        quantity,
        price
    )
    SELECT
        v_order_id,
        jt.product_id,
        jt.quantity,
        jt.price
    FROM JSON_TABLE(
        p_products,
        '$[*]'
        COLUMNS (
            product_id INT PATH '$.product_id',
            quantity INT PATH '$.quantity',
            price DECIMAL(10,2) PATH '$.price'
        )
    ) AS jt;


    /*
      Decrease stock
    */
    UPDATE products p
    INNER JOIN (
        SELECT
            jt.product_id,
            jt.quantity
        FROM JSON_TABLE(
            p_products,
            '$[*]'
            COLUMNS (
                product_id INT PATH '$.product_id',
                quantity INT PATH '$.quantity'
            )
        ) AS jt
    ) AS items
        ON p.id = items.product_id
    SET p.stock = p.stock - items.quantity;


    /*
      Deduct card balance
    */
    IF p_card_id IS NOT NULL THEN

        UPDATE credit_card
        SET balance = balance - v_total_price
        WHERE id = p_card_id
          AND user_id = p_user_id;

    END IF;


    COMMIT;


    /*
      Return created order
    */
 SELECT
    v_order_id AS order_id,
    v_total_price AS total_price,
    (
        SELECT balance
        FROM credit_card
        WHERE id = p_card_id
          AND user_id = p_user_id
    ) AS new_balance;

END $$

DELIMITER ;

$$

-- p_address_id
-- p_user_id
-- p_total_price
-- p_status
-- p_product_id
-- p_quantity
-- p_price
CALL create_order (
    ?, -- p_user_id
    ?, -- p_address_id
    ?, -- p_status
    ?, -- p_product_id
    ?, -- p_quantity
    ?, -- p_price
    ? -- p_card_id
);

call create_order (?, ?, ?, ?, ?, ?, ?);