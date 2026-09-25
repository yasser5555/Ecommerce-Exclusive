-- drop View if EXISTS catogeries_count;
-- Search Producr using Title
SELECT * from products;
-- Product Card
CREATE OR REPLACE VIEW product_card AS
SELECT
    products.id AS p_id,
    products.is_active,
    categories.id AS cat_id,
    products.product_image AS image,
    products.title AS name,
    categories.name as category,
    products.old_price AS price,
    products.description,
    products.stock,
    ROUND(
        AVG(product_reviews.rating),
        1
    ) AS rating,
    COUNT(product_reviews.id) AS review_count
FROM
    products
    INNER JOIN categories ON products.category_id = categories.id
    AND categories.is_category_active = 1
    LEFT JOIN product_reviews ON products.id = product_reviews.product_id
WHERE
    products.is_active = 1
GROUP BY
    products.id,
    products.is_active,
    categories.id,
    products.product_image,
    products.title,
    categories.name,
    products.old_price,
    products.description,
    products.stock
ORDER BY products.id;

SELECT * from product_card;

DESCRIBE product_card;