-- drop View if EXISTS catogeries_count;
-- Search Producr using Title

-- Product Card 
 CREATE VIEW  if not EXISTS product_card  AS SELECT
    products.id AS p_id,
    categories.id AS cat_id,
    products.product_image AS image,
    products.title AS name,
    categories.name AS category,
    products.old_price as price,
    products.Discount_price as price_after_discount,
    products.stock,
    ROUND(
        AVG(product_reviews.rating),
        1
    ) AS rating,
    COUNT(product_reviews.id) AS review_count
FROM
    products
    INNER JOIN categories ON products.category_id = categories.id
    LEFT JOIN product_reviews ON products.id = product_reviews.product_id
GROUP BY
    products.id,
    categories.id,
    products.product_image,
    products.title,
    categories.name,
    products.old_price,
    products.Discount_price,
    products.stock
ORDER BY products.id;

