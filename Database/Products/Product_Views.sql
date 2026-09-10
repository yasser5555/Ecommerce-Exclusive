-- drop View if EXISTS catogeries_count;
-- Search Producr using Title

-- Product Card
CREATE OR REPLACE VIEW product_card AS SELECT
    p.id AS p_id,
    c.id AS cat_id,
    p.product_image AS image,
    p.title AS name,
    c.name AS category,
    p.old_price AS price,
    p.Discount_price AS price_after_discount,
    p.stock,

    ROUND(AVG(pr.rating), 1) AS rating,
    COUNT(pr.id) AS review_count

FROM products p

INNER JOIN categories c
    ON p.category_id = c.id

LEFT JOIN product_reviews pr
    ON p.id = pr.product_id

GROUP BY
    p.id,
    c.id,
    p.product_image,
    p.title,
    c.name,
    p.old_price,
    p.Discount_price,
    p.stock;
ORDER BY products.id;
SELECT * from product_card ;