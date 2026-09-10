DELIMITER //

CREATE PROCEDURE remove_from_wishlist(
    IN p_user_id INT,
    IN p_product_id INT
)
BEGIN

    DELETE FROM wishlist

    WHERE user_id = p_user_id
    AND product_id = p_product_id;

END //

DELIMITER ;

CALL remove_from_wishlist(1,2);
CALL get_user_wishlist(1)