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
WHERE title LIKE "G%"
ORDER BY created_at DESC, id ASC;


SELECT COUNT(*) + 1 AS position
FROM products AS p
WHERE 
    p.created_at < (
        SELECT created_at
        FROM products
        WHERE id = ?
    )
    OR (
        p.created_at = (
            SELECT created_at
            FROM products
            WHERE id = ?
        )
        AND p.id < ?
    );


    SELECT * FROM products WHERE products.title LIKE "t%" ORDER BY `Added_at` DESC, id ASC