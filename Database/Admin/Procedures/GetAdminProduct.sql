CREATE PROCEDURE GetAdminProduct()
BEGIN
    -- Orders By Status
   SELECT COUNT(*)as total_products FROM products;
SELECT COUNT(*) as in_stock FROM products WHERE stock > 0;
SELECT COUNT(*) as out_of_stock FROM products WHERE stock = 0;
END 
DELIMITER;
CALL GetAdminProduct();

SELECT * from user_order WHERE products LIKE "%Redmi%";

SELECT * FROM products WHERE stock = 0;

