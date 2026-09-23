DROP PROCEDURE IF EXISTS search_product;

DELIMITER $$

CREATE PROCEDURE search_product(
    IN search_title VARCHAR(255)
)
BEGIN

    SELECT
        products.id AS p_id,
        products.product_image AS image,
        products.title AS name,
        categories.name AS category,
        products.old_price AS price,
        products.stock,
        products.is_active,
        ROUND(AVG(product_reviews.rating), 1) AS rating,
        COUNT(product_reviews.id) AS review_count

    FROM products

    INNER JOIN categories
        ON products.category_id = categories.id

    LEFT JOIN product_reviews
        ON products.id = product_reviews.product_id

    WHERE
        products.title LIKE CONCAT('%', search_title, '%')
        AND products.is_active = 1

    GROUP BY
        products.id,
        products.product_image,
        products.title,
        categories.name,
        products.old_price,
        products.stock,
        products.is_active

    ORDER BY products.id;

END $$

DELIMITER ;