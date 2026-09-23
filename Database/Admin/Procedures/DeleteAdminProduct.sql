CREATE PROCEDURE DeleteAdminProduct(in p_product_id int)
BEGIN
DELETE FROM wishlist WHERE product_id =   p_product_id;
DELETE FROM product_reviews WHERE product_id =   p_product_id;
DELETE FROM products WHERE id =   p_product_id;
END 
DELIMITER;
START TRANSACTION;
SELECT count(*) as before_delete from products; 
call DeleteAdminProduct(101);
SELECT  * from products; 
COMMIT();
-- For soft Delete 
ALTER TABLE products
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;