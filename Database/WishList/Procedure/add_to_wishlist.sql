DELIMITER / /

CREATE PROCEDURE IF NOT EXISTS add_to_wishlist(
    IN p_user_id INT,
    IN p_product_id INT
)
BEGIN

    INSERT INTO wishlist (
        user_id,
        product_id
    )
    VALUES (
        p_user_id,
        p_product_id
    );

END //

DELIMITER;
CALL add_to_wishlist(1,6);
CALL get_user_wishlist(1);