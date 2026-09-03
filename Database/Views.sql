use ecommerce ;
-- drop view if exists user_orders;
-- Solving Deleting addresss problem 
-- ? it happened bec address_id is linked with other table and can't be null based on DB-design and Creation
-- 1. Modify on Address Table make it Accept Null by:
-- * Deleting Old-Foregin key from orders-Table
ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_2;
-- * Modfiy Address_id to Accept Null
ALTER TABLE orders MODIFY address_id INT NULL DEFAULT NULL;
-- * Adding a new foreign key as a replacment of deleted Foreign-key and on delete set it to Default
ALTER TABLE orders ADD CONSTRAINT orders_ibfk_2 FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE SET DEFAULT;
DELETE FROM addresses WHERE user_id = 3 ORDER BY user_id DESC LIMIT 1;
select * from addresses ;



SELECT * FROM user_orders WHERE id = 5 ORDER BY total_price Desc