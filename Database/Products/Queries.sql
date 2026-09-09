--  get all products products-page
select * from products LIMIT 10;
--  get product by id for product-page
select * from products WHERE id = 1;

-- select * from products LIMIT 10 OFFSET 20;

-- select COUNT(products.id)
-- from products inner join categories on products.category_id = categories.id where category_id = 4;

-- SELECT * FROM products;
SELECT *
FROM products
WHERE
    title LIKE "G%"
ORDER BY created_at DESC, id ASC;

SELECT COUNT(*) + 1 AS position
FROM products AS p
WHERE
    p.created_at < (
        SELECT created_at
        FROM products
        WHERE
            id = ?
    )
    OR (
        p.created_at = (
            SELECT created_at
            FROM products
            WHERE
                id = ?
        )
        AND p.id < ?
    );

select * from products;
-- SELECT * FROM products WHERE products.title LIKE "t%" ORDER BY `Added_at` DESC, id ASC
-- SELECT * FROM product_card WHERE p_id =1;

-- SELECT * FROM product_card WHERE product_card.name LIKE "r%" ORDER BY product_card.rating DESC, product_card.p_id ASC
select * from product_card;

select product_card.category, count(product_card.cat_id)
from product_card
GROUP BY
    category

-- SELECT * from  product_card WHERE category = "Smartphones" and rating > 3 or price BETWEEN 2355.65 and 2450.40 ORDER BY price
