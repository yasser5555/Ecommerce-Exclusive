DROP PROCEDURE if EXISTS GetAdminProduct;
CREATE PROCEDURE GetAdminProduct()
BEGIN
    -- Orders By Status
   SELECT COUNT(*)as total_products FROM products where is_active = 1;
SELECT COUNT(*) as in_stock FROM products WHERE stock > 0 and is_active = 1;
SELECT COUNT(*) as out_of_stock FROM products WHERE stock = 0 and is_active = 1;
END 
DELIMITER;
CALL GetAdminProduct();

SELECT * from user_order WHERE products LIKE "%Redmi%";

SELECT * FROM products WHERE stock = 0;

