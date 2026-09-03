use ecommerce;
-- select count(user_id) as orders from orders where user_id =5;
-- select	count(user_id) as Comments from product_reviews where user_id =2;
-- select	count(user_id) as Favorites from wishlist where user_id =2;
 
 USE ecommerce;
DROP PROCEDURE IF EXISTS get_user_data;


-- Getting Getting_user Orders
DELIMITER //
CREATE PROCEDURE get_user_data(IN p_id INT)
BEGIN
    SELECT
        (SELECT COUNT(*)
         FROM orders
         WHERE user_id = p_id) AS orders,
        (SELECT COUNT(*)
         FROM product_reviews
         WHERE user_id = p_id) AS comments,
        (SELECT COUNT(*)
         FROM wishlist
         WHERE user_id = p_id) AS favorites;
END //
DELIMITER ;

-- Check Procedure
SHOW PROCEDURE STATUS WHERE Db = 'ecommerce';

-- Deleting Procedure

-- drop PROCEDURE if exists add_user_card;