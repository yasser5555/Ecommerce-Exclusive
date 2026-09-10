DELIMITER / /
CREATE PROCEDURE IF NOT EXISTS get_user_wishlist(
    IN p_user_id INT
)
BEGIN
    SELECT
        product_card.*,
        CASE
            WHEN wishlist.id IS NOT NULL THEN 1
            ELSE 0
        END AS isWishList
    FROM product_card
    INNER JOIN wishlist
        ON wishlist.product_id = product_card.p_id
    WHERE wishlist.user_id = p_user_id;
END //
DELIMITER;
CALL get_user_wishlist(1);