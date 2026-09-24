DELIMITER $$

DROP PROCEDURE if EXISTS GetCategoryStatistics;

CREATE PROCEDURE GetCategoryStatistics()
BEGIN
    -- Total Categories
    SELECT 
        COUNT(*) AS Total_Categories
    FROM categories WHERE categories.is_category_active =1 ;

    -- Total Products
    SELECT 
        COUNT(category_id) AS Total_products
    FROM products ;

    -- Products Count By Category
    SELECT 
   categories.id AS category_id,  
        categories.name,
        COUNT(products.id) AS product_count
    FROM products
    RIGHT JOIN categories 
        ON products.category_id = categories.id 
        WHERE categories.is_category_active =1
    GROUP BY categories.id, categories.name
    ORDER BY product_count DESC
     ;

END $$

DELIMITER;

call GetCategoryStatistics ();